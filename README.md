d3-simpleCharts
===============

Brings D3 vector graphics to the WordPress society by a simple plugin of charting examples (eq PHP + JS).

d3-simpleCharts offers you direct access to a few d3 basic charts and let you add them into your WordPress posts fast.

== Description ==

d3-simpleCharts is here: you can start to explore the next generation W3C's sharp charts and graphs (eq SVG formats via d3.js extensive library) from your WordPress blogs easily.

This WP plug-in contains just 4 simple example graph types that you can call and draw by one easy to remember shortcode: 

  'simpleChart'

The available chart types now are here:
* simpleColumns
* simpleBars
* simplePie
* simpleArea

Pretty *simple* and obvious there, yes!!?

You can define *data input values* on the standard and uniform way from *shortcode's arguments* directly or from *external data files*. 

Shortcode's input is preferred way always as the primary source of data values & their labels (if both are given).

Three external file type formats are currently supported:
* CSV
* JSON
* TSV (eq tab separated data values)

XML should be easy to add soon: bare skeleton JS code is there but parsing of document is missing at this very 1st version of package.

simpleCharts lets you start with very simple basic calls when you start as a novice and then let you progress to the quite advanced levels of SVG's *real professional properties* when you need them and are willing to budget enough time for deeper learning curve. 

Software is also automatically choosing default settings for more complex features that you vote not to use them yet.

Here is the most *simple example of shortcode's call* that works very well:

[simpleChart mtitle='Pets', labels='(Cats, Dogs, Birds)', values='(2,1,5)']

Pretty *simple* & obvious is it, huh?

Now - to get a whole picture of all rich features - you can expand your knowledge and finally master something like this:

[simpleChart chart='Pie' mtitle='All Animals' values='(1,2,4,8,16)' labels='(Cats,Dogs,Birds,Frogs,Bears)' xtitle="Animal race" ytitle="Pcs on wild farm" datafile="animals.json" css='{ ".bar" : {"fill" : "navy", "stroke" : "blue"} , ".axis path, .axis line" : {"stroke" : "orange", "fill" : "gray"} , " " : { "font" : "12px sans-serif"}, ".chart":{"stroke":"gray"}, ".axis .xtpos":{"x":"200"} }'  width="800" height="600" format="+0.02%" title="These animals are living free around." minrange="1.0" url="http://en.wikipedia.org/wiki/Wild_animals"]

*Very advanced & powerfull shortcode's call* above to draw just the way you want your professional embedded super fast vector graphics. You can customize almost every main aspect of new created chart by feeding in legal CSS and SVG attributes to the graphs. These attributes are listed & documented openly on *W3C's* sites, like: 

*www.w3schools.com*

All software is written also in a style that should be easy to expand & understand for any normal web developer of WP & PHP language.

Also, there is left on purpose a plenty of 'console.info()' debugging calls for essential variables of JS that you can activate in order to see what is really going on when SVG drawing takes its place. D3 lib is abit tricky to grasp at first - take your time & fill your coffee machine :-)

Documentation for shortcode's all arguments is coming soon when we just shall find out enough time - after business hours - to write it down. Please, be patient.


**Happy Charting on WordPress !**


We warmly welcome some professional WP developer to build around this core all those fancy 'Bells & Whistles' that could nicely bring in this shortnote available to the graphical user interface of publishing new posts and pages for everyone, naturally.

Let me know if you are producting suggested improvement and take this work to the next level !

== Frequently Asked Questions ==

= Is it possible to have multiple charts on the same WP post or page? =

Good point!

YES, the software is written so that it hides all the (= ugly) complexity of accounting of many different charts + styles on the same page of WP.

So, you may have many pretty charts on the same page with their own original CSS styles attached to each one, independently. Everything is perfectly under your control.

= Is it possible to embed a single chart to some exact position of post / page? =

Not yet: generating the container for a graph dynamically is not so easy task for PHP & WordPress environment (without binding this to other frameworks, like JQuery, etc).

Sorry - give us a good suggestion to solve it and we do this at the next version.

Now, since all shortnotes processing happens at first of WP post (/page) the graphs are also printing out at the top of post, too.

This could change in future's versions - stay tuned in !

**Our Example Charts** (ALIVE: real WP pages with that very same 'Pets' data values & labels)  

d3-simpleCharts, columns: http://www.tere-tech.eu/balticfinns/?page_id=28503
            "Shows how simpleColumns looks out together with home's pets example."  		

d3-simpleCharts, bars: http://www.tere-tech.eu/balticfinns/?page_id=28515
            "Shows how simpleColumns looks out together with home's pets example."

d3-simpleCharts, pie: http://www.tere-tech.eu/balticfinns/?page_id=28521
            "Shows how simplePie looks out together with home's pets example."			

d3-simpleCharts, area: http://www.tere-tech.eu/balticfinns/?page_id=28524
            "Shows how simpleArea looks out together with home's pets example."


**Very Good Further Docs for this PlugIn**

D3, All Galleries: https://github.com/mbostock/d3/wiki/Gallery
            "Fancy, impressive & professional charts that should inspire you to jump in."

Chart's SVG standard: http://www.w3schools.com/svg/svg_reference.asp
            "Usefull for personalizing your own visual outlook of chart contents, use together with Firebug's/Chrome's 'Inspect element' on browser's window command."

Chart's CSS styles & layout control: http://www.w3schools.com/tags/tag_table.asp
            "Usefull for contolling chart's background look and its overall position."

D3, Tutorial: https://github.com/mbostock/d3/wiki/Tutorials
            "Now, let's get your fingers dirty and start programming more charts!"

D3, API's reference: https://github.com/mbostock/d3/wiki/API-Reference
            "All you finally need when get up to PRO level with D3 & its cool programming universe."
            
