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
        /* if($('.invalid').css('display') !== 'none') {
            $(".invalid").css({'display': 'block'}).clearQueue();
            setTimeout(function(){$(".invalid").slideDown()}, 5000);
            e.preventDefault();
        } else { */
            $("button[type='submit']").attr("disabled", "disabled");
            $(".invalid").slideDown().delay(5000).slideUp(function(){
                $("button[type='submit']").removeAttr("disabled");
            });
            e.preventDefault();
        // }
    }
});
$(window).load(function(){
    $('.invalid p').width($('.error-container').outerWidth() -20);
});