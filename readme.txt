=== Plugin Name ===
Contributors: Jouni Santara, TERE-tech ltd
Donate link: http://www.tere-tech.eu/
Tags: d3, visualization, chart, graph, CSS, CSS3, SVG, vector graphics, DOM, HTML5, shortcode
Requires at least: 3.3.2
Tested up to: 3.5.1
Stable tag: 1.3.7
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

d3-simpleCharts offers you direct access to a few d3 basic charts and let you add them into your WordPress posts fast and easy.

== Description ==

d3-simpleCharts is here: you can start to show the next generation W3C's sharp charts and graphs (eq SVG formats via d3.js library) from your any WordPress blogs easily.

This WP plug-in contains just 4 simple example graph types that you can call and draw by one shortcode: 

  'simpleChart'

The available chart types now are here: 'Columns', 'Bars', 'Line', 'Pie', 'Area'

Pretty *simple* and obvious there, yes?

You can define *data input values* on the standard and uniform way from *wordpress shortcode's arguments* directly or from *external input data files*. 

Shortcode's input option (eq values='1,2,3') is the preferred way always as the primary source of data values & their labels.

Three external file type formats are currently supported for data input (eq datafile='mydata.csv'):

1. CSV
1. JSON
1. TSV (eq tab separated values)

Note: XML should be easy to add: a bare skeleton JS code is there existing already but parsing of document is missing at this very 1st version of plugin package.

simpleCharts lets you start with very simple basic calls when you start to use it as a novice and then let you progress gradually to the quite advanced levels of SVG's *real professional properties* when you need them and are willing to budget enough time for deeper learning curve.

Software is also automatically choosing default settings for more complex features that you vote not to setup them yet.

Here is the most *simple example of shortcode's call* that works very well:

[simpleChart maintitle='My Pets' labels='(Cats, Dogs, Birds)' values='(2,1,5)']

Pretty *simple* & obvious (to create default 'Columns' chart) is it, huh?

* [More basic things on Wiki](https://github.com/mrBigJS/d3-simpleCharts/wiki/Getting-started)

Now - to get a whole picture of all rich features available here - you can expand your knowledge and finally master something like this for each new post/page on WP:

[simpleChart chart='Pie' mtitle='All Animals' values='(1,2,4,8,16)' labels='(Cats,Dogs,Birds,Frogs,Bears)' xtitle="Animal race" ytitle="Pcs on wild farm" datafile="animals.json" width="800" height="600" format="+0.02%" title="These animals are living free around." minrange="1.0" url="http://en.wikipedia.org/wiki/Wild_animals" xrotate=-20]

* Very advanced & powerfull shortcode's call* above to draw just the way you want your professional embedded super fast vector graphics.
* [Advanced in detail on Wiki](https://github.com/mrBigJS/d3-simpleCharts/wiki/Advanced-examples)

You can customize almost main aspects of new created chart easily by using CSS style file(s) and chart's generated CSS classes together. 
.

**Key Features**

1. Chart type switcher buttons to compare data different ways.
1. New chart's vertical position control based on CSS.
1. New chart's total look & feel control based on CSS.
1. Automatic smooth gradient coloring of each bar (or area) of chart.
1. Many embedded charts on the same page, no problem.
1. Supporting W3C's globally recognized open web standards: DOM, SVG, and CSS.
1. Supports time series from data files.
1. Open chart's data set export: Excel, SVG editor/viewer, and into big data (JSON) format.
1. JavaScript API support for all shortcode's options with your apps.
.

**Data input and output**

* Data importing from external files (CSV/TSV/JSON) on server.
* Exporting: Excel and JSON formats (eq big data).
* Optional smart parsing of 2x2 matrix data points files row by row.
.

**Software Upgrades & Further Development**

* Distributed collaborative development via GitHub too (= welcome to fork and improve core's code for "d3-simpleCharts", note BIG 'C' in name).
* Supporting D3 (eq data driven documents) developers society for powerfull JavaScript graphics (d3.js on GitHub).

All software is written also in a style that should be easy to expand & understand for any normal web developer of WordPress, DOM, JS & PHP languages. 

Also, there is left on purpose a plenty of 'console.info(foo)' debugging calls for those essential variables of JS that you can activate in order to see what is really going on when SVG drawing takes its place (= consoles of FireBug & Chrome).

d3 lib is abit tricky to grasp at first - take your time & fill your coffee machine :-)

**Full open source + reference guide**

* [d3-simpleCharts on GitHub](https://github.com/mrBigJS/d3-simpleCharts "Join in and fork this code even better to anyone.")


**HAPPY simpleCharting on WordPress !**


== Installation ==

Two WP standard ways to install the package.

1. Go to wordpress 'Dashboard' front page.
1. Select PlugIns / Add New for searching new plugin from internet.
1. Write 'd3' to the search box + Search PlugIns.
1. Select 'Install Now' under the result of 'd3-simpleCharts'.
1. Activate the PlugIn on WordPress after its download.
1. Start to use & enjoy shortnotes '[simpleChart]' with its options inside your posts & pages.

Or you may want to do it 'old traditional way'.

1. Upload `d3-simpleCharts.php` & `d3-simpleCharts.js` to the `/wp-content/plugins/` directory from wordpress.com site.
1. Activate the plugin through the 'Plugins' menu in WordPress.
1. Start to use shortnotes '[simpleChart]' inside your posts & pages.

This software is provided as it is and we can not guarantee very fast support & help for it, unfortunately.

Also, we do not have time to test this software against different WP versions but we gladly hear your feedback and update that version support numbers based on your (hopefully positive) comments.

We warmly welcome some professional WP developer to build around this core all those fancy 'Bells & Whistles' that could nicely integrate this shortnote available to the graphical user interface of publishing new posts and pages for everyone, naturally.

Let me know if you are producting suggested improvement and take this work to the next level !


== Frequently Asked Questions ==

= Is it possible to have multiple charts on the same WP post or page? =

Good point & question !

YES indeed, the software is written so that it hides all the (= ugly) complexity of accounting of many separate charts + styles on the same page of WP.

So, you may have many pretty charts on the same page with their own original CSS styles attached to each one, independently. Everything is perfectly under your control transparently.

= Is it possible to embed a single chart to some exact position of post / page? =

YES, you can now use 2 different methods to do this:

* Before calling shortcode [simpleChart] manually write (in WP's HTML mode) chart's placeholder(s) (often, DIV or SPAN tags in HTML). Take a look 'chartid' option on manual.
* Generating bare chart directly from JavaScript function simpleChart() and letting it create placeholder automatically.

= How can I develope my own fancy XYZ or ABC around this code and get it included, too? =

We encourage open collaborative development for programmers (by GitHub) over here:

[d3-simpleCharts on GitHub](https://github.com/mrBigJS/d3-simpleCharts "Join in and fork this code even better to anyone.")

= So, there is no user manual at all for this WordPress plugin inside download, huh? =

Online manual & reference is building up gradually on GitHub's Wiki over here:

[d3-simpleCharts - user's manual & reference of all functions](https://github.com/mrBigJS/d3-simpleCharts/wiki/Introduction)

Also, we recommend (on Windows) to use [TortoisesSVN](http://tortoisesvn.tigris.org/) client together with GitHub. It really takes the pain away from learning Git. Here is [a nice tutorial](http://techlunatic.com/2011/09/how-to-submit-your-first-plugin-to-wordpress-ultimate-guide/) about its use.


*Very Good Further Links*

* [d3 simpleCharts](https://github.com/mrBigJS/d3-simpleCharts/wiki/Introduction
            "Examples and full documentation of all options to use together with d3 simpleCharts.")
* [D3, All Galleries](https://github.com/mbostock/d3/wiki/Gallery
            "Fancy, impressive & professional charts that should inspire you to jump in.")
* [Chart's SVG standard](http://www.w3schools.com/svg/svg_reference.asp
            "Usefull for personalizing your own visual outlook of chart contents, use together with Firebug's/Chrome's 'Inspect element' on browser's window command.")
* [Chart's CSS styles & layout control](http://www.w3schools.com/tags/tag_table.asp
            "Usefull for contolling chart's background look and its overall position.")
* [D3, Tutorial](https://github.com/mbostock/d3/wiki/Tutorials
            "Now, let's get your fingers dirty and start programming more charts!")
* [D3, API's reference](https://github.com/mbostock/d3/wiki/API-Reference
            "All you finally need when get up to PRO level with D3 & its cool programming universe.")

			
== Screenshots ==

1. Cool tooltips visible here on 'Columns' charts.
2. Area chart showing user defined smooth gradient colors (eq [... startbar="lime" & endbar="red"]).
3. Button icons to call 5 different supported chart types on 'Columns' chart.
4. A 'Pie' chart: its slices are colored smoothly from 'navy' to 'gold' + more custom titles present in graph.
5. A supported 'Line' chart that is produced by Rickshaw's library.
6. Resized SVG chart on its own popup window + ready to print on paper.
8. Shows how basic 'Columns' looks out (old UI).
9. Shows how basic 'Area' looks out (with old UI buttons).
10. Tiny bare chart only generated by JavaScript.
11. One more car and we need to rotate data labels abit here.

== Changelog ==

= 1.3.7 =
Version 1.3.7 -
Fixing the bug of exporting correct SVG chart instance as a download. Clarifying overall design of all buttons.

= 1.3.6 =
Version 1.3.6 -
Opening in apps + saving to a file export data now available. For example, direct opening into SVG editor possible for a chart (if you set exportsvg option active). Added classes to control the style of export data box from CSS.

= 1.3.5 =
Version 1.3.5 -
All pop-up window charts follow the CSS style rules of its parent chart faithfully. Refining some axises default setup values. More fancy screenshots from real fast cars.

= 1.3.4 =
Version 1.3.4 -
Adding new option 'xrotate' for rotating x axis labels with Columns chart as you wish. Some options becomes more tolerant for typos. Fixing bugs & warnings (BIG thanks for Cheche!).

= 1.3.3 =
Version 1.3.3 - 
Correcting the path of 'd3-simpleCharts' -> 'd3-simplecharts' and following WP's original naming of plugin. 

= 1.3.2 =
Version 1.3.2 - 
Making options 'labels', 'colors', 'values' input more tolerant for some common user's typos. Main title has option can be also called 'maintitle' and chart's popup text 'popuptitle' from now on.

= 1.3.1 =
Version 1.3.1 - 
Adding option of "not to generate place holder" on JavaScript API. Also, Wiki's doc updated.

= 1.3.0 =
Version 1.3.0 - 
Introducing support of JavaScript API from any WordPress page/post or from your own JS app. Very basic Wiki's doc on Github available.

= 1.2.28 =
Version 1.2.28 - 
Let there be colors... and there was: introducing an option 'colors' to set your favorite colors of chart's segments. Wiki's doc is updated for this exciting feature too on Github.

= 1.2.27 =
Version 1.2.27 - 
Fixing in 'Bars' chart type the lowest value scaling issue. More Data button is hidden by default if there is no 2x2 data set.

= 1.2.26 =
Version 1.2.26 - 
More Data button is labelled by picked row name from 2x2 external file's 1st column. New option 'moredatatitle' to set More Data button custom title introduced.

= 1.2.25 =
Version 1.2.25 - 
Issue of attaching More Data's data sets to the right chart on multiple charts / page fixed.

= 1.2.24 =
Version 1.2.24 - 
Let there be TIME SLIDER and ... there was (by JQuery UI). New obvious option 'notimeslider' available, too. Fixing external file's time series to appear chronologically right on its pop-up menu.

= 1.2.23 =
Version 1.2.23 - 
Sort works for external input file data more logically. Scaling more reasonable size of Pie. Better support of Bars & their tooltips. Better default style file example.

= 1.2.22 =
Version 1.2.22 - New handy keywords 'first' and 'last' for reading 2x2 data set from external input file. New classes of CSS for X and Y axis titles and examples on default style file. More updates to GitHub's docs.

= 1.2.21 =
Version 1.2.21 - Better scaling of mins & maxs on axis. 'Caption' adding below chart(s). Error messages & warnings for uncorrect data sets.

= 1.2.20 =
Version 1.2.20 - Layout control of multiple charts on WP page works now (eq 'chartid'). Nice screenshot added. Github's docs updated.

= 1.2.19 =
Version 1.2.19
* Tooltips support (COOL & transparent !) and shortcode's 'notooltips' new option.
* New optional 'chartid' allowing the placement of chart anywhere.
* Legal license text included, also.

= 1.2.18 =
Version 1.2.18 - Bug fixes: 'Columns' supports now maxrange option too + sanity checks of generating gradiant colors for a chart at all.

= 1.2.17 =
Version 1.2.17 - New chart's CSS class 'svgchart' + its docs on Wiki. Default styling file: move of styling rules toward chart's own classes from basic SVG elements + listed names of mostly generated classes by new chart(s). More roomy & clear layout of default styled charts overall.

= 1.2.16 =
Version 1.2.16 - Linear gradient colors comes to 'Area' charts same way as on 'Columns' + its screenshot. New 'cssfile' option to input any named style file per chart. New reference page of CSS classes on Wiki + general clarifications of docs on Github.

= 1.2.15 =
Version 1.2.15 - Fixing bug of resizing chart on its popup window.

= 1.2.14 =
Version 1.2.14 - Adding afew more impressive screenshots.

= 1.2.13 =
Version 1.2.13 - Popup window chart becomes resizeable: brand-new scale down + up buttons (after all that is what 'SVG' stands for). Adding one more pretty screenshot.

= 1.2.12 =
Version 1.2.12 - Better uniform access to default styles from CSS file.

= 1.2.11 =
Version 1.2.11 - More flexible typos tolerating shortcode calls & new sort options.

= 1.2.10 =
Version 1.2.10 - Added new sort option + its handy popup UI on chart (= no automatic sort of data anymore).

= 1.2.9 =
Version 1.2.9 - New maxrange option support. Also, simple external input files and their user doc  on Wiki (advanced examples).

= 1.2.8 =
Version 1.2.8 - Added 'Line' chart type drawing + its icon (thanks to rickshaw visualization lib!).

= 1.2.7 =
Version 1.2.7 - Bug fix: row option default set for reading 2x2 matrix input data.

= 1.2.6 =
Version 1.2.6 - Adding basic icon buttons for the chart and a folder for their pics (eq style of open office).

= 1.2.5 =
Version 1.2.5 - Chart on new window link, adding support of css style file for svg, fixing bug of chart's width at start (on Chrome).

= 1.2.4 =
Version 1.2.4 - Cleaning the code.

= 1.2.3 =
Version 1.2.3 - Centering chart's title and introducing positioning of logo option.

= 1.2.1 =
Version 1.2.1 - Adding chart's branding logo and a flag to add jQuery lib.

= 1.2.0 =
Version 1.2.0 - New options to remove chart's buttons to appear.

= 1.1.5 =
Version 1.1.5 - Finally tagging right subversion public on wordpress svn system.

= 1.1.3 =
Version 1.1.3 - Adding some pointers to GitHub's full documentation.

= 1.1.1 =
Version 1.1.1 - A few screenshots added.

= 1.1.0 =
Version 1.1.0 - Charts fixed and optional menu to other data sets added.

= 1.0.0 =
Version 1.0.0 - This is very first release of the d3-simpleCharts plugin.

== Upgrade Notice ==


            
