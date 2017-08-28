using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Lexicon.Models.Lexicon
{
    public enum ERole
    {
        Undefined,
        Student,
        Teacher,
        Admin
    }

    public static class RoleConstants
    {
        public static string Student
        {
            get { return ERole.Student.ToString(); }
            private set { }
        }

        public static string Teacher
        {
            get { return ERole.Teacher.ToString(); }
            private set { }
        }

        public static string Admin
        {
            get { return ERole.Admin.ToString(); }
            private set { }
        }

        public static string Password(ERole role)
        {
            switch (role)
            {
                case ERole.Student:
                    return "Student-password1";
                case ERole.Teacher:
                    return "Teacher-password1";
                case ERole.Admin:
                    return "Admin-password1";
                default:
                    return string.Empty;
            }
        }
    }
}