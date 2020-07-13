using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CSharp.RuntimeBinder;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CityWeatherStatsFinal.Controllers
{
    public static class RequestExtensions
    {
        //regex from http://detectmobilebrowsers.com/
        private static readonly Regex b = new Regex(@"(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino", RegexOptions.IgnoreCase | RegexOptions.Multiline);
        private static readonly Regex v = new Regex(@"1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-", RegexOptions.IgnoreCase | RegexOptions.Multiline);

        public static bool IsMobileBrowser(this HttpRequest request)
        {
            var userAgent = request.UserAgent();
            if ((b.IsMatch(userAgent) || v.IsMatch(userAgent.Substring(0, 4))))
            {
                return true;
            }

            return false;
        }

        public static bool IsIOSDevice(this HttpRequest request)
        {
            string userAgent = request.UserAgent();
            return (userAgent.Contains("iPhone") || userAgent.Contains("iPod"));
        }

        public static string UserAgent(this HttpRequest request)
        {
            return request.Headers["User-Agent"];
        }
    }

    [Serializable]
    public class Filter
    {
        public string Metric { get; set; }
        public string Operator { get; set; }
        public int MetricValue { get; set; }
    }

    [Serializable]
    public class HistoricalWeatherParameter
    {
        public string cityId { get; set; }
        public string fromDate { get; set; }
        public string toDate { get; set; }
        public Filter[] filters { get; set; }
    }

    public class SearchResults
    {
        public List<CityWeatherStatsFinal.Models.DailyWeather> entries { get; set; }
        public float? averageHigh { get; set; }
        public float? averageLow { get; set; }
        public float? totalSnow { get; set; }
        public float? totalPrecip { get; set; }
        public float? maxHigh { get; set; }
        public float? maxLow { get; set; }
        public float? minHigh { get; set; }
        public float? minLow { get; set; }
    }

    public class HistoryController : Controller
    {
        private CityWeatherStatsFinal.Models.CityMetaDataContext cityContext;
        const string dailyWxURL = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?";
        const int limit = 1000;
        public enum NOAADataType { STATION, DAILY }

        public HistoryController(CityWeatherStatsFinal.Models.CityMetaDataContext cc)
        {
            cityContext = cc;
        }

        public IActionResult Index()
        {
            if (RequestExtensions.IsIOSDevice(Request))
                return View("~/Views/History/Index.Apple.cshtml");
            else if (RequestExtensions.IsMobileBrowser(Request))
               return View("~/Views/History/Index.Mobile.cshtml");
            else
            return View();
            
        }

        public IActionResult History ()
        {
            if (RequestExtensions.IsIOSDevice(Request))
                return View("~/Views/History/Index.Apple.cshtml");
            else if (RequestExtensions.IsMobileBrowser(Request))
                return View("~/Views/History/Index.Mobile.cshtml");
            else
                return View();

        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public JsonResult getCityMetaData(int citySize)
        {

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
                        x.ShortName,
                        x.citysize,
                        x.mindateShort,
                        x.maxdateShort
                    }).Where(x => (citySize == 1 && x.citysize == 1) 
                       ||
                       (
                            ( citySize == 2 )
                            &&
                            ( x.citysize == 1 || x.citysize == 2)
                        
                            
                       )
                       ||
                       (
                            (citySize == 3)
                            &&
                            (x.citysize == 1 || x.citysize == 2 || x.citysize == 3)
                       )

                    ).OrderBy(x => x.ShortName).ToList());
        }

        [HttpPost]
        //public JsonResult GetDailyWeather(string cityid, DateTime fromDate, DateTime toDate,List<Filter> filters)
        public JsonResult GetDailyWeather(HistoricalWeatherParameter p)
        {
            CityWeatherStatsFinal.Models.City md = new CityWeatherStatsFinal.Models.City();//(cityid, fromDate, toDate);
            md.cityid = p.cityId;
            md.mindate = DateTime.Parse(p.fromDate);
            md.maxdate = DateTime.Parse(p.toDate);
            bool init = true;
            int Rc = 0;
            System.Diagnostics.Debug.WriteLine(md.cityid);
            Console.WriteLine(md.cityid);
            DateTime startDate = md.mindate;
            //DateTime endDate = md.maxDate;
            DateTime endDate = DateTime.Now;
            List<CityWeatherStatsFinal.Models.DailyWeather> entries = new List<CityWeatherStatsFinal.Models.DailyWeather>();

            while (getStartEndTimes(ref startDate, ref endDate, ref init, md))
            {

                System.Diagnostics.Debug.WriteLine("Station: " + md.cityid + " StartTime is " + startDate.ToShortDateString() + "EndTime is " + endDate.ToShortDateString());
                Console.WriteLine("Station: " + md.cityid + " StartTime is " + startDate.ToShortDateString() + "EndTime is " + endDate.ToShortDateString());
                Rc = getNOAADailiesForCityTimePeriod(startDate, endDate, p.cityId, entries);

                if (Rc == -1)
                    return null;
            }


            // Apply the filters, if any.
            applyFilterOperator(p.filters,ref entries);

            // Get the summary averages and sums.
            SearchResults results = getSummary(entries);

            return Json(results);


        }

        private int getNOAADailiesForCityTimePeriod(DateTime start, DateTime end, string cityid, List<CityWeatherStatsFinal.Models.DailyWeather> entries)
        {
            dynamic jsonObj = null;
            int offset = 1;
            int insideCounter = 0;
            int outsideCounter = 0;
            string datatype = string.Empty;
            string jsonStr = string.Empty;
            CityWeatherStatsFinal.Models.DailyWeather dc = new CityWeatherStatsFinal.Models.DailyWeather();
            bool addNew = false;

            string cityName = cityContext.CityMetaData.Where(x => x.cityid == cityid).Select(x => x.name).First();
            string state = cityContext.CityMetaData.Where(x => x.cityid == cityid).Select(x => x.state).First();



            try
            {
                do
                {

                    jsonStr = downloadParseNOAAMetaData(NOAADataType.DAILY, offset, start, end, cityid);

                    jsonObj = JsonConvert.DeserializeObject(jsonStr);
                    JArray results = (JArray)jsonObj.results;
                    if (results == null)
                        continue;
                    //Console.WriteLine("Saving data for " + jsonObj.results[insideCounter].station);


                    insideCounter = 0;

                    while (insideCounter < results.Count)
                    {
                        // Look for existing record for this city and day
                        string cityidstr = jsonObj.results[insideCounter].station;
                        DateTime date = jsonObj.results[insideCounter].date;
                        addNew = false;
                        dc = entries.FirstOrDefault(x => x.cityid.Equals(cityidstr) && DateTime.Equals(x.date, date));


                        addNew = dc == null ? true : false;
                        dc = dc ?? new CityWeatherStatsFinal.Models.DailyWeather();
                        dc.name = cityName;
                        dc.state = state;
                        dc.cityid = jsonObj.results[insideCounter].station;
                        dc.date = jsonObj.results[insideCounter].date;
                        dc.datatype = jsonObj.results[insideCounter].datatype;

                        switch (dc.datatype)
                        {
                            case "PRCP":
                                dc.prcp = jsonObj.results[insideCounter].value;
                                break;
                            case "SNWD":
                                dc.snwd = jsonObj.results[insideCounter].value;
                                break;
                            case "SNOW":
                                dc.snow = jsonObj.results[insideCounter].value;
                                break;
                            case "WESD":
                                dc.wesd = jsonObj.results[insideCounter].value;
                                break;
                            case "WESF":
                                dc.wesf = jsonObj.results[insideCounter].value;
                                break;
                            case "TMAX":
                                dc.tmax = jsonObj.results[insideCounter].value;
                                break;
                            case "TMIN":
                                dc.tmin = jsonObj.results[insideCounter].value;
                                break;
                            case "TAVG":
                                dc.tavg = jsonObj.results[insideCounter].value;
                                break;
                        }
                        dc.attributes = jsonObj.results[insideCounter].attributes;
                        insideCounter++;

                        if (addNew)
                        {
                            //context.CityDailyWeather.Add(dc);
                            entries.Add(dc);
                        }
                    }
                    //Console.WriteLine("Saving for " + jsonObj.results[insideCounter].station);

                    //Console.WriteLine("Done saving for " + jsonObj.results[insideCounter].station);




                    //  Console.WriteLine("DONE saving data for " + jsonObj.results[insideCounter].station);
                    offset = (offset + 1000) <= (int)jsonObj.metadata.resultset.count ? offset += 1000 : offset += insideCounter;

                    outsideCounter += insideCounter;
                } while (outsideCounter < (int)jsonObj.metadata.resultset.count);
            }
            catch (RuntimeBinderException e)
            {
                System.Diagnostics.Debug.WriteLine("NO DATA FOR THIS TIME PERIOD!");
                System.Diagnostics.Debug.WriteLine(e.Message);
                System.Diagnostics.Debug.WriteLine(e.StackTrace);
                System.Diagnostics.Debug.WriteLine(e.InnerException);
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
                System.Diagnostics.Debug.WriteLine(e.StackTrace);
                System.Diagnostics.Debug.WriteLine(e.InnerException);

                Console.WriteLine(e.Message);
                Console.WriteLine(e.StackTrace);
                Console.WriteLine(e.InnerException);
                return -1;
            }
            return 0;

        }


        private string downloadParseNOAAMetaData(NOAADataType dataType, int offset = 1000, DateTime? startTime = null, DateTime? endTime = null, String cityId = null)
        {
            string jsonStr = null;
            string url = string.Empty;
            string outputStr = string.Empty;

            try
            {
                using (System.Net.WebClient client = new System.Net.WebClient())
                {
                    client.Headers.Add("token", "dAJmJjRSFJJujjcjVDmRVznwJjPiXBSa");

                    switch (dataType)
                    {
                        //case NOAADataType.STATION:
                        //    url = stationsURL + $"limit={limit.ToString()}&offset={offset}";
                        //    break;
                        case NOAADataType.DAILY:
                            string dtStart = String.Format("{0:yyyy-MM-dd}", startTime);
                            string dtEnd = String.Format("{0:yyyy-MM-dd}", endTime);
                            url = dailyWxURL + $"stationid={cityId}&datasetid=GHCND&limit={limit.ToString()}&offset={offset}&startdate={dtStart}&enddate={dtEnd}&limit={limit.ToString()}&units=Standard";
                            break;
                    }
                    Uri uri = new Uri(url);
                    jsonStr = client.DownloadString(uri);

                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                //return string.empty; 

            }
            return jsonStr;
        }

        private bool getStartEndTimes(ref DateTime startDate, ref DateTime endDate, ref bool init, CityWeatherStatsFinal.Models.City md)
        {
            if (!init)
            {
                if (startDate.AddYears(1) <= endDate)
                    startDate = startDate.AddYears(1);
                else if (startDate.AddYears(1) >= md.maxdate)
                    return false;
                init = false;
            }
            else
                init = false;


            endDate = startDate.AddYears(1) > md.maxdate ? md.maxdate : startDate.AddYears(1);

            return true;

        }

        private void applyFilterOperator(Filter[] filters, ref List<CityWeatherStatsFinal.Models.DailyWeather> entries)
        {
              
           foreach(Filter f in filters)
           {
               switch(f.Operator)
                {
                    case "GreaterThan":
                        entries = entries.Where(x => ((f.Metric == "Snowfall") && (x.snow > f.MetricValue))
                                      ||
                                      ((f.Metric == "Precipitation") && (x.prcp > f.MetricValue))
                                      ||
                                      ((f.Metric == "HighTemp") && (x.tmax > f.MetricValue))
                                      ||
                                      ((f.Metric == "LowTemp") && (x.tmin > f.MetricValue))
                                      ).ToList();
                                      break;

                    case "LessThan":
                        entries = entries.Where(x => ((f.Metric == "Snowfall") && (x.snow < f.MetricValue))
                                      ||
                                      ((f.Metric == "Precipitation") && (x.prcp < f.MetricValue))
                                      ||
                                      ((f.Metric == "HighTemp") && (x.tmax < f.MetricValue))
                                      ||
                                      ((f.Metric == "LowTemp") && (x.tmin < f.MetricValue))
                                      ).ToList();
                        break;

                    case "GreaterThanOrEqualTo":
                        entries = entries.Where(x => ((f.Metric == "Snowfall") && (x.snow >= f.MetricValue))
                                      ||
                                      ((f.Metric == "Precipitation") && (x.prcp >= f.MetricValue))
                                      ||
                                      ((f.Metric == "HighTemp") && (x.tmax >= f.MetricValue))
                                      ||
                                      ((f.Metric == "LowTemp") && (x.tmin >= f.MetricValue))
                                      ).ToList();

                        break;
                    case "LessThanOrEqualTo":
                        entries = entries.Where(x => ((f.Metric == "Snowfall") && (x.snow <= f.MetricValue))
                                      ||
                                      ((f.Metric == "Precipitation") && (x.prcp <= f.MetricValue))
                                      ||
                                      ((f.Metric == "HighTemp") && (x.tmax <= f.MetricValue))
                                      ||
                                      ((f.Metric == "LowTemp") && (x.tmin <= f.MetricValue))
                                      ).ToList();
                        break;
                    case "Equals":
                        entries = entries.Where(x => ((f.Metric == "Snowfall") && (x.snow == f.MetricValue))
                                      ||
                                      ((f.Metric == "Precipitation") && (x.prcp == f.MetricValue))
                                      ||
                                      ((f.Metric == "HighTemp") && (x.tmax == f.MetricValue))
                                      ||
                                      ((f.Metric == "LowTemp") && (x.tmin == f.MetricValue))
                                      ).ToList();

                        break;
                    default:break;
                }
           }
        }

        private SearchResults getSummary(List<CityWeatherStatsFinal.Models.DailyWeather> entries)
        {
            SearchResults rc = new SearchResults();
            rc.averageHigh = entries.Average(x => x.tmax);
            rc.averageLow = entries.Average(x => x.tmin);
            rc.totalPrecip = entries.Sum(x => x.prcp);
            rc.totalSnow = entries.Sum(x => x.snow);
            rc.maxHigh = entries.Max(x => x.tmax);
            rc.maxLow = entries.Max(x => x.tmin);
            rc.minHigh = entries.Min(x => x.tmax);
            rc.minLow = entries.Min(x => x.tmin);


            rc.entries = entries;

            return rc;

        }

        public IActionResult MobileIndex()
        {
            return View();
        }

    }
}
