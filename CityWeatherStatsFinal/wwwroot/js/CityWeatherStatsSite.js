var isMobile;
var isIos;
var CityMetaData;

$(document).ready(function () {

    if (sessionStorage.getItem('CityDataCachedLoaded') != 'cached')
       fillCityMetaDataCache();

    // Either way, load the global array with what's in the cache now. 
    CityMetaData = JSON.parse(sessionStorage.getItem('CityMetaData'));

    isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    //isMobile = true;
        
    isIos = navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
       
    if (window.location.href == "https://" + window.location.host + "/History"
        || (window.location.href == "https://" + window.location.host + "/History#")
    ) {
        $("#Summary").hide();
        $("#Details").hide();

        // Initialize the city list for the history report.
        InitializeCityList('CityPicker');

    }
    else if ((window.location.href == "https://" + window.location.host + "/ExtremeWx/TopXReport")
        || (window.location.href == "https://" + window.location.host + "/ExtremeWx/MonthlyAveragesReport")) {

        $("#ExtremeReport1DisplayPanel").hide();

        //$('.bootstrap-select.btn-group .dropdown-toggle .filter-option ').css('color', '#db5079').css('background-color', 'lightblue').css('height', '40px').css('width', '400px').css('font-size', '24px');
        $("#datepicker2").css('background-color', 'white').css('color', 'silver').css('height', '40px').css('font-size', '24px').css('font-weight', 'bolder');
        $("#datepicker").css('background-color', 'white').css('color', 'silver').css('height', '40px').css('font-size', '24px').css('font-weight', 'bolder');

        // Initialize the city list for the history report.
        InitializeCityList('CityPicker2');

    }
    else if ((window.location.href == "https://" + window.location.host + "/ExtremeWx/Report")) {
        $("#ExtremeReport1DisplayPanel").hide();
        InitializeCityList('CityPicker2');
    }
    else if (window.location.href == "https://" + window.location.host + "/ExtremeWx/Cities4WeatherEvents")
    {
            AddInitialExtremeFilter();
        
    }

    else if (window.location.href == "https://" + window.location.host + "/ExtremeWx/") {

        //$('.bootstrap-select.btn-group .dropdown-toggle .filter-option ').css('color', '#db5079').css('background-color', 'lightblue').css('height', '40px').css('width', '400px').css('font-size', '24px');
        $("#datepicker2").css('background-color', 'white').css('color', 'silver').css('height', '40px').css('font-size', '24px').css('font-weight', 'bolder');
        $("#datepicker").css('background-color', 'white').css('color', 'silver').css('height', '40px').css('font-size', '24px').css('font-weight', 'bolder');

        // Initialize the city list for the history report.
        InitializeCityList('CityPicker2');
    }
    else if (window.location.href == "https://" + window.location.host + "/") {
        isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        loadCarouselImages();
    }
    else if (window.location.href == "https://" + window.location.host + "/Home/UnderConstruction")
        countdown('Climatology');
    else if (window.location.href == "https://" + window.location.host + "/Home/UnderConstruction2")
        countdown('Dashboard');
    else if ((window.location.href == "https://" + window.location.host + "/History/About") && isMobile) {


        // History example 1 images for mobile.
        
        $('#Example1-1').attr('src', '../../images/Historical Mobile 1-1.png');
        $('#Example1-2').attr('src', '../../images/Historical Mobile 1-2.png');
        $('#Example1-3').css({ 'width': '90%', 'height': '300px' }).show();

        // History example 2 images for mobile.
        $('#Example2-1').attr('src', '../../images/Historical Mobile 2-1.png');
        $('#Example2-2').attr('src', '../../images/Historical Mobile 2-2.png');
        $('#Example2-3').show();


        
    }
    else if ((window.location.href == "https://" + window.location.host + "/ExtremeWx/About") && isMobile) {


        // Topx Report example 1 images for mobile.

        $('#Example1-1').attr('src', '../../images/TopX Mobile 1-1.png');
        $('#Example1-2').attr('src', '../../images/TopX Mobile 1-2.PNG');
        $('#Example1-3').attr('src', '../../images/TopX Mobile 1-3.PNG');

        // Topx Report example 2 images for mobile.
        $('#Example2-1').attr('src', '../../images/TopX Mobile 2-1.PNG');
        $('#Example2-2').attr('src', '../../images/TopX Mobile 2-2.PNG');
        $('#Example2-3').attr('src', '../../images/TopX Mobile 2-3.PNG');

        // Topx Report example 3 images for mobile.
        $('#Example3-1').attr('src', '../../images/TopX Mobile 3-1.PNG');
        $('#Example3-2').attr('src', '../../images/TopX Mobile 3-2.PNG');
        $('#Example3-3').attr('src', '../../images/TopX Mobile 3-3.PNG');

        // Monthly Average example 1 for mobile.
        $('#MonthlyAvgExample1-1').attr('src', '../../images/MonthlyAve Mobile 1-1.png');
        $('#MonthlyAvgExample1-2').attr('src', '../../images/MonthlyAve Mobile 1-2.PNG');
        $('#MonthlyAvgExample1-3').attr('src', '../../images/MonthlyAve Mobile 1-3.PNG');


        // Monthly Average example 1 for mobile.
        $('#MonthlyAvgExample2-1').attr('src', '../../images/MonthlyAve Mobile 2-1.PNG');
        $('#MonthlyAvgExample2-2').attr('src', '../../images/MonthlyAve Mobile 2-2.PNG');
        $('#MonthlyAvgExample2-3').attr('src', '../../images/MonthlyAve Mobile 2-3.PNG');


    }

    $('li.active').removeClass('active');
    $('a[href="' + location.pathname + '"]').closest('li').addClass('active');

});


function loadCarouselImages() {

    let cities = ['Atlanta', 'Baltimore', 'Philadelphia', 'Washington', 'Boston', 'New York',
        'Buffalo', 'Pittsburgh', 'Cleveland', 'Cincinatti', 'Charlotte', 'Miami', 'Houston','Indianapolis'
        ,'Dallas', 'Kansas city', 'St. Louis', 'Minneapolis', 'Chicago', 'Denver', 'Seattle', 'Phoenix','Portland'
        , 'San Francisco', 'Los Angeles', 'San Diego', 'Honolulu'];

    //var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
       

    let colors = ['AliceBlue', 'Azure', 'BlanchedAlmond','Orchid', 'DarkOrange', 'LightYellow', 'Cyan', 'WhiteSmoke', 'SkyBlue',
        'SlateGray', 'Sienna', 'SandyBrown', 'Gold', 'Seashell', 'Pink', 'Plum', 'Aqua', 'Beige', 'Moccasin', 'DodgerBlue'
    ,   'Wheat','Teal','Khaki','AliceBlue','Coral'] 

    cities.sort();
    var parent = $("#carouselTagStart");
    
    cities.forEach(function (item, index) {
        //alert('the color is ' + colors[index]);
        var ia = null;
        if (index == 0)
            ia = $('<div>').addClass('item active')
        else
            ia = $('<div>').addClass('item');

        var dummyrow = $('<div>').addClass('row').css('height', '10px');
        var row = $('<div>').addClass('row');
        var headcol = $('<div>').addClass('col-md-4').attr('id', 'CarouselHeader1');//css('background-color', 'lavender').css('font-size', '20px').css('font-family', 'Broadway').css('color', 'black');
        var headcol2; 
        var headcol3;

        // Need <p> to add whitespace before the city name as it's bumping too far left. 
        var cityNameHeader = $('<p>').text(" " + item).css('margin-left', '15px');
        var cityNameHeader2;
        var cityNameHeader3;
        headcol.append(cityNameHeader);

        if (isMobile) {
            var table = $('<table>').css('margin', '0 auto');
            var tr = $('<tr>');
            var td = $('<td>');
            //var td2 = $('<td>');
            //var td3 = $('<td>');

            td.text(item).css('padding', '5px');
            //td2.text(item).css('padding', '5px');
            //td3.text(item).css('padding', '5px');

            tr.append(td);
            table.append(tr);
            row.append(table);
           
        }
        else {
            headcol2 = $('<div>').addClass('col-md-4').attr('id', 'CarouselHeader2');//.css('background-color', 'lavender').css('font-size', '20px').css('font-family', 'Broadway').css('color', 'black');
            headcol3 = $('<div>').addClass('col-md-4').attr('id', 'CarouselHeader3');//.css('background-color', 'lavender').css('font-size', '20px').css('font-family', 'Broadway').css('color', 'black');

            cityNameHeader2 = $('<p>').text(" " + item).css('margin-left', '20px');
            headcol2.append(cityNameHeader2);
            cityNameHeader3 = $('<p>').text(" " + item).css('margin-left', '20px');
            headcol3.append(cityNameHeader3);
            row.append(headcol, headcol2, headcol3);
        }
        ia.append(dummyrow);
        ia.append(row);

        var row2 = $('<div>').addClass('row');
        var row3 = $('<div>').addClass('row');
        var colSummer;
        var imgSummer;
        var season;
        var colFall;
        var imgFall;
        var colWinter;
        var imgWinter;
        var colSpring;
        var imgSpring;

        if (isIos || isMobile)
        {
            var table = $('<table>').css('margin', '0 auto');
            var tr = $('<tr>');

            var tr = $('<tr>');
            var tr2 = $('<tr>');
            var tr3 = $('<tr>');
            var tr4 = $('<tr>');
            var td = $('<td>');

            imgSummer = $('<img>').attr('src', "../images/" + item + " summer.png");
            imgFall = $('<img>').attr('src', '../images/' + item + ' fall.png');
            imgWinter = $('<img>').attr('src', '../images/' + item + ' winter.png');
            imgSpring = $('<img>').attr('src', '../images/' + item + ' spring.png');

            var summerContainer = $('<div>').addClass('container').css('position', 'relative').css('text-align', 'center').css('color', 'white');
            season = $('<div>').addClass('centered centered-summer').text('Summer');
            summerContainer.append(imgSummer, season);
            td.append(summerContainer);
            tr.append(td);

            var fallContainer = $('<div>').addClass('container').css('position', 'relative').css('text-align', 'center').css('color', 'white');
            season = $('<div>').addClass('centered centered-fall').text('Fall');
            fallContainer.append(imgFall, season);
            td = $('<td>');
            td.append(fallContainer);
            tr2.append(td);

            var winterContainer = $('<div>').addClass('container').css('position', 'relative').css('text-align', 'center').css('color', 'white');
            season = $('<div>').addClass('centered centered-winter').text('Winter');
            winterContainer.append(imgWinter, season);
            td = $('<td>');
            td.append(winterContainer);
            tr3.append(td);

            var springContainer = $('<div>').addClass('container').css('position', 'relative').css('text-align', 'center').css('color', 'white');
            season = $('<div>').addClass('centered centered-spring').text('Spring');
            springContainer.append(imgSpring, season);
            td = $('<td>');
            td.append(springContainer);
            tr4.append(td);

            table.append(tr,tr2,tr3,tr4);
            row2.append(table);
            ia.append(row2);
            parent.append(ia);
        }
        
        //else if (isMobile) {
        //    var table = $('<table>').css('margin', '0 auto');
        //    var tr = $('<tr>');
        //    var td = $('<td>');
        //    var td2 = $('<td>');
        //    var td3 = $('<td>');
        //    var td4 = $('<td>');
        //    imgSummer = $('<img>').attr('src', "../images/" + item + " summer.png");
        //    imgFall = $('<img>').attr('src', '../images/' + item + ' fall.png');
        //    imgWinter = $('<img>').attr('src', '../images/' + item + ' winter.png');
        //    imgSpring = $('<img>').attr('src', '../images/' + item + ' spring.png');

        //    var summerContainer = $('<div>').addClass('container').css({ 'position': 'relative', 'text-align': 'center', 'color': 'white'});
        //    season = $('<div>').addClass('centered centered-summer').text('Summer');
        //    summerContainer.append(imgSummer, season);
        //    td.append(summerContainer);

        //    var fallContainer = $('<div>').addClass('container').css({ 'position': 'relative', 'text-align': 'center', 'color': 'white', 'width': '60px', 'height': '60px' });
        //    season = $('<div>').addClass('centered centered-fall').text('Fall');
        //    fallContainer.append(imgFall, season);
        //    td2.append(fallContainer);

        //    var winterContainer = $('<div>').addClass('container').css('position', 'relative').css({ 'position': 'relative', 'text-align': 'center', 'color': 'white', 'width': '60px', 'height': '60px' });
        //    season = $('<div>').addClass('centered centered-winter').text('Winter');
        //    winterContainer.append(imgWinter, season);
        //    td3.append(winterContainer);

        //    var springContainer = $('<div>').addClass('container').css({ 'position': 'relative', 'text-align': 'center', 'color': 'white', 'width': '60px', 'height': '60px' });
        //    season = $('<div>').addClass('centered centered-spring').text('Spring');
        //    springContainer.append(imgSpring, season);
        //    td4.append(springContainer);

        //    tr.append(td, td2,td3,td4);
        //    table.append(tr);
        //    row2.append(table);
        //    ia.append(row2);
        //    parent.append(ia);
        //}
        else {

            colSummer = $('<div>').addClass('col-sm-3');
            imgSummer = $('<img>').attr('src', "../images/" + item + " summer.png");
            season = $('<div>').addClass('centered centered-summer').text('Summer');
            colSummer.append(imgSummer, season);

            colFall = $('<div>').addClass('col-sm-3');
            imgFall = $('<img>').attr('src', '../images/' + item + ' fall.png');
            season = $('<div>').addClass('centered centered-fall').text('Fall');
            colFall.append(imgFall, season);

            colWinter = $('<div>').addClass('col-sm-3');
            imgWinter = $('<img>').attr('src', '../images/' + item + ' winter.png');
            season = $('<div>').addClass('centered centered-winter').text('Winter');
            colWinter.append(imgWinter, season);


            colSpring = $('<div>').addClass('col-sm-3');
            imgSpring = $('<img>').attr('src', '../images/' + item + ' spring.png');
            season = $('<div>').addClass('centered centered-spring').text('Spring');
            colSpring.append(imgSpring, season);

            row2.append(colSummer, colFall, colWinter, colSpring);
            ia.append(row2);
            parent.append(ia);
        }
        
    });

}

$("#btnSubmit").click(function () {
    //isIos = true;

    // Clear any results from previos run
    $("#Summary").empty();
    $("#Details").empty();

    $("#Summary").hide();
    $("#Details").hide();

    var cityid = $("#CityPicker").val();

    if (isMobile) {
        var FromDate = $("#datepickerReport2From").val();
        var ToDate = $("#datepickerReport2To").val();
    }
    else {
        var FromDate = $("#datepicker").val();
        var ToDate = $("#datepicker2").val();
    }

    // Clear any results that are hanging around.
    
    //var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    clearErrors();
    if (validate('Historical') != true)
        return;

    // Remove any existing table
    $('#Container').empty();
    $('#Summary').empty();

    // Turn on progress bar
    $("#ProgressBar").css('display', 'block');
    $(".progress-bar").css('width', '50%').text('Pulling Data From NOAA');

    var filters = new Array();

    $("#filterTable tr").each(function () {

        if (isMobile) {
            var row = $(this);
            var filter = {};
            filter.Metric = row.find("td").eq(2).find('select option:selected').val();
            filter.Operator = row.find("td").eq(3).find('select option:selected').val();
            filter.MetricValue = row.find("td").eq(4).find('input').val();
            filters.push(filter);
        }
        else {
            var row = $(this);
            var filter = {};
            filter.Metric = row.find("td").eq(1).find('select option:selected').val();
            filter.Operator = row.find("td").eq(2).find('select option:selected').val();
            filter.MetricValue = row.find("td").eq(3).find('input').val();
            filters.push(filter);
        }
    });

    var cityIdLabel = $("#CityPicker option:selected").text();
    var data = {
        cityId: cityid,
        fromDate: FromDate,
        toDate: ToDate,
        filters: filters
    };

    $.ajax({
        url: "/History/GetDailyWeather",
        type: "POST",
        dataType: 'json',
        data: data
        ,success: function (response) {

            // Update progress
            $(".progress-bar").css('width', '50%').text('50% -  Received Data');

            // Summary Line
            if (response.entries.length > 0) {
                //$("#summarybanner").html('  ' + response.entries[0].name + " from " + FromDate + " To " + ToDate);
                var avgHigh = parseFloat(response.averageHigh).toFixed(0);
                var avgLow = parseFloat(response.averageLow).toFixed(0);
                var totalSnow = parseFloat(response.totalSnow).toFixed(2);
                var totalPrecip = parseFloat(response.totalPrecip).toFixed(2);

                var avgHighLine = $("<p style='text-align:center'></p>").text('Average High: ' + (avgHigh.toString() == 'NaN' ? "NA" : avgHigh.toString() + String.fromCharCode(176)));
                var avgLowLine = $("<p style='text-align:center'></p>").text('Average Low: ' + (avgLow.toString() == 'NaN' ? "NA" : avgLow.toString() + String.fromCharCode(176)));
                var totalPrecipLine = $("<p style='text-align:center'></p>").text('Total Precip: ' + (totalPrecip.toString() == 'NaN' ? "NA" : totalPrecip.toString() + '"'));
                var totalSnow = $("<p style='text-align:center'></p>").text('Total Snow: ' + (totalSnow.toString() == 'NaN' ? "NA" : totalSnow.toString() + '"'));

                var maxHighLine = $("<p style='text-align:center'></p>").text('Maximum High: ' + (response.maxHigh == null ? "NA" : response.maxHigh + String.fromCharCode(176)));
                var maxLowLine = $("<p style='text-align:center'></p>").text('Maximum Low: ' + (response.maxLow == null ? "NA" : response.maxLow + String.fromCharCode(176)));
                var minHighLine = $("<p style='text-align:center'></p>").text('Minimum High: ' + (response.minHigh == null ? "NA" : response.minHigh + String.fromCharCode(176)));
                var minLowLine = $("<p style='text-align:center'></p>").text('Minimum Low: ' + (response.minLow == null ? "NA" : response.minLow + String.fromCharCode(176)));
                
                // Bug: Fix date for mobile devices. 
                if ( isMobile ) {
                    FromDate = formatDate(FromDate,1);
                    ToDate = formatDate(ToDate,1);
                }

                var summaryText = $("<p></p>").text("SUMMARY for " + response.name + " from " + FromDate + " To " + ToDate);
                var detailsText = $("<p></p>").text("DETAILS for " + response.name + " from " + FromDate + " To " + ToDate);

                var innerdiv = $("<div></div >").addClass('row');
                var firstquart = $("<div></div>").addClass('col-sm-3');
                firstquart.append(avgHighLine);
                innerdiv.append(firstquart);

                var secondquart = $("<div></div>").addClass('col-sm-3');
                secondquart.append(avgLowLine);
                innerdiv.append(secondquart);

                var thirdquart = $("<div></div>").addClass('col-sm-3');
                thirdquart.append(totalPrecipLine);
                innerdiv.append(thirdquart);

                var fourthquart = $("<div></div>").addClass('col-sm-3');
                fourthquart.append(totalSnow);
                innerdiv.append(fourthquart);

                var innerdiv2 = $("<div></div >").addClass('row');
                var firstquart2 = $("<div></div>").addClass('col-sm-3');
                firstquart2.append(maxHighLine);
                innerdiv2.append(firstquart2);

                var secondquart2 = $("<div></div>").addClass('col-sm-3');
                secondquart2.append(maxLowLine);
                innerdiv2.append(secondquart2);

                var thirdquart2 = $("<div></div>").addClass('col-sm-3');
                thirdquart2.append(minHighLine);
                innerdiv2.append(thirdquart2);

                var fourthquart2 = $("<div></div>").addClass('col-sm-3');
                fourthquart2.append(minLowLine);
                innerdiv2.append(fourthquart2);

                $("#Summary").append(summaryText, innerdiv, innerdiv2);



                //Details
                var table = $("<table></table>").addClass('table table-striped').addClass('table-bordered');
                table.addClass('table');
                var thead = $("<thead></thead>").addClass('thead-dark');
                var tbody = $("<tbody></tbody>")
                var trhead = $('<tr></tr>');

                var th = $('<th></th>');
                var th2 = $('<th></th>');
                var th3 = $('<th></th>');
                var th4 = $('<th></th>');
                var th5 = $('<th></th>');
                var th6 = $('<th></th>');
                var th7 = $('<th></th>');

                //$(th).attr('scope', 'col').text('City');
                //$(th2).attr('scope', 'col').text('State');
                $(th3).attr('scope', 'col').text('Date');
                $(th4).attr('scope', 'col').text('High');
                $(th5).attr('scope', 'col').text('Low');
                $(th6).attr('scope', 'col').text('Precip (inches)');
                $(th7).attr('scope', 'col').text('Snowfall (inches)');

                trhead.append(th3, th4, th5, th6, th7);


                thead.append(trhead);
                table.append(thead, tbody);

                var cityName = "";
                var State = "";
                var theDate = "";
                var High = "";
                var Low = "";
                var Precip = "";
                var Snow = "";
                var tablerow = "";


                for (var i = 0; i < response.entries.length; i++) {
                    tablerow = $("<tr></tr>");

                    var temp = response.entries[i].date.substr(0, 10);
                    var dateArray = temp.split('-');

                    //theDate = $("<td></td>").text((temp.getMonth() + 1) + "/" + (temp.getDate()) + "/" + temp.getFullYear());
                    theDate = $("<td></td>").text(dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0]);
                    High = $("<td></td>").text(response.entries[i].tmax == null ? "Data Not Available" : response.entries[i].tmax + String.fromCharCode(176));
                    Low = $("<td></td>").text(response.entries[i].tmin == null ? "Data Not Available" : response.entries[i].tmin + String.fromCharCode(176));
                    Precip = $("<td></td>").text(response.entries[i].prcp == null ? "Data Not Available" : response.entries[i].prcp + String.fromCharCode(34));
                    Snow = $("<td></td>").text(response.entries[i].snow == null ? "Data Not Available" : response.entries[i].snow + String.fromCharCode(34));

                    tablerow.append(theDate, High, Low, Precip, Snow);

                    $(table).append(tablerow);

                    $('#Details').append(detailsText, table);
                    $('#Details').css('overflow', 'scroll');

                    $("#Summary").show();
                    $("#Details").show();
                }
            }
            else
            {
                var p = $('<p></p>')
                p.text('No Data To Show').css('color', 'red').css('font-size', '20px');
                $('#Summary').append(p);
                $("#Summary").show();
            }
                          
            $(".progress-bar").css('width', '100%').text('100% - Done ');
            $("#ProgressBar").css('display', 'none');
            

        },
        error: function (xhr, status, error) {
            alert("The NOAA site down. Please try this again later.");
            //alert(xhr.responseText);
            //alert(error.responseText);
            //alert(status.responseText);
            $("#ProgressBar").css('display', 'none');

        }
    });
                
});
    
$("#btnSubmit2").click(function () {

    clearErrors();
    if (validate('Extreme') != true)
        return;

    // Clear any results from previos run
    $("#ExtremeReport2DisplayPanel").hide();

    // Remove any existing table
    $('#Container').empty();
    $('#Summary').empty();

    // Turn on progress bar
    $("#ProgressBar").css('display', 'block');
    $(".progress-bar").css('width', '30%').text('30% - Pulling Data');
    //$("#THELOADER").css('display', 'block');

    var cityIdLabel = $("#CityPicker2 option:selected").val();
    var extremeWxType = $("#xtremeWx2 option:selected").val();
    var topn = $("#TopnReport2").val();
    var from = null;
    var to = null;

    var yesornovalue;
    if (isMobile) {
        yesornovalue = $('input[name="optyesnoTopXMobile"]:checked').val();
    }
    else {
        yesornovalue = $('input[name="optyesno"]:checked').val();
    }


    if (yesornovalue == 'yes') {

        if (isMobile) {
            from = $("#datepickerReport2From").val();
            to = $("#datepickerReport2To").val();
        }
        else {
            from = $("#datepicker").val();
            to = $("#datepicker2").val();
        }

    }

    $.ajax({
        url: "/ExtremeWx/GetExtremeWeather",
        type: "POST",
        dataType: 'json',
        data: {
            topn: topn,
            metric: extremeWxType,
            cityList: cityIdLabel,
            from: from,
            to: to
        },
        success: function (response) {

            // Update progress
            $(".progress-bar").css('width', '50%').text('50% -  Received Data');


            if (response.entries.length == 0) {
                var p = $('<p></p>')
                p.text('No Data To Show').css('color', 'red').css('font-size', '20px');
                $('#Container').append(p);
                $('#Container').show();
                $("#ProgressBar").css('display', 'none');
                $("#ExtremeReport2DisplayPanel").show();
                
            }
            else
            {

                // Add dates to summary line if time period was used.
                var summaryLine;
                if (yesornovalue == 'yes') {

                    // Bug: Fix date format for mobile devices.
                    if (isMobile) {
                        from = formatDate(from,1);
                        to = formatDate(to,1);
                    }

                    summaryLine = $("<span></span>").text("The Top " + topn + " " + extremeWxType + " day(s) for " + response.shortname + ", " + response.state +
                        " from " + from + " to " + to + " are:");
                }
                else {
                    summaryLine = $("<span></span>").text("Top " + topn + " " + extremeWxType + " day(s) for " + response.shortname + ", " + response.state).css('text-align', 'center');
                }
                summaryLine.css({
                    'font-size': '24px',
                    'font-family': 'Arial',
                    'font-weight': 'bolder',
                    'color': 'deepskyblue'
                    
                });
                
                $("#Summary").css('background-color','white').append(summaryLine);
            
            

            //Details
            var table = $("<table></table>").addClass('table table-striped').addClass('table-bordered').css('overflow', 'scroll');
            table.addClass('table');
            var thead = $("<thead></thead>").addClass('thead-dark');
            var tbody = $("<tbody></tbody>")
            var trhead = $('<tr></tr>');

            var th = $('<th></th>');
            var th2 = $('<th></th>');
            var th3 = $('<th></th>');
            var th4 = $('<th></th>');
            var th5 = $('<th></th>');
            var th6 = $('<th></th>');
            var th7 = $('<th></th>');

            $(th).attr('scope', 'col').text('Rank');
            $(th3).attr('scope', 'col').text('Date');
            $(th4).attr('scope', 'col').text('High');
            $(th5).attr('scope', 'col').text('Low');
            $(th6).attr('scope', 'col').text('Precip (inches)');
            $(th7).attr('scope', 'col').text('Snowfall (inches)');

            // Arrange the order of the columns based on the metric.
            if (extremeWxType == 'Snowiest') {
                trhead.append(th, th3, th7.css('color', 'red').css('font-size', '24px'), th4, th5, th6);
            }
            else if (extremeWxType == 'Wettest') {
                trhead.append(th, th3, th6.css('color', 'red').css('font-size', '24px'), th7, th4, th5);
            }
            else if (extremeWxType == 'Warmest Highs') {
                trhead.append(th, th3, th4.css('color', 'red').css('font-size', '24px'), th5, th6, th7);
            }
            else if (extremeWxType == 'Warmest Lows') {
                trhead.append(th, th3, th5.css('color', 'red').css('font-size', '24px'), th4, th6, th7);
            }
            else if (extremeWxType == 'Coldest Highs') {
                trhead.append(th, th3, th4.css('color', 'red').css('font-size', '24px'), th5, th6, th7);
            }
            else if (extremeWxType == 'Coldest Lows') {
                trhead.append(th, th3, th5.css('color', 'red').css('font-size', '24px'), th4, th6, th7);
            }

            thead.append(trhead);
            table.append(thead, tbody);

            //var cityName = "";
            //var State = "";
            var theDate = "";
            var High = "";
            var Low = "";
            var Precip = "";
            var Snow = "";
            var tablerow = "";
            var rank = "";

                for (var i = 0; i < response.entries.length; i++) {
                    tablerow = $("<tr></tr>");
                    //cityName = $("<td></td>").text(response.entries[i].name);
                    //State = $("<td></td>").text(response.entries[i].state);
                    var temp = new Date(response.entries[i].date.substr(0, 10));
                    theDate = $("<td></td>").text((temp.getMonth() + 1) + "/" + temp.getDate() + "/" + temp.getFullYear());

                    rank = $("<td></td>").text('#' + (i + 1))
                    High = $("<td></td>").text(response.entries[i].tmax + String.fromCharCode(176));
                    Low = $("<td></td>").text(response.entries[i].tmin + String.fromCharCode(176));
                    Precip = $("<td></td>").text(response.entries[i].prcp + '"');
                    Snow = $("<td></td>").text(response.entries[i].snow + '"');

                    if (extremeWxType == 'Snowiest') {
                        tablerow.append(rank, theDate, Snow.css('color', 'red').css('font-size', '24px'), High, Low, Precip);
                    }
                    else if (extremeWxType == 'Wettest') {
                        tablerow.append(rank, theDate, Precip.css('color', 'red').css('font-size', '24px'), Snow, High, Low);
                    }
                    else if (extremeWxType == 'Warmest Highs') {
                        tablerow.append(rank, theDate, High.css('color', 'red').css('font-size', '24px'), Low, Precip, Snow);
                    }
                    else if (extremeWxType == 'Warmest Lows') {
                        tablerow.append(rank, theDate, Low.css('color', 'red').css('font-size', '24px'), High, Precip, Snow);
                    }
                    else if (extremeWxType == 'Coldest Highs') {
                        tablerow.append(rank, theDate, High.css('color', 'red').css('font-size', '24px'), Low, Precip, Snow);
                    }
                    else if (extremeWxType == 'Coldest Lows') {
                        tablerow.append(rank, theDate, Low.css('color', 'red').css('font-size', '24px'), High, Precip, Snow);
                    }



                    $(table).append(tablerow);
                }

                    $('#Container').append(table);
                    $('#Container').css('overflow', 'scroll');
                    $(".progress-bar").css('width', '100%').text('100% - Done ');
                    $("#ProgressBar").css('display', 'none');

                    // Unhide the panel
                    $("#ExtremeReport2DisplayPanel").css('overflow', 'scroll').show();
            }
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
            alert(error.responseText);
            alert(status.responseText);
        }
    });
});

$("#btnYearToYearAvgSubmit").click(function () {

    clearErrors();
    $("#ExtremeReport1DisplayPanel").hide();
    if (validate('MonthlyAverages') != true)
        return;

    // Remove any existing table
    $('#Container').empty();
    $('#Summary2').empty();

    // Turn on progress bar
    $("#ProgressBar").css('display', 'block');
    $(".progress-bar").css('width', '30%').text('30% - Pulling Data');

    var cityId = $("#CityPicker2 option:selected").val();
    var yearFrom = $("#fromYearReport1").val();
    var yearTo = $("#toYearReport1").val();

    $.ajax({
        url: "/ExtremeWx/GetMonthlyAverages",
        type: "POST",
        dataType: 'json',
        data: {
            cityID: cityId,
            fromYear: yearFrom,
            toYear: yearTo
        },
        success: function (response) {

            if (jQuery.isEmptyObject(response)) {
                var p = $('<p></p>')
                p.text('No Data To Show').css('color', 'red').css('font-size', '20px');
                $('#Container').append(p);

                $(".progress-bar").css('width', '100%').text('100% - Done ');
                $("#ProgressBar").css('display', 'none');

                // Unhide the panel
                $("#ExtremeReport1DisplayPanel").show();
                $("#ExtremeReport1DisplayPanel").css('background-color', 'lavendar');
                return;
            }

            // Update progress
            $(".progress-bar").css('width', '50%').text('50% -  Received Data');

            // Summary Line
            $('#Summary2').text('Cities with the');
            $('#Summary2-Line2').text(response.startyear + ' - ' + response.endyear);

            //Details
            var table = $("<table></table>").addClass('table table-striped').addClass('table-bordered');
            table.addClass('table');
            var thead = $("<thead></thead>").addClass('thead-dark');
            var tbody = $("<tbody></tbody>")
            var trhead = $('<tr></tr>');

            var th = $('<th></th>');
            var th2 = $('<th></th>');
            var th3 = $('<th></th>');
            var th4 = $('<th></th>');
            var th5 = $('<th></th>');
            var th6 = $('<th></th>');
            var th7 = $('<th></th>');
            var th8 = $('<th></th>');
            var th9 = $('<th></th>');
            var th10 = $('<th></th>');
            var th11 = $('<th></th>');
            var th12 = $('<th></th>');
            var th13 = $('<th></th>');

            $(th).attr('scope', 'col').text('Year');
            $(th2).attr('scope', 'col').text('January');
            $(th3).attr('scope', 'col').text('February');
            $(th4).attr('scope', 'col').text('March');
            $(th5).attr('scope', 'col').text('April');
            $(th6).attr('scope', 'col').text('May');
            $(th7).attr('scope', 'col').text('June');
            $(th8).attr('scope', 'col').text('July');
            $(th9).attr('scope', 'col').text('August');
            $(th10).attr('scope', 'col').text('September');
            $(th11).attr('scope', 'col').text('October');
            $(th12).attr('scope', 'col').text('November');
            $(th13).attr('scope', 'col').text('December');
            
            trhead.append(th,th2,th3, th4, th5, th6, th7,th8,th9,th10,th11,th12,th13);

            thead.append(trhead);
            table.append(thead, tbody);

            //var cityName = "";
            //var State = "";
            var theYear = "";
            var January = "";
            var February = "";
            var March = "";
            var April = "";
            var May = "";
            var June = "";
            var July = "";
            var August = "";
            var September = "";
            var October = "";
            var November = "";
            var December = "";

            var yearAverageHash = response.monthlyData;
            var city = response.city;
            var state = response.state;

            for (var key in yearAverageHash)
            {
                tablerow = $("<tr></tr>");
                //cityName = $("<td></td>").text(response.entries[i].name);
            //State = $("<td></td>").text(response.entries[i].state);
                var keyValue = key;
                var theArray = yearAverageHash[key];
                //var jan = theArray[0];


                theYear = $("<td></td>").text(key);
                January = $("<td></td>").text(Math.round(10 * theArray[0]) / 10 + String.fromCharCode(176));
                February = $("<td></td>").text(Math.round(10 * theArray[1]) / 10 + String.fromCharCode(176));
                March = $("<td></td>").text(Math.round(10 * theArray[2]) / 10 + String.fromCharCode(176));
                April = $("<td></td>").text(Math.round(10 * theArray[3]) / 10 + String.fromCharCode(176));
                May = $("<td></td>").text(Math.round(10 * theArray[4]) / 10 + String.fromCharCode(176));
                June = $("<td></td>").text(Math.round(10 * theArray[5]) / 10 + String.fromCharCode(176));
                July = $("<td></td>").text(Math.round(10 * theArray[6]) / 10 + String.fromCharCode(176));
                August = $("<td></td>").text(Math.round(10 * theArray[7]) / 10 + String.fromCharCode(176));
                September = $("<td></td>").text(Math.round(10 * theArray[8]) / 10 + String.fromCharCode(176));
                October = $("<td></td>").text(Math.round(10 * theArray[9]) / 10 + String.fromCharCode(176));
                November = $("<td></td>").text(Math.round(10 * theArray[10]) / 10 + String.fromCharCode(176));
                December = $("<td></td>").text(Math.round(10 * theArray[11]) / 10 + String.fromCharCode(176));

                tablerow.append(theYear, January, February, March, April
                    , May, June, July, August, September, October, November, December);

                $(table).append(tablerow);
            }
            if (response.length == 0) {
                var p = $('<p></p>')
                p.text('No Data To Show').css('color', 'red').css('font-size', '20px');
                $('#Container').append(p);
            }
            else {
                $('#Container').append(table);
                $('#Container').css('overflow', 'scroll');
            }
            $(".progress-bar").css('width', '100%').text('100% - Done ');
            $("#ProgressBar").css('display', 'none');

            // Unhide the panel
            $("#ExtremeReport1DisplayPanel").show();
            $("#ExtremeReport1DisplayPanel").css('background-color', 'lavendar');


        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
            alert(error.responseText);
            alert(status.responseText);
        }
    });
})

$('#btnSubmit4WeatherEvents').click(function () {

    // Clear any results from previos run
    $("#Summary4Events").empty();
    $("#Container").empty();

    $("#Summary4Events").hide();
    $("#Container").hide();

    // Turn on progress bar
    $("#ProgressBar").css('display', 'block');
    $(".progress-bar").css('width', '50%').text('Pulling Data From NOAA');


    // Get the filters.
    var filters = new Array();
    var operators = new Array();
    var metrics = new Array();
    var values = new Array();

    $('div.container-fluid').find('.Metric option:selected').each(
        function (item, index) {
            var value = $(this).val();
            metrics.push(value);
        });

    $('div.container-fluid').find('.Operator option:selected').each(
        function (item, index) {
            var value = $(this).val();
            operators.push(value);
        });
    $('div.container-fluid').find('.Value').each(
        function (item, index) {
            var value = $(this).val().slice(0, $(this).val().length - 1);
            //var value = $(this).val();
            values.push(value);
        });
   
    var start = $('#Report2FromDate').val();
    var end = $('#Report2ToDate').val();
    var citysize = $('#CitySize').val();

    let colors = ['AliceBlue', 'Azure', 'BlanchedAlmond', 'Orchid', 'DarkOrange', 'LightYellow', 'Cyan', 'WhiteSmoke', 'SkyBlue',
        'SlateGray', 'Sienna', 'SandyBrown', 'Gold', 'Seashell', 'Pink', 'Plum', 'Aqua', 'Beige', 'Moccasin', 'DodgerBlue'
        , 'Wheat', 'Teal', 'Khaki', 'AliceBlue', 'Coral'] 

    var currentColor;

    for (let i = 0; i < operators.length; i++) {
        var filter = {
            Operator: operators[i],
            Metric: metrics[i],
            MetricValue:values[i]
        };
        
        filters.push(filter);
    }

    $.ajax({
        url: "/ExtremeWx/GetCitiesForWx",
        type: "POST",
        dataType: 'json',
        data: {
            CitySize: citysize,
            Start: start,
            End: end,
            Filters: filters
        },
        success: function (response) {

            // Array holding list of cities.
            var cities = new Array();

            // Update progress
            $(".progress-bar").css('width', '50%').text('50% -  Received Data');

            // Summary Line
            var filterLine = "Cities Where ";
            $.each(filters, function (i) {

                if (i == 0)
                    filterLine += Create4WeatherEventsLine(this.Operator, this.Metric, this.MetricValue);
                else
                    filterLine += ' and ' + Create4WeatherEventsLine(this.Operator, this.Metric, this.MetricValue);                
            }
            );

            // Add date to the filter line.
            filterLine += ' between the dates of ' + formatDate(start,) + ' and ' + formatDate(end,1);

            $('#Summary4Events').text(filterLine).css(
                {
                    'font-family': 'Arial',
                    'font-size': '24px',
                    'font-weight': 'bold',
                    'background-color': 'yellow',
                    'border': '2px black solid',
                    'border-radius':'5px'
                }
            )

           
           var table = $("<table></table>").addClass('rounded');
           var tbody = $("<tbody></tbody>");

           for (var i = 0; i < response.length; i++) {

                // Look for new cities then create new table header
                if (i == 0)
                {
                    // Label the very first tbody
                    var newTblRowHeader = $('<tr></tr>');
                    currentColor = colors[i];
                    var newTblHeader = $('<th></th>').attr('colspan', 5).text(response[i].md.shortName + ', ' + response[i].md.state).css('font-family', 'arial').css('background-color', currentColor);
                    newTblRowHeader.append(newTblHeader);
                    tbody.append(newTblRowHeader);

                    // Add columns names to very first table
                    newTblRowHeader = $('<tr></tr>').css('background-color', currentColor);

                    var th = $('<th></th>');
                    var th2 = $('<th></th>');
                    var th3 = $('<th></th>');
                    var th4 = $('<th></th>');
                    var th5 = $('<th></th>');
                    var th6 = $('<th></th>');

                    //$(th).attr('scope', 'col').text('City');
                    $(th2).attr('scope', 'col').text('Date');
                    $(th3).attr('scope', 'col').text('High Temp');
                    $(th4).attr('scope', 'col').text('Low Temp');
                    $(th5).attr('scope', 'col').text('Rainfall');
                    $(th6).attr('scope', 'col').text('Snowfall');

                    newTblRowHeader.append(th2, th3, th4, th5, th6);
                    tbody.append(newTblRowHeader);
                    
                    cities.push(response[i].md.shortName);
                }
                // At this point, tbody is filled. Need to create new table now.
                else if (!cities.includes(response[i].md.shortName))
                {
                    // Fill table with pre-existing tbody data
                    table.append(tbody);

                    // Add new filled table to panel
                    $('#Container').append('<br />', table);
                    $('#Container').css('overflow', 'scroll');

                    // Set stage for the next table.
                    tbody = $("<tbody></tbody>");
                    var newTblRowHeader = $('<tr></tr>');
                    currentColor = colors[i % colors.length];
                    var newTblHeader = $('<th></th>').attr('colspan', 5).text(response[i].md.shortName + ', ' + response[i].md.state).css('font-family', 'arial').css('background-color', currentColor);
                    newTblRowHeader.append(newTblHeader);
                    tbody.append(newTblRowHeader);

                    // Add columns names to very first table

                    newTblRowHeader = $('<tr></tr>').css('background-color', currentColor);

                    var th = $('<th></th>');
                    var th2 = $('<th></th>');
                    var th3 = $('<th></th>');
                    var th4 = $('<th></th>');
                    var th5 = $('<th></th>');
                    var th6 = $('<th></th>');

                    //$(th).attr('scope', 'col').text('City');
                    $(th2).attr('scope', 'col').text('Date');
                    $(th3).attr('scope', 'col').text('High Temp');
                    $(th4).attr('scope', 'col').text('Low Temp');
                    $(th5).attr('scope', 'col').text('Rainfall');
                    $(th6).attr('scope', 'col').text('Snowfall');

                    newTblRowHeader.append(th2, th3, th4, th5, th6);
                    tbody.append(newTblRowHeader);
                    cities.push(response[i].md.shortName);
                }
                

               var row = $('<tr></tr>').css('background-color', currentColor);
                //var city = $('<td>').text(response[i].md.shortName);
                //var state = $('<td>').text(response[i].md.state);
               var date = $('<td>').text(formatDate(response[i].r.date,2));
               var HighTemp = $('<td>').text(response[i].r.tmax + String.fromCharCode(176));
               var LowTemp = $('<td>').text(response[i].r.tmin + String.fromCharCode(176));
               var rain = $('<td>').text(response[i].r.prcp + String.fromCharCode(34));
               var snow = $('<td>').text(response[i].r.snow + String.fromCharCode(34));
                row.append(date,HighTemp, LowTemp, rain, snow);
               tbody.append(row);
                   
            };

            if (response.length == 0) {
                var p = $('<p></p>')
                p.text('No Data To Show').css('color', 'red').css('font-size', '20px');
                $('#Container').append(p);
            }
            else if (response.length == 1) {

                table.append(tbody);

                // Add new filled table to panel
                $('#Container').append('<br />', table);
                $('#Container').css('overflow', 'scroll');
                
            }
            $(".progress-bar").css('width', '100%').text('100% - Done ');
            $("#ProgressBar").css('display', 'none');

            // Unhide the panel
            $("#Summary4Events").show();
            $("#Container").show();

            
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
            alert(error.responseText);
            alert(status.responseText);
        }
    
        

    });



});

function countdown(type) {

    var countDownDate = null;

    // Set the date we're counting down to
    if (type == 'Climatology')
        countDownDate = new Date("March 31, 2020 15:37:25").getTime();
    else
        countDownDate = new Date("May 31, 2020 15:37:25").getTime();
    // Update the count down every 1 second
    var countdownfunction = setInterval(function () {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now an the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        document.getElementById("demo").innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";

        // If the count down is over, write some text
        if (distance < 0) {
            clearInterval(countdownfunction);
            document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 1000);
}

    function validate(type) {

        var rc = true;
        var fromDateExists = false;
        var toDateExists = false;
        var dateFromValidSoFar = true;
        var dateToValidSoFar = true;
               
        if (type == 'Historical') {
            if ($("#CityPicker").val() == '') {
                $("#HisErr1").text('please select a city');
                rc = false;
            }
            if ($("#datepicker").val() == '') {
                $("#HisErr2").text('please select a from date');
                rc = false;
            }
            else {
                fromDateExists = true;
            }

            if (Date.parse($("#datepicker").val()) > new Date()) {
                $("#HisErr2").text("please select a from date that has occurred");
                rc = false;
            }

            if ($("#datepicker2").val() == '') {
                $("#HisErr3").text('please select a to date');
                rc = false;
            }
            else {
                toDateExists = true;
            }
            
            if (Date.parse($("#datepicker2").val()) > new Date()) {
                $("#HisErr3").text("please select a to date that has occurred");
                rc = false;
            }

            if (!isMobile && fromDateExists) {
                if (isValidDate($("#datepicker").val()) == false) {
                    $("#HisErr2").text("Please select or enter a date that is in the format mm/dd/yyyy");
                    rc = false;
                }
            }
            
            // Date format already taken care of in mobile.
            if (!isMobile && toDateExists) {
                if (isValidDate($("#datepicker2").val()) == false) {
                    $("#HisErr2").text("Please select or enter a date that is in the format mm/dd/yyyy");
                    rc = false;
                }
            }


            if (isMobile && (rc == true) && Date.parse($("#datepickerReport2To").val()) < Date.parse($("#datepickerReport2From").val())) {
                $("#HisErr3").text("please select a to date greater than or equal to the from date");
                rc = false;
            }
            else if ((rc == true) && Date.parse($("#datepicker2").val()) < Date.parse($("#datepicker").val())) {
                $("#HisErr3").text("please select a to date greater than or equal to the from date");
                rc = false;
            }

        }
        else if (type == 'Extreme') {
            if ($("#TopnReport2").val() == '') {
                $("#ExtremeError1").text('Please enter a number');
                $("#ExtremeError1").before('<i id="icon1" class="fas fa-exclamation-circle fa-2x">')
                $("#ExtremeError1").after('<br>')
                rc = false;
            }
            if ($("#xtremeWx2 option:selected").val() == '') {
                $("#ExtremeError2").text('Please select an extreme weather parameter');
                $("#ExtremeError2").before('<i id="icon2" class="fas fa-exclamation-circle fa-2x">')
                $("#ExtremeError2").after('<br>')

                rc = false;
            }
            if ($("#CityPicker2 option:selected").val() == '') {
                $("#ExtremeError3").text('Please select a city');
                $("#ExtremeError3").before('<i id="icon3" class="fas fa-exclamation-circle fa-2x">')
                $("#ExtremeError3").after('<br>')
                rc = false;
            }

            var yesornovalue = $('input[name="optyesno"]:checked').val();

            // Generate report for specific time frame in TOPX report.
            if ($('input[name="optyesno"]:checked').val() == 'yes') {
                
                if ($("#datepicker").val() == '') {
                    $("#ExtremeError4").text('please select a from date');
                    $("#ExtremeError4").before('<i id="icon4" class="fas fa-exclamation-circle fa-2x">')
                    $("#ExtremeError4").after('<br>')
                    dateFromValidSoFar = false
                    rc = false;
                }
                if (Date.parse($("#datepicker").val()) > new Date()) {
                    $("#ExtremeError4").text("please select a from date before today");
                    $("#ExtremeError4").before('<i id="icon5" class="fas fa-exclamation-circle fa-2x">')
                    $("#ExtremeError4").after('<br>')
                    rc = false;
                }

                if ($("#datepicker2").val() == '') {
                    $("#ExtremeError5").text('please select a to date');
                    $("#ExtremeError5").before('<i id="icon6" class="fas fa-exclamation-circle fa-2x">')
                    $("#ExtremeError5").after('<br>')
                    dateToValidSoFar = false;
                    rc = false;
                }

                if (Date.parse($("#datepicker2").val()) > new Date()) {
                    $("#ExtremeError5").text("please select a to date before today");
                    $("#ExtremeError5").before('<i id="icon7" class="fas fa-exclamation-circle fa-2x">')
                    $("#ExtremeError5").after('<br>')

                    rc = false;
                }

                if (Date.parse($("#datepicker2").val()) < Date.parse($("#datepicker").val())) {
                    $("#ExtremeError5").text("please select a date greater than the from date");
                    $("#ExtremeError5").before('<i id="icon8" class="fas fa-exclamation-circle fa-2x">')
                    $("#ExtremeError5").after('<br>')
                    rc = false;
                }
                if (dateFromValidSoFar && isValidDate($("#datepicker").val()) == false) {
                    $("#ExtremeError4").text("Please select or enter a date that is in the format mm/dd/yyyy");
                    $("#ExtremeError4").before('<i id="icon9" class="fas fa-exclamation-circle fa-2x">')
                    $("#ExtremeError4").after('<br>')
                }

                if (dateToValidSoFar && isValidDate($("#datepicker2").val()) == false) {
                    $("#ExtremeError5").text("Please select or enter a date that is in the format mm/dd/yyyy");
                    $("#ExtremeError5").before('<i id="icon10" class="fas fa-exclamation-circle fa-2x">')
                    $("#ExtremeError5").after('<br>')
                }
            }
        }
        else if (type == 'MonthlyAverages') {
                if ($("#CityPicker2 option:selected").val() == '') {
                    $("#ExtremeError1").text('Please select a city');
                    $("#ExtremeError1").before('<i id="icon3" class="fas fa-exclamation-circle fa-2x">')
                    $("#ExtremeError1").after('<br>')
                    rc = false;
                }

                if ($("#fromYearReport1").val() == '') {
                    $("#ExtremeError2").text('Please enter a FROM year');
                    $("#ExtremeError2").before('<i id="icon1" class="fas fa-exclamation-circle fa-2x">');
                    $("#ExtremeError2").after('<br>');
                    rc = false;
                    dateFromValidSoFar = false;
                }

                if ($("#toYearReport1").val() == '') {
                    $("#ExtremeError3").text('Please enter a TO year');
                    $("#ExtremeError3").before('<i id="icon1" class="fas fa-exclamation-circle fa-2x">')
                    $("#ExtremeError3").after('<br>');
                    rc = false;
                    dateToValidSoFar = false;
                }

                if (dateFromValidSoFar && isValidYear($("#fromYearReport1").val()) == false)
                {
                    $("#ExtremeError4").text("Enter a FROM year that is in the format yyyy");
                    $("#ExtremeError4").before('<i id="icon10" class="fas fa-exclamation-circle fa-2x">')
                    $("#ExtremeError4").after('<br>');
                    rc = false;
                    dateFromValidSoFar = false;
                }
                if (dateToValidSoFar && isValidYear($("#toYearReport1").val()) == false)
                {
                   $("#ExtremeError5").text("Enter a TO year that is in the format yyyy");
                   $("#ExtremeError5").before('<i id="icon10" class="fas fa-exclamation-circle fa-2x">')
                   $("#ExtremeError5").after('<br>');
                    rc = false;
                    dateToValidSoFar = false;
                }
            if (dateFromValidSoFar && dateToValidSoFar && $("#fromYearReport1").val() > $("#toYearReport1").val())
                {
                    $("#ExtremeError5").text("FROM year must be less than TO yeaer");
                    $("#ExtremeError5").before('<i id="icon10" class="fas fa-exclamation-circle fa-2x">')
                    $("#ExtremeError5").after('<br>');
                    rc = false;
                    dateToValidSoFar = false;
                }


        }
        return rc;
}

function clearErrors() {
    $("#HisErr1").empty();
    $("#datepicker").empty();
    $("#HisErr2").empty();
    $("#HisErr3").empty();
    $("#datepicker2").empty();
    $("#ExtremeErr").empty();
    $("#ExtremeError1").empty();
    $("#ExtremeError2").empty();
    $("#ExtremeError3").empty();
    $("#ExtremeError1").empty();
    $("#ExtremeError4").empty();
    $("#ExtremeError5").empty();
    var elements = $("i.fas.fa-exclamation-circle.fa-2x")
    elements.remove();

    var pagebreaks = $("#ExtremeError1").nextAll('br').remove();
}


//$(document).on('change', 'input:radio[id^="opt"]', function (event) {
$('#CityScope').on('change', function (e) {

    var cityScope = $(this).find("option:selected").val();
    var citysize = 0;

    // Clear current list
    $('#CityPicker').empty();

    switch (cityScope) {
        case 'Major': citysize = 1; break;
        case 'MidSize': citysize = 2; break;
        case 'SmallSized': citysize = 3; break;
    }

    for (var i = 0; i < CityMetaData.length - 1; i++) {
        if (CityMetaData[i].citysize <= citysize) {
            $('#CityPicker').append('<option value="' + CityMetaData[i].cityid + '" class="cityList">' + CityMetaData[i].shortName.toUpperCase() + ", " + CityMetaData[i].state.toUpperCase() + " (" + CityMetaData[i].name + ")" + '</option>');
        }
    }
    $('#CityPicker').selectpicker('refresh');

});

$(document).on('change', 'input:radio[id^="radoptex"]', function (event) {

    // Unhide the checked option.
    if (event.target.id == 'radoptex2') { alert('made it');} 
});

function isValidDate(dateString)
{

    var regEx = /^\d{2}\/\d{2}\/\d{4}$/;
    return dateString.match(regEx) != null;
}

function isValidYear(yearString) {

    var regEx = /^\d{4}$/;
    return yearString.match(regEx) != null;
}

function FilterOnOff() {
    var filterbutton = $("#FilterButton");
    var filtertable = $("#filterTable");
    var filterlabel = $(".filterLabel");
    if (filtertable.css('display') == 'none') {
        filterbutton.find('span').removeClass("glyphicon glyphicon-plus").addClass("glyphicon glyphicon-minus");
        filtertable.css('display', 'block');
        filterlabel.css('display', 'block');
    }
    else if (filtertable.css('display') == 'block') {
        filterbutton.find('span').removeClass("glyphicon glyphicon-minus").addClass("glyphicon glyphicon-plus");
        filtertable.css('display', 'none');
        filterlabel.css('display', 'none');
    }
}

$(".ClearButton").click(function (e) {
    var id = e.target.id;
    if (id == "ClearBtn1") {
        $("#Metric1").val('None');//.prop('selected', true);
        $("#Operator1").val('None');//.prop('selected', true);
        $("#MetricValue1").val('');
        $("#Metric1").selectpicker('refresh');
        $("#Operator1").selectpicker('refresh');
    }
    else if (id == "ClearBtn2") {
        $("#Metric2").val("None").prop('selected', true);
        $("#Operator2").val("None").prop('selected', true);
        $("#MetricValue2").val('');
        $("#Metric2").selectpicker('refresh');
        $("#Operator2").selectpicker('refresh');
    }
    else if (id == "ClearBtn3") {
        $("#Metric3").val("None").prop('selected', true);
        $("#Operator3").val("None").prop('selected', true);
        $("#MetricValue3").val('');
        $("#Metric3").selectpicker('refresh');
        $("#Operator").selectpicker('refresh');
    }
    

});



$('input:radio[name="optyesnoTopXMobile"]').change(
    function () {
        if (this.checked && this.value == 'yes') {
            $("#TopXReportMobileTimeInputs").show();
        }
        else {
            $("#TopXReportMobileTimeInputs").hide();
        }
    });

//$(function () {
$('input:radio[name="optyesno"]').change(
    function () {
        if (this.checked && this.value == 'yes') {
            $("#Report2FromDate").show();
            $("#Report2ToDate").show();
            $("#Report2FromDate").prev().show();
            $("#Report2FromDate").next().show();
            $("#Report2FromDate").parent().show();
            $("#CalendarIcon").show();
        }
        else
        {
            $("#Report2FromDate").hide();
            $("#Report2ToDate").hide();
            $("#Report2FromDate").prev().hide();
            $("#Report2FromDate").next().hide();
            $("#Report2FromDate").parent().hide();
            $("#CalendarIcon").hide();
        }


    }
);

// Display city start end dates to user.
$("#CityPicker").on('changed.bs.select',function () {

    // Get selected city first.
    var cityid = $(this).val();
    var cityRec = getCityDataRec(cityid);

    // Display city data availability
    displayDataAvailability(cityRec);

});

function getCityDataRec(cityid) {
    for (var i = 0; i < CityMetaData.length - 1; i++)
    {
        if (CityMetaData[i].cityid == cityid) {
            return CityMetaData[i];
        }

    }
}

function displayDataAvailability(cityMDRec) {

    //if (isMobile) {

    var alertStr = 'Data available from ' + cityMDRec.mindateShort + ' to ' + cityMDRec.maxdateShort + '.';
    $("#CityMetaDataAlert").text(alertStr);
    if (!isMobile) {
        if (cityMDRec.citysize == 3)
            $("#CityMetaDataAlert2").text(' Due to missing historical records, there may be gaps in the data for certain days');
    }
    else {
        if (cityMDRec.citysize == 3)
           $("#CityMetaDataAlert").text(alertStr + ' Due to missing historical records, there may be gaps in the data for certain days');
    }
    $("#cityDataAvailableInfoIcon").show();
    
}

function loadCityMDCache(data) {

    var CityMetaData = new Array;
    for (var i = 0; i < data.length - 1; i++) {
        // Rec for one city.
        var cityRec = data[i];
        CityMetaData.push(cityRec);
    }

    sessionStorage.setItem('CityMetaData', JSON.stringify(CityMetaData));
}
    
function fillCityMetaDataCache() {

    $.ajax({
        type: 'GET',
        url: '/History/getCityMetaData',
        dataType: 'json',
        async: false,
        data: {
            citysize: 3
        },
        success: function (data) {
            loadCityMDCache(data);

        }
    });
    sessionStorage.setItem('CityDataCachedLoaded', 'cached');
    
}

function InitializeCityList(cityListId)
{
    for (var i = 0; i < CityMetaData.length - 1; i++) {
        if (CityMetaData[i].shortName == null)
            console.count = 1;

        if (CityMetaData[i].citysize >= 1 && CityMetaData[i].citysize <= 3 ) {
            $('#' + cityListId).append('<option value="' + CityMetaData[i].cityid + '" class="cityList">' + CityMetaData[i].shortName.toUpperCase() + ", " + CityMetaData[i].state.toUpperCase() + " (" + CityMetaData[i].name + ")" + '</option>');
        }
    }
    $('#' + cityListId).selectpicker('refresh');
}

// Formats from yyyy-mm-dd to mm/dd/yyyy
function formatDate(date,formatType) {
    var returnVal;

    // Strip out the time that's included in some cases.
    if (formatType == 2)
        date = date.replace('T00:00:00', '');

    var _date = date.split('-');
    var dateObj = { month: _date[1], day: _date[2], year: _date[0] };

    returnVal = dateObj.month + '/' + dateObj.day + '/' + dateObj.year;
    
    

    return returnVal;

}

function AddNewExtremeFilter() {

    $.ajax({
        url: "/ExtremeWx/GetFilterParamView",
        type: "POST",
        dataType: 'html',
        success: function (response) {

            // Add HTML content before where they want to add it.
            $('#AddFilter').before(response);
            //location.reload();
            $('.selectpicker').selectpicker('refresh');

        }
    });
}

function AddInitialExtremeFilter() {

    $.ajax({
        url: "/ExtremeWx/GetInitialFilterParamView",
        type: "GET",
        dataType: 'html',
        success: function (response) {

            // Add HTML content before where they want to add it.
            $('#DummyPlaceholder').before(response);
            $('.selectpicker').selectpicker('refresh');

        }
    });
}


    function Create4WeatherEventsLine(Operator, Metric, Value)
    {
        var operSpace;
        var metricSpace;
        
        switch (Operator) {
            case 'GreaterThan': operSpace = 'Greater Than'; break;
            case 'LessThan': operSpace = 'Less Than'; break;
            case 'LessThanOrEqualTo': operSpace = 'Less Than Or Equal To'; break;
            case 'GreaterThanOrEqualTo': operSpace = 'Greater Than Or Equal To'; break;
            case 'Equals': operSpace = 'Equals'; break;
            default: operSpace = Operator;

        }

        switch (Metric)
        {
            case 'HighTemp': metricSpace = 'High temperature'; Value = Value + String.fromCharCode(176);break;
            case 'LowTemp': metricSpace = 'Low temperature'; Value = Value + String.fromCharCode(176); break;
            case 'Precipitation': metricSpace = 'precipitation'; Value = Value + String.fromCharCode(34); break;
            case 'Snowfall': metricSpace = 'Snowfall'; Value = Value + String.fromCharCode(34); break;
            default: metricSpace = Metric;
        }

        return metricSpace + ' was ' + operSpace + ' ' + Value;
    }

function UpdateValueMetricText(selectObject) {

    var metric = selectObject.value;

    // Find the selectpicker that represents the index of the one that fired this event. Once we're there, then
    // find the next .valueType element, and that's the one we manipulate the text on. 
    
    var metricSelectors = $('.container-fluid').find('.selectpicker.Metric');
    var thesize = metricSelectors.length;
    var count = 0;
    $.each(metricSelectors,function (index,value) {

        var a = $(this);
        if (a.is(selectObject)) {
            count = index;
            return;
        }

        
    });

    var valueTypeLabels = $('.container-fluid').find('.valueType');
    var spanElem;
    $.each(valueTypeLabels,function(index,value) {
        
        if (index == count) {
            spanElem = $(this);
            return;
        }
    });


    // Get the actual value int the input box.
    var actualValue = $(spanElem).next().val();
    var inputBox = $(spanElem).next();

    $(inputBox).css('color', 'black');
    
    switch (metric) {
        case 'Snowfall':
            $(spanElem).text(' (inches)');
            actualValue = actualValue.replace(String.fromCharCode(176), String.fromCharCode(34));
            inputBox.val(actualValue);
            break;
        case 'Precipitation':
            $(spanElem).text(' (inches)');
            actualValue = actualValue.replace(String.fromCharCode(176), String.fromCharCode(34));
            inputBox.val(actualValue);
            break;
        case 'HighTemp':
            $(spanElem).text(' (degrees f' + String.fromCharCode(176) + ')');
            actualValue = actualValue.replace(String.fromCharCode(34), String.fromCharCode(176));
            inputBox.val(actualValue);
            break;
        case 'LowTemp':
            $(spanElem).text(' (degrees f' + String.fromCharCode(176) + ')');
            actualValue = actualValue.replace(String.fromCharCode(34), String.fromCharCode(176));
            inputBox.val(actualValue);
            break;
    }
}

function AddSymbolToNum(inputBoxObj)
{
    // Find the number of where the inputbox is. Then, use that number to locate the metric selector.
    var inputBoxObjs = $('.container-fluid').find('.form-control.Value');
    var count = 0;
    $.each(inputBoxObjs, function (index, value) {

        var a = $(this);
        if (a.is(inputBoxObj)) {
            count = index;
            return;
        }
    });

    // Find the metric for this input value (rain, snow, hightemp, etc.)   
    var MetricBoxes = $('.container-fluid').find('.selectpicker.Metric');
    var theMetricBox;
    $.each(MetricBoxes, function (index, value) {

        if (index == count) {
            theMetricBox = $(this);
            return;
        }
    });

    var metric = $(theMetricBox).val();
    $(inputBoxObj).css('color', 'black');

    switch (metric) {
        case 'Snowfall': $(inputBoxObj).val(inputBoxObj.value + String.fromCharCode(34));break;
        case 'Precipitation': $(inputBoxObj).val(inputBoxObj.value + String.fromCharCode(34)); break;
        case 'HighTemp': $(inputBoxObj).val(inputBoxObj.value + String.fromCharCode(176)); break;
        case 'LowTemp': $(spanElem).text(inputBoxObj.value + String.fromCharCode(176)); break;
    }
}

function RemoveFilter(buttonClicked) {

        // Find which button I am.
        var buttons = $('.container-fluid').find('.RemoveFilterBtn');
        var count = 0;
        $.each(buttons,function(index,value) {

            var a = $(this);
            if (a.is(buttonClicked)) {
                count = index;
                return;
            }

        });

        // Find starting AndThe row.
        // There's always one less remove button than AndTheRow. Never remove first AndTheRow. First button=secondAndTheRow,
        // SecondButton=AndTheRow[2]
        // Count=0
        var AndTheRows = $('.container-fluid').find('.AndTheRow');
        var theAndTheRow;
        $.each(AndTheRows,function (index,value) {
            
            if (index == (count+1)) {
              theAndTheRow = $(this);
                return;
            }
            

        });
        var next = $(theAndTheRow).next();
        var current = $(theAndTheRow); // Opening line break <br>
        var classname;
        do {
            
            classname = $(current).attr('class');   
           // alert("removing " + classname);
            $(current).remove();
            current = next;
            next = $(next).next();
        } while (classname != 'row SeperatorRow');
    

    }


    


