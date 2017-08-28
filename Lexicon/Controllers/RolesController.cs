using Microsoft.AspNet.Identity.EntityFramework;
using Lexicon.Models.Lexicon;
using Lexicon.Repositories;
using Lexicon.ViewModels;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using System;

namespace Lexicon.Controllers
{
    public class RolesController : ApiController
    {
        private RolesRepository repository = new RolesRepository();

        // GET: api/Roles
        public List<EnumRolesVM> GetRoles()
        {
            List<EnumRolesVM> result = new List<EnumRolesVM>();

            foreach (ERole role in Enum.GetValues(typeof(ERole)))
            {
                if (role != ERole.Undefined)
                    result.Add(new EnumRolesVM { Key = role, Value = role.ToString() });
            }

            return result;
        }

        //// GET: api/Roles/5
        //[ResponseType(typeof(IdentityRole))]
        //public async Task<IHttpActionResult> GetRole(string id)
        //{
        //    IdentityRole role = await repository.GetRole(id);
        //    if (role == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(role);
        //}

        //// PUT: api/Roles/5
        //[ResponseType(typeof(void))]
        //public async Task<IHttpActionResult> PutRole(string id, IdentityRole role)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != role.Id)
        //    {
        //        return BadRequest();
        //    }

        //    if (await repository.Edit(id, role))
        //        return StatusCode(HttpStatusCode.NoContent);
        //    else
        //        return NotFound();
        //}

        //// POST: api/Roles
        //[ResponseType(typeof(IdentityRole))]
        //public async Task<IHttpActionResult> PostRole(IdentityRole role)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    await repository.Add(role);

        //    return CreatedAtRoute("DefaultApi", new { id = role.Id }, role);
        //}

        //// DELETE: api/Roles/5
        //[ResponseType(typeof(IdentityRole))]
        //public async Task<IHttpActionResult> DeleteRole(string id)
        //{
        //    IdentityRole role = await repository.GetRole(id);
        //    if (role == null)
        //    {
        //        return NotFound();
        //    }

        //    await repository.Delete(role);

        //    return Ok(role);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                repository.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}