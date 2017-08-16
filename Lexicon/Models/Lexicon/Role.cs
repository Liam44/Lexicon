using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Lexicon.Models.Lexicon
{
    public enum ERoles
    {
        Student,
        Teacher,
        Admin
    }

    public static class RoleConstants
    {
        public static string Student
        {
            get { return ERoles.Student.ToString(); }
            private set { }
        }

        public static string Teacher
        {
            get { return ERoles.Teacher.ToString(); }
            private set { }
        }

        public static string Admin
        {
            get { return ERoles.Admin.ToString(); }
            private set { }
        }

        public static string Password(ERoles role)
        {
            switch (role)
            {
                case ERoles.Student:
                    return "Studentpassword1!";
                case ERoles.Teacher:
                    return "Teacherpassword1!";
                case ERoles.Admin:
                    return "Adminpassword1!";
                default:
                    return string.Empty;
            }
        }
    }
}