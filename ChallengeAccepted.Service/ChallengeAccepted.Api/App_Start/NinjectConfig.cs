using System;
using System.Data.Entity;
using System.Reflection;
using ChallengeAccepted.Api.Common.AzureStorage;
using ChallengeAccepted.Api.Common.BadgeValidation;
using ChallengeAccepted.Data;
using ChallengeAccepted.Data.Contracts;
using ChallengeAccepted.Data.Repositories;
using ChallengeAccepted.Models.Enums;
using FluentValidation;
using Ninject;
using Ninject.Web.Common;

namespace ChallengeAccepted.Api
{
    public class NinjectConfig
    {
        public static Lazy<IKernel> CreateKernel = new Lazy<IKernel>(() =>
        {
            var kernel = new StandardKernel();
            kernel.Load(Assembly.GetExecutingAssembly());

            RegisterServices(kernel);

            return kernel;
        });

        /// <summary>
        /// Load your modules or register your services here!
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        private static void RegisterServices(IKernel kernel)
        {
            kernel.Bind(typeof(IRepository<>)).To(typeof(GenericRepository<>));
            kernel.Bind<DbContext>().To<ChallengeAcceptedDbContext>().InRequestScope();
            kernel.Bind<IChallengeAcceptedDbContext>().To<ChallengeAcceptedDbContext>();
            kernel.Bind<IChallengeAcceptedData>().To<ChallengeAcceptedData>()
                .WithConstructorArgument("db", context => new ChallengeAcceptedDbContext());

            kernel.Bind<IPhotoService>().To<PhotoService>();

            kernel.Bind<IBadgeValidatorFactory>().To<BadgeValidatiorFactory>();

            kernel.Bind<IValidator>()
                .To<NCompletedChallengesBadgeValidator>()
                .Named(BadgeType.ThreeCompletedChallenges.ToString())
                .WithConstructorArgument("data", context => new ChallengeAcceptedData(new ChallengeAcceptedDbContext()));

            // example
            //Bind<IProducer>().To<FaultProducer>().Named("FaultProducer");

            //public TradePublisher([Named("FaultProducer")] IProducer producer)
            //    //...
            //}
        }   
    }
}