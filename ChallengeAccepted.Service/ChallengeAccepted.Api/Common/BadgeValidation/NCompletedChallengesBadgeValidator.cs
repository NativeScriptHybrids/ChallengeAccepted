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
    public class NCompletedChallengesBadgeValidator : AbstractValidator<Badge>
    {
        private IChallengeAcceptedData data;

        public NCompletedChallengesBadgeValidator(IChallengeAcceptedData data)
        {
            this.data = data;
            RuleFor(x => x).Must(ValidateProperties);
        }

        private bool ValidateProperties(Badge badge)
        {
            try
            {
                var completedChallengesCountCondition = int.Parse(badge.Conditions
                    .First(x => x.Name == GlobalConstants.CompletedChallengesCount)
                    .Value); //3

                var userId = HttpContext.Current.User.Identity.GetUserId();

                //TODO: cleverer?
                var completedChallengesCount = this.data.ChallengeResponses.All()
                    .Where(x => x.ChallengeeId == userId)
                    .Count(x => x.Status == ChallengeStatus.Completed);

                return completedChallengesCount >= completedChallengesCountCondition;
            }
            catch (Exception ex)
            {
                // TODO: log exception
                return false;
            }
        }
    }
}