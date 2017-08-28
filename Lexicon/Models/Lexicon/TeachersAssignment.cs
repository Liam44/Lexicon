using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Lexicon.Models.Lexicon
{
    public class TeachersAssignment
    {
        [Key]
        public int ID { get; set; }
        public string Theme { get; set; }
        public DateTime Deadline { get; set; }

        [ForeignKey("CoursePart")]
        public int CoursePartID { get; set; }
        public virtual CoursePart CoursePart { get; set; }

        public virtual ICollection<Document> Documents { get; set; }

        public virtual ICollection<StudentsAssignment> Completion { get; set; }
    }
}