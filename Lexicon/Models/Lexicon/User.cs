using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace Lexicon.Models.Lexicon
{
    public class User : IdentityUser
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<User> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }

        public bool IsConnected { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        /// <summary>
        /// This ID is given by Arbetsförmedlingen
        /// </summary>
        /// <remarks>Avoids to handle the personal number</remarks>
        public string AFId { get; set; }

        public ERole Role { get; set; }

        public virtual ICollection<Course> Courses { get; set; }

        public virtual ICollection<Document> Documents { get; set; }

        public virtual ICollection<StudentsAssignment> StudentsAssignements { get; set; }

        public virtual ICollection<Attendance> Attendances { get; set; }

        public virtual ICollection<Message> MessagesFrom { get; set; }
        public virtual ICollection<Message> MessagesTo { get; set; }

        public virtual ICollection<News> PublishedNews { get; set; }
        public virtual ICollection<News> EditedNews { get; set; }

        [ForeignKey("Internship")]
        public string InternshipID { get; set; }
        public virtual Internship Internship { get; set; }

        public override string ToString()
        {
            return FirstName + " " + LastName;
        }
    }
}