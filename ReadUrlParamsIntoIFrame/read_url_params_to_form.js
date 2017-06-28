<script>
//Ezt a scriptet az űrlap egyedi kód részébe kell másolni
  mmjQuery( document ).ready( function () {
  	//Kimásoljuk egy tömbbe a paramétereket
    var query = document.location.search.replace('?', '');
    query = query.split('&');
    //Az azonos nevű input mezőkbe betöltjük a kapott értékeket
    for (var i = 0; i < query.length; i++) {
      var field = query[i].split("=");
      mmjQuery("input[name='" + field[0] + "'], select[name='" + field[0] + "'], textarea[name='" + field[0] + "']").val(decodeURIComponent(field[1]));
    }
  });
</script>