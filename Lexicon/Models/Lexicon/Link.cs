using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Lexicon.Models.Lexicon
{
    public class Link
    {
        [Key]
        public int ID { get; set; }
        public string HttpLink { get; set; }

        [ForeignKey("CoursePart")]
        public int? CoursePartID { get; set; }
        public virtual CoursePart CoursePart { get; set; }

        [ForeignKey("AssignmentCompletion")]
        public int? AssignmentCompletionID { get; set; }
        public virtual StudentsAssignment AssignmentCompletion { get; set; }
    }
}