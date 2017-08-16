using Lexicon.Repositories;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Lexicon.Controllers
{
    [Authorize(Roles = "Admin")]
    public class RolesAPIController : ApiController
    {
        private RolesRepository repository = new RolesRepository();

        // GET api/values
        public List<IdentityRole> Get()
        {
            return repository.Roles().ToList();
        }

        #region IDisposable Support
        private bool disposedValue = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                repository.Dispose();
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
