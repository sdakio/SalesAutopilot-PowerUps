<script>
  mmjQuery( document ).ready( function () {
  	//Eltűnteti az 1234 azonosítójú fizetési mód rádiógombját és címkéjét
    mmjQuery("#shipping_method_1234").parent().hide();

    //Ha csak két fizetési mód szerepel az űrlapon, tehát az eltűntetés után csak egy választás maradna, akkor inkább tűntessük el az egész szállítási mód blokkot, ezzel a sorral, az előző ebben az esetben szükségtelen
    //mmjQuery("#shipping-method-container").hide();

    //Kiválasztja az 5678 azonosítójú szállítási módot. Ez nem kötelező, csak abban az esetben, ha az egész szállítási mód blokkot eltűntetjük, mert akkor a vásárló már nem fog tudni választani
    //mmjQuery("#shipping_method_5678").prop('checked', true);
    
    //Ha olyan kártyás fizetési mód van az űrlapon, amihez több szolgáltató is van rendelve, akkor ez a sor jeleníti meg a kártyás fizetési mód blokkot.
    //Akkor van rá szükség, ha az előzőleg általunk kiválasztottnak beállított lehetőség ez a bankkártyás fizetés
    //mmjQuery("#online-payment-container").show();

    //Tehát ha van például az űrlapon egy átutalásos és két kártyás fizetés, akkor
    // - az átutalásos fizetési módot eltűntetjük, mert ez csak a lezáráshoz kell
    // - a bankkártyás fizetési módot bejelöljük kiválasztottnak
    // - megjelenítjük a Kártyás fizetési mód blokkot
  });
</script>