using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using ChallengeAccepted.Api.Common.AzureStorage;
using ChallengeAccepted.Data.Contracts;

namespace ChallengeAccepted.Api.Controllers
{
    public class ImageController : BaseController
    {
        private IPhotoService photoService;

        public ImageController(IChallengeAcceptedData data, IPhotoService photoService)
            : base(data)
        {
            this.photoService = photoService;
        }

        [HttpPost]
        public async Task<IHttpActionResult> UploadPhoto()
        {
            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                var httpPostedFile = HttpContext.Current.Request.Files["photo"];

                string url = await photoService.UploadPhotoAsync(httpPostedFile);

                return this.Ok(url);
            }

            return this.BadRequest("The image couldn't be uploaded.");
        }
    }
}
