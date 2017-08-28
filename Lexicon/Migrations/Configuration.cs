namespace Lexicon.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Lexicon.Models.Lexicon;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Lexicon.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ApplicationDbContext context)
        {
            #region Roles
            if (!context.Roles.Any(r => r.Name == RoleConstants.Admin))
            {
                var store = new RoleStore<IdentityRole>(context);
                var roleManager = new RoleManager<IdentityRole>(store);

                roleManager.Create(new IdentityRole(RoleConstants.Admin));
            }

            if (!context.Roles.Any(r => r.Name == RoleConstants.Teacher))
            {
                var store = new RoleStore<IdentityRole>(context);
                var roleManager = new RoleManager<IdentityRole>(store);

                roleManager.Create(new IdentityRole(RoleConstants.Teacher));
            }

            if (!context.Roles.Any(r => r.Name == RoleConstants.Student))
            {
                var store = new RoleStore<IdentityRole>(context);
                var roleManager = new RoleManager<IdentityRole>(store);

                roleManager.Create(new IdentityRole(RoleConstants.Student));
            }
            #endregion

            #region Users
            if (!context.Users.Any(u => u.UserName == "Admin"))
            {
                var store = new UserStore<User>(context);
                var userManager = new UserManager<User>(store);
                var newuser = new User
                {
                    UserName = "Admin",
                    Email = "admin@mail.nu",
                    AFId = DateTime.Now.ToString("yyyy/MM/dd"),
                    FirstName = "Admin",
                    LastName = "Histrator",
                    Role = ERole.Admin
                };

                userManager.Create(newuser, RoleConstants.Password(newuser.Role));
                userManager.AddToRole(newuser.Id, RoleConstants.Admin);
            }
            #endregion
        }
    }
}
