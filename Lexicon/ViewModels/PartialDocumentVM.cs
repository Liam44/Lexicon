using System;

namespace Lexicon.ViewModels
{
    public class PartialDocumentVM
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string DocumentClass { get; set; }
        public string Uploaded { get; set; }
        public string UploadedBy { get; set; }

        public int? CourseID { get; set; }
        public int? CourseDayID { get; set; }
        public int? CoursePartID { get; set; }
        public int? AssignmentID { get; set; }
    }
}