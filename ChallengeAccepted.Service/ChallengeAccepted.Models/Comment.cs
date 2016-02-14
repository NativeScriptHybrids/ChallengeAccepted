using System.ComponentModel.DataAnnotations;

namespace ChallengeAccepted.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(150), MinLength(2)]
        public string Content { get; set; }

        // [Required]
        public string AuthorId { get; set; }

        public virtual User Author { get; set; }

        // [Required]
        public int AssignedChallengeId { get; set; }

        public virtual ChallengeResponse AssignedChallenge { get; set; }
    }
}
