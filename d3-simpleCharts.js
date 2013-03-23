/*
  drawChart
	---------
	A simple switcher to select the chart type based on user's input.
*/
function drawChart(data,args2js) {

	if (args2js.chart == 'Columns')
		simpleCols(data,args2js)
	else if (args2js.chart == 'Bars')
		simpleBars(data,args2js);
	else if (args2js.chart == 'Area')
		simpleArea(data,args2js);
	else if (args2js.chart == 'Pie')
		simplePie(data,args2js)
	else
		console.error('No chart type given & defined.');
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
    .rangeRoundBands([0, width], .1);

var min_y = args2js['minrange']; // 0.9;
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
      .attr("height", function(d) { return height - y(d.value); });

// console.info(args2js.ticks);

	checkTicks(args2js,height,width,y,'horizontal'); // whether ticks should be draw or not on graph
/*
// Drawing ticks lines, if asked by user's input
	 if (args2js.ticks) {
	 var chart = d3.select('.g'+args2js.uniq).append("svg")
		.attr("class", "chart")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(10,15)");

	chart.selectAll("line")
		.data(y.ticks(args2js.ticks))
		.enter().append("line")
		.attr("x1", -10)
		.attr("x2", width)
		.attr("y1", y)
		.attr("y2", y);
	}
*/
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
// TODO: connect real "data" here ...
var allpos = true;
var data = new Array();
for (var point in datas)
	// console.info(typeof datas[point].value);
	if (datas[point].value) {
		data.push(datas[point].value);
		if (datas[point].value < 0)
			allpos = false;
	}
// var data = [-15, -20, -22, -18, 2, 6, -26, -18];

// TODO2: test with neg/pos CSS colors from PHP call level
/*
.bar.positive {
  fill: steelblue;
}
.bar.negative {
  fill: brown;
}
*/

var margin = args2js.margin; // {top: 30, right: 10, bottom: 10, left: 10},
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

var x0 = Math.max(-d3.min(data), d3.max(data));

var x = d3.scale.linear()
    .domain([-x0, x0])
    .range([0, width])
    .nice();
if (allpos)  // All input points > 0 case
	x = d3.scale.linear()
		.domain([0, x0])
		.range([0, width])
		.nice();

var y = d3.scale.ordinal()
    .domain(d3.range(data.length))
    .rangeRoundBands([0, height], .2);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top");

chartid = 'g'+args2js.uniq;
var svg = d3.select('#chart'+args2js.uniq).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
	.attr("class", chartid)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("class", function(d) { return d < 0 ? "bar negative" : "bar positive"; })
    .attr("x", function(d) { return x(Math.min(0, d)); })
    .attr("y", function(d, i) { return y(i); })
    .attr("width", function(d) { return Math.abs(x(d) - x(0)); })
    .attr("height", y.rangeBand());

svg.append("g")
    .attr("class", "x axis")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
  .append("line")
    .attr("x1", x(0))
    .attr("x2", x(0))
    .attr("y1", 0)
    .attr("y2", height);

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
    .rangeRoundBands([0, args2js.width]);

var y = d3.scale.linear()
	.range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
	
var area = d3.svg.area()
    .x(function(d) { return x(d.label); })
    .y0(height)
    .y1(function(d) { return y(d.value); });

var line = d3.svg.line()
    .x(function(d) { return x(d.label); })
    .y(function(d) { return y(d.value); });

chartid = 'g'+args2js.uniq;
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
  // x.domain(d3.extent(data, function(d) { return d.label; }));
  // x.domain([data[0].label, data[2].label]);
  if (allpositive)
	y.domain([0, d3.max(data, function(d) { return d.value; })]);
  else
	y.domain([d3.min(data, function(d) { return d.value; }), d3.max(data, function(d) { return d.value; })]);
	
  svg.append("path")
      .datum(data)
      .attr("class", "bar")
      .attr("d", area);  // line

/* TODO HERE: uncomment and fix the labels of x-axis coming out ok. 
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
*/
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -30)
      // .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(args2js.ytitle);
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

var    radius = Math.min(width, height) / 2;
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
var svg = d3.select('#chart'+args2js.uniq).append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var acolor = d3.hsl("orange");
if (args2js['piecolor'])
	acolor = d3.hsl(args2js['piecolor']);
console.info(args2js);

var piecolstep = 0.3;
if (args2js['piecolstep'])
	piecolstep = args2js['piecolstep'];

var colors = new Array(); // An array of colors for pie
var data = datas;
 data.forEach(function(d) {
	if (d.value > 0) { // Must be something positive to show on pie
		d.value = +d.value;
		colors.push(acolor.toString()); // Record the color
	}
	acolor = acolor.brighter(piecolstep);  // Pie's slice color is smoothly interpolating toward brighter & white
	// console.info(d);
});
//  console.info(colors);

var color = d3.scale.ordinal()
    .range(colors);

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
