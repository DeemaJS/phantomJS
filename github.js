/*var page = require('webpage').create();
page.open('http://github.com/', function() {
  page.render('github.png');
  phantom.exit();
});*/

var page = require( 'webpage' ).create();
page.open( 'http://s.codepen.io/amcharts/debug/cd2e8ce27e3a96f43bb79d5d23722d11', function( status ) {
  console.log( "Status: " + status );
  if ( status === "success" ) {
    page.render( 'example.pdf' );
  }
  phantom.exit();
} );