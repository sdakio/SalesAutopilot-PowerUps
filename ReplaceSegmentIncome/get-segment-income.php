<?php
header('Access-Control-Allow-Origin: *');

//Ahhoz a fiókhoz tartozó api felhasználónév és jelszó, amelyikben a szegmens található
//API kulcspárt így lehet létrehozni: https://www.salesautopilot.hu/tudasbazis/osszetett-rendszerek-keszitese/api-kulcsparok-kezelese
$apiusername = "";
$apipassword = "";

//Kiszedjük a kapott adatokból a szegmens azonosítóját
$segmentId = $_POST["segmentid"];

//Meghívjuk az API metódust, hogy megkapjuk a szegmensbe tartozók által hozott bevétel összegét
$curl = curl_init();
curl_setopt_array($curl, array(
CURLOPT_RETURNTRANSFER => true,
CURLOPT_URL => 'http://'.$apiusername.':'.$apipassword.'@restapi.emesz.com/getsegmentincome/'.$segmentId) 
);
$result = curl_exec($curl);
curl_close($curl);

//A kapott adatok közük a forint értéket vissuaküldjük a weboldalnak
//A hívásból hasonló módon az összes használt devizára vonatkozó adat kinyerhető
echo json_decode($result)->HUF;
?>
