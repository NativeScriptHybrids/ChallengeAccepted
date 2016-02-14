using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;

namespace ChallengeAccepted.Models
{
    public class User : IdentityUser
    {
        private int score;
        private ICollection<ChallengeResponse> challengeResponses;
        private ICollection<Challenge> createdChallenges;
        private ICollection<Badge> badges;

        public User()
        {
            this.challengeResponses = new HashSet<ChallengeResponse>();
            this.createdChallenges = new HashSet<Challenge>();
            this.badges = new HashSet<Badge>();
            this.score = 0;
        }

        public virtual ICollection<Challenge> CreatedChallenges
        {
            get
            {
                return this.createdChallenges;
            }
            set
            {
                this.createdChallenges = value;
            }
        }

        public virtual ICollection<ChallengeResponse> ChallengeResponses
        {
            get
            {
                return this.challengeResponses;
            }
            set
            {
                this.challengeResponses = value;                
            }
        }

        public virtual ICollection<Badge> Badges
        {
            get
            {
                return this.badges;
            }
            set
            {
                this.badges = value;
            }
        }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        //public virtual Image Image { get; set; }

        public string ImageUrl { get; set; }

        public int Score
        {
            get 
            { 
                return this.score + this.ChallengeResponses
                .Select(x => x.Rating)
                .Sum(); 
            }

            set
            {
                this.score = value;
            }
        }

        public virtual Location Location { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<User> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }
}
