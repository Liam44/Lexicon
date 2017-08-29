using Lexicon.Models;
using Lexicon.Models.Lexicon;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Lexicon.Repositories
{
    public class TeachersAssignmentsRepository : IDisposable
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        /// <summary>
        /// Gets all assignments related to a course part
        /// </summary>
        /// <param name="coursePartId">ID of the course</param>
        /// <returns></returns>
        public IQueryable<TeachersAssignment> TeachersAssignments(int coursePartId)
        {
            return db.TeachersAssignments.Where(ta => ta.CoursePartID == coursePartId);
        }

        /// <summary>
        /// Gets a specific assignment
        /// </summary>
        /// <param name="id">ID of the assignment</param>
        /// <returns></returns>
        public async Task<TeachersAssignment> TeachersAssignment(int? id)
        {
            return await db.TeachersAssignments.FirstOrDefaultAsync(ta => ta.ID == id);
        }

        public async Task Add(TeachersAssignment teachersAssignment)
        {
            db.TeachersAssignments.Add(teachersAssignment);
            await db.SaveChangesAsync();

            await new CoursePartsRepository().CreateCourseParts(teachersAssignment.ID);
        }

        public async Task<bool> Edit(int id, TeachersAssignment teachersAssignment)
        {
            db.Entry(teachersAssignment).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();

                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeachersAssignmentExists(id))
                {
                    return false;
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task Delete(TeachersAssignment teachersAssignment)
        {
            db.TeachersAssignments.Remove(teachersAssignment);
            await db.SaveChangesAsync();
        }

        private bool TeachersAssignmentExists(int id)
        {
            return db.TeachersAssignments.Count(cd => cd.ID == id) > 0;
        }

        /// <summary>
        /// Clones the assignment and attaches it to a course part
        /// </summary>
        /// <param name="teachersAssignment">Assignment to be cloned</param>
        /// <param name="coursePartId">Course part to which the cloned assignment should be attached</param>
        /// <returns></returns>
        public async Task<TeachersAssignment> Clone(TeachersAssignment teachersAssignment, int coursePartId)
        {
            // Cloning the courseday itself
            TeachersAssignment clone = new TeachersAssignment
            {
                CoursePartID = coursePartId,
                Theme = teachersAssignment.Theme,
                Deadline = teachersAssignment.Deadline
            };

            await Add(clone);

            // Cloning the uploaded files in the courseday
            foreach (Document document in teachersAssignment.Documents)
            {
                Document docClone = await new DocumentsRepository().Clone(document, teachersAssignmentId: clone.ID);

                clone.Documents.Add(docClone);
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