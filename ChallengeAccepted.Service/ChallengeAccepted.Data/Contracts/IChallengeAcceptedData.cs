using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ChallengeAccepted.Data.Repositories;
using ChallengeAccepted.Models;

namespace ChallengeAccepted.Data.Contracts
{
    public interface IChallengeAcceptedData
    {
        IChallengeAcceptedDbContext Db { get; }

        IRepository<User> Users { get; }

        IRepository<Challenge> Challenges { get; }

        IRepository<Badge> Badges { get; }

        IRepository<ChallengeResponse> ChallengeResponses { get; }

        IRepository<Comment> Comments { get; }

        IRepository<Location> Locations { get; }

        IRepository<Image> Images { get; }

        IRepository<Like> Likes { get; }

        IRepository<Dislike> Dislikes { get; }

        IRepository<Condition> Conditions { get; }

        void SaveChanges();
    }
}
