 <?php
 header("access-control-allow-origin: *");
error_reporting(E_ALL);
ini_set('display_errors',1);
 
$nl_id = $_POST['l'];
$form_id = $_POST['f'];
$email = $_POST['e'];

$apiusername = "your_apiusername";
$apipassword = "your_apipassword";

$curl = curl_init();

/* Email cím alapján bekérjük a feliratkozásokat a listáról */
curl_setopt_array($curl, array(
CURLOPT_RETURNTRANSFER => true,
CURLOPT_URL => 'http://'.$apiusername.':'.$apipassword.'@'.'restapi.emesz.com/list/'.$nl_id.'/field/email/value/'.$email) 
);
$result = curl_exec($curl);
curl_close($curl);

$subscriberlist = json_decode($result);

/* Az első találathoz tartozó űrlap linkjét lekérjük a rendszerből. Ez a script hírlevél típusú listákhoz íródott, de azért ez a biztonsági intézkedés nem árt */
$curl = curl_init();
curl_setopt_array($curl, array(
CURLOPT_RETURNTRANSFER => true,
CURLOPT_URL => 'http://'.$apiusername.':'.$apipassword.'@'.'restapi.emesz.com/updateformlink/'.$nl_id.'/'.$form_id.'/'.$subscriberlist[0]->id)
);
$updateformlink = curl_exec($curl);
curl_close($curl);

/* Visszaadjuk a kapott linket */
echo $updateformlink;
?>