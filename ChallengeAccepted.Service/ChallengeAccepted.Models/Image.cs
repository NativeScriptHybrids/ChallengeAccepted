using System;
using System.ComponentModel.DataAnnotations;

namespace ChallengeAccepted.Models
{
    public class Image
    {
        public Image()
        {
            this.Id = Guid.NewGuid();
        }

        [Key]
        public Guid Id { get; set; }

        public byte[] Content { get; set; }

        public string FileExtension { get; set; }

        public string Path { get; set; }
    }
}
