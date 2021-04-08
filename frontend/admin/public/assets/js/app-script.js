
$(function () {



    $(document).on('click', function () {
        $("#respMenu").horizontalMenu({
            resizeWidth: '1024', // Set the same in Media query
            animationSpeed: 'fast', //slow, medium, fast
            accoridonExpAll: false //Expands all the accordion menu on click
        });
    });



    // === toggle-menu js
    $(document).on("click", ".toggle-menu", function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    // === sidebar menu activation js

    $(document).on('click', function () {
        for (var i = window.location, o = $(".sidebar-menu a").filter(function () {
            return this.href == i;
        }).addClass("active").parent().addClass("active"); ;) {
            if (!o.is("li")) break;
            o = o.parent().addClass("in").parent().addClass("active");
        }
    }),

        /* sticky menu */
        $(document).on('load', function () {
            $(window).on("scroll", function () {
                if ($(this).scrollTop() > 60) {
                    $('.horizontal-menu').addClass('sticky-menu');
                } else {
                    $('.horizontal-menu').removeClass('sticky-menu');
                }
            });

        });


    /* Back To Top */

    // page loader
    $(document).on('load', function () {

        $('#pageloader-overlay').fadeOut(1000);

    })

});