namespace ChallengeAccepted.Data.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ChallengeAccepted.Data.ChallengeAcceptedDbContext>
    {
        private DataSeeder seeder;

        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
            this.seeder = new DataSeeder();
        }

        protected override void Seed(ChallengeAccepted.Data.ChallengeAcceptedDbContext context)
        {
            if (context.Users.Any())
            {
                return;
            }

            this.seeder.SeedRoles(context);
            this.seeder.SeedAdmin(context);
            this.seeder.SeedUsers(context);
            this.seeder.SeedLocations(context);
            this.seeder.SeedChallenges(context);
            this.seeder.SeedBadges(context);
        }
    }
}
