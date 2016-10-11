/**
 * Created by Joe on 10/10/2016.
 */
spa.shell = (function () {
  var
    configMap = {
      main_html: String() +
      '<div class="container spa-shell-reddit">' +
      '</div>'
    },
    stateMap = { $container: null },
    jqueryMap = {},
    setJqueryMap, initModule;

  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = {
      $container: $container,
      $reddit: $container.find( '.spa-shell-reddit' )
    };
  };

  initModule = function ( $container ) {
    stateMap.$container = $container;
    $container.html( configMap.main_html );
    setJqueryMap();

    spa.reddit.initModule( jqueryMap.$reddit );
  };

  return {
    initModule: initModule
  };
}());