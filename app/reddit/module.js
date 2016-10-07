app.reddit = (function () {
  var
    configMap = {
      template_html:  '<div class="container app-reddit">' +
                        '<div class="form">' +
                          '<div class="row">' +
                            '<div class="form-group">' +
                              '<div class="input-group">' +
                                '<span class="input-group-addon">https://www.reddit.com/r/</span>' +
                                '<input type="text" class="form-control app-reddit-input">' +
                                '<div class="input-group-btn">' +
                                  '<button type="button" class="btn btn-primary app-reddit-get-button">Get</button>' +
                                  '<button type="button" class="btn btn-default app-reddit-clear-button">Clear</button>' +
                                '</div>' +
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
      base_url: 'https://www.reddit.com/r/',
      default_data_type: 'json'
    },
    stateMap = {
      $container: null,
      full_url: null,
      return_data: null,
      reddit_text: null
    },
    jqueryMap = {}, onGetClick,
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
        $table_body:    $container.find( '.app-reddit-table-body' ),
        $reddit_input:  $container.find( '.app-reddit-input' )
      };
  };

  getPosts = function () {
    $.ajax({
      url: stateMap.full_url
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

  onGetClick = function () {
    stateMap.reddit_text = jqueryMap.$reddit_input.val();
    stateMap.full_url = configMap.base_url +
      stateMap.reddit_text + '.' + configMap.default_data_type;
    getPosts();
  };
  
  bindEvents = function () {
    jqueryMap.$get_button.click( onGetClick );
    jqueryMap.$clear_button.click( clearPosts );
  };
  
  initModule = function ( $container ) {
    stateMap.$container = $container;
    $container.append( configMap.template_html );
    setJqueryMap();
    bindEvents();
  };
  
  return {
    initModule: initModule,
    stateMap: stateMap
  };
}());