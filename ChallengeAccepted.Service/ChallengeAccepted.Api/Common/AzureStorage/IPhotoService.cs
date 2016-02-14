using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace ChallengeAccepted.Api.Common.AzureStorage
{
    public interface IPhotoService
    {
        Task<string> UploadPhotoAsync(HttpPostedFile photoToUpload);
    }
}
