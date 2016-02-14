using System.Collections.Generic;
using ChallengeAccepted.Models.Enums;

namespace ChallengeAccepted.Models
{
    public class Badge
    {
        private ICollection<User> badgeWinners;
        private ICollection<Condition> conditions;

        public Badge()
        {
            this.badgeWinners = new HashSet<User>();
            this.conditions = new HashSet<Condition>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public BadgeType BadgeType { get; set; }

        public int ScorePoints { get; set; }

        public string ImageUrl { get; set; }

        //public virtual Image Image { get; set; }

        public ICollection<Condition> Conditions
        {
            get { return this.conditions; }
            set { this.conditions = value; }
        }

        public virtual ICollection<User> BadgeWinners
        {
            get { return this.badgeWinners; }
            set { this.badgeWinners = value; }
        }
    }
}
