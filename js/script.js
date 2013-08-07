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

$.getJSON("http://www.uk-postcodes.com/postcode/" + postcode.split(" ")[0] + postcode.split(" ")[1] + ".json?callback=?", function(data){
    var latitude = data.geo.lat,
        longitude = data.geo.lng,
        easting = data.geo.easting,
        northing = data.geo.northing;
    
    //fire data
    $.getJSON("http://www.surreyopendata.org/resource/avf7-rxfg.json", function(_data){
        console.log(_data);
        
        var imgsrc = "http://maps.googleapis.com/maps/api/staticmap?center=" + encodeURIComponent(postcode) + "&sensor=false&zoom=10&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:P%7C" + encodeURIComponent(postcode) + "&markers=color:red%7Clabel:F";
        
        for(var i = 0; i<50; i++){
            imgsrc += "%7C" + _data[i].location_1.latitude + "," + _data[i].location_1.longitude;
        }
        
        $("#fire img").attr("src", imgsrc)
    });
    
    //school data
    $.getJSON("http://www.surreyopendata.org/resource/2ami-xnhh.json", function(_data){
        console.log(_data);
        
        var imgsrc = "http://maps.googleapis.com/maps/api/staticmap?center=" + encodeURIComponent(postcode) + "&sensor=false&zoom=12&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:P%7C" + encodeURIComponent(postcode) + "&markers=color:green%7Clabel:S";
        
        for(var i = 0; i < _data.length; i++){
            var sch = _data[i],
                ol = $("#ofsted ol");
            
            if(sch.easting.substring(0,2) === easting.substring(0,2) && sch.northing.substring(0,2) === northing.substring(0,2)){
                imgsrc += "%7C" + sch.location_1.latitude + "," + sch.location_1.longitude;
                ol.append("<li><a href='http://www.ofsted.gov.uk/inspection-reports/find-inspection-report/provider/ELS/" + sch.urn + "' target='_blank'>" + sch.fullname + "</a></li>")    
            }
        }
        
        $("#school img").attr("src", imgsrc)
    })
});