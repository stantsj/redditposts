app.reddit = (function () {
  var
    configMap = {
      template_html:  '<div class="container app-reddit">' +
                        '<div class="form">' +
                          '<div class="row">' +
                            '<div class="form-group">' +
                              '<div class="input-group app-reddit-input-group">' +
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
                                    '<th>URL</th>' +
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
      data_type: 'json'
    },
    stateMap = {
      $container:   null,
      full_url:     null,
      post_list:    null,
      return_data:  null,
      reddit_text:  null
    },
    jqueryMap = {},
    onGetClick, onClearClick,
    bindEvents, getPosts, setPosts, onRedditFocusOut,
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
        $reddit_input:  $container.find( '.app-reddit-input' ),
        $input_group:   $container.find( '.app-reddit-input-group' )
      };
  };

  getPosts = function () {
    $.ajax({
      url: stateMap.full_url
    }).done( setPosts );
  };
  
  setPosts = function ( res ) {
    jqueryMap.$table_body.empty();
    stateMap.post_list = res.data.children;
    stateMap.post_list.forEach(function ( o ) {
      var
        post = o.data,
        table_row;
      
      table_row = '<tr>' +
                    '<td>' + post.title + '</td>' +
                    '<td>' + post.author + '</td>' +
                    '<td>' + post.url + '</td>' +
                  '</tr>';
      
      jqueryMap.$table_body.append( table_row );
    });
  };
  
  onClearClick = function () {
    jqueryMap.$table_body.empty();
  };

  onGetClick = function () {
    if ( stateMap.reddit_text ) {
      stateMap.full_url = configMap.base_url +
        stateMap.reddit_text + '.' + configMap.data_type;
      getPosts();
    }
  };

  onRedditFocusOut = function () {
    stateMap.reddit_text = jqueryMap.$reddit_input.val();
    jqueryMap.$input_group.toggleClass('has-error', !stateMap.reddit_text);
  };
  
  bindEvents = function () {
    jqueryMap.$get_button.click( onGetClick );
    jqueryMap.$clear_button.click( onClearClick );
    jqueryMap.$reddit_input.focusout( onRedditFocusOut );
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