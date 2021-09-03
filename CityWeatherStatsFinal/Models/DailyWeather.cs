using CityWeatherStatsFinal.Controllers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityWeatherStatsFinal.Models
{
    public class DailyWeather
    {
        public Guid DailyWeatherId { get; set; }

        public string cityid { get; set; }
        public DateTime date { get; set; }
        //public string datatype { get; set; }

        public Nullable<float> prcp { get; set; }
        public Nullable<float> snow { get; set; }
        //public Nullable<float> snwd { get; set; }
        //public Nullable<float> wesd { get; set; }
        ////public Nullable<float> wesf { get; set; }
        //public string attributes { get; set; }
        ////public Nullable<float> value { get; set; }

        public Nullable<float> tmax { get; set; }
        public Nullable<float> tmin { get; set; }
        //public Nullable<float> tavg { get; set; }


    }

    public class DailyWeatherContext : DbContext
    {
        public DbSet<DailyWeather> CityDailyWeather { get; set; }
        public DbSet<City> CityMetaData { get; set; }

        public DailyWeatherContext(DbContextOptions<DailyWeatherContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer(@"Server=s08.everleap.com;Database=DB_4325_citystats;Trusted_Connection=False;User Id=DB_4325_citystats_user;Password=Elise2014");
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<DailyWeather>().HasIndex(x => new { x.cityid, x.date }).
                ForSqlServerInclude("prcp", "tmax", "tmin", "snow");

            
        }

        public void applyFilterOperator(Filter[] filters, ref List<CityWeatherStatsFinal.Models.DailyWeather> entries)
        {

            foreach (Filter f in filters)
            {
                switch (f.Operator)
                {
                    case "GreaterThan":
                        entries = entries.Where(x => ((f.Metric == "Snowfall") && (x.snow > float.Parse(f.MetricValue)))
                                      ||
                                      ((f.Metric == "Precipitation") && (x.prcp > float.Parse(f.MetricValue)))
                                      ||
                                      ((f.Metric == "HighTemp") && (x.tmax > float.Parse(f.MetricValue)))
                                      ||
                                      ((f.Metric == "LowTemp") && (x.tmin > float.Parse(f.MetricValue)))
                                      ).ToList();
                        break;

                    case "LessThan":
                        entries = entries.Where(x => ((f.Metric == "Snowfall") && (x.snow < float.Parse(f.MetricValue)))
                                      ||
                                      ((f.Metric == "Precipitation") && (x.prcp < float.Parse(f.MetricValue)))
                                      ||
                                      ((f.Metric == "HighTemp") && (x.tmax < float.Parse(f.MetricValue)))
                                      ||
                                      ((f.Metric == "LowTemp") && (x.tmin < float.Parse(f.MetricValue)))
                                      ).ToList();
                        break;

                    case "GreaterThanOrEqualTo":
                        entries = entries.Where(x => ((f.Metric == "Snowfall") && (x.snow >= float.Parse(f.MetricValue)))
                                      ||
                                      ((f.Metric == "Precipitation") && (x.prcp >= float.Parse(f.MetricValue)))
                                      ||
                                      ((f.Metric == "HighTemp") && (x.tmax >= float.Parse(f.MetricValue)))
                                      ||
                                      ((f.Metric == "LowTemp") && (x.tmin >= float.Parse(f.MetricValue)))
                                      ).ToList();

                        break;
                    case "LessThanOrEqualTo":
                        entries = entries.Where(x => ((f.Metric == "Snowfall") && (x.snow <= float.Parse(f.MetricValue)))
                                      ||
                                      ((f.Metric == "Precipitation") && (x.prcp <= float.Parse(f.MetricValue)))
                                      ||
                                      ((f.Metric == "HighTemp") && (x.tmax <= float.Parse(f.MetricValue)))
                                      ||
                                      ((f.Metric == "LowTemp") && (x.tmin <= float.Parse(f.MetricValue)))
                                      ).ToList();
                        break;
                    case "Equals":
                        entries = entries.Where(x => ((f.Metric == "Snowfall") && (x.snow == float.Parse(f.MetricValue)))
                                      ||
                                      ((f.Metric == "Precipitation") && (x.prcp == float.Parse(f.MetricValue)))
                                      ||
                                      ((f.Metric == "HighTemp") && (x.tmax == float.Parse(f.MetricValue)))
                                      ||
                                      ((f.Metric == "LowTemp") && (x.tmin == float.Parse(f.MetricValue)))
                                      ).ToList();

                        break;
                    default: break;
                }
            }
        }
    }
}
