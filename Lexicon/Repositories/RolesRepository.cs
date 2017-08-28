using Microsoft.AspNet.Identity.EntityFramework;
using Lexicon.Models;
using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;

namespace Lexicon.Repositories
{
    public class RolesRepository : IDisposable
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        public IQueryable<IdentityRole> GetRoles()
        {
            return db.Roles;
        }

        //public async Task<IdentityRole> GetRole(string id)
        //{
        //    return await GetRoles().FirstOrDefaultAsync(u => u.Id == id);
        //}

        //public async Task Add(IdentityRole role)
        //{
        //    db.Roles.Add(role);
        //    await db.SaveChangesAsync();
        //}

        //public async Task<bool> Edit(string id, IdentityRole role)
        //{
        //    db.Entry(role).State = EntityState.Modified;

        //    try
        //    {
        //        await db.SaveChangesAsync();

        //        return true;
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!RoleExists(id))
        //        {
        //            return false;
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }
        //}

        //public async Task Delete(IdentityRole role)
        //{
        //    db.Roles.Remove(role);
        //    await db.SaveChangesAsync();
        //}

        //private bool RoleExists(string id)
        //{
        //    return db.Roles.Count(e => e.Id == id) > 0;
        //}

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