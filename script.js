$(document).ready(function () {
    $('#nav').localScroll(800);
    $('#intro').parallax('50%', 0.1);   // 50%-horizontal position, 0.1-vertical scrolling speed
    $('#second').parallax('50%', 0.1);
    $('#bg').parallax('50%', 0.4);
    $('#third').parallax('50%', 0.3);
});

// jquery-parallax script for scrolling

(function($) {
    const $window = $(window);
    const windowHeight = $window.height();
    $window.resize(function() {
        windowHeight = $window.height();
    });

    $.fn.parallax = function(xpos, speedFactor, outerHeight) {
        const $this = $(this);
        let getHeight;
        let firstTop;
        let paddingTop = 0;
        // get initial position for each element
        $this.each(function() {
            firstTop = $this.offset().top;
        });
        if (outerHeight) {
            getHeight = function(jqo) {
                return jqo.outerHeight(true);
            };
        } else {
            getHeight = function(jqo) {
                return jqo.height();
            };
        }
        // set defaults if there are not arguments
        if(arguments.length < 1 || xpos === null) xpos = '50%';
        if(arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
        if(arguments.lenght < 3 || outerHeight === null) outerHeight = true;

        // this function will work if window is scrolled or resized
        function update() {
            const pos = $window.scrollTop();
            $this.each(function() {
                const $element = $(this);
                const top = $element.offset().top;
                const height = getHeight($element);
                if(top + height < pos || top > pos + windowHeight) return;

                $this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * 
                speedFactor) + "px");
            });
        };
        $window.bind('scroll', update).resize(update);
        update();
    };
})(jQuery);