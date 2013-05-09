function openData(args2js,id,format,svgid) {

	var bdid = id+'_bdme';
	var html = '<div id="'+bdid+'" class="noteitem">';
	html += '<button style="float:right" title="Close data area." onclick="removeMe(\''+bdid+'\')"> [X] </button><br />';

	var data = args2js.data;
	if (format == 'tsv') {
		var labels = new Array();
		var values = new Array();
		for (i=0; i<data.length; i++) {
			labels.push(data[i].label);
			values.push(data[i].value);
		}
		html += printArr(labels) + ' <br />' + printArr(values) + '<br />';
	} else if(format == 'table') {
		var labels = new Array();
		var values = new Array();
		for (i=0; i<data.length; i++) {
			labels.push(data[i].label);
			values.push(data[i].value);
		}
		html += '<b>Excel data table</b><table style="width:90%; color:navy; border:1px"><thead style="font-weight:bold">' + printArr(labels,1) +'</thead><tbody>'+ printArr(values,1) + '</tbody></table>';
	} else if(format == 'svg') {
		html += '<b>Chart in HTML</b><br />'+$('#'+svgid).html().replace(/</g,"&lt;").replace(/>/g,"&gt;");  // &lt; &gt;
	} else
		html += JSON.stringify(data).replace(/{/g," <br />{");

	html += '</div>';
	$('#'+id).append(html);
}

function removeMe(obj) {
	$('#'+obj).remove();
}

function printArr(arr,dtype) {

	if (!dtype)
		var out= JSON.stringify(arr).replace(/,/g,"	").replace("[","").replace("]","").replace(/"/g,"");
	else
		var out= JSON.stringify(arr).replace(/,/g,"</td><td>").replace("[","<tr><td>").replace("]","</td></tr>").replace(/"/g,"").replace(/\./g,",");
	// console.info(out);
	return out;
}

function pickRow(i, data) {

	if (i>data.length)
		i = data.length;
console.info('pickRow!');
	// Reading data from data's row
	// Assuming that object is: { FOO, label1:value2, label2:value2, ... }
	var elem = 0;
	var out = new Array();
	// var cells = (array) data[nro];
	i--;
	var labeled = 0;
	for (var point in data[i])
		if (labeled) {
			var cell = new Object();
			cell.label = point;
			data[i][point] = data[i][point].replace( ',', '.' );
			cell.value = data[i][point];
			// ' "value":'+data[i][point];
			// console.info(cell);
			out.push(cell);
		} else
			labeled = true; // Skipping over 1st column of data
	// console.info(out);
	return out;
}

function pickColumn(i, data) { // TODO...

	console.info(data[data.length-1]);
	return data;
}

function cbaSort(a,b) { // custom sort by values of data (desc.)
	return a.value < b.value;
}
function abcSort(a,b) { // custom sort (asc.)
	return a.value > b.value;
}
/*
	drawChart
	---------
	A simple switcher to select the chart type based on user's input.
	Default: 'Columns'
*/
function drawChart(args2js,ctype,column,row) {
// Hooks for own JavaScript apps

if (row)
	args2js.row = row;
if (column)
	args2js.column = column;

if (args2js.datafile  && args2js.row) {
	// Backup of (file's) input for later JS hooks
	args2js.backup = args2js.data;
	args2js.data = pickRow(args2js.row, args2js.data);
	args2js.row = 0;
} else if (args2js.datafile && args2js.column) {
	// Backup of (file's) input for later JS hooks
	args2js.backup = args2js.data;
	args2js.data = pickColumn(args2js.column, args2js.data);
	args2js.column = 0;
}
console.info(args2js.sort);

	if (args2js.sort) // Sort
		if (args2js.sort == 'abc' || args2js.sort == 123 || args2js.sort == '123')
			args2js.data.sort(abcSort)
		else if (args2js.sort == 'cba' || args2js.sort == 321 || args2js.sort == '321')
			args2js.data.sort(cbaSort);

	if (ctype) // Global chart type can be overwritten by ctype input
		args2js.chart = ctype;

	// Attach interpolated color ramp to chart's bars/columns/etc, if asked
	args2js.colors = getColorRamp(args2js.startbar, args2js.data.length, args2js.endbar);
	// console.info(args2js);

	// Emptying this chart's space
	$('#chart'+args2js.uniq).empty();

	var data = args2js.data;  // Taking data out & more compatible for charting modules below
	if (args2js.chart == 'columns')
		simpleCols(data,args2js)
	else if (args2js.chart == 'bars')
		simpleBars(data,args2js);
	else if (args2js.chart == 'area')
		simpleArea(data,args2js);
	else if (args2js.chart == 'pie')
		simplePie(data,args2js)
	else if (args2js.chart == 'line')
		line(data,args2js)
	else
		console.error('No legal chart type given in shortcode, choices are: "area", "columns", "bars", "line", and "pie".');
}
/*
	extendData
	----------
	Extends data picking to other data sets if possible via external file data set.
*/
function extendData(title) {

	var xtrasButt = '';
	if (args2js.backup.length > 1) {
	
		var labels = new Array();
		for (var lab in args2js.backup[0])
			labels.push(lab);

		for (var data=args2js.backup.length-1; data > -1; data--) {
			xtrasButt = xtrasButt + '<option value="'+data+'">'+args2js.backup[data][labels[0]]+'</option>';
		}
		xtrasButt = '<select id="xdata" onchange="initDraw()">'+xtrasButt+'</select>';
		// console.info(xtrasButt);
		$('#extras').empty();
		$('#extras').html(xtrasButt); // Placing menu visible by JQuery
	} else
		alert('Only one data set is given as an input at the moment.');
}
// Small help function to enable drawChart for other data sets
function initDraw() {
	var row = $('#xdata').val();
	args2js.data = args2js.backup;
	drawChart(args2js,args2js.chart,0,parseInt(row)+1);
}

function sort() {
	console.info($('#xsort').val());
	var stype = $('#xsort').val();
	args2js.sort = stype;
	drawChart(d3charts[0],args2js.chart);
}

/*
	simpleCols
	----------
	This draws simple columns chart and accepts user's defined CSS for its visual style + layout.

	This code is based on 'mbostock' (on GitHub) example of 'Basic Charts' originally. 
	His copyright 'X' defines this open source work that can expand here naturally.
	
	Limitations: no negative values as a data, please.

	Reference: 
	http://bl.ocks.org/3885304
*/
function simpleCols(data,args2js) {
// console.info(args2js);

// Size of output chart + margins
var width = args2js.width;
var height = args2js.height;

if (!args2js.margin) {
 width = args2js.width - args2js.margin.left - args2js.margin.right;
 height = args2js.height - args2js.margin.top - args2js.margin.bottom;
}
// console.info(width);
// console.info(height);

// Formatting of numbers on axis
 formatPercent = d3.format(args2js.format);
// console.info(args2js.format);
 
// X and Y axels: labels & their ranges
var x = d3.scale.ordinal()
	.rangeRoundBands([0, width], .2);

var min_y = 0;
if (args2js['minrange'])
	min_y = args2js['minrange'];
var y = d3.scale.linear()
    .range([height, min_y]);

// How to place labels of axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);

// Setting out the SVG graph & its ID name element
 // Note: widht is "string" as a default type, need to (int) it
 var width2 = parseInt(width) + args2js.margin.left + args2js.margin.right;
 var height2 = parseInt(height) + args2js.margin.top + args2js.margin.bottom;
 
 chartid = 'g'+args2js.uniq;
 d3.select('#chart'+args2js.uniq+' svg').remove(this); // Removing old SVG chart, if any exits.
 svg = d3.select('#chart'+args2js.uniq).append("svg")
	.attr("width", width2)
    .attr("height", height2)
  .append("g")
    .attr("class", chartid)
	.attr("transform", "translate(" + args2js.margin.left + "," + args2js.margin.top + ")");

// Feeding in real data
  data.forEach(function(d) {
	d.value = +d.value;
  });
console.info(data);
// Range of X & Y axis
  x.domain(data.map(function(d) { return d.label; }));
  y.domain([min_y, d3.max(data, function(d) { return d.value; })]);
  
// Setting up X axis + its title
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
	.append("text")
      .attr("x", Math.round(width/2)) 
      // .attr("dx", -50)
	  .attr("dy", 30)
      .style("text-anchor", "end")
      .text(args2js.xtitle); 

// Setting up Y axis + its title
  svg.append("g")
      .attr("class", "y axis")
	  // .attr("transform", "translate(10,15)")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
	  .attr("y", Math.round(height/2))
      .attr("y", -30)
      // .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(args2js.ytitle); 
// console.info(args2js.ytitle);	  

// Drawing colums, really & finally !
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
	  .attr("class", "bar")
      .attr("x", function(d) { return x(d.label); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
	  // .text(function(d) { return d; })
	  .style("fill", function(d, i) { return args2js.colors[i]; }) 
      .attr("height", function(d) { return height - y(d.value); });

// console.info(args2js.ticks);

	checkTicks(args2js,height,width,y,'horizontal'); // whether ticks should be draw or not on graph
}

/*
	simpleBars
	----------
	This draws simple bars chart and accepts user's defined CSS for its visual style + layout.

	This code is based on mr X (eq 'mbostock' on GitHub) example of 'Bar Chart with Negative values' originally. 
	His copyright makes this open source work that can expand here naturally.
	
	We just bridged it to the WP and makes it possible to style by CSS standard.

	Reference: 
	http://bl.ocks.org/mbostock/2368837
*/
function simpleBars(datas,args2js) {

// Size of output chart + margins
var width = args2js.width;
var height = args2js.height;

if (!args2js.margin) {
 width = args2js.width - args2js.margin.left - args2js.margin.right;
 height = args2js.height - args2js.margin.top - args2js.margin.bottom;
}
 
var allpos = true;
var data = new Array();
for (var point in datas)
	// console.info(typeof datas[point].value);
	if (datas[point].value) {
		data.push(datas[point].value);
		if (datas[point].value < 0)
			allpos = false;
	}

// TODO2: test with neg/pos CSS colors from PHP call level
/*
.bar.positive {
  fill: steelblue;
}
.bar.negative {
  fill: brown;
}
*/

var margin = args2js.margin;
var width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

var x0 = Math.max(-d3.min(data), d3.max(data));
if (args2js.maxrange)
	x0 = args2js.maxrange;

min = 0;
if (args2js['minrange'])
	min = args2js['minrange'];

var x = d3.scale.linear()
    .domain([-x0, x0])
    .range([0, width])
    .nice();
if (allpos)  // All input data points > 0 
	x = d3.scale.linear()
		.domain([min, x0])
		.range([Math.round(0+(x0-min)/x0*width), width])
		.nice();

// Stretching y-axes higher
height = 1.5 * height;
		
var y = d3.scale.ordinal()
	.domain(d3.range(data.length))
    .rangeRoundBands([0, height], .2);

// How to place labels of axis
var xAxis = d3.svg.axis()
	.scale(x)
    .orient("top");

var yAxis = d3.svg.axis()
	.scale(y)
    .orient("left");

// Formatting of numbers on axis
 formatPercent = d3.format(args2js.format);	
if (formatPercent)
	xAxis.tickFormat(formatPercent);

chartid = 'g'+args2js.uniq;
d3.select('#chart'+args2js.uniq+' svg').remove(this); // Removing old SVG chart, if any exits.
var svg = d3.select('#chart'+args2js.uniq).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
	.attr("class", chartid)
	.attr("transform", "translate( 0 ," + margin.top + ")");
    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("class", function(d) { return d < 0 ? "bar negative" : "bar positive"; })
    .attr("x", function(d) { return x(Math.min(min, d)); })
    .attr("y", function(d, i) { return y(i); })
    .attr("width", function(d) { return Math.abs(x(d) - x(min)); })
	.style("fill", function(d, i) { return args2js.colors[i]; })
    .attr("height", y.rangeBand()+6);
 
// Range of X & Y axis
  y.domain(datas.map(function(d) { return d.label; }));
  // x.domain([min, d3.max(datas, function(d) { return d.value; })]);

    // x.domain(datas.map(function(d) { return d.label; }));
  console.info(x.domain());
    console.info(y.domain());
  
svg.append("g")
    .attr("class", "x axis")
    .call(xAxis)
	.append("text")
      .attr("x", Math.round(width/2)+30) 
	  .attr("y", height+20)
      .style("text-anchor", "end")
      .text(args2js.ytitle);

svg.append("g")
    .attr("class", "y axis")
  .append("line")
    .attr("x1", x(min))
    .attr("x2", x(min))
    .attr("y1", min)
    .attr("y2", height)
	.call(yAxis)
	.append("text")
      .attr("transform", "rotate(-90)")
	  .attr("y", Math.round(height/2))
      .attr("x", -30)
      .style("text-anchor", "end")
      .text(args2js.xtitle); 

	checkTicks(args2js,height,width,x,'vertical'); // whether ticks should be draw or not on graph
}

/*
	simpleArea
	----------
	This draws simple area chart and accepts user's defined CSS for its visual style & layout.

	This code is based on mr X (eq 'mbostock' on GitHub) example of '' originally. 
	His copyright makes this open source work that can expand here naturally.

	We just bridged it to the WP and makes it possible to style by CSS standard.

	Reference: 
	http://bl.ocks.org/3883195
*/
function simpleArea(datas,args2js) {

// Size of output chart + margins
var width = args2js.width;
var height = args2js.height;

if (!args2js.margin) {
	width = args2js.width - args2js.margin.left - args2js.margin.right;
	height = args2js.height - args2js.margin.top - args2js.margin.bottom;
}
var margin = args2js.margin;

var parseDate = d3.time.format("%d-%b-%y").parse;

var allpositive = true;
// Input data format, example:
// var data = [{"label":"A0", "value":7.10},{"label":"A1", "value": -8.3},{"label":"A2", "value": 3.3}];
var data = datas;
 data.forEach(function(d) { 
	// if (d.value > 0) { // Uncomment & input must be something positive
		d.value = +d.value;
		if (d.value < 0)
			allpositive = false;
		// console.info(d);
});

var x = d3.scale.ordinal()
    .domain(d3.range(data.length))
	// .domain([0, data.length])
    .rangeRoundBands([0, width]);

//	console.info(d3.range(data.length));

var min = d3.min(data, function(d) { return d.value; });
if (min)
	min = 0;
if (args2js['minrange'])
	min = args2js['minrange'];

var max = d3.max(data, function(d) { return d.value; });
if (args2js.maxrange)
	max = args2js.maxrange;

var y = d3.scale.linear()
	.domain([min, max])
	.range([parseInt(height),0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var area = d3.svg.area()
    .x(function(d) { return x(d.label); })
	.y0(parseInt(height))
    .y1(function(d) { return y(d.value); });

x.domain(new Array());
x.domain(datas.map(function(d) { return d.label; }));

var line = d3.svg.line()
    .x(function(d,i) { return x(i); })
	.y(function(d) { return y(d.value); });

chartid = 'g'+args2js.uniq;
d3.select('#chart'+args2js.uniq+' svg').remove(this); // Removing old SVG chart, if any exits.
var svg = d3.select('#chart'+args2js.uniq).append("svg")
    .attr("width", parseInt(width) + margin.left + margin.right)
    .attr("height", parseInt(height) + margin.top + margin.bottom)
  .append("g")
  	.attr("class", chartid)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 data.forEach(function(d) {
    // d.label = parseDate(d.label);
	d.value = +d.value;
	// console.info(d);
  });
/*
d3.tsv("data2.tsv", function(error, data) {
  data.forEach(function(d) {
    d.label = parseDate(d.label);
    d.value = +d.value;
	console.info(d);
  });
*/  
  svg.append("path")
      .datum(data)
      .attr("class", "bar")
	  .attr("transform", "translate(" + width/data.length/2 + ", 0 )")
      .attr("d", area);  // line

/* TODO HERE: uncomment and fix the labels of x-axis coming out ok.
*/
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
	.append("text")
      .attr("x", Math.round(parseInt(width)/2)) 
	  .attr("y", 25)
      .style("text-anchor", "end")
      .text(args2js.xtitle);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -30)
      // .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(args2js.ytitle);

	checkTicks(args2js,height,width,y,'horizontal'); // whether ticks should be draw or not on graph
}

/*
	simplePie
	---------
	This draws simple pie chart and accepts user's defined CSS for its visual style + layout.

	This code is based on 'mbostock' on GitHub example of 'Pie Chart' originally. 
	His copyright makes this open source work that can expand here naturally.

	We just bridged it to the WP and makes it possible to style by CSS standard.
	
	Limitations: only positive data points accepted.

	Reference: 
	http://bl.ocks.org/mbostock/3887235
*/
function simplePie(datas,args2js) {

// Size of output chart + margins
var width = args2js.width;
var height = args2js.height;

if (!args2js.margin) {
	width = args2js.width - args2js.margin.left - args2js.margin.right;
	height = args2js.height - args2js.margin.top - args2js.margin.bottom;
}
var margin = args2js.margin;

var    radius = Math.max(width, height) / 2;
/*
var color = d3.scale.ordinal()
    .range(["navy","#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
*/
var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.value; });

chartid = 'g'+args2js.uniq;
d3.select('#chart'+args2js.uniq+' svg').remove(this); // Removing old SVG chart, if any exits.
var svg = d3.select('#chart'+args2js.uniq).append("svg")
    //.attr("width", width)
    //.attr("height", height)
	.attr("width", 2 * radius)
    .attr("height", 2 * radius)
  .append("g")
    // .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    .attr("class", chartid)
	.attr("transform", "translate(" + radius + "," + radius + ")");
	
var data = datas;

 data.forEach(function(d) {
	if (d.value > 0) { // Must be something positive to show on pie
		d.value = +d.value;
	}
});

var color = d3.scale.ordinal()
    .range(args2js.colors);

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "bar"); // arc

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.label); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.label });
// });
}

function checkTicks(args2js,height,width,xy,xtype) {

// console.info(args2js.ticks);
// Drawing ticks lines, if asked by user's input
	 if (args2js.ticks) {
	 var chart = d3.select('.g'+args2js.uniq).append("svg")
		.attr("class", "chart")
		.attr("width", width)
		.attr("height", height)
		.append("g") 
		.attr("transform", "translate(10,15)");

	// var xtype = "vertical"; // or "horizontal"
	if (xtype == "horizontal") {
	chart.selectAll("line")
		.data(xy.ticks(args2js.ticks))
		.enter().append("line")
		.attr("x1", -10)
		.attr("x2", width)
		.attr("y1", xy)
		.attr("y2", xy);
	} else
	{
		chart.selectAll("line")
			.data(xy.ticks(args2js.ticks))
			.enter().append("line")
			.attr("y1", -10)
			.attr("y2", width)
			.attr("x1", xy)
			.attr("x2", xy);
	}
}
}
// Applying rickshaw's lib for line chart here
function line(datas,args2js) {

// console.info(args2js.data);

var Xs = new Array();
Xs.push( {x:0, y:parseFloat(args2js.data[0].value)} );

var Xmap = new Object();
Xmap[0] = '';

var last = 0;
for (i=0; i<args2js.data.length; i++) {
	last = parseFloat(args2js.data[i].value);
	Xs.push( { x:i+1, y:parseFloat(args2js.data[i].value) } );
	// Xmap.push( { i:args2js.data[i].label } );
	Xmap[i+1] = args2js.data[i].label;
}
Xs.push( { x:Xs.length, y:last } );

var mycolor = "navy"; // def. color
if (args2js.startbar)
	mycolor = args2js.startbar;

var ymin = 'auto';
if (args2js.minrange)
	ymin = args2js.minrange;	

var ymax = '';
if (args2js.maxrange)
	ymax = args2js.maxrange;

var graph = new Rickshaw.Graph( {
	element: document.getElementById("chart"+args2js.uniq),
	renderer: 'line',
	min: ymin,
	max: ymax,
	height: args2js.height, 	//300,
	width: args2js.width, 		// 800,
	series: [ 
			{ data: Xs, color: mycolor, name:"minu sarja" } // TODO: args2js.title }
/* // Ex. of 2 data series
{ data: [ { x: 0, y: 120 }, { x: 1, y: 890 }, { x: 2, y: 38 } ], color: "#c05020" }, 
{ data: [ { x: 0, y: 80 }, { x: 1, y: 200 }, { x: 2, y: 100 } ], color: "#30c020" }
*/
]
} );
graph.renderer.setTension(1);  // Set < 1 if app needs to interpolate smooth curves
// console.info(graph.renderer.domain());

var y_ticks = new Rickshaw.Graph.Axis.Y( {
	graph: graph,
	orientation: 'right',
	tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
	pixelsPerTick: 20,
	element: document.getElementById('y_axis'),
} );

// Labels of x-axis come in
var format = function(n) {
var map = Xmap;
// { 0: 'zero', 1: 'first', 2: 'second' }; // ex. of simple input test object
return map[n];
}

var x_ticks = new Rickshaw.Graph.Axis.X( {
	graph: graph,
	orientation: 'top',
	element: document.getElementById('x_axis'),
	pixelsPerTick: Math.round( args2js.width/(args2js.data.length+1) ),
	tickFormat: format
} );
// Print it all out
graph.render();

// TODO: fix hover's popup bubble position
/*
var hoverDetail = new Rickshaw.Graph.HoverDetail( {
graph: graph,
formatter: function(series, x, y) {
// var date = '<span class="date">' + new Date(x * 1000).toUTCString() + '</span>';
var swatch = '<span class="detail_swatch" style="background-color: ' + mycolor + '"></span>';
var content = swatch + series.name + ": " + y + '<br>' + args2js.data[x].label;
return content;
} 
} );
*/
// Setting text outlook by jQuery
$('#chart'+args2js.uniq+' text').css('font','8px arial,sans-serif');

return;

/* Area chart's example
var graph = new Rickshaw.Graph( {
element: document.querySelector("#chart"+args2js.uniq),
width: 500,
height: 200,
series: [{
color: 'steelblue',
data: [
{ x: 0, y: 40 },
{ x: 1, y: 49 },
{ x: 2, y: 38 },
{ x: 3, y: 30 },
{ x: 4, y: 32 } ]
}]
});
console.info(graph);

graph.render(); 

return;
*/
}

function nvPie2() {
 nv.addGraph(function() {
   var chart = nv.models.pieChart()
       .x(function(d) { return d.label })
       .y(function(d) { return d.value })
       .showLabels(true)
       .labelThreshold(.05)
       .donut(true);

     d3.select("#chart2 svg")
         .datum(exampleData())
       .transition().duration(1200)
         .call(chart);
 
   return chart;
 });
}

function exampleData() {
   return [
   {
     key: "Cumulative Return",
     values: [
       { 
         "label" : "CDS / Options" ,
         "value" : 29.765957771107
       } , 
       { 
         "label" : "Cash" , 
         "value" : 0
       } , 
       { 
         "label" : "Corporate Bonds" , 
         "value" : 32.807804682612
       }
	]
	}
	];
}

// Generates color of bars/pie slices based on given starting and ending colors and returns its HTML color codes array
function getColorRamp(startColor, steps, endColor) {

	var colors = new Array();
	if (!startColor.length)  // We give up coloring for the CSS declarations over here
		return '';

	var csteps = 0;
	if (!endColor) {
		var acolor = d3.hsl(startColor);
		// Defining proper lightness change step
		if (acolor.l > 0.5) { // Starting color is over 50% from all lightness => going to darken it
			csteps = acolor.l / (steps); // Target range: (startColor lightness ... black/0)
			ssteps = acolor.s / steps;
		} else {  // ... or brighten up
			csteps = (1-acolor.l) / (steps); // Target range: (startColor lightness ... white/1)
			ssteps = (1-acolor.s) / steps;
		}
		// Generating real colors (without endColor given)
		var thecolor = acolor;
		for (i=0; i<steps; i++) {
			colors.push(thecolor.toString());
			// console.info(acolor.l);
			// thecolor = d3.hsl(d3.hsl(thecolor).h, d3.lab(thecolor).s+ssteps, d3.lab(thecolor).l+csteps);
			if (acolor.l > 0.49)
				thecolor = thecolor.darker(csteps*4);
			else
				thecolor = thecolor.brighter(csteps*4);
		}
	} else {  
		// Here we have start and end color to travel from => to by using steps of given color changes
		// We encode start and end colors by using Lab's color model's components from HTML's color strings
		var startColor = d3.lab(startColor);
		var Lab_start = new Array(startColor.l, startColor.a, startColor.b);
		var endColor = d3.lab(endColor);
		var Lab_end = new Array(endColor.l, endColor.a, endColor.b);

		steps = steps - 1;
		// Time to define (L,a,b) linear steps for each components change and build result
		var L_step = (-Lab_start[0]+Lab_end[0]) / steps;
		var a_step = (-Lab_start[1]+Lab_end[1]) / steps;
		var b_step = (-Lab_start[2]+Lab_end[2]) / steps;
		// Generating color ramp by using these steps together from start to end color
		var thecolor = startColor;
		for (i=0; i<steps+1; i++) {
			colors.push(thecolor.toString());
			thecolor = d3.lab(d3.lab(thecolor).l+L_step, d3.lab(thecolor).a+a_step, d3.lab(thecolor).b+b_step);
		}
		// Why use D3's Lab (vs HSL) model here: it is 'father of all humans color models :-)':
		// *** http://www.photozone.de/colorimetric-systems-and-color-models
	}
	// console.info(colors);
	return colors;
}

// A function to show SVG element into new window
  function svgWin( svgid, logoUrl, css, args2js ) {

	var header = '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> ';
	// var svg = '<svg height="100%" width="100%">' + $('.'+svgid).html() + '</svg>';
	var svg = $('#chart'+svgid).html();
	// Include files
	var jquery = "<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'></script>";
	if (css)
		css = '<link rel="stylesheet" href="wp-content/plugins/d3-simpleCharts/'+css+'" type="text/css" media="all"/> ';
	else
		css = '';
	css = '<script src="wp-content/plugins/d3-simpleCharts/d3-simpleCharts.js"></script>' + jquery + css;

	if (logoUrl)
		logoUrl = '<img src="'+logoUrl+'">';

	var smallerB = '<button style="font-size:xx-small" onClick="svgsize('+svgid+',-0.1)"> « </button> ';
	var biggerB = '<button style="font-size:xx-small" onClick="svgsize('+svgid+',+0.1)"> » </button> ';
	var printB = '<button style="float:right" onClick="window.print()">Print Chart</button> ';

	var html = header+' <html><head><title>Chart('+args2js.chart+'): '+args2js.title+'</title>'+css+'</head> ';
	html = html + '<body><div style="float:right"> '+logoUrl+'</div><h3 class="titletext">'+args2js.title+'</h3>';
	html = html + '<table><tr><td>';
	html = html + '<p style="float:right">' + smallerB + biggerB + '</p>';
	html = html + '</td></tr><tr><td>';
	html = html + svg+'<br /><br />'+printB+' </body></html> ';
	html = html + '</td></tr></table>';

	var cwidth = 150 + parseInt(args2js.width);
	var cheight = 200 + parseInt(args2js.height);
	myWindow=window.open('','','width='+cwidth+',height='+cheight);
	myWindow.document.writeln(html);
   }
   
function svgsize(svgid, sizer) {

	console.info(svgid);
	var svgH = parseInt($('svg').attr('height'));
	var svgW = parseInt($('svg').attr('width'));
	$('svg').attr('height',svgH + Math.round(svgH*sizer));
	$('svg').attr('width',svgW + Math.round(svgW*sizer));
	console.info(svgW);

	var svgG = '.g'+svgid; // Group of svg objects
	var oldT = $(svgG).attr('transform');
	// Magic of resizing svg chart happens:
	sizer = 1+sizer;
	$(svgG).attr('transform', oldT+' scale('+ sizer +') ');
}
