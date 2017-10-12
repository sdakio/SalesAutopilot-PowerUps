<script>
mmjQuery(document).ready( function(){
	// InternetExplorerben a remove függvény nem működik, ezért helyettesítjük
	HTMLElement.prototype.remove = function() { return this.parentNode.removeChild(this) };

	//Megadjuk a megjeleníteni kívánt országok kódját
	var countries = ["hu", "at", "ro", "sk", "si"];

	//Végigmegyünk az mssys_bill_country mező opcióin
	mmjQuery("#mssys_bill_country > option").each(function() {
		//És ha az adott opció nem szerepel az általunk megadottak között
		if (countries.indexOf(this.value) === -1) {
			//Akkor töröljük az opciót
			this.remove();
		}
	});

	//Ugyanezt a szállítási országra is megtesszük
	mmjQuery("#mssys_postal_country > option").each(function() {
	if (countries.indexOf(this.value) === -1) {
			this.remove();
		}
	});
});
</script>