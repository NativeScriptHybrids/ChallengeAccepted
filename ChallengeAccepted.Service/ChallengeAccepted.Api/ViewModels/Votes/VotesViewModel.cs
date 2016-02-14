using ChallengeAccepted.Api.Mapping;
using ChallengeAccepted.Models;

namespace ChallengeAccepted.Api.ViewModels.Votes
{
    public class VotesViewModel : IMapFrom<ChallengeResponse>, IHaveCustomMappings
    {
        public VotesViewModel()
        {
        }

        public VotesViewModel(int challengeResponseId)
        {
            this.ChallengeResponseId = challengeResponseId;
        }

        public int Id { get; set; }

        public int ChallengeResponseId { get; set; }

        public int Rating { get; set; }

        public int LikesCount { get; set; }

        public int DislikesCount { get; set; }

        public void CreateMappings(AutoMapper.IConfiguration configuration)
        {
            configuration.CreateMap<ChallengeResponse, VotesViewModel>()
               .ForMember(m => m.LikesCount, opt => opt.MapFrom(x => x.Likes.Count))
               .ForMember(m => m.DislikesCount, opt => opt.MapFrom(x => x.Dislikes.Count))
               .ForMember(m => m.ChallengeResponseId, opt => opt.MapFrom(x => x.Id))
               .ReverseMap();
        }
    }
}