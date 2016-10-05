/**
 * Created by josephstants on 10/3/2016.
 */
var app = (function ( $ ) {
  var initModule = function ( $container ) {
    app.reddit.initModule( $container );

  };
  return { initModule: initModule }
}( jQuery ));