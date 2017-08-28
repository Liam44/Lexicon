using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Lexicon.Models.Lexicon
{
    public class Feedback
    {
        public enum FeedbackStatus
        {
            Finished,
            Completion,
            Examination,
            NotSubmitted
        }

        [Key, ForeignKey("StudentsAssignment")]
        public int ID { get; set; }
        public string Comment { get; set; }
        public FeedbackStatus Status { get; set; }

        public virtual StudentsAssignment StudentsAssignment { get; set; }
    }
}