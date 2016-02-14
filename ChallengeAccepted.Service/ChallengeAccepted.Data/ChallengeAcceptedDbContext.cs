using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ChallengeAccepted.Data.Contracts;
using ChallengeAccepted.Data.Migrations;
using ChallengeAccepted.Models;
using Microsoft.AspNet.Identity.EntityFramework;

namespace ChallengeAccepted.Data
{
    public class ChallengeAcceptedDbContext : IdentityDbContext<User>, IChallengeAcceptedDbContext
    {
        public ChallengeAcceptedDbContext()
            : base("AzureConnection", throwIfV1Schema: false) // AzureConnection // DefaultConnection
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<ChallengeAcceptedDbContext, Configuration>());
            //this.Configuration.ProxyCreationEnabled = false;
        }

        public IDbSet<Challenge> Challenges { get; set; }

        public IDbSet<Badge> Badges { get; set; }

        public IDbSet<ChallengeResponse> ChallengeResponses { get; set; }

        public IDbSet<Comment> Comments { get; set; }

        public IDbSet<Image> Images { get; set; }

        public IDbSet<Location> Locations { get; set; }

        public IDbSet<Like> Likes { get; set; }

        public IDbSet<Dislike> Dislikes { get; set; }

        public IDbSet<Condition> Conditions { get; set; }

        public static ChallengeAcceptedDbContext Create()
        {
            return new ChallengeAcceptedDbContext();
        }

        IDbSet<T> IChallengeAcceptedDbContext.Set<T>()
        {
            return base.Set<T>();
        }
    }
}
