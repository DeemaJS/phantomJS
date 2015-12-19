/*var page = require('webpage').create();
page.open('http://github.com/', function() {
  page.render('github.png');
  phantom.exit();
});*/

/*var page = require( 'webpage' ).create();
page.open( 'http://s.codepen.io/amcharts/debug/cd2e8ce27e3a96f43bb79d5d23722d11', function( status ) {
	console.log( "Status: " + status );
	if ( status === "success" ) {
		page.render( 'example.pdf' );
	}
	phantom.exit();
} );*/

var page = require( 'webpage' ).create(),
  system = require( 'system' );

/**
 * Check for required parameters
 */
if ( system.args.length < 3 ) {
  console.log( 'Usage: report.js <some URL> <output path/filename>' );
  phantom.exit();
}

/**
 * Check when amCharts main library is loaded. Add overrides then.
 */
page.onResourceReceived = function() {
  if ( arguments[ 0 ].url.match( /(amcharts\.js)|(ammap\.js)/ ) ) {
    page.evaluate( function() {
      setTimeout( function() {
        if ( AmCharts === undefined )
          return;
        AmCharts.addInitHandler( function( chart ) {
          if ( chart.type == "stock" )
            chart.panelsSettings.startDuration = 0;
          else if ( chart.type == "map" )
            chart.zoomDuration = 0;
          else
            chart.startDuration = 0;
        } );
      } );
    }, 100 );
  }
};

/**
 * Grab the page and output it to specified target
 */
page.open( system.args[ 1 ], function( status ) {
  console.log( "Status: " + status );
  if ( status === "success" ) {
    page.render( system.args[ 2 ] );
  }
  phantom.exit();
} );