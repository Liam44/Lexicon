namespace Lexicon.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial1 : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.AssignmentCompletions", newName: "StudentsAssignments");
            RenameTable(name: "dbo.Assignments", newName: "TeachersAssignments");
            DropForeignKey("dbo.AspNetUsers", "RoleID", "dbo.AspNetRoles");
            DropIndex("dbo.AspNetUsers", new[] { "RoleID" });
            AddColumn("dbo.AspNetUsers", "Role", c => c.Int(nullable: false));
            DropColumn("dbo.AspNetUsers", "RoleID");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetUsers", "RoleID", c => c.String(maxLength: 128));
            DropColumn("dbo.AspNetUsers", "Role");
            CreateIndex("dbo.AspNetUsers", "RoleID");
            AddForeignKey("dbo.AspNetUsers", "RoleID", "dbo.AspNetRoles", "Id");
            RenameTable(name: "dbo.TeachersAssignments", newName: "Assignments");
            RenameTable(name: "dbo.StudentsAssignments", newName: "AssignmentCompletions");
        }
    }
}
