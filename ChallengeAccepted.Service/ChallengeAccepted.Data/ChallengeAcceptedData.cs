using System;
using System.Collections.Generic;
using ChallengeAccepted.Data.Contracts;
using ChallengeAccepted.Data.Repositories;
using ChallengeAccepted.Models;

namespace ChallengeAccepted.Data
{
    public class ChallengeAcceptedData : IChallengeAcceptedData
    {
        private IChallengeAcceptedDbContext db;
        private IDictionary<Type, object> repositories;

        public ChallengeAcceptedData(IChallengeAcceptedDbContext db)
        {
            this.db = db;
            this.repositories = new Dictionary<Type, object>();
        }

        public IChallengeAcceptedDbContext Db
        {
            get
            {
                return this.db;
            }
        }

        public IRepository<User> Users
        {
            get
            {
                return this.GetRepository<User>();
            }
        }

        public IRepository<Challenge> Challenges
        {
            get
            {
                return this.GetRepository<Challenge>();
            }
        }

        public IRepository<Badge> Badges
        {
            get
            {
                return this.GetRepository<Badge>();
            }
        }

        public IRepository<ChallengeResponse> ChallengeResponses
        {
            get
            {
                return this.GetRepository<ChallengeResponse>();
            }
        }

        public IRepository<Comment> Comments
        {
            get
            {
                return this.GetRepository<Comment>();
            }
        }

        public IRepository<Location> Locations
        {
            get
            {
                return this.GetRepository<Location>();
            }
        }

        public IRepository<Image> Images
        {
            get
            {
                return this.GetRepository<Image>();
            }
        }

        public IRepository<Like> Likes
        {
            get
            {
                return this.GetRepository<Like>();
            }
        }

        public IRepository<Dislike> Dislikes
        {
            get
            {
                return this.GetRepository<Dislike>();
            }
        }

        public IRepository<Condition> Conditions
        {
            get
            {
                return this.GetRepository<Condition>();
            }
        }

        public void SaveChanges()
        {
            this.db.SaveChanges();
        }

        private IRepository<T> GetRepository<T>() where T : class
        {
            var typeOfRepository = typeof(T);
            if (!this.repositories.ContainsKey(typeOfRepository))
            {
                var type = typeof(GenericRepository<T>);
                var newRepository = Activator.CreateInstance(type, this.db);

                this.repositories.Add(typeOfRepository, newRepository);
            }

            return (IRepository<T>)this.repositories[typeOfRepository];
        }
    }
}
