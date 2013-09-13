$(document).ready(function() {

	//RETENTION CHART
	var retention_series = [];
	var day1_series;
	var day1_data = [];
	var day7_series;
	var day7_data = [];
	var day14_series;
	var day14_data = [];


	function draw_charts() {
		$('#container4').highcharts('StockChart', {

			tooltip: {
                
                useHTML: true,
                formatter: function() {
                    var s = "<span style='font-size:10px'>"+ Highcharts.dateFormat('%A, %b %e, %Y', this.x) +'</span>';
                    $.each(this.points, function(i, point) {
                    	var color = point.series.color;
                    	var name = point.series.name;
                    	var y = Highcharts.numberFormat(point.y, 2, '.', ',');
                        s += '<br/>'+ "<span style='color:" + color + "'>" + name +'</span> : <b>'+ y +'</b>';
                    });
                    return s;
                }
                
            },

			legend: {
				enabled: true,
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },

			rangeSelector : {
				selected : 1,
				buttons: [{
					type: 'week',
					count: 1,
					text: '1w'
				}, {
					type: 'month',
					count: 1,
					text: '1m'
				}, {
					type: 'month',
					count: 3,
					text: '3m'
				}, {
					type: 'month',
					count: 6,
					text: '6m'
				}, {
					type: 'ytd',
					text: 'YTD'
				}, {
					type: 'year',
					count: 1,
					text: '1y'
				}, {
					type: 'all',
					text: 'All'
				}]
			},

        	xAxis: {
				minTickInterval: 24 * 3600 * 1000
			},

			yAxis: [{
            // Primary Y-Axis
                labels:{
                	formatter: function() {
                        return this.value +'%';
                    },
		            align:'right',
		            x:-10
		        },
		        lineWidth : 1,
		        offset : 0
        	}],
			
			series : retention_series

		});
	}

	//Function that takes a record and fills the series data with that record
	function fill_data(index, record) {
		var date = new Date(record['dailyDate']);
		var utc_date = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

		if(parseFloat(record['day1']) != 0) {
			day1_data[index] = [utc_date, parseFloat(record['day2'])/parseFloat(record['day1'])*100];
			day7_data[index] = [utc_date, parseFloat(record['day8'])/parseFloat(record['day1'])*100];
			day14_data[index] = [utc_date, parseFloat(record['day15'])/parseFloat(record['day1'])*100];
		}
		else {
			day1_data[index] = [utc_date,0];
			day7_data[index] = [utc_date,0];
			day14_data[index] = [utc_date,0];
		}

		
		
	}

	//Function that sets up the series data for plotting
	function fill_series() {
        day1_series = {
        	type: 'area',
        	name: "Day 1",
        	data: day1_data
        };
        retention_series[0] = day1_series;
        day7_series = {
        	type: 'area',
        	name: "Day 7",
        	data: day7_data
        };
        retention_series[1] = day7_series;
        day14_series = {
        	type: 'area',
        	name: "Day 14",
        	data: day14_data
        };
        retention_series[2] = day14_series;
	}


	//Pull data from API, format it, and store into the series arrays
	(function() {
		var current_date = new Date();
		var formatted_current_date = current_date.getFullYear() + "-" + (current_date.getMonth()+1) + "-" + current_date.getDate();
		var min_daily_date = "2013-08-06";
		var api_call = "http://server.staging.gamefuse.com/stat/getDailyUserRetention.action?company=45&area=1&server=1&minDailyDate=" + min_daily_date + "&maxDailyDate=" + formatted_current_date;
		$.ajax({
  			url: api_call,
  			dataType: 'jsonp',
  			success:function(data){
    			var json_result = JSON.parse(data['result']);
    			$.each(json_result, function(index, record) {
    				fill_data(index,record);
    			});
    			fill_series();
    			draw_charts();
    			
  			}
		});
	})();

});