using Lexicon.Models;
using Lexicon.Models.Lexicon;
using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;

namespace Lexicon.Repositories
{
    public class NewsRepository : IDisposable
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        public IQueryable<News> GetNews()
        {
            return db.News;
        }

        public async Task<News> GetNews(int id)
        {
            return await db.News.FirstOrDefaultAsync(n => n.ID == id);
        }

        public async Task Add(News news)
        {
            db.News.Add(news);
            await db.SaveChangesAsync();
        }

        public async Task<bool> Edit(int id, News news)
        {
            db.Entry(news).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();

                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NewsExists(id))
                {
                    return false;
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task Delete(News news)
        {
            db.News.Remove(news);
            await db.SaveChangesAsync();
        }

        private bool NewsExists(int id)
        {
            return db.News.Count(n => n.ID == id) > 0;
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