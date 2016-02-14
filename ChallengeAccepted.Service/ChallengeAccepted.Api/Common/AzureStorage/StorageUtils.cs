using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;

namespace ChallengeAccepted.Api.Common.AzureStorage
{
    public static class StorageUtils
    {
        public const string ConnectionString = "DefaultEndpointsProtocol=https;AccountName=challengeaccepted;AccountKey=5YwjRNCjxS+UHKNxKodcnLqWH8Mfj4kPIAM1htENVNL3t58U5bKDxNBiUZozwWKZ53CQi485+UAw3Q8pX8g6zA==;BlobEndpoint=https://challengeaccepted.blob.core.windows.net/;TableEndpoint=https://challengeaccepted.table.core.windows.net/;QueueEndpoint=https://challengeaccepted.queue.core.windows.net/;FileEndpoint=https://challengeaccepted.file.core.windows.net/";
        
        public static CloudStorageAccount StorageAccount
        {
            get
            {
                string account = CloudConfigurationManager.GetSetting("StorageAccountName");
                // This enables the storage emulator when running locally using the Azure compute emulator.
                //if (account == "challengeaccepted")
                //{
                //    return CloudStorageAccount.DevelopmentStorageAccount;
                //}

                string key = CloudConfigurationManager.GetSetting("StorageAccountAccessKey");
                string connectionString = ConnectionString; //String.Format("DefaultEndpointsProtocol=https;AccountName={0};AccountKey={1}", account, key);
                return CloudStorageAccount.Parse(connectionString);
            }
        }
    }
}