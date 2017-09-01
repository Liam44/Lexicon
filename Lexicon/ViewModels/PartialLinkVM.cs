namespace Lexicon.ViewModels
{
    public class PartialLinkVM
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string HttpLink { get; set; }

        public int? CoursePartID { get; set; }
        public string CoursePartName { get; set; }

        public string CourseDayName { get; set; }

        public string CourseName { get; set; }

        public string CourseTemplateName { get; set; }

        public int? AssignmentID { get; set; }
        public string AssignmentTheme { get; set; }
    }
}