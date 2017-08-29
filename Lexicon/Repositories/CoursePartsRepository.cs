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
    public class CoursePartsRepository : IDisposable
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        /// <summary>
        /// Gets all parts for a course day
        /// </summary>
        /// <param name="courseDayId">ID of the course day</param>
        /// <returns></returns>
        public IQueryable<CoursePart> CourseParts(int courseDayId)
        {
            return db.CourseParts.Where(cp => cp.CourseDayID == courseDayId);
        }

        /// <summary>
        /// Gets a specific course part
        /// </summary>
        /// <param name="id">ID of the course part</param>
        /// <returns></returns>
        public async Task<CoursePart> CoursePart(int? id)
        {
            return await db.CourseParts.FirstOrDefaultAsync(cp => cp.ID == id);
        }

        /// <summary>
        /// Creates two parts for the course day, with default values:
        /// one for the morning, one for the afternoon
        /// </summary>
        /// <param name="courseDayId"></param>
        /// <returns></returns>
        public async Task<List<CoursePart>> CreateCourseParts(int courseDayId)
        {
            CoursePart morning = new CoursePart { PartDay = CoursePartDay.Morning, CourseDayID = courseDayId };
            CoursePart afternoon = new CoursePart { PartDay = CoursePartDay.Afternoon, CourseDayID = courseDayId };

            db.CourseParts.Add(morning);
            db.CourseParts.Add(afternoon);

            await db.SaveChangesAsync();

            return new List<CoursePart> { morning, afternoon };
        }

        public async Task<bool> Edit(int id, CoursePart coursePart)
        {
            db.Entry(coursePart).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();

                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CoursePartExists(id))
                {
                    return false;
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task Delete(CoursePart coursePart)
        {
            db.CourseParts.Remove(coursePart);
            await db.SaveChangesAsync();
        }

        private bool CoursePartExists(int id)
        {
            return db.CourseParts.Count(cp => cp.ID == id) > 0;
        }

        /// <summary>
        /// Clones a course part and attaches it to a course day
        /// </summary>
        /// <param name="coursePart">Course part to be cloned</param>
        /// <param name="courseDayId">Course day to which the cloned assignment should be attached</param>
        /// <returns></returns>
        public async Task<CoursePart> Clone(CoursePart coursePart, int courseDayId)
        {
            // Clone the coursepart itself
            CoursePart clone = new CoursePart
            {
                PartDay = coursePart.PartDay,
                CourseDayID = courseDayId
            };

            db.CourseParts.Add(clone);
            await db.SaveChangesAsync();

            // Clone the links related to the coursepart
            foreach (Link link in coursePart.Pluralsight)
            {
                Link linkClone = await new LinksRepository().Clone(link, clone.ID);

                clone.Pluralsight.Add(link);
            }

            // Clone the documents related to the coursepart
            foreach (Document document in coursePart.Files)
            {
                Document docClone = await new DocumentsRepository().Clone(document, coursePartId: clone.ID);

                clone.Files.Add(docClone);
            }

            // Clone the assignments related to the coursepart
            foreach (TeachersAssignment assignment in coursePart.Assignments)
            {
                TeachersAssignment taClone = await new TeachersAssignmentsRepository().Clone(assignment, coursePartId: clone.ID);

                clone.Assignments.Add(taClone);
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