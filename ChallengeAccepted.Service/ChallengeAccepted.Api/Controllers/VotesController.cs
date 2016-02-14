using System.Linq;
using System.Web.Http;
using AutoMapper;
using ChallengeAccepted.Api.ViewModels.Votes;
using ChallengeAccepted.Data.Contracts;
using ChallengeAccepted.Models;

namespace ChallengeAccepted.Api.Controllers
{
    public class VotesController : BaseController
    {
        public VotesController(IChallengeAcceptedData data)
            : base(data)
        {
        }

        [HttpPost]
        public IHttpActionResult Like(int id)
        {
            var challengeResponse = this.data.ChallengeResponses.All()
                .FirstOrDefault(x => x.Id == id);

            if (challengeResponse == null)
            {
                return this.BadRequest("Challenge response wasn't found.");
            }

            var existingLike = this.data.Likes
                .All()
                .FirstOrDefault(l => l.UserId == this.CurrentUser.Id && l.ChallengeResponseId == challengeResponse.Id);

            var existingDislike = this.data.Dislikes
                .All()
                .FirstOrDefault(d => d.UserId == this.CurrentUser.Id && d.ChallengeResponseId == challengeResponse.Id);

            if (existingDislike != null)
            {
                this.data.Dislikes.Delete(existingDislike);
                challengeResponse.Rating++;
                this.data.SaveChanges();
            }

            if (existingLike == null)
            {
                var like = new Like
                {
                    UserId = this.CurrentUser.Id
                };

                challengeResponse.Likes.Add(like);
                challengeResponse.Rating++;
                this.data.SaveChanges();
            }
            else
            {
                this.data.Likes.Delete(existingLike);
                challengeResponse.Rating--;
                this.data.SaveChanges();
            }

            var votes = Mapper.Map<VotesViewModel>(challengeResponse);

            return this.Ok(votes);
        }

        [HttpPost]
        public IHttpActionResult Dislike(int id)
        {
            var challengeResponse = this.data.ChallengeResponses.All()
                .FirstOrDefault(x => x.Id == id);

            if (challengeResponse == null)
            {
                return this.BadRequest("Challenge response wasn't found.");
            }

            var existingLike = this.data.Likes
                .All()
                .FirstOrDefault(d => d.UserId == this.CurrentUser.Id && d.ChallengeResponseId == challengeResponse.Id);

            var existingDislike = this.data.Dislikes
                .All()
                .FirstOrDefault(d => d.UserId == this.CurrentUser.Id && d.ChallengeResponseId == challengeResponse.Id);

            if (existingLike != null)
            {
                this.data.Likes.Delete(existingLike);
                challengeResponse.Rating--;
                this.data.SaveChanges();
            }

            if (existingDislike == null)
            {
                var dislike = new Dislike
                {
                    UserId = this.CurrentUser.Id,
                };

                challengeResponse.Dislikes.Add(dislike);
                challengeResponse.Rating--;
                this.data.SaveChanges();
            }
            else
            {
                this.data.Dislikes.Delete(existingDislike);
                challengeResponse.Rating++;
                this.data.SaveChanges();
            }

            var votes = Mapper.Map<VotesViewModel>(challengeResponse);

            return this.Ok(votes);
        }
    }
}