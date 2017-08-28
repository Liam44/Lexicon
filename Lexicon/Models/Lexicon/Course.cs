using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Lexicon.Models.Lexicon
{
    public class Course
    {
        [Key]
        public int ID { get; set; }
        public int AmountDays { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        [ForeignKey("Template")]
        public int? TemplateID { get; set; }
        public virtual CourseTemplate Template { get; set; }

        public virtual ICollection<CourseDay> CourseDays { get; set; }

        public virtual ICollection<User> Teachers { get; set; }
        public virtual ICollection<User> Students { get; set; }

        public virtual ICollection<Document> Files { get; set; }

        public virtual ICollection<News> News { get; set; }
    }
}