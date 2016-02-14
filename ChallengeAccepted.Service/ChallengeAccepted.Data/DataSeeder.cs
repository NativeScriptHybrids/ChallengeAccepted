using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using ChallengeAccepted.Common;
using ChallengeAccepted.Models;
using ChallengeAccepted.Models.Enums;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace ChallengeAccepted.Data
{
    public class DataSeeder
    {
        private const string AdminEmail = "admin@a.a";

        public void SeedRoles(ChallengeAcceptedDbContext context)
        {
            var roleStore = new RoleStore<IdentityRole>(context);
            var roleManager = new RoleManager<IdentityRole>(roleStore);

            var adminRole = new IdentityRole { Name = GlobalConstants.AdminRole };
            roleManager.Create(adminRole);

            context.SaveChanges();
        }

        public void SeedAdmin(ChallengeAcceptedDbContext context)
        {
            var userManager = new UserManager<User>(new UserStore<User>(context));
            var admin = new User()
            {
                Email = AdminEmail,
                UserName = "admin",
                FirstName = "Adi",
                LastName = "Minkov"
            };

            userManager.Create(admin, "123456");
            userManager.AddToRole(admin.Id, GlobalConstants.AdminRole);

            context.SaveChanges();
        }

        public void SeedUsers(ChallengeAcceptedDbContext context)
        {
            var userManager = new UserManager<User>(new UserStore<User>(context));

            var emails = new List<string>
            {
                string.Format("{0}@{1}.com", "pesho", "abv"),
                string.Format("{0}@{1}.com", "mariq", "abv"),
                string.Format("{0}@{1}.com", "gosho", "yahoo"),
                string.Format("{0}@{1}.com", "pepa", "gmail"),
            };

            foreach (string email in emails)
            {
                var user = new User
                {
                    Email = email,
                    UserName = email.Split('@')[0],

                };

                userManager.Create(user, "123456");
            }

            context.SaveChanges();
        }

        public void SeedLocations(ChallengeAcceptedDbContext context)
        {
            var locations = new List<Location>
            {
                new Location()
                {
                    Country = "Bulgaria",
                    City = "Sofia",
                    Latitude = "42.697575",
                    Longitude = "23.322526"
                },
                new Location()
                {
                    Country = "Bulgaria",
                    City = "Burgas",
                    Latitude = "42.4976779",
                    Longitude = "27.4700254"
                }
            };

            context.Locations.AddOrUpdate(locations.ToArray());
            context.SaveChanges();
        }

        public void SeedBadges(ChallengeAcceptedDbContext context)
        {
            var badges = new List<Badge>
            {
                new Badge
                {
                    Name = "Three Completed Challenges",
                    Description = "A badge for 3 completed challenges.",
                    BadgeType = BadgeType.ThreeCompletedChallenges,
                    ScorePoints = 6,
                    ImageUrl = GlobalConstants.BadgeImageFolderPathPrefix + "badge-three-completed.png",
                    Conditions = new List<Condition>
                    {
                        new Condition
                        {
                            Name = GlobalConstants.CompletedChallengesCount,
                            Value = "3"
                        }
                    }
                }, 
                new Badge
                {
                    Name = "Five Completed Challenges",
                    Description = "A badge for 5 completed challenges.",
                    BadgeType = BadgeType.FiveCompletedChallenges,
                    ScorePoints = 10,
                    ImageUrl = GlobalConstants.BadgeImageFolderPathPrefix + "badge-five-completed.png",
                    Conditions = new List<Condition>
                    {
                        new Condition
                        {
                            Name = GlobalConstants.CompletedChallengesCount,
                            Value = "5"
                        }
                    }
                }, 
                new Badge
                {
                    Name = "Ten Completed Challenges",
                    Description = "A badge for 10 completed challenges.",
                    BadgeType = BadgeType.TenCompletedChallenges,
                    ScorePoints = 15,
                    ImageUrl = GlobalConstants.BadgeImageFolderPathPrefix + "badge-ten-completed.png",
                    Conditions = new List<Condition>
                    {
                        new Condition
                        {
                            Name = GlobalConstants.CompletedChallengesCount,
                            Value = "10"
                        }
                    }
                }, 
                new Badge
                {
                    Name = "Twenty Completed Challenges",
                    Description = "A badge for 20 completed challenges.",
                    BadgeType = BadgeType.TwentyCompletedChallenges,
                    ScorePoints = 25,
                    ImageUrl = GlobalConstants.BadgeImageFolderPathPrefix + "badge-twenty-completed.png",
                    Conditions = new List<Condition>
                    {
                        new Condition
                        {
                            Name = GlobalConstants.CompletedChallengesCount,
                            Value = "20"
                        }
                    }
                }, 
                new Badge
                {
                    Name = "Fifty Completed Challenges",
                    Description = "A badge for 50 completed challenges.",
                    BadgeType = BadgeType.FiftyCompletedChallenges,
                    ScorePoints = 55,
                    ImageUrl = GlobalConstants.BadgeImageFolderPathPrefix + "badge-fifty-completed.png",
                    Conditions = new List<Condition>
                    {
                        new Condition
                        {
                            Name = GlobalConstants.CompletedChallengesCount,
                            Value = "50"
                        }
                    }
                }, 
                new Badge
                {
                    Name = "One Hundred Completed Challenges",
                    Description = "A badge for 100 completed challenges.",
                    BadgeType = BadgeType.OneHundredCompletedChallenges,
                    ScorePoints = 125,
                    ImageUrl = GlobalConstants.BadgeImageFolderPathPrefix + "badge-one-hundred-completed.png",
                    Conditions = new List<Condition>
                    {
                        new Condition
                        {
                            Name = GlobalConstants.CompletedChallengesCount,
                            Value = "100"
                        }
                    }
                }, 
                new Badge
                {
                    Name = "Five Likes on Challenge",
                    Description = "A badge for 5 likes on a completed challenge.",
                    BadgeType = BadgeType.FiveLikesOnChallenge,
                    ScorePoints = 3,
                    ImageUrl = GlobalConstants.BadgeImageFolderPathPrefix + "badge-five-likes.png",
                    Conditions = new List<Condition>
                    {
                        new Condition
                        {
                            Name = GlobalConstants.CompletedChallengeLikes,
                            Value = "5"
                        }
                    }
                }, 
                new Badge
                {
                    Name = "Ten Likes on Challenge",
                    Description = "A badge for 10 likes on a completed challenge.",
                    BadgeType = BadgeType.TenLikesOnChallenge,
                    ScorePoints = 7,
                    ImageUrl = GlobalConstants.BadgeImageFolderPathPrefix + "badge-ten-likes.png",
                    Conditions = new List<Condition>
                    {
                        new Condition
                        {
                            Name = GlobalConstants.CompletedChallengeLikes,
                            Value = "10"
                        }
                    }
                }, 
                new Badge
                {
                    Name = "Twenty Likes on Challenge",
                    Description = "A badge for 20 likes on a completed challenge.",
                    BadgeType = BadgeType.TwentyLikesOnChallenge,
                    ScorePoints = 15,
                    ImageUrl = GlobalConstants.BadgeImageFolderPathPrefix + "badge-twenty-likes.png",
                    Conditions = new List<Condition>
                    {
                        new Condition
                        {
                            Name = GlobalConstants.CompletedChallengeLikes,
                            Value = "20"
                        }
                    }
                }, 
                new Badge
                {
                    Name = "Fifty Likes on Challenge",
                    Description = "A badge for 50 likes on a completed challenge.",
                    BadgeType = BadgeType.FiftyLikesOnChallenge,
                    ScorePoints = 20,
                    ImageUrl = GlobalConstants.BadgeImageFolderPathPrefix + "badge-fifty-likes.png",
                    Conditions = new List<Condition>
                    {
                        new Condition
                        {
                            Name = GlobalConstants.CompletedChallengeLikes,
                            Value = "50"
                        }
                    }
                },
                new Badge
                {
                    Name = "One Hundred Likes on Challenge",
                    Description = "A badge for 100 likes on a completed challenge.",
                    BadgeType = BadgeType.OneHundredLikesOnChallenge,
                    ScorePoints = 30,
                    ImageUrl = GlobalConstants.BadgeImageFolderPathPrefix + "badge-one-hundred-likes.png",
                    Conditions = new List<Condition>
                    {
                        new Condition
                        {
                            Name = GlobalConstants.CompletedChallengeLikes,
                            Value = "100"
                        }
                    }
                }
            };

            context.Badges.AddOrUpdate(badges.ToArray());
            context.SaveChanges();
        }

        public void SeedChallenges(ChallengeAcceptedDbContext context)
        {
            var admin = context.Users.FirstOrDefault(x => x.Email == AdminEmail);

            var challenges = new List<Challenge>
            {
                new Challenge
                {
                    Title = "Elbow Challenge",
                    Description = "Lick your elbow.",
                    Difficulty = Difficulty.Medium,
                    DaysToComplete = 7,
                    Creator = admin
                },
                new Challenge
                {
                    Title = "Double Elbow Challenge",
                    Description = "Lick both your elbow.",
                    Difficulty = Difficulty.Medium,
                    DaysToComplete = 7,
                    Creator = admin
                },
                new Challenge
                {
                    Title = "Handsfree Shot Challenge",
                    Description = "Drink a shot without using yor hands.",
                    Difficulty = Difficulty.Easy,
                    DaysToComplete = 7,
                    Creator = admin
                },
                 new Challenge
                {
                    Title = "Inside-out Challenge",
                    Description = "Wear your top/shirt inside-out in the streets.",
                    Difficulty = Difficulty.Easy,
                    DaysToComplete = 7,
                    Creator = admin
                }
            };

            context.Challenges.AddOrUpdate(challenges.ToArray());
            context.SaveChanges();
        }
    }
}
