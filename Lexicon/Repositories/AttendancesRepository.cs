using Lexicon.Models;
using Lexicon.Models.Lexicon;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Lexicon.Repositories
{
    public class AttendancesRepository
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        public IEnumerable<Attendance> Attendances(int courseDayId) {
            return db.Attendances.Where(a => a.CourseDayID == courseDayId);
        }

        public Attendance Attendance(int id)
        {
            return db.Attendances.FirstOrDefault(a => a.ID == id);
        }

        public void AddAttendance(Attendance attendance)
        {
            db.Attendances.Add(attendance);
            SaveChanges();
        }

        private void SaveChanges()
        {
            db.SaveChanges();
        }
    }
}