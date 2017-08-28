using Lexicon.Models.Lexicon;
using Lexicon.Repositories;
using Lexicon.ViewModels;
using Microsoft.AspNet.Identity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace Lexicon.Controllers
{
    [Authorize]
    public class UsersController : ApiController
    {
        private UsersRepository repository = new UsersRepository();

        public async Task<IHttpActionResult> GetCurrentUser()
        {
            if (User.Identity.IsAuthenticated)
            {
                User user = await repository.GetUserById(User.Identity.GetUserId());

                string strUnreadMessages = string.Empty;
                int intUnreadMessages = user.MessagesTo.Where(m => m.ReadingDate == null).Count();

                if (intUnreadMessages > 0)
                    strUnreadMessages = " (" + intUnreadMessages + ")";

                return Ok(new PartialUserVM
                {
                    Id = user.Id,
                    Username = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Role = user.Role,
                    RoleName = user.Role.ToString(),
                    UnreadMessages = strUnreadMessages
                });
            }
            else
            {
                return Ok();
            }
        }

        // GET: api/Users
        [Authorize(Roles = "Admin")]
        public IQueryable<PartialUserVM> GetUsers()
        {
            string currentUserId = User.Identity.GetUserId();

            return repository.GetUsers()
                             .Select(u => new PartialUserVM
                             {
                                 Id = u.Id,
                                 Username = u.UserName,
                                 FirstName = u.FirstName,
                                 LastName = u.LastName,
                                 Email = u.Email,
                                 PhoneNumber = u.PhoneNumber,
                                 AFId = u.AFId,
                                 Role = u.Role,
                                 RoleName = u.Role.ToString(),
                                 IsDeletable = u.Id != currentUserId    // A user can't delete their own account!
                                 // Also used to check if the user's role can be changed
                             });
        }

        // GET: api/Users
        [Authorize(Roles = "Teacher")]
        public IQueryable<PartialUserVM> GetStudents()
        {
            string currentUserId = User.Identity.GetUserId();

            return repository.GetUsers()
                             .Where(u => u.Role == ERole.Student)
                             .Select(u => new PartialUserVM
                             {
                                 Id = u.Id,
                                 Username = u.UserName,
                                 FirstName = u.FirstName,
                                 LastName = u.LastName,
                                 Email = u.Email,
                                 PhoneNumber = u.PhoneNumber,
                                 AFId = u.AFId,
                                 Role = u.Role,
                                 RoleName = u.Role.ToString(),
                                 IsDeletable = u.Id != currentUserId    // A user can't delete their own account!
                                 // Also used to check if the user's role can be changed
                             });
        }

        // GET: api/Users
        public IQueryable<PartialUserVM> GetRecipients()
        {
            string currentUserId = User.Identity.GetUserId();

            return repository.GetUsers()
                             .Where(u => u.Id != currentUserId)
                             .Select(u => new PartialUserVM
                             {
                                 Id = u.Id,
                                 FirstName = u.FirstName,
                                 LastName = u.LastName,
                             })
                             .OrderBy(r => r.LastName)
                             .ThenBy(r => r.FirstName);
        }

        // GET: api/Users/5
        [Authorize(Roles = "Admin,Teacher")]
        [ResponseType(typeof(PartialUserVM))]
        public async Task<IHttpActionResult> GetUser(string id)
        {
            User user = await repository.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(new PartialUserVM
            {
                Id = user.Id,
                Username = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                AFId = user.AFId,
                Role = user.Role,
                RoleName = user.Role.ToString()
            });
        }

        // DELETE: api/Users/5
        [Authorize(Roles = "Admin,Teacher")]
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> DeleteUser(string id)
        {
            User user = await repository.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }

            await repository.Delete(user);

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                repository.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}