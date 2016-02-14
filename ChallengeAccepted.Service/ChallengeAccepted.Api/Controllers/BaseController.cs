using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ChallengeAccepted.Data.Contracts;
using ChallengeAccepted.Models;

namespace ChallengeAccepted.Api.Controllers
{
   // [Authorize]
    public class BaseController : ApiController
    {
        protected IChallengeAcceptedData data;
        private User currentUser;

        public BaseController(IChallengeAcceptedData data)
        {
            this.data = data;
            //this.CurrentUser = this.data.Users.All().FirstOrDefault(u => u.UserName == this.User.Identity.Name);
        }

        protected User CurrentUser
        {
            get
            {
                if (this.currentUser == null)
                {
                    this.currentUser = this.data.Users
                        .All()
                        .FirstOrDefault(x => x.UserName == this.User.Identity.Name);
                }

                return this.currentUser;
            }
        }
    }
}
