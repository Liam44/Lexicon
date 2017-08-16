using Lexicon.Models;
using System.Linq;
using System.Web.Mvc;

namespace Lexicon.Helpers
{
    public class Authenticated : FilterAttribute, IAuthorizationFilter
    {
        public string Roles { get; set; }

        public void OnAuthorization(AuthorizationContext filterContext)
        {
            var filterAttribute = filterContext.ActionDescriptor
                                               .GetFilterAttributes(true)
                                               .Where(a => a.GetType() == typeof(Authenticated));

            if (filterAttribute != null)
            {
                foreach (Authenticated attr in filterAttribute)
                {
                    Roles = attr.Roles;
                }
            }

            if (filterAttribute == null)
            {
                // The user must be authenticated
                filterContext.Result = new RedirectResult("/Login");
            }
            else if (Roles.Length > 0 && !Roles.Contains(((User)filterContext.HttpContext.Session["CurrentUser"]).Role.ToString()))
            {
                // If any role is specified, checks that the current user's role matches any of these
                filterContext.Result = new RedirectResult("/Login");
            }
        }
    }
}