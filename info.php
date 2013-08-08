<?php
    include 'usernames.php';

    $postcode = strtoupper($_GET["postcode"]);
    $postcode = str_replace(" UNDEFINED", "", $postcode);
    
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
        array_push($longs, $row['Longitude']);
        array_push($langs, $row['Latitude']);
    };
    
    for($i = 0; $i < 50; $i++){
        $random = rand(0,count($longs)-1);
        $imgsrc .= "%7C" . $langs[$random] . "," . $longs[$random];
    }
    
    $uk_postcodes = simplexml_load_file("http://www.uk-postcodes.com/postcode/" . str_replace(" ", "", $postcode) . ".xml");
    $district = $uk_postcodes->administrative->district->title;
    
    $surrey = true;
    
    if($uk_postcodes->administrative->county->title!="Surrey"){
        $surrey = false;
    }
    
    $result = mysqli_query($con, "SELECT * FROM traffic WHERE Name = \"" . $district . "\"");
    $cars = "";
    $cyclists = "";
    $pedestrians = "";
    
    while($row = mysqli_fetch_array($result)){
        $cars = $row['Cars'];
        $cyclists = $row['Cyclists'];
        $pedestrians = $row['Pedestrians'];
    };
    
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
        <link href="css/lightbox.css" rel="stylesheet" />
        <title><?php echo $postcode; ?> Information</title>
        
        <?php
            echo "<script>var postcode = '" . $postcode . "';</script>";
        ?>
    </head>
    <body>
        <div class='navbar'>
            <div class='logo'><a href="index.php" id="logo-link"><img src='navbar-logo.png' alt='' width="48px" id="logo-img" /></a></div>
            <div align='center'>
                <a class='hidden'>Menu</a>
                <a href='#fire'>Fires</a>
                <a href='#crime'>Crimes</a>
                <a href='#school'>Schools</a>
                <a class='hidden hide'>Hide</a>
            </div>
        </div>
        
        <div class="wrap">
            <?php
                if(!$surrey){
            ?>
            <div class="error-bubble">Your postcode is not in Surrey. Some features may not work as you would expect them to.</div>
            <?php
                }
            ?>
            
            <h1><?php echo $postcode; ?> Information</h1>
            
            <div class="fires-crimes pure-g-r">
                <div class="pure-u-1-2 pure-grid" id="fire">
                    <a name='fire'><h3>Nearest fire incidents</h3></a>
                    <a href="img/image-1.jpg" data-lightbox="image-1" title=""><img src="http://placehold.it/600x300&text=Loading..." alt=""></a>
                <!--    <img src="http://placehold.it/600x300&text=Loading..." alt=""> -->
                </div>
                <div class="pure-u-1-2 pure-grid" id="crime">
                    <a name='crime'><h3>Nearest crimes</h3></a>
                    <a href="<?php echo $imgsrc; ?>" data-lightbox="ggggh" title=""><img src="<?php echo $imgsrc; ?>" alt=""></a>
                </div>
            </div>
            
            <?php
                if($surrey){
            ?>
            <div class="fires-crimes pure-g-r">
                <div class="pure-u-1-2 pure-grid" id="school">
                    <h3>Nearest schools</h3>
                    <p align="center"><a href="" data-lightbox="vjjvhjj" title=""><img src="http://placehold.it/600x300&text=Loading..." alt="" /></a></p>
                </div>
                <div class="pure-u-1-2 pure-grid" id="traffic">
                    <h3>Traffic Accidents</h3>
                    <!--<p><?php echo $cars . ", " . $cyclists . ", " . $pedestrians; ?></p>-->
                    <table class="pure-table traffic-table">
                        <thead>
                            <tr><th>Mode of Transport</th><th>Fatalities and Serious Injuries in 1 Year</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Cars Occupants</td><td><?php echo $cars; ?></td></tr>
                            <tr><td>Cyclists</td><td><?php echo $cyclists; ?></td></tr>
                            <tr><td>Pedestrians</td><td><?php echo $pedestrians; ?></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <?php
                } else {
            ?>
            
            <div id="school">
                <h3>Nearest schools</h3>
                <p align="center"><a href="" data-lightbox="vjjvhjj" title=""><img src="http://placehold.it/600x300&text=Loading..." alt="" /></a></p>
            </div>
            
            <?php
                }
            ?>
            
            <div id="ofsted">
                <h3>Schools' Ofsted Reports</h3>
                <ol></ol>
            </div>
        </div>
        
        <!-- scripts -->
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src='js/script.js'></script>
        <script src="js/lightbox-2.6.min.js"></script>
    </body>
</html>