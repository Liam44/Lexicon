using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Lexicon.ViewModels
{
    public class PartialMessageVM
    {
        public int ID { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public string From { get; set; }
        public string FromID { get; set; }
        public string To { get; set; }
        public string ToID { get; set; }
        public string SendingDate { get; set; }
        public string ReadingDate { get; set; }

        /// <summary>
        /// Used in the "reply" view, to be able to display the initial message
        /// </summary>
        public int? AnswerToID { get; set; }

        /// <summary>
        /// Used in the "historic" view, to be able to shift the different div,
        /// according to the amount of parallel branches in the answers
        /// </summary>
        public int Level { get; set; }
    }
}