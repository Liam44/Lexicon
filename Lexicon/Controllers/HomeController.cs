using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Lexicon.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Login()
        {
            ViewBag.Title = "Log in";

            return View();
        }

        public ActionResult Logout()
        {
            ViewBag.Title = "Log out";

            return View();
        }
    }
}
