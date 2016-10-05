app.reddit = (function () {
  var
    configMap = {
      template_html:  '<div class="container">' +
                        '<div class="panel panel-default">' +
                          '<div class="panel-heading">Reddit Javascript Posts</div>' +
                          '<div class="panel-body">' +
                            '<div class="row">' +
                              '<div class="container">' +
                                '<button type="button" class="btn btn-primary app-reddit-get-button">Get</button>' +
                                '<button type="button" class="btn btn-default app-reddit-clear-button">Clear</button>' +
                              '</div>' +
                            '</div>' +
                          '</div>' +
                        '</div>' +
                        '<div class="row">' +
                          '<div class="container">' +
                            '<div class="table-responsive">' +
                              '<table class="table table-striped">' +
                                '<thead>' +
                                  '<tr class="app-reddit-table-header">' +
                                    '<th>Title</th>' +
                                    '<th>Author</th>' +
                                  '</tr>' +
                                '</thead>' +
                                '<tbody class="app-reddit-table-body">' +
                                '</tbody>' +
                              '</table>' +
                            '</div>' +
                          '</div>' +
                        '</div>' +
                      '<div>',
      posts_url: 'https://www.reddit.com/r/javascript.json'
    },
    stateMap = {
      $container: null,
      posts: null
    },
    jqueryMap = {},
    bindEvents, getPosts, setPosts, clearPosts,
    setJqueryMap, initModule;
  
  setJqueryMap = function () {
    var
      $container = stateMap.$container;
    
      jqueryMap = {
        $container:     $container,
        $get_button:    $container.find( '.app-reddit-get-button' ),
        $clear_button:  $container.find( '.app-reddit-clear-button' ),
        $table_header:  $container.find( '.app-reddit-table-header' ),
        $table_body:    $container.find( '.app-reddit-table-body' )
      };
  };
  
  getPosts = function () {
    $.ajax({
      url: configMap.posts_url,
      dataType: 'json'
    }).done( setPosts );
  };
  
  setPosts = function ( res ) {
    stateMap.posts = res.data.children;
    stateMap.posts.forEach(function ( o ) {
      var
        post = o.data,
        table_row;
      
      table_row = '<tr><td>' + post.title + '</td><td>' + post.author + '</td></tr>';
      
      jqueryMap.$table_body.append( table_row );
    });
  };
  
  clearPosts = function () {
    jqueryMap.$table_body.empty();
  };
  
  bindEvents = function () {
    jqueryMap.$get_button.click( getPosts );
    jqueryMap.$clear_button.click( clearPosts );
  };
  
  initModule = function ( $container ) {
    stateMap.$container = $container;
    $container.append( configMap.template_html );
    setJqueryMap();
    bindEvents();
  };d
  
  return {
    initModule: initModule,
    stateMap: stateMap
  };
}());