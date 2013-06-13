<?php
/*
Plugin Name: d3 simpleCharts
Plugin URI: http://wordpress.org/extend/plugins/d3-simpleCharts/
Description: d3 simpleCharts gives you easy and direct access to all powerfull d3.js library's state-of-art vector based charts (SVG, vector graphics). You can use four basic graph types and customize their appearence & layout just the way you prefer by applying CSS attributes & elements of HTML5.
Version: 1.3.1
Author: Jouni Santara
Organisation: TERE-tech ltd
Author URI: http://www.linkedin.com/in/santara
License: GPL2
*/
/* 
	d3 - Charts
	-----------

	This WP-plugin is meant to be a clear foundation to bridge W3C's consortium long hard work (on the areas of CSS, SVG, and DOM) and active d3.js framework community's efforts to the WordPress developers.

	Our goal & approach is to offer a simple server's and client's open source codes that are highly modular so that you can easily tailor it just to your specific needs.

	Here are 4 example charts of D3 society but the same approach can be used for any of those d3's impressive other gallery charts: just add more JavaScript functions for each new chart type you want to generate (on d3-simpleCharts.js).

	Our example should inspire you to add more fancy charts into your visualisation purposes easily and fast and finally build up some nice GUI on the posting panel of WordPress to manage it all for the benefits of all of us.

	Welcome to the journey of professional SVG charts !	


 	simpleBarsDev
	-------------
	- Generating new simple chart from values + their labels
*/
function simpleBarsDev($data) {

$args2js["debug"] = ''; 

// External CSS style file name
$cssfile = testDef("d3chart.css",$data['cssfile']);
if ($cssfile)
	echo '<link rel="stylesheet" type="text/css" href="wp-content/plugins/d3-simpleCharts/'. $cssfile .'" />';

// Unique ID name for each new chart +
// generate all custom tailored CSS to independent graph
$uniq = styleBars($data);
// $chartid = "chart" . $uniq;

// Testing ALL user's given arguments from php side + setting defauls

// Data values & labels from arrays
$values = testDef('',$data['values']);
$labels = testDef('',$data['labels']);
// Convert to php arrays
$values = getArr($values);
$labels = getArr($labels);

// Convert input into pairs of JSON to use for later JS input
$points2 = array();
if ($values[0] != '')
foreach(array_keys($labels) as $i) {
	// $points .= '{ "label" : "' . $labels[$i] . '", "value" : "' . $values[$i] . '" },';
	array_push( $points2, json_decode('{ "label" : "' . $labels[$i] . '", "value" : "' . $values[$i] . '" }') );
}
// $points = '[' . $points . ' ]'; // array JSON
// echo json_encode($points2);
// var_dump(json_decode($points));

// All options from php shortcode call to php args array
$args2js = array();

// All 'X' labels inside $data['X'] are available & active

$args2js["uniq"] = $uniq; // Unique ID of this new chart
$args2js["chartid"] = $data["chartid"]; // user's own container ID 

$args2js["data"] = $points2; // Data set: labels & values in JSON array

$args2js["chart"] = strtolower(testDef("columns",$data['chart'])); // Asked basic chart type or its default: Columns

$args2js["xtitle"] = testDef("X-labels",$data['xtitle']); // Minor x-title
$args2js["ytitle"] = testDef("Y-values",$data['ytitle']); // Minor y-title

$args2js["datafile"] = testDef("",$data['datafile']); // Source of external file for data set
$args2js['row'] = testDef('1',$data['row']); // Row of chosen data from multidimension input file
$args2js['column'] = testDef('',$data['column']); // Column of chosen data from multidimension input file

$args2js['sort'] = strtolower(testDef('',$data['sort'])); // Sorting of data values (123/321)

$args2js["format"] = testDef("+00.02",$data['format']); // How to format & show numeric axis (except: line chart)
$args2js["width"] = testDef(640,$data['width']); // Width of final chart on post or page (default: VGA)
$args2js["height"] = testDef(480,$data['height']); // Height of final chart
$args2js["margin"] = testDef(json_decode('{"top": 20, "right": 20, "bottom": 30, "left": 70}'),json_decode($data['margin'])); // How much space around chart for the axis titles & values
$args2js["ticks"] = testDef(10,$data['ticks']); // If there is horizontal or vertical ticks inside columns or bars

$args2js["minrange"] = testDef(0,$data['minrange']); // Starting value for linear axis of values
$args2js["maxrange"] = testDef(0,$data['maxrange']); // Ending value

// Coloring of chart objects, linear gradient color ends
$args2js['startbar'] = testDef('',$data['startbar']); // Starting color 1st bar/slice of chart
$args2js['endbar'] = testDef('',$data['endbar']); // Ending color of smooth gradient
// Coloring of chart: fixed colors in array
$args2js['colors'] = testDef('',$data['colors']);
if ($args2js['colors'])
	$args2js['colors'] = getArr($args2js['colors']);

$args2js['title'] = testDef('',$data['mtitle']); // MAJOR TITLE
$main = $args2js['title']; // Major title

$args2js['caption'] = testDef('',$data['caption']); // Longer desc info below chart

$mstyle = testDef("",$data['mstyle']); // Title's position & style (for <TD>)
$logo = testDef("",$data['logo']); // Possible url of logo (eq company symbol, etc)

if (strlen($logo))
	$logo = ' <img src="' . $logo . '"> ';
$logopos = testDef("bottom",$data['logopos']); // Logo's layout position (bottom/top)
if ($logopos == "top") {
	$logo_top = $logo;
	$logo = '';
}

$args2js['tooltips'] = testDef(0,$data['notooltips']); // Tooltips: active / not 

$moredata = testDef(" More Data ",$data['moredata']); // Name of more data button
$moretitle = testDef("Extend to other data sets",$data['moredatatitle']); // Title of more data button

$backstyle = testDef('',$data['backstyle']); // Chart's border & background style 
$url = testDef('',$data['url']); // Url to further info on net

if ($url)  // URL to external page linked to chart
	$url = ' href="' . $url . '" ';

$title = testDef('',$data['title']); // Longer pop-up description for user when cursor mover over chart
if ($title)
	$title = ' title="' . $title . '" ';
/*
TODO/test: User defines one's own container id => chart could be anywhere on page/post where shortcode is called, clumsy
if ($data['id'])
	$args2js['id'] = $data['id'];
*/

// Some config flags about buttons on layout: visible or not (def: yes)
$switcher = testDef(0,$data['noswitcher']); // No chart type switcher buttons
$series = testDef(0,$data['noseries']); // No more data button (2x2 series)
$export = testDef(0,$data['noexport']); // No data export buttons
	$exportsvg = testDef(0,$data['exportsvg']); // Chart's SVG HTML visible for export button, def: no

$slider = testDef(0,$data['notimeslider']); // Slider of time series
if ($slider == 0) {
	echo '<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />';
	echo '<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>';
}

$embed = testDef(0,$data['noembed']); // No embed link visible
$embedtitle = testDef('Embed',$data['embedtitle']); // Custom title for embed

$jquery = testDef(0,$data['jquery']); // If jQuery should be loaded (eq not existing on blog before, default:existing)
if ($jquery)
	echo '<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>';

// Including minimized version of d3.js: from CDN or local copy of server
if ($cdn)
	echo '<script src="http://d3js.org/d3.v3.min.js"></script>';
else
	echo '<script src="wp-content/plugins/d3-simpleCharts/d3.v3.min.js"></script>';

// Including our core JavaScript lib
/*
<link rel="stylesheet" type="text/css" href="wp-content/plugins/d3-simpleCharts/nvd3/nv.d3.css" />
<script src="wp-content/plugins/d3-simpleCharts/nvd3/nv.d3.min.js"></script>
*/
// if ($data['chart'] == 'line') {
	echo '<link rel="stylesheet" type="text/css" href="wp-content/plugins/d3-simpleCharts/rickshaw/rickshaw.min.css" />';
	echo '<script src="wp-content/plugins/d3-simpleCharts/rickshaw/rickshaw.min.js"></script>';
// }

// <link rel="stylesheet" type="text/css" href="wp-content/plugins/d3-simpleCharts/d3chart.css" />
?>
<!-- Start of d3 simpleCharts -->

<script src="wp-content/plugins/d3-simpleCharts/d3-simpleCharts.js"></script>

<script>

var url = '<? echo $url ?>';
var chartid = 'chart<? echo $uniq ?>';
var tableid = 'table<? echo $uniq ?>';
var title = '<? echo $title ?>';
var url = '<? echo $url ?>';

// Moving to browsers's JS now ...

// A magical glue: dumping server's php JSON for browser's JS variable, one line
var args2js = <?php echo json_encode($args2js) ?>;
// console.info(args2js);

// Writing separate data sets into its global array
if (typeof d3charts == 'undefined') 
	d3charts = new Array();
// d3charts[args2js.title] = args2js;
d3charts.push(args2js);

var rootp = 'wp-content/plugins/d3-simpleCharts/icons/';

// All existing chart types & their names
var ctype = ["'columns'","'bars'","'area'","'line'","'pie'"];
var cicons = ["columns.png","bars.png","area.png","line.png","pie.png"];
// Referring to just now added one for creating its buttons
var last_chart = d3charts.length-1;
var fontx = ' style="font-size:xx-small; cursor:pointer;" ';
var butts = '<span class="buttons">';
butts += ' <button '+fontx+'onclick="drawChart(d3charts['+last_chart+'],'+ctype[0]+')"> <img src="'+rootp+cicons[0]+'"></button>';
butts += ' <button '+fontx+'onclick="drawChart(d3charts['+last_chart+'],'+ctype[1]+')"> <img src="'+rootp+cicons[1]+'"></button>';
butts += ' <button '+fontx+'onclick="drawChart(d3charts['+last_chart+'],'+ctype[2]+')"> <img src="'+rootp+cicons[2]+'"></button>';
butts += ' <button '+fontx+'onclick="drawChart(d3charts['+last_chart+'],'+ctype[3]+')"> <img src="'+rootp+cicons[3]+'"> </button>';
butts += ' <button '+fontx+'onclick="drawChart(d3charts['+last_chart+'],'+ctype[4]+')"> <img src="'+rootp+cicons[4]+'"> </button></span>';

var slider = 0;
if (<?php echo $slider ?>==0) {  // Slider of time series showing out
	slider = 1;
}

var idX = "'<? echo $uniq ?>'";

var otherbutt = ' <button '+fontx+' onclick="extendData(d3charts['+last_chart+'],'+last_chart+','+slider+','+idX+')" title="<?php echo $moretitle ?>" id="databutt<? echo $uniq ?>"><?php echo $moredata ?></button>';

if (<?php echo $switcher ?>==1) {  // No buttons: chart switcher 
	butts = '';
}
if (<?php echo $series ?>==1) {  // No buttons: more data
	otherbutt = '';
}

// Embed link element
var cid = 'chart<? echo $uniq ?>';
var url2 = 'wp-content/plugins/d3-simpleCharts/embed.php';  // encodeURIComponent(el.innerText)
// var cid2 = "'"+cid+"'";
var cid2 = "'<? echo $uniq ?>'"; 

// embed link, TODO
// var elink = '<a href="'+url2+'?chartid='+showembed(cid2)+'" target="_blank"><?php echo $embedtitle ?></a>';
// var elink = '<a onclick="showembed('+cid2+')" target="_blank"><?php echo $embedtitle ?></a>';
elink = '';
// newwin = '';

// new window popup's opening
var logofile = '<?php echo testDef("",$data["logo"]) ?>';
	logofile = "'"+logofile+"'";
// style file name
var cssfile = "'<?php echo $cssfile ?>'";

// var newwin = ' <a onclick="svgWin('+cid2+','+logofile+','+cssfile+',args2js)">new window</a> ';
var rootp = 'wp-content/plugins/d3-simpleCharts/';
// console.info(logofile);
var newwin = ' <button style="cursor:pointer" title="Open Chart into New Window" onclick="svgWin('+cid2+','+logofile+','+cssfile+',args2js)"><img src="'+rootp+'icons/newindow.jpg"></button> ';

var embed = '<tr><td></td><td style="text-align:right"><sub>'+elink+newwin+'</sub></td><tr><tr><td>.</td></tr>'; // TODO
var sortbutt = '<select '+fontx+' id="xsort" onchange="sort('+last_chart+')"><option value="">Sort</option><option value="abc">1-2-3</option><option value="cba">3-2-1</option></select>';

// Our chart container in HTML is <table> element with custom styles for new chart
var html = '<br /><br /><table id= "'+ tableid +'" class="svgtable" style="<?php echo $backstyle ?>" width="'+(150+parseInt(args2js.width))+'">';
// if ('<? echo $embed ?>')
	html = html+embed;

// butts
html = html + '<tr><td>'+butts+'</td></tr>';
html = html + '<tr><td id="extras" class="buttons">'+otherbutt+'</td><td class="buttons">'+sortbutt+'</td></tr>';

html = html + '<tr><td class="titletext" style="<?php echo $mstyle ?>"><br /> <h3><?php echo $main ?></h3><?php echo $logo_top ?></td></tr>'; // Main title + its logo

var chartX = '<div style="" id="'+ chartid + '"></div>';
if (url) // Here is row where D3 draws its chart - finally
	html = html + '<tr><td class="svgchart"><a id="'+ chartid + '" ' + title + ' ' + url + '></a></td></tr>';
else
	// html = html + '<tr><td id="'+ chartid + '" ' + title + '></td></tr>';
	html = html + '<tr><td class="svgchart" ' + title + '>'+chartX+'</td></tr>';

if (args2js.caption)
	html = html + '<tr><td class="captiontext">'+args2js.caption+'</td></tr>';

var id = "'"+chartid+"'";
var odform = "'table'";
html = html + '<tr><td id="'+ id + '" title="Data values"></td></tr>'; // Container of big data

var cc = '<tr><td style="font-size:x-small; float:left">Run by <b>W3C</b> open technology </td><td><?php echo $logo ?></td></tr>';

var odataButt = '';
var odataButt2 = '';

if (<?php echo $export ?>==0) {

// Data export buttons
var odataButt = ' <button '+fontx+' onclick="openData(d3charts['+last_chart+'], '+id+')" title="Open chart\'s data for Copy & Paste to big data applications."> BIG DATA </button>';
var odataButt2 = ' <button '+fontx+' onclick="openData(d3charts['+last_chart+'], '+id+', '+odform+')" title="Open chart\'s data for Copy & Paste to Excel here."> Excel data </button>';
var odataButt3 = '';
if (<?php echo $exportsvg ?>==1) {
	odform="'svg'";
	odataButt3 = ' <button '+fontx+' onclick="openData(d3charts['+last_chart+'], '+id+', '+odform+', cid)" title="Open chart\'s html for Copy & Paste to web page here."> Chart </button>';
}
}

html = html + '<tr><td id="'+ chartid + 'odata" ' + title + ' style=" float:right;">'+odataButt3+odataButt+odataButt2+'</td></tr>'+cc; 
html = html + '</table>';

d3charts[d3charts.length-1].html = html;

if (d3charts[last_chart].chartid) { // chart has its container by user's input (needs JQuery, sorry)

// Tracking instance of active chart
// var lastOne = d3charts.length-1;
if (typeof chartQ == 'undefined') 
	var chartQ = new Array();
	chartQ.push(last_chart);

// console.info(chartQ);
	$(document).ready(function() { // need to wait whole DOM loaded up
		var i = chartQ.shift();
		$('#'+d3charts[i].chartid).append(d3charts[i].html);
		// console.info(i);
		// console.info(chartQ);
		newChart(d3charts[i]);
	});
} else { // This prints chart container at top of each WP page/post
	document.write(html); // This prints chart container at top of each WP page/post
	newChart(d3charts[last_chart]);
}

</script>

<!-- End of d3 simpleCharts -->
<?php
};
// Being tolerant for user's normal typos
add_shortcode("simpleCharts", "simpleBarsDev");
add_shortcode("SimpleCharts", "simpleBarsDev");
add_shortcode("simplecharts", "simpleBarsDev");
add_shortcode("Simplecharts", "simpleBarsDev");

add_shortcode("simpleChart", "simpleBarsDev");
add_shortcode("SimpleChart", "simpleBarsDev");
add_shortcode("simplechart", "simpleBarsDev");
add_shortcode("Simplechart", "simpleBarsDev");

add_shortcode("drawColumns", "simpleBarsDev");
add_shortcode("simpleChartsNew", "simpleBarsDev");

// All minor PHP functions

// Helps for setting of default arguments
function testDef($setupV, $userV) {
	if ($userV)
		return $userV;
	return $setupV;
}

/*
 	styleBars
	---------
	Generating CSS elements automatically from user's provided JSON data
 	+ printing this into its own style section on WP pages before actual new chart.
	
	Returning unique id number for each new chart & its data set.

	Abit tricky function.

	NOT supported anymore - use style file 'd3chart.css' & standard CSS rules.
*/
function styleBars($data) {

$cssdata = $data['css'];
$uniq = rand();
if ($data['chartid'])
	$uniq = $data['chartid'];
/* TODO: make it similar as <div ID="...">
if ($data['id'])
	$uniq = $data['id'];
*/
// Parsing css data from json object => string
$cssdata = (array) json_decode($cssdata);
// var_dump($cssdata);
// echo '<br />';

$css = '';
if ($cssdata)
/*
	an input json from php's input array:
		{ ".bar" : { "fill" : "navy" } }
	& the target output: 
		.bar { "fill": "navy"; }
*/
foreach (array_keys($cssdata) as $gobject) {
	//	typical objects of chart: '.bar', '.axis path', etc
	$css .= '.g' . $uniq . ' ' . $gobject . ' { ';
	$tmp = (array) $cssdata[$gobject];
	// var_dump($tmp);
	foreach (array_keys($tmp) as $attr)
		// typical attributes: 'fill', 'display', etc
		$css .= $attr . ': ' . $tmp[$attr] . '; ';
	$css .= ' } ';
}
 echo '<style>' . $css . '</style>';
return $uniq;
}
/*
	getArr
	------
	Parsing user's str arrays (eq data's values & labels) -> real php array object
		an input format: "(a,b,c)"
		the output: array("a","b","c")
*/
function getArr($array) {

	$array = str_replace('(', '',$array);
	$array = str_replace(')', '',$array);
	$array = str_replace(', ', ',',$array);
	return explode(',',$array);  // cells must be separated by ',' letter 
}

/* A small API function for testing slider on any WP page/post - NOT called from simpleChart itself 
	ex. of call: [aSlider name='myCoolSlider']
		(note: <select id="myCoolSlider"> element needs to exists beforehand)
*/
function newSlider($data) {
?>
<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
<script src="wp-content/plugins/d3-simpleCharts/d3-simpleCharts.js"></script>

<div id="<?php echo $data['name'] ?>-slider"></div>
<script>
newSlider('<?php echo $data['name'] ?>');
</script>

<?php
}
add_shortcode("aSlider", "newSlider");

?>