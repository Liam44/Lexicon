using Lexicon.Models;
using Lexicon.Models.Lexicon;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;

namespace Lexicon.Repositories
{
    public class CourseDaysRepository : IDisposable
    {
        private ApplicationDbContext db;

        public CourseDaysRepository()
        {
            db = new ApplicationDbContext();
        }

        public CourseDaysRepository(ApplicationDbContext db)
        {
            this.db = db;
        }

        /// <summary>
        /// Gets all course days in a course
        /// </summary>
        /// <param name="courseId">ID of the course</param>
        /// <returns></returns>
        public IQueryable<CourseDay> CourseDays(int? courseId)
        {
            return db.CourseDays.Where(cd => cd.CourseID == courseId);
        }

        /// <summary>
        /// Gets all course days in a course template
        /// </summary>
        /// <param name="courseTemplateId">ID of the course template</param>
        /// <returns></returns>
        public IQueryable<CourseDay> CourseTemplateDays(int? courseTemplateId)
        {
            return db.CourseDays.Where(cd => cd.CourseTemplateID == courseTemplateId).OrderBy(cd => cd.DayNumber);
        }

        /// <summary>
        /// Gets a specific course day
        /// </summary>
        /// <param name="id">ID of the course day</param>
        /// <returns></returns>
        public async Task<CourseDay> CourseDay(int? id)
        {
            return await db.CourseDays.FirstOrDefaultAsync(cd => cd.ID == id);
        }

        /// <summary>
        /// Gets a specific course day in a template
        /// </summary>
        /// <param name="templateId">ID of the course template</param>
        /// <param name="dayNumber">Day number the course day is supposed to have</param>
        /// <returns></returns>
        public async Task<CourseDay> CourseTemplateDay(int? templateId, int dayNumber)
        {
            return await db.CourseDays.FirstOrDefaultAsync(cd => cd.CourseTemplateID == templateId && cd.DayNumber == dayNumber);
        }

        public async Task Add(CourseDay courseDay)
        {
            db.CourseDays.Add(courseDay);
            await db.SaveChangesAsync();

            await new CoursePartsRepository().CreateCourseParts(courseDay.ID);
        }

        /// <summary>
        /// Creates as many "empty" course days as required in the template/course
        /// </summary>
        /// <param name="amountOfDays">Required amount of days</param>
        /// <param name="templateId">ID of the template</param>
        /// <param name="courseID">ID of the course</param>
        /// <returns></returns>
        public async Task CreateCourseDays(int amountOfDays, int? templateId = null, int? courseId = null)
        {
            // Creating the days related to the template
            for (int i = 0; i < amountOfDays; i += 1)
            {
                CourseDay cp = new CourseDay
                {
                    DayNumber = i + 1,
                    CourseTemplateID = templateId,
                    CourseID = courseId
                };
                await Add(cp);
            }
        }

        /// <summary>
        /// Creates a new "empty" course day
        /// </summary>
        /// <param name="daynumber">Day number on the course/template</param>
        /// <param name="templateId">ID of the template to which the course day should be attached</param>
        /// <param name="courseId">ID of the course to which the course day should be attached</param>
        /// <returns></returns>
        public async Task CreateCourseDay(int daynumber, int? templateId = null, int? courseId = null)
        {
            CourseDay cp = new CourseDay
            {
                DayNumber = daynumber,
                CourseTemplateID = templateId,
                CourseID = courseId
            };
            await Add(cp);
        }

        public async Task<bool> Edit(int id, CourseDay courseDay)
        {
            db.Entry(courseDay).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();

                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseDayExists(id))
                {
                    return false;
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task Delete(CourseDay courseDay)
        {
            // Due to the 0..* relationship between the tables,
            // all documents related to the course part must be deleted first
            DocumentsRepository docRepo = new DocumentsRepository(db);
            foreach (Document doc in courseDay.Files.ToList())
            {
                await docRepo.Delete(doc);
            }

            // All course parts in the course day have to be deleted first
            CoursePartsRepository cpRepo = new CoursePartsRepository(db);
            foreach (CoursePart cp in courseDay.CourseParts.ToList())
            {
                await cpRepo.Delete(cp);
            }

            db.CourseDays.Remove(courseDay);
            await db.SaveChangesAsync();
        }

        /// <summary>
        /// Reattribute the rightful day number to all course days in the list
        /// </summary>
        /// <param name="courseDays">List of course days</param>
        /// <returns></returns>
        public async Task UpdateDayNumbers(List<CourseDay> courseDays)
        {
            try
            {
                int dayNumber = 1;
                // The database is saved in the end, and only if needed
                bool hasBeenChanged = false;

                foreach (CourseDay courseDay in courseDays)
                {
                    if (courseDay.DayNumber != dayNumber)
                    {
                        courseDay.DayNumber = dayNumber;
                        db.Entry(courseDay).State = EntityState.Modified;
                        hasBeenChanged = true;
                    }

                    dayNumber += 1;
                }

                if (hasBeenChanged)
                    await db.SaveChangesAsync();
            }
            catch
            {
            }
        }

        private bool CourseDayExists(int id)
        {
            return db.CourseDays.Count(cd => cd.ID == id) > 0;
        }

        /// <summary>
        /// Clones the course day and attaches it to a course
        /// </summary>
        /// <param name="courseDay">Cours day to be cloned</param>
        /// <param name="courseId">ID of the course to which the cloned course day should be attached</param>
        /// <returns></returns>
        public async Task<CourseDay> Clone(CourseDay courseDay, int courseId)
        {
            // Cloning the courseday itself
            CourseDay clone = new CourseDay
            {
                CourseID = courseId,
                DayNumber = courseDay.DayNumber
            };

            await Add(clone);

            // Cloning the course parts included in the courseday
            foreach (CoursePart coursePart in courseDay.CourseParts)
            {
                CoursePart cpClone = await new CoursePartsRepository().Clone(coursePart, clone.ID);

                clone.CourseParts.Add(cpClone);
            }

            // Cloning the uploaded files in the courseday
            foreach (Document document in courseDay.Files)
            {
                Document docClone = await new DocumentsRepository().Clone(document, courseDayId: clone.ID);

                clone.Files.Add(docClone);
            }

            return clone;
        }

        #region IDisposable Support
        private bool disposedValue = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                db.Dispose();
                disposedValue = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
        }
        #endregion
    }
}