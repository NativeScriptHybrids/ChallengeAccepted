using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using ChallengeAccepted.Api.Mapping;
using ChallengeAccepted.Models;

namespace ChallengeAccepted.Api.ViewModels.AssignedChallenge
{
    public class EditChallengeResponseViewModel : IMapFrom<ChallengeAccepted.Models.ChallengeResponse>, IHaveCustomMappings
    {
        //[Key]
        //public int Id { get; set; }

       // public Image Image { get; set; }

        public string ImageUrl { get; set; }

        public string VideoUrl { get; set; }

        public void CreateMappings(AutoMapper.IConfiguration configuration)
        {
            configuration.CreateMap<ChallengeAccepted.Models.ChallengeResponse, EditChallengeResponseViewModel>()
               .ReverseMap();
        }
    }
}