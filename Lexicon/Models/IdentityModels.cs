using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System.ComponentModel.DataAnnotations.Schema;
using Lexicon.Models.Lexicon;
using System.Collections.Generic;
using System.Data.Entity;

namespace Lexicon.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        /// <summary>
        /// This ID is given by Arbetsförmedlingen
        /// </summary>
        /// <remarks>Avoids to handle the personal number</remarks>
        public string AFId { get; set; }

        public ERoles Role { get; set; }

        public virtual ICollection<Course> Courses { get; set; }

        public virtual ICollection<Document> Documents { get; set; }

        public virtual ICollection<StudentsAssignment> StudentsAssignements { get; set; }

        public virtual ICollection<Attendance> Attendances { get; set; }

        public virtual ICollection<Message> MessagesFrom { get; set; }
        public virtual ICollection<Message> MessagesTo { get; set; }

        public virtual ICollection<News> PublishedNews { get; set; }
        public virtual ICollection<News> EditedNews { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<User> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }

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
    
        public DbSet<CourseTemplate> CourseTemplates { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<CoursePart> CourseParts { get; set; }
        public DbSet<CourseDay> CourseDays { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<TeachersAssignment> TeachersAssignments { get; set; }
        public DbSet<StudentsAssignment> StudentsAssignments { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Link> Links { get; set; }
    }
}