<?php
/**
*Egy táblázatban visszaadja a lista vagy szegmens(ek) feliratkozóinak kért adatait
*$_POST['nl_id']:    A lekérdezni kívánt lista azonosítója, kötelező paraméter
*$_POST['fields']:   A tábálázatban megjelenítendő mezők, kötelező paraméter
*$_POST['segments']: A lekérdezni kívánt szegmensek tömbje, opcionális paraméter
*/

//Access control header-ök
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With");

//Ahhoz a fiókhoz tartozó api felhasználónév és jelszó, amelyikben a lista található
//API kulcpárt így lehet létrehozni: https://www.salesautopilot.hu/tudasbazis/osszetett-rendszerek-keszitese/api-kulcsparok-kezelese
$apiusername = "";
$apipassword = "";

//A kötelező paraméterek beolvasása
$nl_id  = $_POST['nl_id']  or die ("nl_id");
$fields = explode( ',', preg_replace('/\s+/', '', $_POST['fields'])) or die ("fields");

//Alapértelmezetten a teljes listát kérdezzük le, de ha van megadva szegmens, akkor a megadott szegmensek unióját (vagy kapcsolat)
$method = "list";
if( isset($_POST['segments']) ) {
	$method = "filteredlist";
	$segments = explode( ',', preg_replace('/\s+/', '', $_POST['segments'])) or die ("segments");
}

//Összeállítjuk és végrehajtjuk a curl hívást
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_URL => 'http://'.$apiusername.':'.$apipassword.'@'.'restapi.emesz.com/'.$method.'/'.$nl_id)
);
if( "filteredlist" == $method) {
	curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($segments));
}
$result = curl_exec($curl);
curl_close($curl);

//Egy tömbbe dekódljuk a választ
$array = json_decode($result);

//Ha kaptunk adatot, feldolgozzuk
if (is_array($array)) {
	//Kigyűjtjük, hogy a megadott mezőnevek közül melyikek szerepelnek a visszaadott adatok között
	$validFields = array();
	foreach( $fields as $field) {
		if( property_exists($array[0], $field) ) {
			array_push($validFields, $field);
		}
	}

	//Táblázat formátumba rendezzük az adatokat
	//A táblázatnak adunk egy css class-t (sa_data), hogy könnyen formázható legyen
	echo '<table class="sa_data">
	<thead><tr>';
	foreach( $validFields as $field) {
		echo '<th>' . $field . '</th>';
	}
	echo '</tr></thead><tbody>';
	foreach($array as $subscriber){

		echo '<tr>';
		foreach( $validFields as $field) {
			echo '<td>' . $subscriber->$field . '</td>';
		}
		echo '</tr>';	
	}
	echo '</tbody></table>';
}
?>
