/**
 * Created by Joe on 10/10/2016.
 */
spa.shell = (function () {
  var
    configMap = {},
    stateMap = { $container: null },
    jqueryMap = {},
    setJqueryMap, initModule;

  initModule = function ( $container ) {
    stateMap.$container = $container;
    $container.html( )
  };
}());