using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChallengeAccepted.Models
{
    public class Like
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey("ChallengeResponse")]
        public int ChallengeResponseId { get; set; }

        public virtual ChallengeResponse ChallengeResponse { get; set; }

        [ForeignKey("User")]
        public string UserId { get; set; }

        public virtual User User { get; set; }
    }
}
