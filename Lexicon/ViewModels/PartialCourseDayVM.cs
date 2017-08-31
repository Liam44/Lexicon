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

        public PartialCoursePartVM Morning { get; set; }
        public PartialCoursePartVM Afternoon { get; set; }
    }
}