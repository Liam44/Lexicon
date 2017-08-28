using Lexicon.Models.Lexicon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Lexicon.ViewModels
{
    public class PartialUserVM
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string AFId { get; set; }
        public ERole Role { get; set; }
        public string RoleName { get; set; }
        public string UnreadMessages { get; set; }
        public bool IsDeletable { get; set; }
    }
}