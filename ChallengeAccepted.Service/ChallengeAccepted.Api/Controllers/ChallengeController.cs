using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using ChallengeAccepted.Api.ViewModels.AssignedChallenge;
using ChallengeAccepted.Api.ViewModels.Challenge;
using ChallengeAccepted.Data.Contracts;
using ChallengeAccepted.Models;
using ChallengeAccepted.Models.Enums;

namespace ChallengeAccepted.Api.Controllers
{
    //[Authorize]
    public class ChallengeController : BaseController
    {
        private static Random random;

        static ChallengeController()
        {
            random = new Random();
        }

        public ChallengeController(IChallengeAcceptedData data)
            : base(data)
        {
        }

        [HttpGet]
        public IHttpActionResult Get()
        {
            var challenges = this.data.Challenges.All()
                .ProjectTo<ChallengeViewModel>();

            return this.Ok(challenges);
        }

        [HttpGet]
        public IHttpActionResult Get(int difficulty)
        {
            var challenge = this.data.Challenges.All()
                .Where(x => ((int)x.Difficulty == difficulty))
                .ProjectTo<ChallengeViewModel>();

            return this.Ok(challenge);
        }

        [HttpGet]
        public IHttpActionResult Details(int id)
        {
            var challenge = this.data.Challenges.All()
                .Where(x => x.ChallengeId == id)
                .ProjectTo<ChallengeViewModel>();

            return this.Ok(challenge);
        }

        [HttpPost]
        public IHttpActionResult Add(AddChallengeViewModel model)
        {
            if (model != null && ModelState.IsValid)
            {
                var newChallenge = Mapper.Map<Challenge>(model);
               
                newChallenge.CreatorId = this.CurrentUser.Id;

                this.data.Challenges.Add(newChallenge);
                this.data.SaveChanges();

                model.ChallengeId = newChallenge.ChallengeId;

                this.data.SaveChanges();

                return this.Ok(model);
            }

            return this.BadRequest("Challenge couldn't be created.");
        }

        [HttpGet]
        public IHttpActionResult Edit(int id)
        {
            var challenge = this.data.Challenges.Find(id);
            
            if (challenge == null || challenge.CreatorId != this.CurrentUser.Id)
            {
                return this.BadRequest("Not your challenge to edit.");
            }

            var model = new EditChallengeViewModel()
            {
                Title = challenge.Title,
                Description = challenge.Description,
                Difficulty = challenge.Difficulty,
                ImageUrl = challenge.ImageUrl,
                DaysToComplete = challenge.DaysToComplete
            };

            return this.Ok(model);
        }

        [HttpPost]
        public IHttpActionResult Edit(int id, EditChallengeViewModel model)
        {
            if (model != null && ModelState.IsValid)
            {
                var challenge = this.data.Challenges.Find(id);

                if (challenge != null && challenge.CreatorId == this.CurrentUser.Id)
                {
                    Mapper.Map<EditChallengeViewModel, Challenge>(model, challenge);

                    this.data.Challenges.Update(challenge);
                    this.data.SaveChanges();

                    return this.Ok(model);
                }
            }

            return this.BadRequest("Couldn't edit challenge.");
        }

        [HttpGet]
        public IHttpActionResult Random()
        {
            var challengeIdsInResponses = this.GetChallengeIdsInResponses();

            var challenges = this.data.Challenges.All()
                .Where(x => x.CreatorId != this.CurrentUser.Id
                    && !challengeIdsInResponses.Contains(x.ChallengeId))
                .ProjectTo<ChallengeViewModel>()
                .ToList();

            if (challenges.Any())
            {
                int randomIndex = random.Next(0, challenges.Count);

                return this.Ok(challenges[randomIndex]);
            }

            return this.BadRequest("No new challenges.");
        }

        [HttpGet]
        public IHttpActionResult Random(int difficulty)
        {
            var challengeIdsInResponses = this.GetChallengeIdsInResponses();

            var challenges = this.data.Challenges.All()
                .Where(x => x.CreatorId != this.CurrentUser.Id
                    && !challengeIdsInResponses.Contains(x.ChallengeId)
                    && ((int)x.Difficulty == difficulty))
                .ProjectTo<ChallengeViewModel>()
                .ToList();

            if (challenges.Any())
            {
                int randomIndex = random.Next(0, challenges.Count);

                return this.Ok(challenges[randomIndex]);
            }

            return this.BadRequest("No new challenges.");
        }

        [HttpPost]
        public IHttpActionResult Accept(int id)
        {
            var challenge = this.data.Challenges.Find(id);

            if (challenge == null)
            {
                return this.BadRequest("No such challenge.");
            }

            var responseExists = this.CurrentUser.ChallengeResponses
                .Any(x => x.ChallengeId == id);

            if (responseExists)
            {
                return this.BadRequest("You've already responded to that challenge.");
            }

            var challengeResponse = new ChallengeResponse
            {
                ChallengeId = id,
                AssignedOn = DateTime.UtcNow,
                ChallengeeId = this.CurrentUser.Id,
                Status = ChallengeStatus.InProgress
            };

            challengeResponse.Deadline = challengeResponse.AssignedOn.AddDays(challenge.DaysToComplete);

            this.data.ChallengeResponses.Add(challengeResponse);
            this.CurrentUser.ChallengeResponses.Add(challengeResponse);

            this.data.SaveChanges();

            var challengeResponseViewModel = Mapper.Map<ChallengeResponseViewModel>(challengeResponse);

            return this.Ok(challengeResponseViewModel);
        }

        [HttpPost]
        public IHttpActionResult Decline(int id)
        {
            var challenge = this.data.Challenges.Find(id);

            if (challenge == null)
            {
                return this.BadRequest("No such challenge");
            }

            var responseExists = this.CurrentUser.ChallengeResponses
                .Any(x => x.ChallengeId == id);

            if (responseExists)
            {
                return this.BadRequest("You've already responded to that challenge.");
            }

            var challengeResponse = new ChallengeResponse
            {
                ChallengeId = id,
                AssignedOn = DateTime.UtcNow,
                ChallengeeId = this.CurrentUser.Id,
                Status = ChallengeStatus.Declined
            };

            challengeResponse.Deadline = challengeResponse.AssignedOn.AddDays(challenge.DaysToComplete);

            this.data.ChallengeResponses.Add(challengeResponse);
            this.CurrentUser.ChallengeResponses.Add(challengeResponse);

            this.data.SaveChanges();

            var challengeResponseViewModel = Mapper.Map<ChallengeResponseViewModel>(challengeResponse);

            return this.Ok(challengeResponseViewModel);
        }

        [HttpPost]
        public IHttpActionResult Delete(int id)
        {
            var challenge = this.data.Challenges.Find(id);

            if (challenge != null)
            {
                if (!challenge.CreatorId.Equals(this.CurrentUser.Id))
                {
                    return this.BadRequest("This challenge isn't yours to delete.");
                }

                this.CurrentUser.CreatedChallenges.Remove(challenge);
                this.data.Challenges.Delete(challenge);
                this.data.SaveChanges();

                return this.Ok(challenge);
            }

            return this.BadRequest("The project couldn't be found.");
        }

        private IQueryable<int> GetChallengeIdsInResponses()
        {
            return this.CurrentUser
               .ChallengeResponses
               .AsQueryable()
               .Select(x => x.ChallengeId);
        }
    }
}
