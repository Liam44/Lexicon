namespace Lexicon.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Messages : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Messages", new[] { "AnswerToID" });
            AlterColumn("dbo.Messages", "AnswerToID", c => c.Int());
            CreateIndex("dbo.Messages", "AnswerToID");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Messages", new[] { "AnswerToID" });
            AlterColumn("dbo.Messages", "AnswerToID", c => c.Int(nullable: false));
            CreateIndex("dbo.Messages", "AnswerToID");
        }
    }
}
