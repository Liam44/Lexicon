using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Lexicon.Models.Lexicon
{
    public enum CoursePartDay
    {
        Morning,
        Afternoon
    }

    public class CourseDay
    {
        public int ID { get; set; }
        public int DayNumber { get; set; }

        [ForeignKey("CourseTemplate")]
        public int? CourseTemplateID { get; set; }
        public virtual CourseTemplate CourseTemplate { get; set; }

        [ForeignKey("Course")]
        public int? CourseID { get; set; }
        public virtual Course Course { get; set; }

        public virtual ICollection<CoursePart> CourseParts { get; set; }

        public virtual ICollection<Attendance> Attendances { get; set; }
        public virtual ICollection<Document> Files { get; set; }
    }
}