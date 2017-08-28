using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        [Key]
        public int ID { get; set; }
        public int MyProperty { get; set; }
        public AttendanceStatus Status { get; set; }

        [ForeignKey("CourseDay")]
        public int CourseDayID { get; set; }
        public virtual CourseDay CourseDay { get; set; }

        [ForeignKey("Student")]
        public string StudentID { get; set; }
        public virtual User Student { get; set; }
    }
}