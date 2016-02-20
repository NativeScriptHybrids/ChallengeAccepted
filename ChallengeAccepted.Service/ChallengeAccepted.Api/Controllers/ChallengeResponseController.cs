using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using ChallengeAccepted.Api.Common.AzureStorage;
using ChallengeAccepted.Api.ViewModels.AssignedChallenge;
using ChallengeAccepted.Api.ViewModels.Challenge;
using ChallengeAccepted.Data.Contracts;
using ChallengeAccepted.Models;
using ChallengeAccepted.Models.Enums;

namespace ChallengeAccepted.Api.Controllers
{
    public class ChallengeResponseController : BaseController
    {
        private IPhotoService photoService;

        public ChallengeResponseController(IChallengeAcceptedData data, IPhotoService photoService)
            : base(data)
        {
            this.photoService = photoService;
        }

        [HttpGet]
        public IHttpActionResult Get()
        {
            var challengeResponses = this.data.ChallengeResponses.All()
                .ProjectTo<ChallengeResponseViewModel>();

            return this.Ok(challengeResponses);
        }

        [HttpGet]
        public IHttpActionResult Get(string userId)
        {
            var challengeResponses = this.data.ChallengeResponses.All()
                .Where(x => x.ChallengeeId == this.CurrentUser.Id)
                .ProjectTo<ChallengeResponseViewModel>();

            return this.Ok(challengeResponses);
        }

        [HttpGet]
        public IHttpActionResult GetCompleted()
        {
            var challengeResponses = this.data.ChallengeResponses.All()
                .Where(x => x.ChallengeeId != this.CurrentUser.Id && x.Status == ChallengeStatus.Completed)
                .ProjectTo<ChallengeResponseViewModel>();

            return this.Ok(challengeResponses);
        }

        [HttpGet]
        public IHttpActionResult GetCurrentUserCompleted()
        {
            var challengeResponses = this.data.ChallengeResponses.All()
                .Where(x => x.ChallengeeId == this.CurrentUser.Id && x.Status == ChallengeStatus.Completed)
                .ProjectTo<ChallengeResponseViewModel>();

            return this.Ok(challengeResponses);
        }

        [HttpGet]
        public IHttpActionResult GetCurrentUserActive()
        {
            var challengeResponses = this.data.ChallengeResponses.All()
                .Where(x => x.ChallengeeId == this.CurrentUser.Id && x.Status == ChallengeStatus.Active)
                .ProjectTo<ChallengeResponseViewModel>();

            return this.Ok(challengeResponses);
        }

        [HttpGet]
        public IHttpActionResult Details(int id)
        {
            var challengeResponse = this.data.ChallengeResponses.All()
                .Where(x => x.Id == id)
                .ProjectTo<ChallengeResponseViewModel>();

            return this.Ok(challengeResponse);
        }

        [HttpGet]
        public IHttpActionResult Complete(int id)
        {
            var challengeResponse = this.data.ChallengeResponses.Find(id);

            if (challengeResponse == null || challengeResponse.ChallengeeId != this.CurrentUser.Id)
            {
                return this.BadRequest("Not your challenge to edit.");
            }

            var model = new EditChallengeResponseViewModel()
            {
                ImageUrl = challengeResponse.ImageUrl,
                VideoUrl = challengeResponse.VideoUrl,
            };

            return this.Ok(model);
        }

        [HttpPost]
        public async Task<IHttpActionResult> Complete(int id, EditChallengeResponseViewModel model)
        {
            if (model != null && ModelState.IsValid)
            {
                var challengeResponse = this.data.ChallengeResponses.Find(id);

                if (challengeResponse != null && challengeResponse.ChallengeeId == this.CurrentUser.Id)
                {
                    if (challengeResponse.Status != ChallengeStatus.Active)
                    {
                        return this.BadRequest("Failed challenge.");
                    }

                    if (HttpContext.Current.Request.Files.AllKeys.Any())
                    {
                        var httpPostedFile = HttpContext.Current.Request.Files["photo"];

                        string url = await photoService.UploadPhotoAsync(httpPostedFile);

                        model.ImageUrl = url;
                    }

                    if (string.IsNullOrEmpty(model.ImageUrl))
                    {
                        return this.BadRequest("We need proof! Add an image!");
                    }

                    Mapper.Map<EditChallengeResponseViewModel, ChallengeResponse>(model, challengeResponse);

                    challengeResponse.Status = ChallengeStatus.Completed;

                    //TODO: make cleverer
                    if (challengeResponse.Challenge.CreatorId != this.CurrentUser.Id)
                    {
                        this.CurrentUser.Score += (((int)challengeResponse.Challenge.Difficulty + 1) * 12);
                    }

                    this.data.ChallengeResponses.Update(challengeResponse);
                    this.data.SaveChanges();

                    return this.Ok(model);
                }
            }

            return this.BadRequest("Couldn't edit challenge response.");
        }

        [HttpPost]
        public IHttpActionResult Fail(int id)
        {
            var challengeResponse = this.data.ChallengeResponses.Find(id);

            if (challengeResponse.Deadline < DateTime.UtcNow)
            {
                challengeResponse.Status = ChallengeStatus.Failed;

                if (challengeResponse.Challenge.CreatorId != this.CurrentUser.Id)
                {
                    this.CurrentUser.Score -= 3;
                }

                this.data.ChallengeResponses.Update(challengeResponse);
                this.data.SaveChanges();

                return this.Ok(string.Format("Failed challenge {0}.", challengeResponse.Id));
            }

            return this.BadRequest("Couldn't edit challenge response.");
        }

        // TODO: add Report

        //[HttpPost]
        //public IHttpActionResult Like(int id)
        //{
        //    var challengeResponse = this.data.ChallengeResponses.Find(id);


        //    //TODO add checks / Include for included collections!
        //        challengeResponse.Rating += 1;

        //        this.data.ChallengeResponses.Update(challengeResponse);
        //        this.data.SaveChanges();

        //        return this.Ok();
            

        //    return this.BadRequest("Couldn't edit challenge response.");
        //}
    }
}
