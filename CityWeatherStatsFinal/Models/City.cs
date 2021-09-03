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

        public string mindateShort
        {
            get => mindate.ToString("MM-dd-yyyy");
        }

        public string maxdateShort
        {
            get => maxdate.ToString("MM-dd-yyyy");
        }

        public bool Active { get; set; }


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
