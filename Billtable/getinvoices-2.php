<?php
header("access-control-allow-origin: *");
error_reporting(E_ALL);
ini_set('display_errors',1);

$apiusername = "your_apiusername";
$apipassword = "your_apipassword";

$listids = $_POST["listids"];
$email = $_POST["email"];

$bills = array();

/* Minden listán elvégazzük a lekérdezést */
foreach($listids as $listid) {
	/* Email cím alapján bekérjük a feliratkozásokat az adott listáról */
	$curl = curl_init();
  curl_setopt_array($curl, array(
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_URL => 'http://'.$apiusername.':'.$apipassword.'@restapi.emesz.com/list/'.$listid.'/field/email/value/'.$email) 
  );
  $result = curl_exec($curl);
  curl_close($curl);

	/* echo var_dump($result); //Fejlesztéskor érdemes kiíratn, hogy milyen adatokat kaptunk, így könnyebb rájuk hivatkozni */
	$array = json_decode($result);

	/* Ha van találat */
	if (is_array($array)) {
		/* Minden találatra elvégezzük */
		foreach($array as $subscriber){
			$bill = array();
			$bill['items'] = array();

			/* Csak akkor adjuk vissza a találatot, ha van hozzá számla */
			if ($subscriber->mssys_bill_pdf_link != '') {
				/* Ezek a teljes megrendelés adatai között vannak */
				$bill['bill'] = $subscriber->mssys_bill_pdf_link;
				$bill['execute_date'] = $subscriber->mssys_execute_date;

				foreach($subscriber->products as $product) {
					/* Ezek pedig az egyes rendelt tételek adatai között */
					$items = array();
					$items['item_name'] = $product->oi_name;
					$items['item_net_price'] = number_format($product->oi_netto_sum, '0','.','');
					$items['item_gross_price'] = number_format($product->oi_brutto_sum, '0','.','');
					array_push($bill['items'], $items);
					unset($items);
				}
				
			 	array_push($bills, $bill);
				unset($bill);
			}
		} 
	}

//var_dump($bills);
}

/* A teljesítés dátuma alapján rendezzük a számlákat */
function sortFunction( $a, $b ) {
    return strtotime($a["execute_date"]) - strtotime($b["execute_date"]);
}
usort($bills, "sortFunction");

echo json_encode($bills);

?>