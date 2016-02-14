using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ChallengeAccepted.Api.Mapping;
using ChallengeAccepted.Api.ViewModels.AssignedChallenge;
using ChallengeAccepted.Api.ViewModels.Badge;
using ChallengeAccepted.Models;

namespace ChallengeAccepted.Api.ViewModels.Account
{
    public class ProfileViewModel : IMapFrom<ChallengeAccepted.Models.User>, IHaveCustomMappings
    {
        public string Id { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public virtual ICollection<ChallengeResponseViewModel> AssignedChallenges { get; set; }

        public virtual ICollection<BadgeViewModel> Badges { get; set; }

       // public virtual Image Image { get; set; }

        public string ImageUrl { get; set; }

        public int Score { get; set; }

        public virtual Location Location { get; set; }

        public void CreateMappings(AutoMapper.IConfiguration configuration)
        {
            configuration.CreateMap<ChallengeAccepted.Models.User, ProfileViewModel>()
               .ReverseMap();
        }
    }
}