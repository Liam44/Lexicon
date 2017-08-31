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
    public class DocumentsRepository : IDisposable
    {
        private ApplicationDbContext db;

        public DocumentsRepository()
        {
            db = new ApplicationDbContext();
        }

        public DocumentsRepository(ApplicationDbContext db)
        {
            this.db = db;
        }

        /// Temporary method
        public IEnumerable<Document> Documents()
        {
            return db.Documents;
        }

        /// <summary>
        /// Gets all document uploaded for a course part
        /// </summary>
        /// <param name="coursePartId">ID of the course part</param>
        /// <returns></returns>
        public IQueryable<Document> CoursePartDocuments(int coursePartId)
        {
            return db.Documents.Where(d => d.CoursePartID == coursePartId);
        }

        /// <summary>
        /// Gets all document uploaded for a course
        /// </summary>
        /// <param name="courseId">ID of the course</param>
        /// <returns></returns>
        public IQueryable<Document> CourseDocuments(int courseId)
        {
            return db.Documents.Where(d => d.CourseID == courseId);
        }

        /// <summary>
        /// Gets all document related to an assignment
        /// </summary>
        /// <param name="assignmentId">ID of the assignment</param>
        /// <returns></returns>
        public IQueryable<Document> AssignmentDocuments(int assignmentId)
        {
            return db.Documents.Where(d => d.AssignmentID == assignmentId);
        }

        /// <summary>
        /// Gets a specific document day
        /// </summary>
        /// <param name="id">ID of the document day</param>
        /// <returns></returns>
        public async Task<Document> Document(int? id)
        {
            return await db.Documents.FirstOrDefaultAsync(cd => cd.ID == id);
        }

        /// <summary>
        /// Gets a specific document day
        /// </summary>
        /// <param name="id">ID of the document day</param>
        /// <returns></returns>
        public async Task<Document> Document(string fileName)
        {
            return await db.Documents.FirstOrDefaultAsync(cd => cd.Name == fileName);
        }

        public async Task Add(Document documentDay)
        {
            db.Documents.Add(documentDay);
            await db.SaveChangesAsync();

            await new CoursePartsRepository().CreateCourseParts(documentDay.ID);
        }

        public async Task<bool> Edit(int id, Document documentDay)
        {
            db.Entry(documentDay).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();

                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DocumentExists(id))
                {
                    return false;
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task Delete(Document document)
        {
            db.Documents.Remove(document);
            await db.SaveChangesAsync();
        }

        private bool DocumentExists(int id)
        {
            return db.Documents.Count(d => d.ID == id) > 0;
        }

        /// <summary>
        /// Clones a document and attaches it either to a course day, a course part or an assignment
        /// </summary>
        /// <param name="document">Document to be cloned</param>
        /// <param name="courseDayId">Course day to which the cloned document should be attached</param>
        /// <param name="coursePartId">Course part to which the cloned document should be attached</param>
        /// <param name="teachersAssignmentId">Course part to which the cloned document should be attached</param>
        /// <returns></returns>
        public async Task<Document> Clone(Document document,
                                          int? courseDayId = null,
                                          int? coursePartId = null,
                                          int? teachersAssignmentId = null)
        {
            Document clone = new Document
            {
                Name = document.Name,
                Class = document.Class,
                ContentType = document.ContentType,
                Content = document.Content,
                UploadingDate = document.UploadingDate,
                UploaderID = document.UploaderID,
                CourseDayID = courseDayId,
                CoursePartID = coursePartId,
                AssignmentID = teachersAssignmentId
            };

            await Add(clone);

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