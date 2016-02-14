namespace ChallengeAccepted.Models
{
    public class Condition
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Value { get; set; }

        public int BadgeId { get; set; }

        public virtual Badge Badge { get; set; }
    }
}
