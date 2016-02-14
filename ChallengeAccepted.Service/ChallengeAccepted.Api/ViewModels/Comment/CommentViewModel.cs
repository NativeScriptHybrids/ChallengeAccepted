using System;
using AutoMapper;
using ChallengeAccepted.Api.Mapping;

namespace ChallengeAccepted.Api.ViewModels.Comment
{
    public class CommentViewModel : IMapFrom<ChallengeAccepted.Models.Comment>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public string AuthorName { get; set; }

        public DateTime CreatedOn { get; set; }

        public int AssignedChallengeId { get; set; }

        public void CreateMappings(IConfiguration configuration)
        {
            configuration.CreateMap<ChallengeAccepted.Models.Comment, CommentViewModel>()
                .ForMember(m => m.AuthorName, opt => opt.MapFrom(x => x.Author.UserName))
                .ReverseMap();
        }
    }
}