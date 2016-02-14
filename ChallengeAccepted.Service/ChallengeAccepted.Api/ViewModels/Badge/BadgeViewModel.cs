using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ChallengeAccepted.Api.Mapping;
using ChallengeAccepted.Api.ViewModels.Account;
using ChallengeAccepted.Models;
using ChallengeAccepted.Models.Enums;

namespace ChallengeAccepted.Api.ViewModels.Badge
{
    public class BadgeViewModel : IMapFrom<ChallengeAccepted.Models.Badge>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public BadgeType BadgeType { get; set; }

       // public IDictionary<string, object> Conditions { get; set; }

        public int ScorePoints { get; set; }

        public string ImageUrl { get; set; }

       // public virtual Image Image { get; set; }

       // public virtual ICollection<ProfileViewModel> BadgeWinners { get; set; }

        public void CreateMappings(AutoMapper.IConfiguration configuration)
        {
            configuration.CreateMap<ChallengeAccepted.Models.Badge, BadgeViewModel>()
                .ReverseMap();
        }
    }
}