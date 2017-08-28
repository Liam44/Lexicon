using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Lexicon.Models.Lexicon
{
    public class Post
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }

        [ForeignKey("Creator")]
        public string CreatorID { get; set; }
        public virtual User Creator { get; set; }
    }
}