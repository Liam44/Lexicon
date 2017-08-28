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
    public class MessagesRepository : IDisposable
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        /// <summary>
        /// Gets all messages received or sent by a user
        /// </summary>
        /// <param name="id">User's ID</param>
        /// <returns></returns>
        public IQueryable<Message> Messages(string id)
        {
            return db.Messages.Where(m => m.FromID == id || m.ToID == id);
        }

        /// <summary>
        /// Gets all messages received by a user
        /// </summary>
        /// <param name="id">User's ID</param>
        /// <returns></returns>
        public List<Message> ReceivedMessages(string id)
        {
            return db.Messages.Where(m => m.ToID == id).ToList();
        }

        /// <summary>
        /// Gets all messages sent by a user
        /// </summary>
        /// <param name="id">User's ID</param>
        /// <returns></returns>
        public List<Message> SentMessages(string id)
        {
            return db.Messages.Where(m => m.FromID == id).ToList();
        }

        public async Task< Message> Message(int? id)
        {
            return await db.Messages.FirstOrDefaultAsync(m => m.ID == id);
        }

        public async Task Add(Message message)
        {
            db.Messages.Add(message);
            await db.SaveChangesAsync();
        }

        public async Task<bool> Edit(int id, Message message)
        {
            db.Entry(message).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();

                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MessageExists(id))
                {
                    return false;
                }
                else
                {
                    throw;
                }
            }
        }

        private bool MessageExists(int id)
        {
            return db.Messages.Count(m => m.ID == id) > 0;
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