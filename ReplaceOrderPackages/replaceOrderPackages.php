<?php

header('Access-Control-Allow-Origin: *');
header('content-type: text/html; charset:utf-8');

error_reporting(E_ALL);
ini_set('display_errors',1);

$apikey  = "";
$apipass = "";

$params   = json_decode(file_get_contents('php://input'));
/*Minta iput:
*************
{"nl_id"  : "12345",  //A lista, amin amegrendelés található
 "nud_id" : "[id]",   //A megrendelés azonostója
"packages":           // A csomagok: a kettőspont előtt a csomag, utána a bele tartozó termékek azonosítója
    {"67890" : ["123456", "789012"],
    "345678" : ["345678", "901234", "567890"]}
}
****/

$nl_id    = $params->nl_id;
$nud_id   = $params->nud_id;
$packages = $params->packages;

//Lekérjük a megrendelés adatait
$handle = curl_init();
curl_setopt_array($handle, array(
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_URL => 'http://'.$apikey.':'.$apipass.'@'.'restapi.emesz.com/list/'.$nl_id.'/record/'.$nud_id)
);
$result = curl_exec($handle);
curl_close($handle);
 
//Egy tömbbe dekódljuk a választ
$order = json_decode($result);

$idsToDelete = [];
$newProducts = [];

//Végigmegyünk a rendelt termékeken
foreach ($order->products as $key => $orderItem) {
    $packageId = $orderItem->prod_id;
    //Ha a rendelt termék egy csomag
    if (property_exists($packages, $packageId)) {
        //Felvesszük a törlendő tételek közé
        array_push($idsToDelete, $orderItem->prod_id);
        //És a csomagba tartozó minden terméket felveszük a rendeléshez hozzáadandó termékek közé
        //Ugyanolyan darabszámmal, mint amivel a csomag szerepelt a megrendelésben
        foreach ($packages->$packageId as $prodId) {
            array_push($newProducts, array('prod_id' => $prodId, 'qty' => $orderItem->oi_quantity));
        }
    }
}

$idsToDelete = json_encode($idsToDelete);
$newProducts = json_encode(array('products' => $newProducts));

//Ha van mit lecserélni
if( 0<count($idsToDelete) && 0<count($newProducts) )
{
    $headers = array(
        'Accept: application/json',
        'Content-Type: application/json'
    );

    //Töröljük a csomagokat a megrendelésből
    $url = 'http://'.$apikey.':'.$apipass.'@restapi.emesz.com/orderdelproduct/'.$nl_id.'/'.$nud_id;
    $handle = curl_init();
    curl_setopt($handle, CURLOPT_URL, $url);
    curl_setopt($handle, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($handle, CURLOPT_USERAGENT, 'MailMaster API');
    curl_setopt($handle, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($handle, CURLOPT_VERBOSE, true);
    curl_setopt($handle, CURLOPT_POST, true);
    curl_setopt($handle, CURLOPT_POSTFIELDS, $idsToDelete);
    curl_setopt($handle, CURLOPT_TIMEOUT, 10);      
    $response = curl_exec($handle);
    //Ez látszani fog az eseménynaplóban válaszként
    print 'deleted: '.$response . '<br>';
    curl_close($handle);

    //És hozzáadjuk az egyes termékeket (vagy kedvezményeket)
    $url = 'http://'.$apikey.':'.$apipass.'@restapi.emesz.com/orderaddproduct/'.$nl_id.'/'.$nud_id;
    $handle = curl_init();
    curl_setopt($handle, CURLOPT_URL, $url);
    curl_setopt($handle, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($handle, CURLOPT_USERAGENT, 'MailMaster API');
    curl_setopt($handle, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($handle, CURLOPT_VERBOSE, true);
    curl_setopt($handle, CURLOPT_POST, true);
    curl_setopt($handle, CURLOPT_POSTFIELDS, $newProducts);
    curl_setopt($handle, CURLOPT_TIMEOUT, 10);      
    $response = curl_exec($handle);
    //Ez látszani fog az eseménynaplóban válaszként
    print 'added: '.$response . '<br>';
    curl_close($handle);
}
?>
