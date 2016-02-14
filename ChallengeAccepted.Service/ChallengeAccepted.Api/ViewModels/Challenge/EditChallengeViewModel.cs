using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using ChallengeAccepted.Api.Mapping;
using ChallengeAccepted.Models;

namespace ChallengeAccepted.Api.ViewModels.Challenge
{
    public class EditChallengeViewModel : IMapFrom<ChallengeAccepted.Models.Challenge>, IHaveCustomMappings
    {
        [Required]
        [StringLength(50)]
        public string Title { get; set; }

        [Required]
        [StringLength(1000)]
        public string Description { get; set; }

        public Difficulty Difficulty { get; set; }

        [Required]
        public int DaysToComplete { get; set; }

        public void CreateMappings(AutoMapper.IConfiguration configuration)
        {
            configuration.CreateMap<ChallengeAccepted.Models.Challenge, EditChallengeViewModel>()
                .ReverseMap();
        }
    }
}