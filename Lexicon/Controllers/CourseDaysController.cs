﻿using Lexicon.Models.Lexicon;
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
                CourseTemplateName = courseDay.CourseTemplate.Name,
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

        [HttpPost]
        [Authorize(Roles = "Admin,Teacher")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> MoveUp(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CourseDay courseDayToMoveUp = await repository.CourseDay(id);

            if (courseDayToMoveUp == null)
                return NotFound();

            CourseDay courseDayToMoveDown = await repository.CourseTemplateDay(courseDayToMoveUp.CourseTemplateID,
                                                                               courseDayToMoveUp.DayNumber - 1);

            courseDayToMoveUp.DayNumber -= 1;
            await repository.Edit(courseDayToMoveUp.ID, courseDayToMoveUp);

            courseDayToMoveDown.DayNumber += 1;
            await repository.Edit(courseDayToMoveDown.ID, courseDayToMoveDown);

            return StatusCode(HttpStatusCode.NoContent);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Teacher")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> MoveDown(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CourseDay courseDayToMoveDown = await repository.CourseDay(id);

            if (courseDayToMoveDown == null)
                return NotFound();

            CourseDay courseDayToMoveUp = await repository.CourseTemplateDay(courseDayToMoveDown.CourseTemplateID,
                                                                             courseDayToMoveDown.DayNumber + 1);

            courseDayToMoveDown.DayNumber += 1;
            await repository.Edit(courseDayToMoveDown.ID, courseDayToMoveDown);

            courseDayToMoveUp.DayNumber -= 1;
            await repository.Edit(courseDayToMoveUp.ID, courseDayToMoveUp);

            return StatusCode(HttpStatusCode.NoContent);
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