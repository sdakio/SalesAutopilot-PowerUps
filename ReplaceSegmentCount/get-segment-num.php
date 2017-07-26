<?php
header('Access-Control-Allow-Origin: *'); 

//Ahhoz a fiókhoz tartozó api felhasználónév és jelszó, amelyikben a szegmens található
//API kulcspárt így lehet létrehozni: https://www.salesautopilot.hu/tudasbazis/osszetett-rendszerek-keszitese/api-kulcsparok-kezelese
$apiusername = "";
$apipassword = "";

//Kiszedjük a kapott adatokból a szegmens azonosítóját
$segmentId = $_POST["segmentid"];

//Meghívjuk az API metódust, hogy megkapjuk a szegmensbe tartozók számát
$curl = curl_init();
curl_setopt_array($curl, array(
CURLOPT_RETURNTRANSFER => true,
CURLOPT_URL => 'http://'.$apiusername.':'.$apipassword.'@restapi.emesz.com/getsegmentnum/'.$segmentId) 
);
$result = curl_exec($curl);
curl_close($curl);

//A kapott értéket visszaküldjük a weboldalnak
echo $result;
?>

