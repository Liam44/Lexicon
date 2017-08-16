using Lexicon.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Lexicon.Controllers
{
    public class LoginController : Controller
    {
        // GET: Auth
        public ActionResult Index()
        {
            return View();
        }

        [Authenticated]
        [Authorize(Roles = "Admin")]
        public ActionResult Register()
        {
            return View();
        }
    }
}