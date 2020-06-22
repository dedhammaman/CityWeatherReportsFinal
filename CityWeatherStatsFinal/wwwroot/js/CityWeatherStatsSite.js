var CityMetaData = new Array();
var isMobile;

$(document).ready(function () {
    isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (window.location.href == "https://" + window.location.host + "/History") {
        $("#Summary").hide();
        $("#Details").hide();
        $.ajax({
            type: 'GET',
            url: '/History/getCityMetaData',
            dataType: 'json',
            data: {
                citysize: 2
            },
            success: function (data) {
                loadCityMDCache(data);
                for (var i = 0; i < data.length; i++) {
                    $('#CityPicker').append('<option value="' + data[i].cityid + '" class="cityList">' + data[i].shortName.toUpperCase() + ", " + data[i].state.toUpperCase() + " (" + data[i].name + ")" + '</option>');

                }
                var counter = 0;
                $('#CityPicker').selectpicker('refresh');

            }
        });
    }
    else if ((window.location.href == "https://" + window.location.host + "/ExtremeWx/TopXReport")
        || (window.location.href == "https://" + window.location.host + "/ExtremeWx/MonthlyAveragesReport")) {

        //$('.bootstrap-select.btn-group .dropdown-toggle .filter-option ').css('color', '#db5079').css('background-color', 'lightblue').css('height', '40px').css('width', '400px').css('font-size', '24px');
        $("#datepicker2").css('background-color', 'white').css('color', 'silver').css('height', '40px').css('font-size', '24px').css('font-weight', 'bolder');
        $("#datepicker").css('background-color', 'white').css('color', 'silver').css('height', '40px').css('font-size', '24px').css('font-weight', 'bolder');



        $.ajax({
            type: 'GET',
            url: '/ExtremeWx/getCityMetaData',
            dataType: 'json',
            data: {},
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    $('#CityPicker2').append('<option value="' + data[i].cityid + '" class="cityList">' + data[i].shortName + ", " + data[i].state + '</option>');

                }
                var counter = 0;
                $('#CityPicker2').selectpicker('refresh');

            }
        });
    }
    else if (window.location.href == "https://" + window.location.host + "/ExtremeWx/") {

        //$('.bootstrap-select.btn-group .dropdown-toggle .filter-option ').css('color', '#db5079').css('background-color', 'lightblue').css('height', '40px').css('width', '400px').css('font-size', '24px');
        $("#datepicker2").css('background-color', 'white').css('color', 'silver').css('height', '40px').css('font-size', '24px').css('font-weight', 'bolder');
        $("#datepicker").css('background-color', 'white').css('color', 'silver').css('height', '40px').css('font-size', '24px').css('font-weight', 'bolder');



        $.ajax({
            type: 'GET',
            url: '/ExtremeWx/getCityMetaData',
            dataType: 'json',
            data: {},
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    $('#CityPicker2').append('<option value="' + data[i].cityid + '" class="cityList">' + data[i].shortName + ", " + data[i].state + '</option>');

                }
                var counter = 0;
                $('#CityPicker2').selectpicker('refresh');

            }
        });
    }
    else if (window.location.href == "https://" + window.location.host + "/")
    {
        isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        //if (!isMobile) {
            loadCarouselImages();
        //}
        //else {
        //    $("#CarouselHeader1").remove();
        //}
    }
    else if (window.location.href == "https://" + window.location.host + "/Home/UnderConstruction")
        countdown('Climatology');
    else if (window.location.href == "https://" + window.location.host + "/Home/UnderConstruction2")
        countdown('Dashboard');

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

        if (isMobile) {
            var table = $('<table>').css('margin', '0 auto');
            var tr = $('<tr>');
            var td = $('<td>');
            var td2 = $('<td>');
            var td3 = $('<td>');
            var td4 = $('<td>');
            imgSummer = $('<img>').attr('src', "../images/" + item + " summer.png");
            imgFall = $('<img>').attr('src', '../images/' + item + ' fall.png');
            imgWinter = $('<img>').attr('src', '../images/' + item + ' winter.png');
            imgSpring = $('<img>').attr('src', '../images/' + item + ' spring.png');

            var summerContainer = $('<div>').addClass('container').css('position', 'relative').css('text-align', 'center').css('color', 'white');
            season = $('<div>').addClass('centered centered-summer').text('Summer');
            summerContainer.append(imgSummer, season);
            td.append(summerContainer);

            var fallContainer = $('<div>').addClass('container').css('position', 'relative').css('text-align', 'center').css('color', 'white');
            season = $('<div>').addClass('centered centered-fall').text('Fall');
            fallContainer.append(imgFall, season);
            td2.append(fallContainer);

            var winterContainer = $('<div>').addClass('container').css('position', 'relative').css('text-align', 'center').css('color', 'white');
            season = $('<div>').addClass('centered centered-winter').text('Winter');
            winterContainer.append(imgWinter, season);
            td3.append(winterContainer);

            var springContainer = $('<div>').addClass('container').css('position', 'relative').css('text-align', 'center').css('color', 'white');
            season = $('<div>').addClass('centered centered-spring').text('Spring');
            springContainer.append(imgSpring, season);
            td4.append(springContainer);

            tr.append(td, td2,td3,td4);
            table.append(tr);
            row2.append(table);
            ia.append(row2);
            parent.append(ia);
        }
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
            
            var cityid = $("#CityPicker").val();
            var FromDate = $("#datepicker").val();
            var ToDate = $("#datepicker2").val();

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
                ,
                 success: function (response) {

                    // Update progress
                    $(".progress-bar").css('width', '50%').text('50% -  Received Data');
                    
                     // Summary Line
                     if (response.entries.length > 0) {
                         //$("#summarybanner").html('  ' + response.entries[0].name + " from " + FromDate + " To " + ToDate);
                         var avgHigh = parseFloat(response.averageHigh).toFixed(0);
                         var avgLow = parseFloat(response.averageLow).toFixed(0);
                         var totalSnow = parseFloat(response.totalSnow).toFixed(2);
                         var totalPrecip = parseFloat(response.totalPrecip).toFixed(2);
                         
                         var avgHighLine = $("<p style='text-align:center'></p>").text('Average High: ' + avgHigh.toString() + String.fromCharCode(176));
                         var avgLowLine = $("<p style='text-align:center'></p>").text('Average Low: ' + avgLow.toString() + String.fromCharCode(176));
                         var totalPrecipLine = $("<p style='text-align:center'></p>").text('Total Precip: ' + totalPrecip.toString() + '"');
                         var totalSnow = $("<p style='text-align:center'></p>").text('Total Snow: ' + totalSnow.toString() + '"');

                         var maxHighLine = $("<p style='text-align:center'></p>").text('Maximum High: ' + response.maxHigh + String.fromCharCode(176));
                         var maxLowLine = $("<p style='text-align:center'></p>").text('Maximum Low: ' + response.maxLow + String.fromCharCode(176));
                         var minHighLine = $("<p style='text-align:center'></p>").text('Minimum High: ' + response.minHigh + String.fromCharCode(176));
                         var minLowLine = $("<p style='text-align:center'></p>").text('Minimum Low: ' + response.minLow + String.fromCharCode(176));

                         var summaryText = $("<p></p>").text("SUMMARY for " + response.entries[0].name + " from " + FromDate + " To " + ToDate);
                         var detailsText = $("<p></p>").text("DETAILS for " + response.entries[0].name + " from " + FromDate + " To " + ToDate);

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

                         //$("#AvgHigh").text('hello there');//append(avgHighLine);
                         //$("#AvgLow").append(avgLowLine);
                         //$("#TotalPrecip").append(totalPrecipLine);
                         //$("#TotalSnow").append(totalSnow);
                    }



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
                    
                    //trhead.append("<th id='header1'>text1</th><th>text2</th>");
                    trhead.append(th3, th4, th5, th6,th7);
                    //trhead.append(th2);

                    thead.append(trhead);
                    table.append(thead, tbody);

                    //table.append("<tr><td>a</td><td>b</td></tr>");
                    //table.append("<tr><td>c</td><td>d</td></tr>");
                    //table.append("<tr><td>c</td><td>d</td></tr>");
                    //table.append("<tr><td>c</td><td>d</td></tr>");

                    var cityName = "";
                    var State = "";
                    var theDate = "";
                    var High = "";
                    var Low = "";
                    var Precip = "";
                    var Snow = "";
                    var tablerow = "";


                    for (var i = 0; i < response.entries.length; i++)
                    {
                        tablerow = $("<tr></tr>");
                        //cityName = $("<td></td>").text(response[i].name);
                        //State = $("<td></td>").text(response[i].state);
                        //var temp = new Date(response[i].date.substr(0, 9));
                        //alert('the string is ' + response[i].date);
                        //alert('The substring is ' + response[i].date.substr(0, 10));
                        var temp = new Date(response.entries[i].date.substr(0, 10) + 'PST');
                        theDate = $("<td></td>").text((temp.getMonth() + 1) + "/" + (temp.getDate()) + "/" + temp.getFullYear());

                        High = $("<td></td>").text(response.entries[i].tmax + String.fromCharCode(176));
                        Low = $("<td></td>").text(response.entries[i].tmin + String.fromCharCode(176));
                        Precip = $("<td></td>").text(response.entries[i].prcp + '"');
                        Snow = $("<td></td>").text(response.entries[i].snow + '"');

                        tablerow.append(theDate, High, Low, Precip, Snow);

                        $(table).append(tablerow);
                    }
                    if (response.length == 0) {
                        var p = $('<p></p>')
                        p.text('No Data To Show').css('color', 'red').css('font-size', '20px');
                        $('#Container').append(p);
                    }
                    else {
                        $('#Container').append(detailsText,table);
                        $('#Container').css('overflow', 'scroll');
                    }
                    $(".progress-bar").css('width', '100%').text('100% - Done ');
                    $("#ProgressBar").css('display', 'none');
                    $("#Summary").show();
                    $("#Details").show();
                    
                },
                error: function (xhr, status, error) {
                    alert("The NOAA site down. Please try this again later.")
                    //alert(xhr.responseText);
                    //alert(error.responseText);
                    //alert(status.responseText);
                    $("#ProgressBar").css('display', 'none');
                }
            });
        })
    


    $("#btnSubmit2").click(function () {

        clearErrors();
        if (validate('Extreme') != true)
            return;

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
        
        $.ajax({
            url: "/ExtremeWx/GetExtremeWeather",
            type: "POST",
            dataType: 'json',
            data: {
                topn: topn,
                metric: extremeWxType,
                cityList: cityIdLabel
            },
            success: function (response) {

                // Update progress
                $(".progress-bar").css('width', '50%').text('50% -  Received Data');

                // Summary Line
                if (response.length > 0) {
                    var summaryLine = $("<p></p>").text("The Top " + topn + " " + extremeWxType + " day(s) for " + response[0].shortname + ", " + response[0].state + " are:");
                    $("#Summary").append(summaryLine);
                }

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

                $(th3).attr('scope', 'col').text('Date');
                $(th4).attr('scope', 'col').text('High');
                $(th5).attr('scope', 'col').text('Low');
                $(th6).attr('scope', 'col').text('Precip (inches)');
                $(th7).attr('scope', 'col').text('Snowfall (inches)');

                trhead.append(th3, th4, th5, th6, th7);
                
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

                for (var i = 0; i < response.length; i++) {
                    tablerow = $("<tr></tr>");
                    //cityName = $("<td></td>").text(response.entries[i].name);
                    //State = $("<td></td>").text(response.entries[i].state);
                    var temp = new Date(response[i].date.substr(0, 10));
                    theDate = $("<td></td>").text((temp.getMonth() + 1) + "/" + temp.getDate() + "/" + temp.getFullYear());

                    High = $("<td></td>").text(response[i].tmax + String.fromCharCode(176));
                    Low = $("<td></td>").text(response[i].tmin + String.fromCharCode(176));
                    Precip = $("<td></td>").text(response[i].prcp + '"');
                    Snow = $("<td></td>").text(response[i].snow + '"');

                    tablerow.append(theDate, High, Low, Precip, Snow);

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
                $("#ExtremeReport2DisplayPanel").show();

            },
            error: function (xhr, status, error) {
                alert(xhr.responseText);
                alert(error.responseText);
                alert(status.responseText);
            }
        });
    })

$("#btnYearToYearAvgSubmit").click(function () {

    clearErrors();
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

            // Update progress
            $(".progress-bar").css('width', '50%').text('50% -  Received Data');

            // Summary Line
            $('#Summary2').text('Average yearly temperatures for ' + response.city + ', ' + response.state);
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

            if (fromDateExists  && (isValidDate($("#datepicker").val()) == false)) {
                $("#HisErr2").text("Please select or enter a date that is in the format mm/dd/yyyy");
                rc = false;
            }

            if (toDateExists && (isValidDate($("#datepicker2").val()) == false)) {
                $("#HisErr3").text("Please select or enter a date that is in the format mm/dd/yyyy");
                rc = false;
            }

            if ((rc == true) && Date.parse($("#datepicker2").val()) < Date.parse($("#datepicker").val())) {
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

            if ($('input[name="optyesno"]:checked').val() == 'yes') {
                var dateFromValidSoFar = true;
                var dateToValidSoFar = true;
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

    // Clear current list
    $('#CityPicker').empty();

    if (cityScope == 'Major') {

        $.ajax({
            type: 'GET',
            url: '/History/getCityMetaData',
            dataType: 'json',
            data: {
                citysize: 1
            },
            success: function (data) {
                
                for (var i = 0; i < data.length; i++) {
                    $('#CityPicker').append('<option value="' + data[i].cityid + '" class="cityList">' + data[i].shortName.toUpperCase() + ", " + data[i].state.toUpperCase() + " (" + data[i].name + ")" + '</option>');                  
                }
                var counter = 0;
                $('#CityPicker').selectpicker('refresh');

            }
        });
    }
    else if (cityScope == 'MidSize') {

        $.ajax({
            type: 'GET',
            url: '/History/getCityMetaData',
            dataType: 'json',
            data: {
                citysize: 2
            },
            success: function (data) {
                loadCityMDCache(data);
                for (var i = 0; i < data.length; i++) {
                    $('#CityPicker').append('<option value="' + data[i].cityid + '" class="cityList">' + data[i].shortName.toUpperCase() + ", " + data[i].state.toUpperCase() + " (" + data[i].name + ")" + '</option>');
                }
                var counter = 0;
                $('#CityPicker').selectpicker('refresh');

            }
        });
    }
    else if (cityScope == 'SmallSized') {

        $.ajax({
            type: 'GET',
            url: '/History/getCityMetaData',
            dataType: 'json',
            data: {
                citysize: 3
            },
            success: function (data) {
                
                for (var i = 0; i < data.length; i++) {
                    //if ((data[i].citysize == 1) || (data[i].citysize == 2))
                    $('#CityPicker').append('<option value="' + data[i].cityid + '" class="cityList">' + data[i].shortName.toUpperCase() + ", " + data[i].state.toUpperCase() + " (" + data[i].name + ")" + '</option>');
                    //else
                    //    $('#CityPicker').append('<option value="' + data[i].cityid + '" class="cityList">' + data[i].name + ", " + data[i].state + '</option>');
                }
                var counter = 0;
                $('#CityPicker').selectpicker('refresh');

            }
        });
    }
});

$(document).on('change', 'input:radio[id^="radoptex"]', function (event) {

    // Unhide the checked option.
    if (event.target.id == 'radoptex2') { alert('made it');}


    
    
});



function isValidDate(dateString) {
    var regEx = /^\d{2}\/\d{2}\/\d{4}$/;
    return dateString.match(regEx) != null;
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


//$(function () {
$('input:radio[name="optyesno"]').change(
    function () {
        if (this.checked && this.value == 'yes') {
            $("#Report2FromDate").show();
            $("#Report2ToDate").show();
            $("#Report2FromDate").prev().show();
            $("#Report2FromDate").next().show();
            $("#Report2FromDate").parent().show();
        }
        else
        {
            $("#Report2FromDate").hide();
            $("#Report2ToDate").hide();
            $("#Report2FromDate").prev().hide();
            $("#Report2FromDate").next().hide();
            $("#Report2FromDate").parent().hide();
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

    if (isMobile) {
        $("#CityMetaDataAlert").text('Data available from ' + cityMDRec.mindateShort);
        $("#CityMetaDataAlert2").text(' to ' + cityMDRec.maxdateShort);
    }
    else {

        $("#CityMetaDataAlert").text('Data Available from ' + cityMDRec.mindateShort + ' to ' + cityMDRec.maxdateShort);
    }
    $("#cityDataAvailableInfoIcon").show();
    
}

function loadCityMDCache(data) {

    for (var i = 0; i < data.length - 1; i++) {
        // Rec for one city.
        var cityRec = data[i];
        CityMetaData.push(cityRec);
    }
}
    
      
        

   


