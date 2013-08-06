<?php
    include 'usernames.php';

    $postcode = strtoupper($_GET["postcode"]);
    
    $con=mysqli_connect("localhost",$user,$pass,$db);
    
    if (mysqli_connect_errno()){
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
    
    $result = mysqli_query($con,"SELECT * FROM police ");
    
    $longs = array("blank");
    $langs = array("blank");
    
    $imgsrc = "http://maps.googleapis.com/maps/api/staticmap?center=" . urlencode($postcode) . "&sensor=false&zoom=10&size=600x300&maptype=roadmap
&markers=color:blue%7Clabel:P%7C" . urlencode($postcode) . "&markers=color:red%7Clabel:C";
    
    while($row = mysqli_fetch_array($result)){
        //$imgsrc .= "%7C" . $row['Latitude'] . "," . $row['Longitude'];
        array_push($longs, $row['Longitude']);
        array_push($langs, $row['Latitude']);
    };
    
    for($i = 0; $i < 50; $i++){
        $random = rand(0,count($longs)-1);
        $imgsrc .= "%7C" . $langs[$random] . "," . $longs[$random];
    }
    
    mysqli_close($con);
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
        <title><?php echo $postcode; ?> Information</title>
        
        <?php
            echo "<script>var postcode = '" . $postcode . "';</script>";
        ?>
    </head>
    <body>
        <div class='navbar'>
            <div class='logo'><a href="index.html" id="logo-link"><img src='navbar-logo.png' alt='' width="48px" id="logo-img" /></a></div>
            <div align='center'>
                <a class='hidden'>Menu</a>
                <a href='#fire'>Fires</a>
                <a href='#crime'>Crimes</a>
                <a href='#school'>Schools</a>
                <a class='hidden hide'>Hide</a>
            </div>
        </div>
        
        <div class="wrap">
            <h1><?php echo $postcode; ?> Information</h1>
            
            <div class="fires-crimes pure-g-r">
                <div class="pure-u-1-2 pure-grid" id="fire">
                    <a name='fire'><h3>Nearest fire incidents</h3></a>
                    <img src="http://placehold.it/600x300&text=Fires+Map" alt="">
                </div>
                <div class="pure-u-1-2 pure-grid" id="crime">
                    <a name='crime'><h3>Nearest crimes</h3></a>
                    <img src="<?php echo $imgsrc; ?>" alt="">
                    <!-- http://placehold.it/600x300&text=Crimes+Map -->
                </div>
            </div>
            
            <div id="school">
                <h3>Nearest schools</h3>
                <p align="center"><img src="http://placehold.it/600x300&text=Schools+Map" alt="" /></p>
            </div>
            <div id="ofsted">
                <h3>Schools' Ofsted Reports</h3>
                <ol></ol>
            </div>
        </div>
        
        <!-- scripts -->
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src='js/script.js'></script>
        <script>
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
            })
        </script>
    </body>
</html>