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
        private ApplicationDbContext db = new ApplicationDbContext();

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

        public async Task Add(CourseTemplate courseTemplate)
        {
            db.CourseTemplates.Add(courseTemplate);
            await db.SaveChangesAsync();

            await new CourseDaysRepository().CreateCourseDays(courseTemplate.ID, courseTemplate.AmountDays);
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