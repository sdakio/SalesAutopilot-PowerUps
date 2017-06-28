<?php
header("access-control-allow-origin: *");
error_reporting(E_ALL);
ini_set('display_errors',1);

//Ahhoz a fiókhoz tartozó api felhasználónév és jelszó, amelyikben a lista található
//API kulcspárt így lehet létrehozni: https://www.salesautopilot.hu/tudasbazis/osszetett-rendszerek-keszitese/api-kulcsparok-kezelese
$apiusername = "";
$apipassword = "";

$nl_id       = $_POST['nl_id'];
$ns_id       = $_POST['ns_id'];
$id          = $_POST['id'];
$statusField = $_POST['statusField'];
$present     = $_POST['present'];

$curl = curl_init();
curl_setopt_array($curl, array(
CURLOPT_RETURNTRANSFER => true,
CURLOPT_CUSTOMREQUEST  => 'POST',
CURLOPT_URL => 'http://'.$apiusername.':'.$apipassword.'@restapi.emesz.com/update/'.$nl_id.'/form/'.$ns_id.'/record/'.$id,
CURLOPT_POSTFIELDS     => json_encode(array($statusField => $present)))
);
$result = curl_exec($curl);
curl_close($curl);
//Fejlesztési fázisban érdemes logolni, hogy mi történik
print('http://'.$apiusername.':'.$apipassword.'@restapi.emesz.com/update/'.$nl_id.'/form/'.$ns_id.'/record/'.$id.' ('.$statusField.' => '.$present.')
');
var_dump($result);
print "vege";
?>