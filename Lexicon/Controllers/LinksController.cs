using Lexicon.Models.Lexicon;
using Lexicon.Repositories;
using Lexicon.ViewModels;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace Lexicon.Controllers
{
    [Authorize]
    public class LinksController : ApiController
    {
        private LinksRepository repository = new LinksRepository();

        // GET: api/Link/5
        [ResponseType(typeof(PartialLinkVM))]
        public async Task<IHttpActionResult> GetLink(int id)
        {
            Link link = await repository.Link(id);
            if (link == null)
            {
                return NotFound();
            }

            PartialLinkVM result = new PartialLinkVM
            {
                ID = link.ID,
                Name = link.Name,
                HttpLink = link.HttpLink
            };

            if (link.CoursePart != null)
            {
                result.CoursePartID = link.CoursePartID;
                result.CoursePartName = link.CoursePart.PartDay.ToString();
                result.CourseDayName = link.CoursePart.CourseDay.DayNumber.ToString();
                result.CourseName = link.CoursePart.CourseDay.Course == null ? null : link.CoursePart.CourseDay.Course.Name;
                result.CourseTemplateName = link.CoursePart.CourseDay.CourseTemplate == null ? null : link.CoursePart.CourseDay.CourseTemplate.Name;
            }

            if (link.AssignmentCompletion != null)
            {
                result.AssignmentID = link.AssignmentCompletionID;
                result.AssignmentTheme = link.AssignmentCompletion.Assignment.Theme;
            }

            return Ok(result);
        }

        // PUT: api/Link/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutLink(int id, PartialLinkVM partialLink)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != partialLink.ID)
            {
                return BadRequest();
            }

            Link link = await repository.Link(id);

            link.Name = partialLink.Name;
            link.HttpLink = partialLink.HttpLink;

            if (await repository.Edit(id, link))
                return StatusCode(HttpStatusCode.NoContent);
            else
                return NotFound();
        }

        // POST: api/Link
        [ResponseType(typeof(Link))]
        public async Task<IHttpActionResult> PostLink(PartialLinkVM partialLink)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Link link = new Link
            {
                HttpLink = partialLink.HttpLink,
                Name = string.IsNullOrEmpty(partialLink.Name.Trim()) ? partialLink.HttpLink : partialLink.Name,
                AssignmentCompletionID = partialLink.AssignmentID,
                CoursePartID = partialLink.CoursePartID
            };

            await repository.Add(link);

            return CreatedAtRoute("DefaultApi", new { id = link.ID }, link);
        }

        // DELETE: api/Link/5
        [ResponseType(typeof(Link))]
        public async Task<IHttpActionResult> DeleteLink(int id)
        {
            Link link = await repository.Link(id);
            if (link == null)
            {
                return NotFound();
            }

            await repository.Delete(link);

            return Ok(link);
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