using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Lexicon.Models.Lexicon
{
    public class News
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime PublishingDate { get; set; }
        public DateTime? LastEditedDate { get; set; }

        [ForeignKey("Course")]
        public int CourseID { get; set; }
        public virtual Course Course { get; set; }

        [ForeignKey("Publisher")]
        public string PublisherID { get; set; }
        public virtual User Publisher { get; set; }

        [ForeignKey("Editor")]
        public string EditorID { get; set; }
        public virtual User Editor { get; set; }
    }
}