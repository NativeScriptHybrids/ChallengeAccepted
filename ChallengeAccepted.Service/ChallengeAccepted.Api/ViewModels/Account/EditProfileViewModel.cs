using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ChallengeAccepted.Models;

namespace ChallengeAccepted.Api.ViewModels.Account
{
    public class EditProfileViewModel
    {
        public string Id { get; set; }

        public virtual Image Image { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Latitude { get; set; }

        public string Longitude { get; set; }

        public string ImageUrl { get; set; }

        public void CreateMappings(AutoMapper.IConfiguration configuration)
        {
            configuration.CreateMap<ChallengeAccepted.Models.User, EditProfileViewModel>()
               .ForMember(m => m.Latitude, opt => opt.MapFrom(x => x.Location.Latitude))
               .ForMember(m => m.Longitude, opt => opt.MapFrom(x => x.Location.Longitude))
               .ReverseMap();
        }
    }
}