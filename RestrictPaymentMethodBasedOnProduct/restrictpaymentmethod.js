<script>
mmjQuery(document).ready(function(){
    //Megadjuk a termék-fizetési mód megfeleltetést:
    //termek_fizetes_matrix['termékid'] = [fizetési módok];
    //Ha egy termék nem szerepel a mátrixban, akkor ahhoz minden fizetési mód engedélyezett
    var termek_fizetes_matrix = Array();
    termek_fizetes_matrix['123456'] = [987, 2654, 321];
    termek_fizetes_matrix['789101'] = [321, 548];

    //Ha változik a kiválasztott termék
    mmjQuery("input[name='prod_id']").change(function() {
        //Megjegyezzük, mi van kiválastzva
        var selected_prod           = mmjQuery("input[name='prod_id']:checked").val();
        var selected_shippingmethod = mmjQuery("input[name='shipping_method']:checked").val();

        //Ha a termék szerepel a mátrixban
        if(termek_fizetes_matrix[selected_prod]) {
            //Figyeljük, hogy a kiválasztott fizetési mód engedélyezett-e
            var modeValid = false;

            //Elrejtünk minden fizetési módot, és csak az engedélyezetteket jeleenítjük majd meg
            mmjQuery(".shippingmethodradio").parent().hide();
            //Minden engedélyezett fizetési módra
            for( var i in termek_fizetes_matrix[selected_prod] ) {
                //Figyeljük, hogy a kiválasztott fizetési mód engedélyezett-e
                modeValid = modeValid || ( termek_fizetes_matrix[selected_prod][i] == selected_shippingmethod );

                //Megjelenítjük ezt a fizetési módot
                mmjQuery("#shipping_method_" + termek_fizetes_matrix[selected_prod][i]).parent().show();
            }
            //Ha egy nem engedélyezett mód volt kiválasztva
            if( !modeValid ) {
                //A kiválasztást megszűntetjük
                mmjQuery("input[name='shipping_method']:checked").prop('checked', false);
                //És eltűntetjük az esetleges Kártyás fizetési mód blokkot
                mmjQuery("#online-payment-container").hide();
            }
            //Ha csak egy engedélyezett fizetési mód van, azt válasszuk is ki egyből
            if( termek_fizetes_matrix[selected_prod].length == 1 ) {
                mmjQuery("#shipping_method_" + termek_fizetes_matrix[selected_prod][0]).prop('checked', true);
            }
        } else {
            //Ha a termék nem szerepel a mátrixban, akkor minden fizetési módot megjelenítünk, hiszen nincs korlátozás erre a termékre
            mmjQuery(".shippingmethodradio").parent().show();
        }
    });
});
</script>