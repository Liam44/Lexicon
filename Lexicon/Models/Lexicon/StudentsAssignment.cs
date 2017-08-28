using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Lexicon.Models.Lexicon
{
    public class StudentsAssignment
    {
        [Key]
        public int ID { get; set; }
        public string Comment { get; set; }

        [ForeignKey("Student")]
        public string StudentID { get; set; }
        public User Student { get; set; }

        [ForeignKey("Assignment")]
        public int AssignmentID { get; set; }
        public TeachersAssignment Assignment { get; set; }

        [ForeignKey("Feedback")]
        public int? FeedbackID { get; set; }
        public Feedback Feedback { get; set; }

        public virtual ICollection<Link> GitHub { get; set; }
        public virtual ICollection<Document> Documents { get; set; }
    }
}