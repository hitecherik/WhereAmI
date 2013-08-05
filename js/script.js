$(window).load(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 50) {
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

        } else if ($(window).scrollTop() <= 50) {
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
});