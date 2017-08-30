using Lexicon.Models;
using Lexicon.Models.Lexicon;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;

namespace Lexicon.Repositories
{
    public class CourseTemplatesRepository
    {
        private ApplicationDbContext db;

        public CourseTemplatesRepository()
        {
            db = new ApplicationDbContext();
        }

        public CourseTemplatesRepository(ApplicationDbContext db)
        {
            this.db = db;
        }

        /// <summary>
        /// Gets all course templates
        /// </summary>
        /// <returns></returns>
        public IQueryable<CourseTemplate> CourseTemplates()
        {
            return db.CourseTemplates;
        }

        /// <summary>
        /// Gets a specific course template
        /// </summary>
        /// <param name="id">ID of the course template</param>
        /// <returns></returns>
        public async Task<CourseTemplate> CourseTemplate(int? id)
        {
            return await db.CourseTemplates.FirstOrDefaultAsync(cd => cd.ID == id);
        }

        public async Task Add(CourseTemplate template)
        {
            db.CourseTemplates.Add(template);
            await db.SaveChangesAsync();

            await new CourseDaysRepository().CreateCourseDays(template.AmountDays, templateId: template.ID);
        }

        public async Task<bool> Edit(int id, CourseTemplate courseTemplate)
        {
            db.Entry(courseTemplate).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();

                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseTemplateExists(id))
                {
                    return false;
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task Delete(CourseTemplate courseTemplate)
        {
            // All courses have to be deleted before the template
            CourseDaysRepository cdRepo = new CourseDaysRepository(db);

            foreach (CourseDay cd in courseTemplate.CourseDays.ToList()) {
                await cdRepo.Delete(cd);
            }

            db.CourseTemplates.Remove(courseTemplate);
            await db.SaveChangesAsync();
        }

        private bool CourseTemplateExists(int id)
        {
            return db.CourseTemplates.Count(cd => cd.ID == id) > 0;
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