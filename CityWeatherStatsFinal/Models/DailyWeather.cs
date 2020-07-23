using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityWeatherStatsFinal.Models
{
    public class DailyWeather
    {
        public string DailyWeatherId { get; set; }

        public string cityid { get; set; }
        public DateTime date { get; set; }
        public string datatype { get; set; }

        public Nullable<float> prcp { get; set; }
        public Nullable<float> snow { get; set; }
        public Nullable<float> snwd { get; set; }
        public Nullable<float> wesd { get; set; }
        public Nullable<float> wesf { get; set; }
        public string attributes { get; set; }
        public Nullable<float> value { get; set; }

        public Nullable<float> tmax { get; set; }
        public Nullable<float> tmin { get; set; }
        public Nullable<float> tavg { get; set; }


    }

    public class DailyWeatherContext : DbContext
    {
        public DbSet<DailyWeather> CityDailyWeather { get; set; }

        public DailyWeatherContext(DbContextOptions<DailyWeatherContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer(@"Server=s08.everleap.com;Database=DB_4325_citystats;Trusted_Connection=False;User Id=DB_4325_citystats_user;Password=Elise2014");
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<DailyWeather>();
        }
    }
}
