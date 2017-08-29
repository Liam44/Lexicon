using Lexicon.Models.Lexicon;
using System.Collections.Generic;

namespace Lexicon.ViewModels
{
    public class PartialCoursePartVM
    {
        public int ID { get; set; }
        public string PartDay { get; set; }
        public string CodeAlong_Lecture { get; set; }

        public List<Document> Files { get; set; }
        public List<Link> Pluralsight { get; set; }
        public List<TeachersAssignment> Assignments { get; set; }
    }
}