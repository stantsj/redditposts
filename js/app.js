/**
 * Created by josephstants on 10/3/2016.
 */
var spa = (function ($ ) {
  var initModule = function ( $container ) {
    spa.reddit.initModule( $container );
  };
  return { initModule: initModule }
}( jQuery ));