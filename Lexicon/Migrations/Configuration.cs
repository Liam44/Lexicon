namespace Lexicon.Migrations
{
    using Lexicon.Models;
    using Lexicon.Models.Lexicon;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Lexicon.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Lexicon.Models.ApplicationDbContext context)
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
                    FirstName = "Admin",
                    LastName = "Histrator",
                    AFId = DateTime.Now.ToString("yyyy/MM/dd"),
                    Role = ERoles.Admin
                };

                userManager.Create(newuser, RoleConstants.Password(ERoles.Admin));
                userManager.AddToRole(newuser.Id, RoleConstants.Admin);
            }

            Random rd = new Random();

            List<string> phoneNumbers = new List<string>();

            if (!context.Users.Any(u => u.UserName == "Liam"))
            {
                string phoneNumber = GeneratePhoneNumber(rd);

                var store = new UserStore<User>(context);
                var userManager = new UserManager<User>(store);
                var newuser = new User
                {
                    UserName = "Liam",
                    Email = "liam@mail.nu",
                    FirstName = "Liam",
                    LastName = "B",
                    AFId = DateTime.Now.ToString("yyyy/MM/dd"),
                    PhoneNumber = phoneNumber,
                    PhoneNumberConfirmed = true,
                    Role = ERoles.Teacher
                };

                phoneNumbers.Add(phoneNumber);

                userManager.Create(newuser, RoleConstants.Password(ERoles.Teacher));
                userManager.AddToRole(newuser.Id, RoleConstants.Teacher);
            }

            if (!context.Users.Any(u => u.UserName == "Student1"))
            {
                var store = new UserStore<User>(context);
                var userManager = new UserManager<User>(store);

                for (int noStudent = 1; noStudent <= 20; noStudent += 1)
                {
                    int year = rd.Next(1990, 2010);
                    int month = rd.Next(1, 13);
                    DateTime birthDate = new DateTime(year, month, rd.Next(1, DateTime.DaysInMonth(year, month) + 1));

                    string phoneNumber = string.Empty;

                    do
                    {
                        phoneNumber = GeneratePhoneNumber(rd);
                    }
                    while (phoneNumbers.Contains(phoneNumber));

                    var newuser = new User
                    {
                        UserName = "Student" + noStudent.ToString(),
                        Email = "s" + noStudent.ToString() + "@mail.nu",
                        FirstName = "Student",
                        LastName = new string((char)((int)'A' + noStudent - 1), 5),
                        AFId = birthDate.ToString("yyyy/MM/dd"),
                        PhoneNumber = phoneNumber,
                        PhoneNumberConfirmed = true,
                        Role = ERoles.Student
                    };

                    phoneNumbers.Add(phoneNumber);

                    userManager.Create(newuser, RoleConstants.Password(ERoles.Student));
                    userManager.AddToRole(newuser.Id, RoleConstants.Student);
                }

                for (int noTeacher = 1; noTeacher <= 10; noTeacher += 1)
                {
                    int year = rd.Next(1960, 2001);
                    int month = rd.Next(1, 13);
                    DateTime birthDate = new DateTime(year, month, rd.Next(1, DateTime.DaysInMonth(year, month) + 1));

                    string phoneNumber = string.Empty;

                    do
                    {
                        phoneNumber = GeneratePhoneNumber(rd);
                    }
                    while (phoneNumbers.Contains(phoneNumber));

                    var newuser = new User
                    {
                        UserName = "Teacher" + noTeacher.ToString(),
                        Email = "t" + noTeacher.ToString() + "@mail.nu",
                        FirstName = "Teacher",
                        LastName = new string((char)((int)'A' + noTeacher - 1), 5),
                        AFId = birthDate.ToString("yyyy/MM/dd"),
                        PhoneNumber = phoneNumber,
                        PhoneNumberConfirmed = true,
                        Role = ERoles.Admin
                    };

                    phoneNumbers.Add(phoneNumber);

                    userManager.Create(newuser, RoleConstants.Password(ERoles.Teacher));
                    userManager.AddToRole(newuser.Id, RoleConstants.Teacher);
                }
            }

            User user = context.Users.FirstOrDefault(u => u.Email == "liam@mail.nu");

            context.Users.AddOrUpdate(u => u.Id, user);
            #endregion
        }

        private string GeneratePhoneNumber(Random rd)
        {
            return string.Format("{0}-{1}-{2}",
                                 GenerateSequence(rd, 3),
                                 GenerateSequence(rd, 3),
                                 GenerateSequence(rd, 4));
        }

        private string GenerateSequence(Random rd, int length)
        {
            string result = string.Empty;

            while (length > 0)
            {
                result += rd.Next(0, 10).ToString();
                length -= 1;
            }

            return result;
        }
    }
}
