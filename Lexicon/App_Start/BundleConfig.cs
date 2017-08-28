using System.Web;
using System.Web.Optimization;

namespace Lexicon
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                        "~/Scripts/angular.min.js",
                        "~/Scripts/angular-route.min.js",
                        "~/Scripts/angular-ngmodules.js",
                        "~/Scripts/Lexicon/modules/modules.js"));

            bundles.Add(new ScriptBundle("~/bundles/redirect").Include(
                        "~/Scripts/Lexicon/factories/redirect.js"));

            bundles.Add(new ScriptBundle("~/bundles/token").Include(
                        "~/Scripts/Lexicon/factories/Token.js"));

            bundles.Add(new ScriptBundle("~/bundles/logout").Include(
                        "~/Scripts/Lexicon/factories/Token.js",
                        "~/Scripts/Lexicon/factories/redirect.js",
                        "~/Scripts/Lexicon/controllers/logout.js"));

            bundles.Add(new ScriptBundle("~/bundles/login").Include(
                        "~/Scripts/Lexicon/factories/redirect.js",
                        "~/Scripts/Lexicon/factories/Token.js",
                        "~/Scripts/Lexicon/factories/currentuser.js",
                        "~/Scripts/Lexicon/controllers/login.js"));

            bundles.Add(new ScriptBundle("~/bundles/logout").Include(
                        "~/Scripts/Lexicon/factories/redirect.js",
                        "~/Scripts/Lexicon/factories/Token.js",
                        "~/Scripts/Lexicon/factories/logout.js",
                        "~/Scripts/Lexicon/controllers/logout.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
        }
    }
}
