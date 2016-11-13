var sw = sw || {};

(function($){
    $('body').on('state-initializing', function(event){
        console.log("initializing for user " + event.userId);
    });
})(jQuery);
