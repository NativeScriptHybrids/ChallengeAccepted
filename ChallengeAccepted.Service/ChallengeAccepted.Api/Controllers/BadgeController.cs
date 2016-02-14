using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AutoMapper.QueryableExtensions;
using ChallengeAccepted.Api.Common.BadgeValidation;
using ChallengeAccepted.Api.ViewModels.Account;
using ChallengeAccepted.Api.ViewModels.Badge;
using ChallengeAccepted.Api.ViewModels.Challenge;
using ChallengeAccepted.Data.Contracts;
using ChallengeAccepted.Models.Enums;
using FluentValidation;
using Ninject;

namespace ChallengeAccepted.Api.Controllers
{
    public class BadgeController : BaseController
    {
        private IBadgeValidatorFactory badgeValidatorFactory;
        public BadgeController(IChallengeAcceptedData data, IBadgeValidatorFactory badgeValidatorFactory)
            : base(data)
        {
            this.badgeValidatorFactory = badgeValidatorFactory;
        }

        [HttpGet]
        public IHttpActionResult Get()
        {
            var badges = this.data.Badges.All()
                .ProjectTo<BadgeViewModel>();

            return this.Ok(badges);
        }

        //[HttpGet]
        //public IHttpActionResult GetBadgeWinners()
        //{
        //    var badges = this.data.Badges.All()
        //        .SelectMany(x => x.BadgeWinners)
        //        .ProjectTo<ProfileViewModel>();

        //    return this.Ok(badges);
        //}

        [HttpPost]
        public IHttpActionResult Unlock(int id)
        {
            var badge = this.data.Badges.All()
                .FirstOrDefault(x => x.Id == id);

            if (badge == null)
            {
                return this.BadRequest("No such badge.");
            }

            var conditions = this.data.Conditions.All()
                .Where(x => x.BadgeId == badge.Id).ToList();

            badge.Conditions = conditions;

            var badgeValidator = this.badgeValidatorFactory.Get(badge.BadgeType);
            var isBadgeValid = badgeValidator.Validate(badge).IsValid;

            if (isBadgeValid)
            {
                this.CurrentUser.Score += badge.ScorePoints;
                this.CurrentUser.Badges.Add(badge);
                badge.BadgeWinners.Add(this.CurrentUser);

                this.data.Users.Update(this.CurrentUser);
                this.data.Badges.Update(badge);
                this.data.SaveChanges();

                return this.Ok(badge);
            }

            return this.BadRequest("Invalid unlock badge request.");
        }

        // TODO: crud operations for admins
    }
}
