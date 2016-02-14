using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ChallengeAccepted.Models.Enums;

namespace ChallengeAccepted.Models
{
    public class ChallengeResponse
    {
        private ICollection<Comment> comments;
        private ICollection<Like> likes;
        private ICollection<Dislike> dislikes;

        public ChallengeResponse()
        {
            this.comments = new HashSet<Comment>();
            this.likes = new HashSet<Like>();
            this.dislikes = new HashSet<Dislike>();
            this.Rating = 0;
        }

        [Key]
        public int Id { get; set; }

        public string ChallengeeId { get; set; }

        public User Challengee { get; set; }

        public int ChallengeId { get; set; }

        public virtual Challenge Challenge { get; set; }

        public DateTime AssignedOn { get; set; }

        public DateTime Deadline { get; set; }

        public int Rating { get; set; }

        public ChallengeStatus Status { get; set; }

       // public Image Image { get; set; }

        public string ImageUrl { get; set; }

        public string VideoUrl { get; set; }

        public virtual ICollection<Comment> Comments
        {
            get
            {
                return this.comments;                
            }

            set
            {
                this.comments = value;           
            }
        }

        public virtual ICollection<Like> Likes
        {
            get
            {
                return this.likes;
            }

            set
            {
                this.likes = value;
            }
        }

        public virtual ICollection<Dislike> Dislikes
        {
            get
            {
                return this.dislikes;
            }

            set
            {
                this.dislikes = value;
            }
        }
    }
}
