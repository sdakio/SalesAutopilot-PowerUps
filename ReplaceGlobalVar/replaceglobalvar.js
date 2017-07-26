<script>
jQuery(document).ready(function() {
    //Függvénybe tesszük a script meghívását, így ha több változóra hivatkozunk, csak a függvényt kell többször meghívnunk
    //Paraméterül a globális változó nevét adjuk meg
    function replaceGlobalVar( globalVariableName ) {
        jQuery.ajax({
            type: 'POST',
            url:  'url_to_your_script/get-global-variable.php',
            data: {
                globalName: globalVariableName
            }
        })
        .done(function(result) {
            //Ha sikeres a hívás, akkor a your_global_var_name class-szal rendelkező elemek tartalmát lecseréljük az értékre.
            //Ez lehet pl: <span class="your_global_var_name"></span>
            jQuery('.'+globalVariableName).html(result);
        })
        .fail(function() {
            //Ha hiba van, arról szólunk a konzolban
            console.log('error');
        });
    }

    //Végül az összes használt változóra meghívjuk a függvényt egyenként.
    replaceGlobalVar('your_global_var_name');
});
</script>