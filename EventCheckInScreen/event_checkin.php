<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Mai tréning jelentkezők</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style>
.sa_data {
    border-collapse: collapse;
}

.sa_data th, .sa_data td {
    text-align: left;
    padding: 8px;
}

.sa_data tbody tr{background-color: #C3E672}

.sa_data th {
    background-color: #4CAF50;
    color: white;
    text-align: center;
}
</style>
</head>

<body>
<?php
//Ahhoz a fiókhoz tartozó api felhasználónév és jelszó, amelyikben a lista található
//API kulcspárt így lehet létrehozni: https://www.salesautopilot.hu/tudasbazis/osszetett-rendszerek-keszitese/api-kulcsparok-kezelese
$apiusername = "";
$apipassword = "";

print("<div style='margin-top:10px;margin-bottom:10px;'><strong>Jelöld pipával, kik azok, akik megjelentek!</strong><br></div>");
//Az a lista, amelyben a jelentkezések találhatóak
$nl_id  = 1234;

//Az az űrlap, amelyen keresztül a script a státusz változást rögzíti
$ns_id = 5678;

//Az a szegmens, amelybe az jelentkezők tartoznak
//Ez lehet például az adott napra jelentkezők szegmense
$segments = [9012];
//Az a mező, amelyben a státuszt nyilvántartjuk
$statusField = "status";

//Lekérjük a jelentkezők listáját
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_URL => 'http://'.$apiusername.':'.$apipassword.'@'.'restapi.emesz.com/filteredlist/'.$nl_id)
);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($segments));
$result = curl_exec($curl);
curl_close($curl);

//Végigmegyünk a listán, és minden résztvevőhöz megjelenítünk egy jelölőnégyzetet, és az adatait
$array = json_decode($result);
if (is_array($array)) {
	echo '<table class="sa_data">
	<tbody>';
	foreach($array as $subscriber){
		if( isset($subscriber->$statusField) ) {
			$checked = ('1'==$subscriber->$statusField) ? 'checked' : '';
			echo '<tr>';
			echo '<tr><td>';
			echo '<input type="checkbox" id="'.$subscriber->id.'" '.$checked.'>';
			//Itt jelenítjük meg az adatokat. A példában csak a nevet írjuk ki, de természetesen a listában tárolt bármely adat megjeleníthető
			echo '<label for="'.$subscriber->id.'">'.$subscriber->mssys_lastname.'&nbsp;'.$subscriber->mssys_firstname.'</label>';
			echo '</td></tr>';
		}
	}
	echo '</tbody></table>';
}
?>
<script>
$(document).ready(function() {
	//Ha egy jelölőnégyzetben kattintunk
	$('input[type="checkbox"]').change(function() {
		//Fejlesztési fázisban érdemes logolni, hogy mi történik
		console.log($(this).attr('id'));
		console.log($(this).is(':checked'));
		//A megfelelő változtatást a háttérben leküldjük a szoftverbe
		$.ajax({
			type: "POST",
			url: 'url_to_your_script/save_status.php',
			data:{nl_id:<?php print $nl_id; ?>, ns_id:<?php print $ns_id; ?>, id:$(this).attr('id'), statusField:'<?php print $statusField; ?>', present:$(this).is(':checked')}
		});
	});
});
 </script>
</body>
</html>