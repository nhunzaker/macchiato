(function(window) {

    /* Vigeframe Main
     * 
     * Methods beyond init() have been placed
     * in alphabetical order (for simplicity).
     * -------------------------------------------------- */

    "use strict";
    
    var VF = {
        delay: 5000,
        interval: null,
        $imgs:  $(".vigeframe-inner img"),
        $selected: $()
    };

    VF.init = function() {

        $(window).resize(VF.setWidth);

        VF.$imgs.click(function() {
            VF.advance( $(this) );
        });

        VF.$imgs.first().click();
        
    };

    VF.advance = function($override) {                                  

        VF.pause();

        VF.$imgs.removeClass("before after");

        VF.$selected.removeClass("selected");

        VF.$selected = $override || VF.$selected.next();
        
        if (!VF.$selected.length) {
            VF.$selected = VF.$imgs.first();
        }

        VF.$selected.addClass("selected");   
        
        VF.setOrder( VF.$selected );

        var index = VF.$imgs.index( VF.$selected );

        VF.setFrameWidth(index);    
        VF.setCaption( VF.$selected );
        VF.play();
    };

    VF.pause = function() {
        window.clearInterval(VF.interval);
    };

    VF.play = function() {
        VF.interval = window.setInterval(VF.advance, VF.delay);
    };

    VF.setCaption = function($el) {

        var $footer = $(".global-footer").empty();
        
        var $caption = $("<h3>").text( $el.data("caption") ),
            $author  = $("<h4>").text( "-" + $el.data("author") );

        $footer.append($caption).append($author);

    };

    VF.setFrameWidth = function (slot) {
        
        var width = VF.$imgs.outerWidth(true),
            count = VF.$imgs.length;
        
        slot = slot || 0;
        
        $(".vigeframe-inner").width( width * count ).css({
            left: "50%",
            marginLeft: -( width * (slot + 0.5 ) ) - 2
        });
        
    };    
    
    VF.setOrder = function($target) {
        
        var count = VF.$imgs.length;

        // Flag all previous images
        $target.nextAll("img").addClass("before").each(function(index) {
            $(this).css('z-index', count + index);
        });     
        
        // Flag all following images
        $target.nextAll("img").addClass("after").each(function(index) {
            $(this).css('z-index', count - index);
        });

    };

    VF.init();

}(window));