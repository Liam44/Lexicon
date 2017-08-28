using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Lexicon.Models.Lexicon
{
    public class Document
    {
        public enum DocumentClass
        {
            Undefined,
            Documentation,
            Others
        }

        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public DocumentClass Class { get; set; }
        public string ContentType { get; set; }
        public byte[] Content { get; set; }
        public DateTime UploadingDate { get; set; }

        [ForeignKey("Assignment")]
        public int? AssignmentID { get; set; }
        public virtual TeachersAssignment Assignment { get; set; }

        [ForeignKey("AssignmentCompletion")]
        public int? AssignmentCompletionID { get; set; }
        public virtual StudentsAssignment AssignmentCompletion { get; set; }

        [ForeignKey("Course")]
        public int? CourseID { get; set; }
        public virtual Course Course { get; set; }

        [ForeignKey("CourseDay")]
        public int? CourseDayID { get; set; }
        public virtual CourseDay CourseDay { get; set; }

        [ForeignKey("CoursePart")]
        public int? CoursePartID { get; set; }
        public virtual CoursePart CoursePart { get; set; }

        [ForeignKey("Uploader")]
        public string UploaderID { get; set; }
        public virtual User Uploader { get; set; }
    }
}