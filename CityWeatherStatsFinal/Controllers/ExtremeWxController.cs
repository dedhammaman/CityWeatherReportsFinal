using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using CityWeatherStatsFinal.Models;
using Microsoft.AspNetCore.Mvc;

namespace CityWeatherStatsFinal.Controllers
{
    struct YearlyAvgRec
    {
        // Monthly data for each year
        public int startyear;
        public int endyear;
        public string city;
        public string state;
        public Dictionary<int, decimal?[]> MonthlyData;
    }

    public class ExtremeWxController : Controller
    {
        private CityWeatherStatsFinal.Models.CityMetaDataContext cityContext;
        

        public ExtremeWxController(CityWeatherStatsFinal.Models.CityMetaDataContext cc)
        {
            cityContext = cc;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            return View();
        }

        public JsonResult getCityMetaData()
        {
           var aList = cityContext.CityMetaData.Select(x => new
            {
                x.name,
                x.cityid,
                x.state,
                x.mindate,
                x.maxdate,
                x.latitude,
                x.longitude,
                x.elevation,
                x.country,
                x.HasData,
                x.ShortName
            }).Where(x => (x.HasData == true)
                          ).OrderBy(x => x.name).ToList();

            var anItem = aList[3];


            return Json(
                cityContext.CityMetaData.Select(x => new
                {
                    x.name,
                    x.cityid,
                    x.state,
                    x.mindate,
                    x.maxdate,
                    x.latitude,
                    x.longitude,
                    x.elevation,
                    x.country,
                    x.HasData,
                    x.ShortName
                }).Where(x => (x.HasData == true)
                          ).OrderBy(x => x.name).ToList());

        }

        [HttpPost]
        public JsonResult GetExtremeWeather(int topn,string metric,string cityList,DateTime? from = null, DateTime? to = null)
        {
            DataSet ds = new DataSet("xtremewx");
            DailyWeather rec = null;
            List<Models.DailyWeather> Entries = new List<Models.DailyWeather>();
            using (SqlConnection con = new SqlConnection("Server=tcp:s18.winhost.com;Initial Catalog=DB_134877_citystats;User ID=DB_134877_citystats_user;Password=NYCity1975!;Integrated Security=False"))
            {
                SqlCommand sqlComm = new SqlCommand("GetTopNDays", con);
                sqlComm.Parameters.AddWithValue("@N", topn);
                sqlComm.Parameters.AddWithValue("@Metric",metric );
                sqlComm.Parameters.AddWithValue("@CityList",cityList );

                if(from != null)
                {
                    sqlComm.Parameters.AddWithValue("@From", from);
                    sqlComm.Parameters.AddWithValue("@To", to);
                }

                sqlComm.CommandType = CommandType.StoredProcedure;
                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = sqlComm;

                da.Fill(ds);

                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    rec = new DailyWeather();
                    rec.cityid = dr["CityId"].ToString();
                    rec.date = Convert.ToDateTime(dr["Date"]);
                    rec.tmax = float.Parse(dr["tmax"].ToString());
                    rec.tmin = float.Parse(dr["tmin"].ToString());
                    rec.snow = float.Parse(dr["snow"].ToString());
                    rec.prcp = float.Parse(dr["prcp"].ToString());
                    
                    Entries.Add(rec);
                }

                return Json(Entries);

                }


            }

        public IActionResult TopXReport()
        {
            if (RequestExtensions.IsMobileBrowser(Request))
                return View("~/Views/ExtremeWx/TopXReport.Mobile.cshtml");
            else
                return View();
        }

        public IActionResult Report(string WhichReport)
        {
            string viewname = null;
            switch(WhichReport)
            {

                case "TopXReport" : viewname = "TopXReport";break;
                case "MonthlyAveragesReport": viewname = "MonthlyAveragesReport";break;
                case "NumExtremeEvents": viewname = "UnderConstruction";break;
            }

            return View(viewname);
        }

        public IActionResult MonthlyAveragesReport()
        {
            if (RequestExtensions.IsMobileBrowser(Request))
                return View("~/Views/ExtremeWx/MonthlyAveragesReport.Mobile.cshtml");
            else
                return View();
            
        }

        [HttpPost]
        public JsonResult GetMonthlyAverages(string cityID, int fromYear, int toYear)
        {
            decimal?[] yearlyData = new decimal?[12]; // Data for each month of a year.
            Dictionary<int, decimal?[]> allData = new Dictionary<int, decimal?[]>();

            // Resulting dataaset
            DataSet resultsDS = new DataSet();

            // Stores end results
            YearlyAvgRec rec = new YearlyAvgRec();

            // sql command for data adapter to adapt data to dataset from SP results.
            using (SqlConnection con = new SqlConnection("Server=tcp:s18.winhost.com;Initial Catalog=DB_134877_citystats;User ID=DB_134877_citystats_user;Password=NYCity1975!;Integrated Security=False"))
            {
                SqlCommand sqlCommand = new SqlCommand("GetMonthlyAverages", con);
                sqlCommand.CommandType = CommandType.StoredProcedure;
                SqlDataAdapter da = new SqlDataAdapter();
                sqlCommand.Parameters.AddWithValue("@cityID",cityID);
                sqlCommand.Parameters.AddWithValue("@Start",new DateTime(fromYear,1,1));
                sqlCommand.Parameters.AddWithValue("@End", new DateTime(toYear, 12, 31));
                da.SelectCommand = sqlCommand;
                da.Fill(resultsDS);

                DataTable dataTable = resultsDS.Tables[0];
                foreach (DataRow dr in dataTable.Rows)
                {
                    int theYear = Convert.ToInt16(dr["theYear"]);
                    yearlyData = new decimal?[12];
                    yearlyData[0] = dr["January"] == DBNull.Value ? (decimal?)null : Convert.ToDecimal(dr["January"]);
                    yearlyData[1] = dr["February"] == DBNull.Value ? (decimal?)null : Convert.ToDecimal(dr["February"]);
                    yearlyData[2] = dr["March"] == DBNull.Value ? (decimal?)null : Convert.ToDecimal(dr["March"]);
                    yearlyData[3] = dr["April"] == DBNull.Value ? (decimal?)null : Convert.ToDecimal(dr["April"]);
                    yearlyData[4] = dr["May"] == DBNull.Value ? (decimal?)null : Convert.ToDecimal(dr["May"]);
                    yearlyData[5] = dr["June"] == DBNull.Value ? (decimal?) null : Convert.ToDecimal(dr["June"]);
                    yearlyData[6] = dr["July"] == DBNull.Value ? (decimal?)null : Convert.ToDecimal(dr["July"]);
                    yearlyData[7] = dr["August"] == DBNull.Value ? (decimal?)null : Convert.ToDecimal(dr["August"]);
                    yearlyData[8] = dr["September"] == DBNull.Value ? (decimal?)null : Convert.ToDecimal(dr["September"]);
                    yearlyData[9] = dr["October"] == DBNull.Value ? (decimal?)null : Convert.ToDecimal(dr["October"]);
                    yearlyData[10] = dr["November"] == DBNull.Value ? (decimal?)null : Convert.ToDecimal(dr["November"]);
                    yearlyData[11] = dr["December"] == DBNull.Value ? (decimal?)null : Convert.ToDecimal(dr["December"]);
                    allData.Add(Convert.ToInt16(dr["theYear"]), yearlyData);
                }

                string cityName = dataTable.Rows[0]["ShortName"].ToString();
                string state = dataTable.Rows[0]["state"].ToString();

                // Create rec to send back.
                rec.city = cityName;
                rec.state = state;
                rec.MonthlyData = allData;
                rec.startyear = fromYear;
                rec.endyear = toYear;


            }
            return Json(rec);
        }



    }
}