using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Lexicon.Models.Lexicon
{
    public class CourseTemplate
    {
        [Key]
        public int ID { get; set; }
        public int AmountDays { get; set; }
        public string Name { get; set; }

        public virtual ICollection<CourseDay> CourseDays { get; set; }
        public virtual ICollection<Course> Courses { get; set; }
    }
}