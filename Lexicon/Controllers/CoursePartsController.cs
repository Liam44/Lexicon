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
    [Authorize]
    public class CoursePartsController : ApiController
    {
        private CoursePartsRepository repository = new CoursePartsRepository();

        // GET: api/CourseParts/5
        [ResponseType(typeof(IEnumerable<PartialCoursePartVM>))]
        public async Task<IHttpActionResult> GetCoursePart(int id)
        {
            CoursePart coursePart = await repository.CoursePart(id);

            if (coursePart == null)
                return NotFound();

            return Ok(new PartialCoursePartVM
            {
                ID = coursePart.ID,
                PartDay = coursePart.PartDay.ToString(),
                CodeAlong_Lecture = coursePart.CodeAlong_Lecture,
                CourseDayID = coursePart.CourseDayID,
                CourseDayName = "DAY " + coursePart.CourseDay.DayNumber.ToString(),
                CourseName = coursePart.CourseDay.Course == null ? null : coursePart.CourseDay.Course.Name,
                CourseTemplateName = coursePart.CourseDay.CourseTemplate == null ? null : coursePart.CourseDay.CourseTemplate.Name,
                Files = coursePart.Files
                                  .Select(f => new PartialDocumentVM
                                  {
                                      ID = f.ID,
                                      Name = f.Name,
                                      DocumentClass = f.Class.ToString(),
                                      Uploaded = f.UploadingDate.ToString(),
                                      UploadedBy = f.Uploader.ToString()
                                  })
                                  .ToList(),
                Pluralsight = coursePart.Pluralsight
                                        .Select(p => new PartialLinkVM
                                        {
                                            ID = p.ID,
                                            Name = p.Name,
                                            HttpLink = p.HttpLink
                                        })
                                        .ToList()
            });
        }

        // PUT: api/CoursePart/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCoursePart(int id, PartialCoursePartVM partialLink)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != partialLink.ID)
            {
                return BadRequest();
            }

            CoursePart coursePart = await repository.CoursePart(id);

            coursePart.CodeAlong_Lecture = partialLink.CodeAlong_Lecture;

            if (await repository.Edit(id, coursePart))
                return StatusCode(HttpStatusCode.NoContent);
            else
                return NotFound();
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