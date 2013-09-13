$(document).ready(function() {

	//CHART 1
	var chart1_series = [];
	var accu_series;
	var accu_data = [];
	var pccu_series = [];
	var pccu_data = [];
	var dau_series;
	var dau_data = [];
	var nu_series;
	var nu_data = [];

	//CHART 2
	var chart2_series = [];
	var payrate_series;
	var payrate_data = [];
	var arpu_series;
	var arpu_data = [];
	var arppu_series;
	var arppu_data = [];

	//CHART 3
	var sales_data = [];

	function draw_charts() {


		//CHART 1
		$('#container1').highcharts('StockChart', {

			tooltip: {
                
                useHTML: true,
                formatter: function() {
                    var s = "<span style='font-size:10px'>"+ Highcharts.dateFormat('%A, %b %e, %Y', this.x) +'</span>';
                    $.each(this.points, function(i, point) {
                    	var color = point.series.color;
                    	var name = point.series.name;
                    	var y;
                    	if(name == "DAU") {
                    		y = Highcharts.numberFormat(point.total, 0, '.', ',');
                    	}
                    	else {
                    		y = Highcharts.numberFormat(point.y, 0, '.', ',');
                    	}
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

			plotOptions: {
	            column: {
	                stacking: 'normal'
	            }
        	},

        	xAxis: {
				minTickInterval: 24 * 3600 * 1000
			},

			yAxis: [{
            // Primary Y-Axis
                labels:{
		            align:'right',
		            x:-10
		        },
		        lineWidth : 1,
		        offset : 0
        	}, {
            // Secondary Y-Axis
            opposite: true
        	}],
			
			series : chart1_series

		});


		//CHART 2
		$('#container2').highcharts('StockChart', {

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

			plotOptions: {
	            column: {
	                stacking: 'normal'
	            }
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
        	}, {
            // Secondary Y-Axis
            	labels:{
                	formatter: function() {
                        return '$' + this.value;
                    }
                },
            	opposite: true
        	}],
			
			series : chart2_series

		});

		//CHART 3
		$('#container3').highcharts('StockChart', {

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
                        return '$' + Highcharts.numberFormat(this.value, 0, '.', ',');
                    },
		            align:'right',
		            x:-10
		        },
		        lineWidth : 1,
		        offset : 0
        	}],
			
			series : [{
				type: "column",
				name: "Sales",
				data: sales_data
			}]

		});

	}

	//Function that takes a record and fills the series data with that record
	function fill_data(index, record) {
		var date = new Date(record['dailyDate']);
		var utc_date = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

		//CHART 1
		accu_data[index] = [utc_date, parseFloat(record['accu'])];
		//necessary for Henrys style of plotting. DAU must be equal to old users + new users
		dau_data[index] = [utc_date, parseFloat(record['dau']) - parseFloat(record['users'])];
		nu_data[index] = [utc_date, parseFloat(record['users'])];
		pccu_data[index] = [utc_date, parseFloat(record['pccu'])];

		//CHART 2 (Henry wants these values self calculated)
		var payrate;
		if(parseFloat(record['dau']) != 0) {
			payrate = parseFloat(record['paying'])/parseFloat(record['dau'])*100;
		}
		else {
			payrate = 0;
		}
		payrate_data[index] = [utc_date, payrate];
		var arpu;
		if(parseFloat(record['dau']) != 0) {
			arpu = parseFloat(record['sales'])/parseFloat(record['dau']);
		}
		else {
			arpu = 0;
		}
		arpu_data[index] = [utc_date, arpu];
		var arppu;
		if(parseFloat(record['paying']) != 0) {
			arppu = parseFloat(record['sales'])/parseFloat(record['paying']);
		}
		else {
			arppu = 0;
		}
		arppu_data[index] = [utc_date, arppu];

		//CHART 3
		sales_data[index] = [utc_date, parseFloat(record['sales'])];

	}

	// //Function that sets up the series data for plotting
	function fill_series() {
		//CHART 1
		nu_series = {
                name: "NU",
                type: "column",
                data: nu_data,
                //color: '#B2E6FF'
        };
        chart1_series[0] = nu_series;
        dau_series = {
                name: "DAU",
                type: "column",
                data: dau_data,
                //color: '#0033CC'

        };
        chart1_series[1] = dau_series;
		accu_series = {
                name: "ACCU",
                data: accu_data,
                yAxis: 1,
                marker : {
					enabled : true,
				},
				//color: '#FF5050'
        };
        chart1_series[2] = accu_series;
        pccu_series = {
                name: "PCCU",
                data: pccu_data,
                yAxis: 1,
                marker : {
					enabled : true,
				},
				//color: '#990000'
        };
        chart1_series[3] = pccu_series;

        //CHART 2
        payrate_series = {
        	name: "Pay Rate",
        	data: payrate_data,
        	marker : {
					enabled : true,
			},
        }
        chart2_series[0] = payrate_series;
        arpu_series = {
        	name: "ARPU",
        	data: arpu_data,
        	yAxis: 1,
        	marker : {
					enabled : true,
			},
        }
        chart2_series[1] = arpu_series;
        arppu_series = {
        	name: "ARPPU",
        	data: arppu_data,
        	yAxis: 1,
        	marker : {
					enabled : true,
					radius : 3
			},
        }
        chart2_series[2] = arppu_series;
	}

	//Pull data from API, format it, and store into the series arrays
	(function() {
		var current_date = new Date();
		var formatted_current_date = current_date.getFullYear() + "-" + (current_date.getMonth()+1) + "-" + current_date.getDate();
		var min_daily_date = "2013-08-06";
		var api_call = "http://server.staging.gamefuse.com/stat/getDailyDataSummary.action?company=45&area=1&server=1&minDailyDate=" + min_daily_date + "&maxDailyDate=" + formatted_current_date;
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




