using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Lexicon.Models.Lexicon
{
    public class Internship
    {
        public enum IntershipStatus
        {
            Undefined,              // Default value for all users
            WaitingForInterview,    // The CV has been sent to different companies, waiting for any interview
            WaitingForAnswer,       // Has got an interview but waiting for the answer
            WaitingToStart,         // Is clear to go, but starting date has been delayed
            Accepted                // The student has been accepted in the company
        }

        [Key, ForeignKey("Student")]
        public string ID { get; set; }

        public IntershipStatus InternshipStatus { get; set; }
        public DateTime StartingDate { get; set; }
        public string CompanyName { get; set; } // Can easily be changed into a "CompanyID", if any "Company" table is added to the database
        public string Contact { get; set; }     // Contact/Manager in the internship company
                                                // Can easily be changed into a "ContactID", if any "Contact" table is added to the database

        public virtual User Student { get; set; }
    }
}