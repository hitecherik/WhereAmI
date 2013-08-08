<?php
    if(!$_COOKIE['ie-view']) {
        $inIE9 = "<script type=\"text/javascript\">alert(\"You are currently using an out of date browser which means that some of the functionalities of this site will not be available. Please upgrade to a more modern browser, such as Mozilla Firefox, Google Chrome or Opera.\")</script>";
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
    <body class='index-html'>
        <a href="https://github.com/hitecherik/WhereAmI" target="_blank"><img style="position: absolute; top: 0; left: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_left_gray_6d6d6d.png" alt="Fork me on GitHub"></a>
        <div class="wrap">
            <p><img src="img/web-logo.png" alt=""></p>
            <h1>Where Am I?</h1>
            <p class="invalid error-bubble invalid">Whoops! You might have mistyped the postcode. Please try again.</p>
            <form id="postcode-form" class="pure-form" method="get" action="info.php">
                <fieldset>
                    <input name="postcode" id="postcode-input" type="text" placeholder="Enter your postcode!" maxlength="8">
                    <button type="submit" class="pure-button pure-button-primary">Where Am I?</button>
                    <p class="geo-p loading-gif"><img src="img/loading.gif" alt="Loading..."></p>
                    <p class="geo-p"><button type="button" class="pure-button" id="location">Use my location!</button></p>
                </fieldset>
            </form>
            <!--[if IE]>
                <p class="ie-message">You are currently using an out of date browser which means that some of the functionalities of this site will not be available. Please upgrade to a more modern browser, such as Mozilla Firefox, Google Chrome or Opera.</p>
            <![endif]-->
        </div>
        
        <div class="footer">
            <div class="footer-wrap">
                <p>Enter your postcode to get maps of recent fire incidents and crimes, schools and traffic fatalities and serious injuries. Only works in Surrey (so far).</p>
                <p>Copyright &copy; Alexander Nielsen, Anand Aggarwal and Olliver Cole, 2013. Licensed under MIT License. <i><a href="thanks.html">This website wouldn't be possible without...</a></i></p>
            </div>
        </div>
        
        <script src="js/index.js"></script>
    </body>
</html>