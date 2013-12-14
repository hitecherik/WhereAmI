$(window).load(function () {
	// navbar
    function scollTop(clickedElement, callback) {
		e = clickedElement;
		$offset = document.getElementsByName(e.getAttribute("href").substring(1, e.href.length))[0].offsetTop - 50;
		if (self.pageYOffset != $offset) {
			if (self.pageYOffset < $offset) {
				alert('hi');
				g = window.setInterval(function () {
					if (self.pageYOffset < $offset) {
						window.scollTo(self.pageYOffset + 10);
					} else {
						g = window.clearInterval(g);
					}
				}, 5);
			} else if (self.pageYOffset > $offset) {

			}
		}
	}
	var $navbar = document.getElementById('navbar');
	var $navItems = document.getElementById('nav-items');
	var $more = document.getElementById('more');
	var $responsive = document.getElementById('responsive');
	$more.onclick = function () {
		if ($responsive.style.display != 'block') {
			$responsive.style.display = 'block';
		} else {
			$responsive.style.display = 'none';
		}
	};
	window.setInterval(function () {
		if ($navbar.offsetWidth <= 400) {
			$navbar.style.position = 'static';
			$navItems.style.display = 'none';
			$more.style.display = 'inline-block';
		} else {
			$responsive.style.display = 'none';
			$navbar.style.position = 'fixed';
			$navItems.style.display = 'inline-block';
			$more.style.display = 'none';
		}
	}, 1);
	var $a = navbar.getElementsByTagName('a');
	for (i = 0; i < $a.length; i++) {
		$a[i].onclick = function (e) {
			e.preventDefault();
			if (this.id != 'more-link') {
				if (this.getAttribute("href").length !== 0) {
					if (navbar.style.position != 'static') {
						$offset = document.getElementsByName(this.getAttribute("href").substring(1, this.href.length))[0].offsetTop - 50;
					} else {
						$offset = document.getElementsByName(this.getAttribute("href").substring(1, this.href.length))[0].offsetTop - 10;
					}
					if (self.pageYOffset != $offset) {
						if (self.pageYOffset < $offset) {
							d = window.setInterval(function () {
								$scroll = self.pageYOffset;
								if (self.pageYOffset < $offset) {
									$scroll += 10;
									window.scrollTo(0, $scroll);
								} else {
									d = window.clearInterval(d);
								}
							}, 1);
							n = window.setInterval(function () {
								$scroll = self.pageYOffset;
								if (self.pageYOffset < $offset) {
									$scroll += 10;
									window.scrollTo(0, $scroll);
								} else {
									n = window.clearInterval(n);
								}
							}, 1);
						} else if (self.pageYOffset > $offset) {
							u = window.setInterval(function () {
								$scroll = self.pageYOffset;
								if (self.pageYOffset > $offset) {
									$scroll -= 10;
									window.scrollTo(0, $scroll);
								} else {
									u = window.clearInterval(u);
								}
							}, 1);
							p = window.setInterval(function () {
								$scroll = self.pageYOffset;
								if (self.pageYOffset > $offset) {
									$scroll -= 10;
									window.scrollTo(0, $scroll);
								} else {
									p = window.clearInterval(p);
								}
							}, 1);
						}
					}
				}
			}
		};
	}
	
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