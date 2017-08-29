using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lexicon.Models.Lexicon
{
    public enum CoursePartDay
    {
        Morning,
        Afternoon
    }

    public class CoursePart
    {
        [Key]
        public int ID { get; set; }

        public CoursePartDay PartDay { get; set; }

        public string CodeAlong_Lecture { get; set; }

        [ForeignKey("CourseDay")]
        public int CourseDayID { get; set; }
        public virtual CourseDay CourseDay { get; set; }

        public virtual ICollection<Document> Files { get; set; }
        public virtual ICollection<Link> Pluralsight { get; set; }
        public virtual ICollection<TeachersAssignment> Assignments { get; set; }
    }
}