function useLocation(lat,lng){
    $.getJSON("http://www.uk-postcodes.com/latlng/" + lat + "," + lng + ".json?callback=?", function(data){
        var postcode = data.postcode.split("  ")[0] + "+" + data.postcode.split("  ")[1];
        window.location = "http://where-am-i.eu5.org/info.php?postcode=" + postcode;
    });
}

$("#location").on("click", function(){
    navigator.geolocation.getCurrentPosition(function(position) {
                $(window).css({'cursor':'loading'});
        $(".loading-gif").show();

        var latitude = position.coords.latitude,
            longitude = position.coords.longitude;
        
        useLocation(latitude, longitude)
    });
});

// $("#postcode-form").on("submit", function(e){
//     var postcode = $("#postcode-input").val();
//     if(postcode.indexOf(" ")===-1){
//         $(".invalid").slideDown().delay(5000).slideUp();
        
//         e.preventDefault();
//     }
// });
$("#postcode-form").on("submit", function(e){
    var postcode = $("#postcode-input").val();
    if(postcode.indexOf(" ")===-1){
        // alert("Invalid postocode. Please enter a valid one.");
        if($('.invalid').css('opacity') !== '0') {
            $(".invalid").css({'opacity': '1'}).clearQueue();
            setTimeout(function(){$(".invalid").fadeTo(300, 0)}, 5000);
            e.preventDefault();
        } else {
        $(".invalid").fadeTo(300, 1).delay(5000).fadeTo(300, 0);
        e.preventDefault();
        }
    }
});
$(window).load(function(){
$('.invalid p').width($('.error-container').outerWidth() -20);
});