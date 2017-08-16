using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Lexicon.Models.Lexicon
{
    public class Message
    {
        public int ID { get; set; }
        public DateTime Date { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public DateTime? ReadingDate { get; set; }

        [ForeignKey("From")]
        public string FromID { get; set; }
        public virtual User From { get; set; }

        [ForeignKey("To")]
        public string ToID { get; set; }
        public virtual User To { get; set; }
    }
}