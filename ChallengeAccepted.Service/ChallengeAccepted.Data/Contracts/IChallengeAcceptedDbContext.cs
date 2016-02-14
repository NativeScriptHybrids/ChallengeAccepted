using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ChallengeAccepted.Models;

namespace ChallengeAccepted.Data.Contracts
{
    public interface IChallengeAcceptedDbContext
    {
        new IDbSet<T> Set<T>() where T : class;

        IDbSet<Challenge> Challenges { get; set; }

        IDbSet<Badge> Badges { get; set; }

        IDbSet<ChallengeResponse> ChallengeResponses { get; set; }

        IDbSet<Comment> Comments { get; set; }

        IDbSet<Image> Images { get; set; }

        IDbSet<Location> Locations { get; set; }

        IDbSet<Like> Likes { get; set; }

        IDbSet<Dislike> Dislikes { get; set; }

        IDbSet<Condition> Conditions { get; set; }

        int SaveChanges();
    }
}
