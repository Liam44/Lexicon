using Lexicon.Helpers;
using Lexicon.Models;
using Lexicon.Models.Lexicon;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Lexicon.Repositories
{
    public class RolesRepository : IDisposable
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        public IEnumerable<IdentityRole> Roles()
        {
            return db.Roles;
        }

        public string DefaultPassword(string role)
        {
            return RoleConstants.Password(role.GetValueFromDescription<ERoles>());
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