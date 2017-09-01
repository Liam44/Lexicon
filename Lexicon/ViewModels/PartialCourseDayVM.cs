using System.Collections.Generic;

namespace Lexicon.ViewModels
{
    public class PartialCourseDayVM
    {
        public int ID { get; set; }
        public int DayNumber { get; set; }

        public int? CourseTemplateID { get; set; }
        public string CourseTemplateName { get; set; }

        public int? CourseID { get; set; }
        public string CourseName { get; set; }

        public int MorningID { get; set; }
        public int AfternoonID { get; set; }

        public IEnumerable<PartialDocumentVM> Documents { get; set; }
    }
}