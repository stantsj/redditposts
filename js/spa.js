/**
 * Created by josephstants on 10/3/2016.
 */
var spa = (function ($ ) {
  var initModule = function ( $container ) {
    spa.shell.initModule( $container );
  };
  return { initModule: initModule }
}( jQuery ));