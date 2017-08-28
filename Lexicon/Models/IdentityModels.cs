using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Lexicon.Models.Lexicon;
using System.Data.Entity;

namespace Lexicon.Models
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }
        
        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseDay> CourseDays { get; set; }
        public DbSet<CoursePart> CourseParts { get; set; }
        public DbSet<CourseTemplate> CourseTemplates { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<Link> Links { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<StudentsAssignment> StudentsAssignements { get; set; }
        public DbSet<TeachersAssignment> TeachersAssignements { get; set; }
    }
}