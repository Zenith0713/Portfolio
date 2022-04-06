<?php

function sendMail(array $paPost)
{
    $sMailTo = "axeloubs0713@gmail.com";
    $sMailFrom = "De : " . $paPost["email"];
    $sName = $paPost["name"];
    $sMessage = $paPost["message"] . "\r" . $sMailFrom;
    $sCompany = "";

    if (!empty($paPost["company"])) {
        $sCompany = " de " . $paPost["company"];
    }

    $sSubject = "Contact " . $sName . $sCompany;

    if (mail($sMailTo, $sSubject, $sMessage)) {
        $bError = false;
    } else {
        $bError = true;
    }

    sendToJs($bError);
}

function sendToJs(Bool $pbError)
{
    header('Content-Type: application/json');
    echo json_encode($pbError);
}

sendMail($_POST);
