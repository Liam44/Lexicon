namespace Lexicon.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Links : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Links", "Name", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Links", "Name");
        }
    }
}
