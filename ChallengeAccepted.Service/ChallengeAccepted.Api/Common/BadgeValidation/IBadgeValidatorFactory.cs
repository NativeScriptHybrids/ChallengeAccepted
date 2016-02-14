using ChallengeAccepted.Models.Enums;
using FluentValidation;

namespace ChallengeAccepted.Api.Common.BadgeValidation
{
    public interface IBadgeValidatorFactory
    {
        IValidator Get(BadgeType type);
    }
}
