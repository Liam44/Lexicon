using Lexicon.Models.Lexicon;
using Lexicon.Repositories;
using Lexicon.ViewModels;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace SinglePageWebApplication.Controllers
{
    [Authorize]
    public class CourseDaysController : ApiController
    {
        private CourseDaysRepository repository = new CourseDaysRepository();

        // GET: api/CourseDays/5
        [ResponseType(typeof(IEnumerable<PartialCourseDayVM>))]
        public IHttpActionResult GetCourseDays(int id)
        {
            return Ok(PartialDays(repository.CourseTemplateDays(id)));
        }

        // GET: api/CourseDay/5
        [ResponseType(typeof(PartialCourseDayVM))]
        public async Task<IHttpActionResult> GetCourseDay(int id)
        {
            CourseDay courseDay = await repository.CourseDay(id);
            if (courseDay == null)
            {
                return NotFound();
            }

            return Ok(PartialDay(courseDay));
        }

        private List<PartialCourseDayVM> PartialDays(IQueryable<CourseDay> courseDays)
        {
            List<PartialCourseDayVM> partialDays = new List<PartialCourseDayVM>();

            foreach (CourseDay courseDay in courseDays.ToList())
            {
                partialDays.Add(PartialDay(courseDay));
            }

            return partialDays;
        }

        private PartialCourseDayVM PartialDay(CourseDay courseDay)
        {
            CoursePart morning = courseDay.CourseParts.First();
            CoursePart afternoon = courseDay.CourseParts.Last();

            return new PartialCourseDayVM
            {
                ID = courseDay.ID,
                DayNumber = courseDay.DayNumber,
                Morning = new PartialCoursePartVM
                {
                    ID = morning.ID,
                    PartDay = morning.PartDay.ToString(),
                    CodeAlong_Lecture = morning.CodeAlong_Lecture,
                    Files = morning.Files.ToList(),
                    Pluralsight = morning.Pluralsight.ToList(),
                    Assignments = morning.Assignments.ToList()
                },
                Afternoon = new PartialCoursePartVM
                {
                    ID = afternoon.ID,
                    PartDay = afternoon.PartDay.ToString(),
                    CodeAlong_Lecture = afternoon.CodeAlong_Lecture,
                    Files = afternoon.Files.ToList(),
                    Pluralsight = afternoon.Pluralsight.ToList(),
                    Assignments = afternoon.Assignments.ToList()
                }
            };
        }

        // POST: api/CourseDays
        [Authorize(Roles = "Admin,Teacher")]
        [ResponseType(typeof(CourseDay))]
        public async Task<IHttpActionResult> PostCourseDay(CourseDay courseDay)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await repository.Add(courseDay);

            return CreatedAtRoute("DefaultApi", new { id = courseDay.ID }, courseDay);
        }

        // DELETE: api/CourseDay/5
        [ResponseType(typeof(CourseDay))]
        public async Task<IHttpActionResult> DeleteCourseDay(int id)
        {
            CourseDay courseDay = await repository.CourseDay(id);
            if (courseDay == null)
            {
                return NotFound();
            }

            await repository.Delete(courseDay);

            return Ok(courseDay);
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