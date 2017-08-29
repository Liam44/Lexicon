using Lexicon.Models.Lexicon;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Lexicon.ViewModels
{
    public class PartialUserVM
    {
        public string Id { get; set; }
        [RegularExpression(@"^[a-zA-Z1-9]+[a-zA-Z-_1-9]*$", ErrorMessage = "{0}: Use alphanumeric characters, underscores and hyphens only.")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 2)]
        public string Username { get; set; }

        [Display(Name="First Name")]
        [RegularExpression(@"^[a-zA-Z]+[ a-zA-Z-]*$", ErrorMessage = "{0}: Use alphabetic characters, spaces and hyphens only.")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 2)]
        public string FirstName { get; set; }
        
        [Display(Name = "Last Name")]
        [RegularExpression(@"^[a-zA-Z]+[ a-zA-Z-]*$", ErrorMessage = "{0}: Use alphabetic characters, spaces and hyphens only.")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 2)]
        public string LastName { get; set; }
        
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        
        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }
        
        public string AFId { get; set; }
        public ERole Role { get; set; }
        public string RoleName { get; set; }
        public string UnreadMessages { get; set; }
        public bool IsDeletable { get; set; }
    }
}