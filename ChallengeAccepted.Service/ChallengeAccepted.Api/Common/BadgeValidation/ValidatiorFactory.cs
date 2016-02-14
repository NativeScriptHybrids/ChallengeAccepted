using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;
using ChallengeAccepted.Data;
using ChallengeAccepted.Models.Enums;
using FluentValidation;

namespace ChallengeAccepted.Api.Common.BadgeValidation
{
    public class BadgeValidatiorFactory : IBadgeValidatorFactory
    {
        public IValidator Get(BadgeType type)
        {
            switch (type)
            {
                case BadgeType.ThreeCompletedChallenges:
                case BadgeType.FiveCompletedChallenges:
                case BadgeType.TenCompletedChallenges:
                case BadgeType.TwentyCompletedChallenges:
                case BadgeType.FiftyCompletedChallenges:
                    return new NCompletedChallengesBadgeValidator(new ChallengeAcceptedData(new ChallengeAcceptedDbContext()));
                default:
                    throw new InvalidEnumArgumentException();
            }
        }
    }
}