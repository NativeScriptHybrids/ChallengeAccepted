using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChallengeAccepted.Models
{
    public class Challenge
    {
        private ICollection<ChallengeResponse> assignedChallenges;

        public Challenge()
        {
            this.assignedChallenges = new HashSet<ChallengeResponse>();
        }

        [Key]
        public int ChallengeId { get; set; }

        [Required]
        [StringLength(50)]
        public string Title { get; set; }

        [Required]
        [StringLength(1000)]
        public string Description { get; set; }

        public Difficulty Difficulty { get; set; }

        public int DaysToComplete { get; set; }

        public string CreatorId { get; set; }

        public string ImageUrl { get; set; }

        public virtual User Creator { get; set; }

        public virtual ICollection<ChallengeResponse> AssignedChallenges
        {
            get
            {
                return this.assignedChallenges;
            }

            set
            {
                this.assignedChallenges = value;             
            }
        }
    }
}
