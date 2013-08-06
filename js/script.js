$(window).load(function () {
    $('.nav-container').width($('.container').width());
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 1) {
            if ($('.navbar').width() === $(window).width()) {
                $('.navbar').stop();
                $('.navbar').css({
                    'padding': '0'
                });
                $('.navbar').animate({
                    'width': '65px',
                    'position': 'fixed',
                    'top': '0',
                    'left': '0'
                }, 'linear');
                $('.navbar a:not(.hidden:nth-child(1))').css({
                    'display': 'none'
                });
                $('.navbar a:nth-child(1)').css({
                    'display': 'inline-block'
                });
                $('.navbar div:nth-child(2)').css({
                    'z-index': '1'
                });
            }
        } else if ($(window).scrollTop() <= 0) {
            $('.navbar').stop();
            $('.navbar').animate({
                'position': 'static',
                'width': '100%'
            });
            $('.navbar a:not(.hidden:nth-child(1))').css({
                'display': 'inline-block'
            });
            $('.navbar a.hidden').css({
                'display': 'none'
            });
            $('.navbar div:nth-child(2)').css({
                'z-index': '-1'
            })
        }
    });
    $('.navbar a.hidden:nth-child(1)').click(function () {
        $('.navbar').stop();
        $('.navbar').animate({
            'position': 'static',
            'width': '100%'
        });
        $('.navbar a:not(.hidden:nth-child(1))').css({
            'display': 'inline-block'
        });
        $(this).hide();
    });
    $('.navbar a.hidden:last-child').click(function () {
        $('.navbar').stop();
        $('.navbar').css({
            'padding': '0'
        });
        $('.navbar').animate({
            'width': '65px',
            'position': 'fixed',
            'top': '0',
            'left': '0'
        }, 'linear');
        $('.navbar a:not(.hidden:nth-child(1))').css({
            'display': 'none'
        });
        $('.navbar a:first-child').css({
            'display': 'inline-block'
        });
        $(this).hide();
    });
    $('.navbar a.hidden:last-child').click(function () {
        $('.navbar').stop();
        $('.navbar').css({
            'padding': '0'
        });
        $('.navbar').animate({
            'width': '65px',
            'position': 'fixed',
            'top': '0',
            'left': '0'
        }, 'linear');
        $('.navbar a:not(.hidden:nth-child(1))').css({
            'display': 'none'
        });
        $('.navbar a:first-child').css({
            'display': 'inline-block'
        });
        $(this).hide();
    });
    var hasSpace = $('input[type=text]').val().indexOf(' ') !== 0;
    $("input[type=text]").keydown(function (event) {
        if (event.keyCode == 13) {
            $("input[type=submit]").click();
        }
    });
    $('button[type=submit]').click(function (e) {
        if ($('input[type=text]').val() === "") {
            e.preventDefault();
            alert('You have not entered a postcode');
        } else if ($('input[type=text]').val().indexOf(' ') !== -1) {
        } else {
            e.preventDefault();
            alert('You have not entered a valid postcode'); 
        }
    });
    $('a').click(function(){
        $('html, body').animate({
            scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top
        }, 500);
        return false;
    });
    $("#logo-img").on("click", function(){
        window.location = "http://where-am-i.eu5.org/";
    });
});