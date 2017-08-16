using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Lexicon.Models.Lexicon
{
    public enum Status
    { 
    }

    public class TeachersAssignment
    {
        public int ID { get; set; }
        public string Theme { get; set; }
        public DateTime Deadline { get; set; }
        public Status Status { get; set; }

        [ForeignKey("CoursePart")]
        public int CoursePartID { get; set; }
        public virtual CoursePart CoursePart { get; set; }

        public virtual ICollection<Document> Documents { get; set; }

        public virtual ICollection<StudentsAssignment> Completion { get; set; }
    }
}