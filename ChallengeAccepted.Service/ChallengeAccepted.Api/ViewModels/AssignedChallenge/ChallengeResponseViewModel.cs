using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using ChallengeAccepted.Api.Mapping;
using ChallengeAccepted.Api.ViewModels.Comment;
using ChallengeAccepted.Models;
using ChallengeAccepted.Models.Enums;

namespace ChallengeAccepted.Api.ViewModels.AssignedChallenge
{
    public class ChallengeResponseViewModel : IMapFrom<ChallengeAccepted.Models.ChallengeResponse>, IHaveCustomMappings
    {
        [Key]
        public int Id { get; set; }

        public string ChallengeeName { get; set; }

        public string ChallengeTitle { get; set; }

        public string ChallengeDescription { get; set; }

        public DateTime AssignedOn { get; set; }

        public ChallengeStatus Status { get; set; }

        public int Score { get; set; }

       // public Image Image { get; set; }

        public string ImageUrl { get; set; }

        public string VideoLink { get; set; }

        public Difficulty Difficulty { get; set; }

        public DateTime DeadLine { get; set; }

        public string CreatorName { get; set; }

        public ICollection<CommentViewModel> Comments { get; set; } 

        public void CreateMappings(AutoMapper.IConfiguration configuration)
        {
            configuration.CreateMap<ChallengeAccepted.Models.ChallengeResponse, ChallengeResponseViewModel>()
               .ForMember(m => m.ChallengeeName, opt => opt.MapFrom(x => x.Challengee.UserName))
               .ForMember(m => m.ChallengeTitle, opt => opt.MapFrom(x => x.Challenge.Title))
               .ForMember(m => m.ChallengeDescription, opt => opt.MapFrom(x => x.Challenge.Description))
               .ForMember(m => m.CreatorName, opt => opt.MapFrom(x => x.Challenge.Creator.UserName))
               .ReverseMap();
        }
    }
}