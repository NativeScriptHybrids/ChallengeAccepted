using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using ChallengeAccepted.Api.Common.AzureStorage;
using ChallengeAccepted.Api.ViewModels.Account;
using ChallengeAccepted.Api.ViewModels.Votes;
using ChallengeAccepted.Data.Contracts;
using ChallengeAccepted.Models;

namespace ChallengeAccepted.Api.Controllers
{
    public class ProfileController : BaseController
    {
        private IPhotoService photoService;

        public ProfileController(IChallengeAcceptedData data, IPhotoService photoService)
            : base(data)
        {
            this.photoService = photoService;
        }

        [HttpGet]
        public IHttpActionResult Get()
        {
            var profile = this.data.Users.All()
                .Where(x => x.Id == this.CurrentUser.Id)
                .ProjectTo<ProfileViewModel>()
                .FirstOrDefault();

            return this.Ok(profile);
        }

        [HttpGet]
        public IHttpActionResult Edit()
        {
            var model = new EditProfileViewModel
            {
                FirstName = this.CurrentUser.FirstName,
                LastName = this.CurrentUser.LastName,
                Latitude = this.CurrentUser.Location.Latitude,
                Longitude = this.CurrentUser.Location.Longitude,
            };

            return this.Ok(model);
        }

        [HttpPost]
        public IHttpActionResult Edit(EditProfileViewModel model)
        {
            if (model != null && ModelState.IsValid)
            {
                Mapper.Map<EditProfileViewModel, User>(model, this.CurrentUser);

                this.data.Users.Update(this.CurrentUser);
                this.data.SaveChanges();

                return this.Ok(model);
            }

            return this.BadRequest("Couldn't edit challenge.");
        }

        //[HttpPost]
        //public async Task<IHttpActionResult> UploadPhoto()
        //{
        //    if (HttpContext.Current.Request.Files.AllKeys.Any())
        //    {
        //        var httpPostedFile = HttpContext.Current.Request.Files["photo"];

        //        string url = await photoService.UploadPhotoAsync(httpPostedFile);
                
        //        this.CurrentUser.ImageUrl = url;

        //        return this.Ok(url);
        //    }

        //    return this.BadRequest("The image couldn't be uploaded.");
        //}
    }
}