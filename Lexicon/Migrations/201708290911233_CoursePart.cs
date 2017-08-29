namespace Lexicon.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CoursePart : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CourseParts", "PartDay", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.CourseParts", "PartDay");
        }
    }
}
