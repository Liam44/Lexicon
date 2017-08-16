using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Lexicon.Models.Lexicon
{
    public enum AttendanceStatus
    {
        Undefined,
        Present,
        Absent
    }

    public class Attendance
    {
        public int ID { get; set; }
        public int MyProperty { get; set; }
        public AttendanceStatus Status { get; set; }

        [ForeignKey("Course")]
        public int CourseID { get; set; }
        public virtual Course Course { get; set; }

        [ForeignKey("Student")]
        public string StudentID { get; set; }
        public virtual User Student { get; set; }
    }
}