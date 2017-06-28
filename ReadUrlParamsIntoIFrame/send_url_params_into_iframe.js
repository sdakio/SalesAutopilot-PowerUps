<script language="javascript">
  //Ezt a kódrészletet az iFrame kód mögé kell beilleszteni
  //Megkeressük az iFrame-et amiben az űrlap található. Az azonosítónak az űrlap azonosítójának kell lennie
	var iframe = document.getElementById('mmiframe12345');
	var src = iframe.src.split("#");
	//Az iFrame URL-jét kiegészítjük az URL paraméterekkel
	iframe.src = src[0] + window.location.search + "#" + src[1];
	//Fejlesztési fázisban érdemes logolni, hogy mi történik
	console.log( iframe.src );
</script>