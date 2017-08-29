using Lexicon.Models.Lexicon;
using Lexicon.Repositories;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace SinglePageWebApplication.Controllers
{
    [Authorize]
    public class CoursePartsController : ApiController
    {
        private CoursePartsRepository repository = new CoursePartsRepository();

        // GET: api/CourseParts/5
        [ResponseType(typeof(IEnumerable<CoursePart>))]
        public IHttpActionResult GetCourseParts(int id)
        {
            return Ok(repository.CourseParts(id));
        }

        // GET: api/CoursePart/5
        [ResponseType(typeof(CoursePart))]
        public async Task<IHttpActionResult> GetCoursePart(int id)
        {
            CoursePart coursePart = await repository.CoursePart(id);
            if (coursePart == null)
            {
                return NotFound();
            }

            return Ok(coursePart);
        }

        //// POST: api/CourseParts
        //[ResponseType(typeof(CoursePart))]
        //public async Task<IHttpActionResult> PostCoursePart(CoursePart coursePart)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    await repository.Add(coursePart);

        //    return CreatedAtRoute("DefaultApi", new { id = coursePart.ID }, coursePart);
        //}

        [Authorize(Roles = "Admin,Teacher")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCoursePart(int id, CoursePart coursePart)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != coursePart.ID)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                if (await repository.Edit(id, coursePart))
                    return StatusCode(HttpStatusCode.NoContent);
                else
                    return NotFound();
            }

            return BadRequest(ModelState);
        }

        //// DELETE: api/CoursePart/5
        //[ResponseType(typeof(CoursePart))]
        //public async Task<IHttpActionResult> DeleteCoursePart(int id)
        //{
        //    CoursePart coursePart = await repository.CoursePart(id);
        //    if (coursePart == null)
        //    {
        //        return NotFound();
        //    }

        //    await repository.Delete(coursePart);

        //    return Ok(coursePart);
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