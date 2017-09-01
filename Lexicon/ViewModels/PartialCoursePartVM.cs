using Lexicon.Models.Lexicon;
using System.Collections.Generic;

namespace Lexicon.ViewModels
{
    public class PartialCoursePartVM
    {
        public int ID { get; set; }
        public string PartDay { get; set; }
        public string CodeAlong_Lecture { get; set; }

        public int CourseDayID { get; set; }
        public string CourseDayName { get; set; }

        public string CourseName { get; set; }

        public string CourseTemplateName { get; set; }

        public List<PartialDocumentVM> Files { get; set; }
        public List<PartialLinkVM> Pluralsight { get; set; }
    }
}