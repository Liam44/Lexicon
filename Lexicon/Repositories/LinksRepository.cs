using Lexicon.Migrations;
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
    public class LinksRepository : IDisposable
    {
        private ApplicationDbContext db;

        public LinksRepository()
        {
            db = new ApplicationDbContext();
        }

        public LinksRepository(ApplicationDbContext db)
        {
            this.db = db;
        }

        /// <summary>
        /// Gets all links related to a coruse part
        /// </summary>
        /// <param name="coursePartId">ID of the course part</param>
        /// <returns></returns>
        public IQueryable<Link> CoursePartLinks(int coursePartId)
        {
            return db.Links.Where(l => l.CoursePartID == coursePartId);
        }

        /// <summary>
        /// Gets a specific link
        /// </summary>
        /// <param name="id">ID of the link</param>
        /// <returns></returns>
        public async Task<Link> Link(int? id)
        {
            return await db.Links.FirstOrDefaultAsync(l => l.ID == id);
        }

        /// <summary>
        /// Adds a new link into the database
        /// </summary>
        /// <param name="linkId"></param>
        /// <returns></returns>
        public async Task Add(Link link)
        {
            db.Links.Add(link);

            await db.SaveChangesAsync();
        }

        public async Task<bool> Edit(int id, Link link)
        {
            db.Entry(link).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();

                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LinkExists(id))
                {
                    return false;
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task Delete(Link coursePart)
        {
            db.Links.Remove(coursePart);
            await db.SaveChangesAsync();
        }

        private bool LinkExists(int id)
        {
            return db.Links.Count(l => l.ID == id) > 0;
        }

        /// <summary>
        /// Clones the link and attaches it to the course part
        /// </summary>
        /// <param name="link">Link to be cloned</param>
        /// <param name="coursePartId">Course part which the cloned link should be related to</param>
        /// <returns></returns>
        public async Task<Link> Clone(Link link, int coursePartId)
        {
            // Clone the link
            Link clone = new Link
            {
                HttpLink = link.HttpLink,
                CoursePartID = coursePartId
            };

            db.Links.Add(clone);
            await db.SaveChangesAsync();

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