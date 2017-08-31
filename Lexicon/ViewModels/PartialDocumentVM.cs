using System.Web;
namespace Lexicon.ViewModels
{
    public class PartialDocumentVM
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Class { get; set; }
        public string ContentType { get; set; }
        public byte[] Content { get; set; }

        public int? CourseID { get; set; }
        public int? CourseDayID { get; set; }
        public int? CoursePartID { get; set; }
        public int? AssignmentID { get; set; }
    }

    public class PartialDocumentVM2
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Rollno { get; set; }
        public byte[] ProfileImage { get; set; }
        public HttpPostedFile image { get; set; }
    }
}