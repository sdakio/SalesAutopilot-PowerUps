<script>
jQuery(document).ready(function() {
    //Függvénybe tesszük a script meghívását, így ha több szegmensre hivatkozunk, csak a függvényt kell többször meghívnunk
    //Paraméterül a szegmens azonosítóját adjuk meg
    function replaceSegmentNum( segmentId ) {
        jQuery.ajax({
            type: 'POST',
            url:  'url_to_your_script/get-segment-num.php',
            data: {
                segmentid: segmentId
            }
        })
        .done(function(result) {
            //Ha sikeres a hívás, akkor a your_segment_id class-szal rendelkező elemek tartalmát lecseréljük az értékre.
            //Ez lehet pl: <span class="your_segment_id"></span>
            jQuery('.'+segmentId).html(result);
        })
        .fail(function() {
            //Ha hiba van, arról szólunk a konzolban
            console.log('error');
        });
    }

    //Végül az összes használt változóra meghívjuk a függvényt egyenként.
    replaceSegmentNum('your_segment_id');
});
</script>