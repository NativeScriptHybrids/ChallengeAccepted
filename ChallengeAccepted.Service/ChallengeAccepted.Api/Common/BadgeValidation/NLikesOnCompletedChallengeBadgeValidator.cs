using System;
using System.Linq;
using System.Web;
using ChallengeAccepted.Common;
using ChallengeAccepted.Data.Contracts;
using ChallengeAccepted.Models;
using ChallengeAccepted.Models.Enums;
using FluentValidation;
using Microsoft.AspNet.Identity;

namespace ChallengeAccepted.Api.Common.BadgeValidation
{
    public class NLikesOnCompletedChallengeBadgeValidator : AbstractValidator<Badge>
    {
        private IChallengeAcceptedData data;

        public NLikesOnCompletedChallengeBadgeValidator(IChallengeAcceptedData data)
        {
            this.data = data;
            RuleFor(x => x).Must(ValidateProperties);
        }

        private bool ValidateProperties(Badge badge)
        {
            try
            {
                var completedChallengesLikesCountCondition = int.Parse(badge.Conditions
                    .First(x => x.Name == GlobalConstants.CompletedChallengeLikes)
                    .Value); //3

                var userId = HttpContext.Current.User.Identity.GetUserId();

                //TODO: cleverer?
                var completedChallenges = this.data.ChallengeResponses.All()
                    .Where(x => x.ChallengeeId == userId && x.Status == ChallengeStatus.Completed);

                return completedChallenges.Any(x => x.Likes.Count >= completedChallengesLikesCountCondition);
            }
            catch (Exception ex)
            {
                // TODO: log exception
                return false;
            }
        }
    }
}