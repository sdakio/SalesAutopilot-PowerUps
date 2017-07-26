<?php
header('Access-Control-Allow-Origin: *');
header('content-type: text/html; charset:utf-8');

//Ahhoz a fiókhoz tartozó api felhasználónév és jelszó, amelyikben a globális változó található
//API kulcspárt így lehet létrehozni: https://www.salesautopilot.hu/tudasbazis/osszetett-rendszerek-keszitese/api-kulcsparok-kezelese
$apiusername = "";
$apipassword = "";

//Kiszedjük a kapott adatokból a változó nevét
$globalName = $_POST["globalName"];

//Meghíjuk az API metódust, hogy megkapjuk a globális változó értékét
$curl = curl_init();
curl_setopt_array($curl, array(
CURLOPT_RETURNTRANSFER => true,
CURLOPT_URL => 'http://'.$apiusername.':'.$apipassword.'@restapi.emesz.com/getglobalvar/name/'.$globalName) 
);
$result = curl_exec($curl);
curl_close($curl);

//Az érték html verzióját kivesszük a kapott válaszból
$data = json_decode($result)->html;
//És visszaküldjük a weboldalnak
echo $data;
?>