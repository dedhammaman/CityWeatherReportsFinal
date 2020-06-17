using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CityWeatherStatsFinal.Models
{
    public class City
    {

        //public City(string cityId,DateTime MinDate,DateTime MaxDate)
        //{
        //    cityid = cityId;
        //    mindate = MinDate;
        //    maxdate = MaxDate;
        //}

        //public City(string Name,
        //            string CityId,
        //            string State,
        //            DateTime Mindate,
        //            DateTime Maxdate,
        //            double Latitude,
        //            double Longitude,
        //            double Elevation,
        //            string Country)
        //{
        //    name = Name;
        //    cityid = CityId;
        //    state = State;
        //    mindate = Mindate;
        //    maxdate = Maxdate;
        //    latitude = Latitude;
        //    longitude = Longitude;
        //    country = Country;
        //}

        public Nullable<double> elevation { get; set; }
        public DateTime mindate { get; set; }
        public DateTime maxdate { get; set; }
        public Nullable<double> latitude { get; set; }
        public string name { get; set; }
        public string ShortName { get; set; }
        public Nullable<double> datacoverage { get; set; }
        public Nullable<bool> HasData { get; set; }

        [Key]
        public string cityid { get; set; }
        public string elevationUnit { get; set; }
        public Nullable<double> longitude { get; set; }
        public string country { get; set; }

        public string state { get; set; }
        public int citysize { get; set; }


    }

    public class CityMetaDataContext : DbContext
    {
        public DbSet<City> CityMetaData { get; set; }

        public CityMetaDataContext(DbContextOptions<CityMetaDataContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer(@"Server=s08.everleap.com;Database=DB_4325_citystats;Trusted_Connection=False;User Id=DB_4325_citystats_user;Password=Elise2014", builder =>
            //{
            //    builder.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
            //});
            base.OnConfiguring(optionsBuilder);

        }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<City>();
        }
    }

}
