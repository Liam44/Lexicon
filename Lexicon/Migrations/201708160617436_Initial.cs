namespace Lexicon.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
            CreateTable(
                "dbo.AspNetUserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.AspNetUsers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        FirstName = c.String(),
                        LastName = c.String(),
                        AFId = c.String(),
                        RoleID = c.String(maxLength: 128),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                        Course_ID = c.Int(),
                        Course_ID1 = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Courses", t => t.Course_ID)
                .ForeignKey("dbo.Courses", t => t.Course_ID1)
                .ForeignKey("dbo.AspNetRoles", t => t.RoleID)
                .Index(t => t.RoleID)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex")
                .Index(t => t.Course_ID)
                .Index(t => t.Course_ID1);
            
            CreateTable(
                "dbo.AssignmentCompletions",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Comment = c.String(),
                        StudentID = c.String(maxLength: 128),
                        AssignmentID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Assignments", t => t.AssignmentID, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.StudentID)
                .Index(t => t.StudentID)
                .Index(t => t.AssignmentID);
            
            CreateTable(
                "dbo.Assignments",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Theme = c.String(),
                        Deadline = c.DateTime(nullable: false),
                        Status = c.Int(nullable: false),
                        CoursePartID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.CourseParts", t => t.CoursePartID, cascadeDelete: true)
                .Index(t => t.CoursePartID);
            
            CreateTable(
                "dbo.CourseParts",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        CodeAlong_Lecture = c.String(),
                        CourseDayID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.CourseDays", t => t.CourseDayID, cascadeDelete: true)
                .Index(t => t.CourseDayID);
            
            CreateTable(
                "dbo.CourseDays",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        DayNumber = c.Int(nullable: false),
                        CourseTemplateID = c.Int(),
                        CourseID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Courses", t => t.CourseID)
                .ForeignKey("dbo.CourseTemplates", t => t.CourseTemplateID)
                .Index(t => t.CourseTemplateID)
                .Index(t => t.CourseID);
            
            CreateTable(
                "dbo.Attendances",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        MyProperty = c.Int(nullable: false),
                        Status = c.Int(nullable: false),
                        CourseID = c.Int(nullable: false),
                        StudentID = c.String(maxLength: 128),
                        CourseDay_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Courses", t => t.CourseID, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.StudentID)
                .ForeignKey("dbo.CourseDays", t => t.CourseDay_ID)
                .Index(t => t.CourseID)
                .Index(t => t.StudentID)
                .Index(t => t.CourseDay_ID);
            
            CreateTable(
                "dbo.Courses",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        AmountDays = c.Int(nullable: false),
                        Name = c.String(),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(nullable: false),
                        TemplateID = c.Int(),
                        User_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.CourseTemplates", t => t.TemplateID)
                .ForeignKey("dbo.AspNetUsers", t => t.User_Id)
                .Index(t => t.TemplateID)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.Documents",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Class = c.Int(nullable: false),
                        ContentType = c.String(),
                        Content = c.Binary(),
                        UploadingDate = c.DateTime(nullable: false),
                        AssignmentID = c.Int(),
                        AssignmentCompletionID = c.Int(),
                        CourseID = c.Int(),
                        CourseDayID = c.Int(),
                        CoursePartID = c.Int(),
                        UploaderID = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Assignments", t => t.AssignmentID)
                .ForeignKey("dbo.AssignmentCompletions", t => t.AssignmentCompletionID)
                .ForeignKey("dbo.Courses", t => t.CourseID)
                .ForeignKey("dbo.CourseDays", t => t.CourseDayID)
                .ForeignKey("dbo.CourseParts", t => t.CoursePartID)
                .ForeignKey("dbo.AspNetUsers", t => t.UploaderID)
                .Index(t => t.AssignmentID)
                .Index(t => t.AssignmentCompletionID)
                .Index(t => t.CourseID)
                .Index(t => t.CourseDayID)
                .Index(t => t.CoursePartID)
                .Index(t => t.UploaderID);
            
            CreateTable(
                "dbo.News",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Content = c.String(),
                        PublishingDate = c.DateTime(nullable: false),
                        LastEditedDate = c.DateTime(),
                        CourseID = c.Int(nullable: false),
                        PublisherID = c.String(maxLength: 128),
                        EditorID = c.String(maxLength: 128),
                        User_Id = c.String(maxLength: 128),
                        User_Id1 = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Courses", t => t.CourseID, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.EditorID)
                .ForeignKey("dbo.AspNetUsers", t => t.PublisherID)
                .ForeignKey("dbo.AspNetUsers", t => t.User_Id)
                .ForeignKey("dbo.AspNetUsers", t => t.User_Id1)
                .Index(t => t.CourseID)
                .Index(t => t.PublisherID)
                .Index(t => t.EditorID)
                .Index(t => t.User_Id)
                .Index(t => t.User_Id1);
            
            CreateTable(
                "dbo.CourseTemplates",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        AmountDays = c.Int(nullable: false),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Links",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        HttpLink = c.String(),
                        CoursePartID = c.Int(),
                        AssignmentCompletionID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.AssignmentCompletions", t => t.AssignmentCompletionID)
                .ForeignKey("dbo.CourseParts", t => t.CoursePartID)
                .Index(t => t.CoursePartID)
                .Index(t => t.AssignmentCompletionID);
            
            CreateTable(
                "dbo.AspNetUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetUserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.Messages",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Date = c.DateTime(nullable: false),
                        Subject = c.String(),
                        Content = c.String(),
                        ReadingDate = c.DateTime(),
                        FromID = c.String(maxLength: 128),
                        ToID = c.String(maxLength: 128),
                        User_Id = c.String(maxLength: 128),
                        User_Id1 = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.AspNetUsers", t => t.FromID)
                .ForeignKey("dbo.AspNetUsers", t => t.ToID)
                .ForeignKey("dbo.AspNetUsers", t => t.User_Id)
                .ForeignKey("dbo.AspNetUsers", t => t.User_Id1)
                .Index(t => t.FromID)
                .Index(t => t.ToID)
                .Index(t => t.User_Id)
                .Index(t => t.User_Id1);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUsers", "RoleID", "dbo.AspNetRoles");
            DropForeignKey("dbo.News", "User_Id1", "dbo.AspNetUsers");
            DropForeignKey("dbo.Messages", "User_Id1", "dbo.AspNetUsers");
            DropForeignKey("dbo.Messages", "User_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.Messages", "ToID", "dbo.AspNetUsers");
            DropForeignKey("dbo.Messages", "FromID", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.News", "User_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.Courses", "User_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AssignmentCompletions", "StudentID", "dbo.AspNetUsers");
            DropForeignKey("dbo.AssignmentCompletions", "AssignmentID", "dbo.Assignments");
            DropForeignKey("dbo.Assignments", "CoursePartID", "dbo.CourseParts");
            DropForeignKey("dbo.Links", "CoursePartID", "dbo.CourseParts");
            DropForeignKey("dbo.Links", "AssignmentCompletionID", "dbo.AssignmentCompletions");
            DropForeignKey("dbo.CourseParts", "CourseDayID", "dbo.CourseDays");
            DropForeignKey("dbo.CourseDays", "CourseTemplateID", "dbo.CourseTemplates");
            DropForeignKey("dbo.CourseDays", "CourseID", "dbo.Courses");
            DropForeignKey("dbo.Attendances", "CourseDay_ID", "dbo.CourseDays");
            DropForeignKey("dbo.Attendances", "StudentID", "dbo.AspNetUsers");
            DropForeignKey("dbo.Attendances", "CourseID", "dbo.Courses");
            DropForeignKey("dbo.Courses", "TemplateID", "dbo.CourseTemplates");
            DropForeignKey("dbo.AspNetUsers", "Course_ID1", "dbo.Courses");
            DropForeignKey("dbo.AspNetUsers", "Course_ID", "dbo.Courses");
            DropForeignKey("dbo.News", "PublisherID", "dbo.AspNetUsers");
            DropForeignKey("dbo.News", "EditorID", "dbo.AspNetUsers");
            DropForeignKey("dbo.News", "CourseID", "dbo.Courses");
            DropForeignKey("dbo.Documents", "UploaderID", "dbo.AspNetUsers");
            DropForeignKey("dbo.Documents", "CoursePartID", "dbo.CourseParts");
            DropForeignKey("dbo.Documents", "CourseDayID", "dbo.CourseDays");
            DropForeignKey("dbo.Documents", "CourseID", "dbo.Courses");
            DropForeignKey("dbo.Documents", "AssignmentCompletionID", "dbo.AssignmentCompletions");
            DropForeignKey("dbo.Documents", "AssignmentID", "dbo.Assignments");
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropIndex("dbo.Messages", new[] { "User_Id1" });
            DropIndex("dbo.Messages", new[] { "User_Id" });
            DropIndex("dbo.Messages", new[] { "ToID" });
            DropIndex("dbo.Messages", new[] { "FromID" });
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.Links", new[] { "AssignmentCompletionID" });
            DropIndex("dbo.Links", new[] { "CoursePartID" });
            DropIndex("dbo.News", new[] { "User_Id1" });
            DropIndex("dbo.News", new[] { "User_Id" });
            DropIndex("dbo.News", new[] { "EditorID" });
            DropIndex("dbo.News", new[] { "PublisherID" });
            DropIndex("dbo.News", new[] { "CourseID" });
            DropIndex("dbo.Documents", new[] { "UploaderID" });
            DropIndex("dbo.Documents", new[] { "CoursePartID" });
            DropIndex("dbo.Documents", new[] { "CourseDayID" });
            DropIndex("dbo.Documents", new[] { "CourseID" });
            DropIndex("dbo.Documents", new[] { "AssignmentCompletionID" });
            DropIndex("dbo.Documents", new[] { "AssignmentID" });
            DropIndex("dbo.Courses", new[] { "User_Id" });
            DropIndex("dbo.Courses", new[] { "TemplateID" });
            DropIndex("dbo.Attendances", new[] { "CourseDay_ID" });
            DropIndex("dbo.Attendances", new[] { "StudentID" });
            DropIndex("dbo.Attendances", new[] { "CourseID" });
            DropIndex("dbo.CourseDays", new[] { "CourseID" });
            DropIndex("dbo.CourseDays", new[] { "CourseTemplateID" });
            DropIndex("dbo.CourseParts", new[] { "CourseDayID" });
            DropIndex("dbo.Assignments", new[] { "CoursePartID" });
            DropIndex("dbo.AssignmentCompletions", new[] { "AssignmentID" });
            DropIndex("dbo.AssignmentCompletions", new[] { "StudentID" });
            DropIndex("dbo.AspNetUsers", new[] { "Course_ID1" });
            DropIndex("dbo.AspNetUsers", new[] { "Course_ID" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.AspNetUsers", new[] { "RoleID" });
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropTable("dbo.Messages");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.Links");
            DropTable("dbo.CourseTemplates");
            DropTable("dbo.News");
            DropTable("dbo.Documents");
            DropTable("dbo.Courses");
            DropTable("dbo.Attendances");
            DropTable("dbo.CourseDays");
            DropTable("dbo.CourseParts");
            DropTable("dbo.Assignments");
            DropTable("dbo.AssignmentCompletions");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetRoles");
        }
    }
}
