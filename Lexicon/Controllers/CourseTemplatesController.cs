using Lexicon.Models.Lexicon;
using Lexicon.Repositories;
using Lexicon.ViewModels;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace SinglePageWebApplication.Controllers
{
    [Authorize(Roles = "Admin,Teacher")]
    public class CourseTemplatesController : ApiController
    {
        private CourseTemplatesRepository repository = new CourseTemplatesRepository();

        // GET: api/CourseTemplates/5
        [ResponseType(typeof(IEnumerable<PartialCourseTemplateVM>))]
        public IHttpActionResult GetCourseTemplates()
        {
            return Ok(repository.CourseTemplates().Select(ct => new PartialCourseTemplateVM
            {
                ID = ct.ID,
                Name = ct.Name,
                AmountDays = ct.AmountDays
            }));
        }

        // GET: api/CourseTemplate/5
        [ResponseType(typeof(PartialCourseTemplateVM))]
        public async Task<IHttpActionResult> GetCourseTemplate(int id)
        {
            CourseTemplate courseTemplate = await repository.CourseTemplate(id);
            if (courseTemplate == null)
            {
                return NotFound();
            }

            return Ok(new PartialCourseTemplateVM
            {
                ID = courseTemplate.ID,
                AmountDays = courseTemplate.AmountDays,
                Name = courseTemplate.Name
            });
        }

        // POST: api/CourseTemplates
        [ResponseType(typeof(CourseTemplate))]
        public async Task<IHttpActionResult> PostCourseTemplate(PartialCourseTemplateVM partialCourseTemplate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CourseTemplate courseTemplate = new CourseTemplate
            {
                Name = partialCourseTemplate.Name,
                AmountDays = partialCourseTemplate.AmountDays
            };

            await repository.Add(courseTemplate);

            return CreatedAtRoute("DefaultApi", new { id = courseTemplate.ID }, courseTemplate);
        }

        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCourseTemplate(int id, PartialCourseTemplateVM partialCourseTemplate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != partialCourseTemplate.ID)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                CourseTemplate courseTemplate = await repository.CourseTemplate(id);

                // The only data that can manually be changed by the user is the name of the template
                // The amount of days are managed in other views
                courseTemplate.Name = partialCourseTemplate.Name;

                if (await repository.Edit(id, courseTemplate))
                    return StatusCode(HttpStatusCode.NoContent);
                else
                    return NotFound();
            }

            return BadRequest(ModelState);
        }

        // DELETE: api/CourseTemplate/5
        [ResponseType(typeof(CourseTemplate))]
        public async Task<IHttpActionResult> DeleteCourseTemplate(int id)
        {
            CourseTemplate courseTemplate = await repository.CourseTemplate(id);
            if (courseTemplate == null)
            {
                return NotFound();
            }

            await repository.Delete(courseTemplate);

            return Ok(courseTemplate);
        }

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