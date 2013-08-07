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
            <form id="postcode-form" class="pure-form" method="get" action="info.php">
                <fieldset>
                    <input name="postcode" id="postcode-input" type="text" placeholder="Enter your postcode!" maxlength="8">
                    <button type="submit" class="pure-button">Where Am I?</button>
                </fieldset>
            </form>
        </div>
    </body>
</html>