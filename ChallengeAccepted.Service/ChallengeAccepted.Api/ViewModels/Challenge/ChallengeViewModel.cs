using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using ChallengeAccepted.Api.Mapping;
using ChallengeAccepted.Models;

namespace ChallengeAccepted.Api.ViewModels.Challenge
{
    public class ChallengeViewModel : IMapFrom<ChallengeAccepted.Models.Challenge>, IHaveCustomMappings
    {
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

        public string CreatorName { get; set; }

        public void CreateMappings(AutoMapper.IConfiguration configuration)
        {
            configuration.CreateMap<ChallengeAccepted.Models.Challenge, ChallengeViewModel>()
                .ForMember(m => m.CreatorName, opt => opt.MapFrom(x => x.Creator.UserName))
                .ReverseMap();
        }
    }
}