namespace Lexicon.ViewModels
{
    public class PartialCourseDayVM
    {
        public int ID { get; set; }
        public int DayNumber { get; set; }

        public PartialCoursePartVM Morning { get; set; }
        public PartialCoursePartVM Afternoon { get; set; }
    }
}