<script>
mmjQuery(document).ready(function(){
    //Megadjuk a termék-fizetési mód megfeleltetést:
    //termek_fizetes_matrix['termékid'] = [fizetési módok];
    //Ha egy termék nem szerepel a mátrixban, akkor ahhoz minden fizetési mód engedélyezett
    //Ha több termék van kiválasztva, az a fizetési mód elérhetõ, amelyik mindegyikhez engedélyezett
    var termek_fizetes_matrix = Array();
    termek_fizetes_matrix['123456'] = [987, 2654, 321];
    termek_fizetes_matrix['789101'] = [321, 548];

    //Ha változik a kiválasztott termék
    mmjQuery(".prodqty").change(function() {
        //Minden módot bekapcsolunk, és kikapcsoljuk majd a nem kellõ módokat
    	mmjQuery(".shippingmethodradio").parent().show();

        //Minden kiválasztott termékre
        mmjQuery('.prodqty').each( function() {
    		if( 0<mmjQuery(this).val() ) {
    			var selected_prod = mmjQuery(this).prop('name').substr(4);

            //Ha van a termékhez korlátozás
    			if(termek_fizetes_matrix[selected_prod]) {
                //Minden fizetési módra
		  			mmjQuery('.shippingmethodradio').each( function() {
                    //Ha a fizetési mód nincs a termékhez engedélyezettek között
		  				if( !termek_fizetes_matrix[selected_prod].includes(parseInt(mmjQuery(this).val())) ) {
                        //Akkor elrejtjük
		  					mmjQuery(this).parent().hide();

                        //Ha ez a mód van épp kiválasztva
		  					if( mmjQuery(this).prop('checked') ) {
                            //Akkor kikapcsoljuk a kiválasztást
		  						mmjQuery(this).prop('checked',false);
                            //És eltûntetjük az esetleges Kártyás fizetési mód blokkot
		  						mmjQuery("#online-payment-container").hide();
		  					}
		  				}
		  			});
	    		}
	    	}
    	});
        //Ha csak egy engedélyezett fizetési mód van, azt válasszuk is ki egybõl
    	if (1==mmjQuery('.shippingmethodradio:visible').length) {
    		mmjQuery('.shippingmethodradio:visible').prop('checked', true);
    	}
    });
});
</script>