<?php
    if(!$_COOKIE['ie-view']) {
        $inIE9 = "<script src='js/ie-script-alert.js'></script>";
        setcookie('ie-view',true);
    }
?>
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <link href='http://fonts.googleapis.com/css?family=Cabin+Condensed:400,700' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="css/pure-min.css">
        <link rel="stylesheet" href="css/style.css">
        <link rel="icon" href="favicon.io">
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="js/geolocation.js"></script>
        <!--[if IE]>
            <?php
                echo($inIE9);
            ?>
            <script src='js/ie-placeholder.js'></script>
            <link rel='stylesheet' href='css/ie.css' />
        <![endif]-->
        <title>Where Am I?</title>
    </head>
    <body class='index'>
        <a href="https://github.com/hitecherik/WhereAmI" target="_blank"><img style="position: absolute; top: 0; left: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_left_gray_6d6d6d.png" alt="Fork me on GitHub"></a>
        <div class="wrap">
            <p><img src="web-logo.png" alt=""></p>
            <h1>Where Am I?</h1>
            <p class="error-p invalid">Error: Invalid postcode</p>
            <p class="error-p surrey">Error: Postcode not in Surrey</p>
            <form id="postcode-form" class="pure-form" method="get" action="info.php">
                <fieldset>
                    <input name="postcode" id="postcode-input" type="text" placeholder="Enter your postcode!" maxlength="8">
                    <button type="submit" class="pure-button pure-button-primary">Where Am I?</button>
                    <p class="geo-p loading-gif"><img src="loading.gif" alt="Loading..."></p>
                    <p class="geo-p"><button type="button" class="pure-button" id="location">Use my location!</button></p>
                </fieldset>
            </form>
        </div>
        
        <script>        
            function useLocation(lat,lng){
                $.getJSON("http://www.uk-postcodes.com/latlng/" + lat + "," + lng + ".json?callback=?", function(data){
                    var postcode = data.postcode.split("  ")[0] + "+" + data.postcode.split("  ")[1];
                    window.location = "http://where-am-i.eu5.org/info.php?postcode=" + postcode;
                });
            }
        
            $("#location").on("click", function(){
                navigator.geolocation.getCurrentPosition(function(position) {
                    $(".loading-gif").show();
                    var latitude = position.coords.latitude,
                        longitude = position.coords.longitude;
                
                    // console.log("Latitude: " + latitude + ", Longitude: " + longitude);
                    useLocation(latitude, longitude)
                });
            });
            
            $("#postcode-form").on("submit", function(e){
                var postcode = $("#postcode-input").val();
                if(postcode.indexOf(" ")===-1){
                    // alert("Invalid postocode. Please enter a valid one.");
                    $(".invalid").show();
                    e.preventDefault();
                }
            })
        </script>
    </body>
</html>