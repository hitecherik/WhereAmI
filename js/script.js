$(window).load(function () {
	// navbar
    $('.nav-container').width($('.container').width());
    if($(window).scrollTop() > 0) {
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
                $('.navbar #logo-img').hide();
                $('.navbar a:nth-child(1)').css({
                    'display': 'inline-block'
                });
                $('.navbar div:nth-child(2)').css({
                    'z-index': '1'
                });
            }
    }
    $(window).scroll(function () {
            if ($(window).width() <= 401) {
    } else if($(window).width() > 401) {
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
                $('.navbar #logo-img').hide();
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
        $('.navbar a:not(.hidden:nth-child(1)):not(.hidden)').css({
            'display': 'inline-block'
        });
        $('.navbar #logo-img').show();
        $('.navbar a.hidden:nth-child(1)').hide();
        }
                $('.navbar div:nth-child(2)').css(
                    'z-index', '-200000000'
                );
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
        $('.navbar #logo-img').show();
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
        $('.navbar #logo-img').hide();
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
    $('a').click(function(){
        $('html, body').animate({
            scrollTop: $('[name="' + $(this).attr('href').substr(1) + '"]').offset().top
        }, 500);
        return false;
    });
    $("#logo-img").on("click", function(){
        window.location = "http://where-am-i.co.uk/";
    });
	
	// maps
	var infowindow = null;
	var infowindow1 = null;
	var sitesSchool = [];
	var sitesFire = [];

	function setSchools(callback) {
		$.getJSON("http://www.surreyopendata.org/resource/2ami-xnhh.json", function (_data) {
			for (var i = 0; i < _data.length; i++) {
				var lat = parseFloat(_data[i].location_1.latitude, 10) + 0.0005;
				var lng = parseFloat(_data[i].location_1.longitude, 10) - 0.0015;
				var name = _data[i].fullname;
				var ofsted = "http://www.ofsted.gov.uk/inspection-reports/find-inspection-report/provider/ELS/" + _data[i].urn;
				sitesSchool.push([lat, lng, name, ofsted]);
				if ((i == _data.length - 1)) {
					callback();
				}
			}
		});
	}

	function setFires(callback) {
		$.getJSON("http://www.surreyopendata.org/resource/avf7-rxfg.json?incidentcategory=fire", function (_data) {
			for (var i = 0; i < _data.length; i++) {
				var lat = parseFloat(_data[i].location_1.latitude, 10) + 0.0005;
				var lng = parseFloat(_data[i].location_1.longitude, 10) - 0.0015;
				var type = _data[i].propertycategory;
				var ofsted = '';
				var array = type.split(/(?=[A-Z])/);
				if (array.length == 1) {
					type = array[0];
				} else {
					type = array[0] + ' ' + array[1];
				}
				sitesFire.push([lat, lng, type, ofsted]);
				if ((i == _data.length - 1)) {
					callback();
				}
			}
		});
	}
	var localSearch = new GlocalSearch();

	function usePointFromPostcode(postcode, callbackFunction) {
		localSearch.setSearchCompleteCallback(null, function () {
			if (localSearch.results[0]) {
				var resultLat = localSearch.results[0].lat;
				var resultLng = localSearch.results[0].lng;
				var point = new google.maps.LatLng(resultLat, resultLng);
				callbackFunction(point);
			}
		});
		localSearch.execute(postcode + ", UK");
	}

	function setMarkers(map, markers, icon) {
		for (var i = 0; i < markers.length; i++) {
			var sites = markers[i];
			var siteLatLng = new google.maps.LatLng(sites[0], sites[1]);
			var html = "<div class='marker-content'>" + sites[2];
			if(sites[3] != '') {
				html += " | <a href='" + sites[3] + "' target='_blank'>Ofsted</a>";
			}
			html += "</div>";
			var marker = new google.maps.Marker({
				position: siteLatLng,
				map: map,
				icon: icon,
				html: html
			});

			var contentString = "Some content";

			google.maps.event.addListener(marker, "click", function () {
				infowindow.setContent(this.html);
				infowindow.open(map, this);
			});
		}
	}

	function initialize(lat, lng) {
		var mapOptions = {
			center: new google.maps.LatLng(lat, lng),
			zoom: 14
		};
		
		var fires_map = new google.maps.Map(document.getElementById("fires-canvas"), mapOptions);
		var schools_map = new google.maps.Map(document.getElementById("schools-canvas"), mapOptions);
		
		setSchools(function () {
			infowindow = new google.maps.InfoWindow({
				content: "loading..."
			});
			setMarkers(schools_map, sitesSchool, 'http://where-am-i.co.uk/img/school.png');
		});
		setFires(function () {
			infowindow1 = new google.maps.InfoWindow({
				content: "loading..."
			});
			setMarkers(fires_map, sitesFire, 'http://where-am-i.co.uk/img/fire.png');
		});
		var marker = new google.maps.Marker({
			animation: google.maps.Animation.DROP,
			position: new google.maps.LatLng(lat, lng),
			map: fires_map
		});
		var marker = new google.maps.Marker({
			animation: google.maps.Animation.DROP,
			position: new google.maps.LatLng(lat, lng),
			map: schools_map
		});
	}
	google.maps.event.addDomListener(window, 'load', usePointFromPostcode(postcode, function (point) {
		var lat = point.lat();
		var lng = point.lng();
		initialize(lat, lng);
	}));
});