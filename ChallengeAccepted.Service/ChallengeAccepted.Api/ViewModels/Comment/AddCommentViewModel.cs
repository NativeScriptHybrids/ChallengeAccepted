using System;
using System.ComponentModel.DataAnnotations;

using AutoMapper;
using ChallengeAccepted.Api.Mapping;

namespace ChallengeAccepted.Api.ViewModels.Comment
{
    public class AddCommentViewModel : IMapFrom<ChallengeAccepted.Models.Comment>, IHaveCustomMappings
    {
        public int Id { get; set; }

        [Required]
        [StringLength(150), MinLength(2)]
        public string Content { get; set; }

        public string AuthorId { get; set; }

        public int AssignedChallengeId { get; set; }

        public void CreateMappings(IConfiguration configuration)
        {
            configuration.CreateMap<ChallengeAccepted.Models.Comment, AddCommentViewModel>()
                .ReverseMap();
        }
    }
}