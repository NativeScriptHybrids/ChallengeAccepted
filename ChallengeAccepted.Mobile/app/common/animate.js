var AnimationModule = (function() {

    var AnimationModule = {

        slideInDiagonal: function(page) {
            page.translateX = -300;
            page.translateY = -300;
            page.opacity = 0;
            page.animate({
                translate: { x: 0, y: 0},
                duration: 200,
                opacity: 1
            });
        },
    };

    return AnimationModule;
})();

exports.slideInDiagonal = AnimationModule.slideInDiagonal;
