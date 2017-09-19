<script>
mmjQuery( document ).ready( function() {
	//Az 1234 azonosítójú termék darabszámának változásakor
	mmjQuery("#qty_1234").change( function(){
		//A db_1234 szám típusú mezőhöz tartozó beviteli mező értékét beállítjuk a darabszámra
		//A db_1234 mezőt előzőleg fel kell venni a listára, és rejtett mezőként az űrlapon el kell helyezni
		mmjQuery("input[name='db_1234']").val(mmjQuery("#qty_1234").val());
	});
});
</script>
