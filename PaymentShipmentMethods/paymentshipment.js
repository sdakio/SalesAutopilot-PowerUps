<style>
.leiras{
  padding-left:30px;
  width: 80%;
  display: none;
}

.felirat{
  font-weight: bold;
}
</style>

<script>
mmjQuery(document).ready( function(){
  //Paraméterként adja meg az egyes szállítási módok adatait:
  // - nev: ez egy egyszavas azonosító, aminek csak technikai jelentősége van, nem fog sehol megjelenni, csak a kód hivatkozik így erre a módra
  // - felirat: a rádiógomb címkéje
  // - leirás: a kiválasztáskor lenyíló szöveges magyarázat ehhez a szállítási módhoz
  var szallitasi_modok= [
    { 'nev'   : 'futar',
    'felirat' : 'Házhoz szállítás GLS futárral',
    'leiras'  : 'Lórum ipse mint árás lató szakodás, elsősorban egy vekvő dalazás. A csipszergi fürkezék és a képer fürkezék ömbejtől szélterű fattyú és bozékos makabagokkal vénedik. A csipszergi fürkezék releménye rendszerint límállyal ízet, a képer fürkezéké pedig hidattal vagy límállyal. A csípősség gyakran együtt csépegető a csipszergi szegecskével vagy a képer szegecskével. Így például egy vern csipszergi fürkezékben az egyik sulajla szavalja a csípősség idélyét.'},
    { 'nev'   : 'csomagpont',
    'felirat' : 'Személyes átvétel GLS CsomagPontban',
    'leiras'  : 'Lórum ipse mint árás lató szakodás, elsősorban egy vekvő dalazás. A csipszergi fürkezék és a képer fürkezék ömbejtől szélterű fattyú és bozékos makabagokkal vénedik. A csipszergi fürkezék releménye rendszerint límállyal ízet, a képer fürkezéké pedig hidattal vagy límállyal. A csípősség gyakran együtt csépegető a csipszergi szegecskével vagy a képer szegecskével. Így például egy vern csipszergi fürkezékben az egyik sulajla szavalja a csípősség idélyét.'},
    { 'nev'   : 'szemelyes',
    'felirat' : 'Személyes átvétel (Budapest belvárosában)',
    'leiras'  : 'Lórum ipse mint árás lató szakodás, elsősorban egy vekvő dalazás. A csipszergi fürkezék és a képer fürkezék ömbejtől szélterű fattyú és bozékos makabagokkal vénedik. A csipszergi fürkezék releménye rendszerint límállyal ízet, a képer fürkezéké pedig hidattal vagy límállyal. A csípősség gyakran együtt csépegető a csipszergi szegecskével vagy a képer szegecskével. Így például egy vern csipszergi fürkezékben az egyik sulajla szavalja a csípősség idélyét.'}
    ];

  //Paraméterként adja meg az egyes fizetési módok adatait:
  // - nev: ez egy egyszavas azonosító, aminek csak technikai jelentősége van, nem fog sehol megjelenni, csak a kód hivatkozik így erre a módra
  // - felirat: a rádiógomb címkéje
  // - leirás: a kiválasztáskor lenyíló szöveges magyarázat ehhez a fizetési módhoz
  var fizetesi_modok= [
    { 'nev'   : 'kartyas',
    'felirat' : 'Online bankkártyás fizetés',
    'leiras'  : 'Lórum ipse mint árás lató szakodás, elsősorban egy vekvő dalazás. A csipszergi fürkezék és a képer fürkezék ömbejtől szélterű fattyú és bozékos makabagokkal vénedik. A csipszergi fürkezék releménye rendszerint límállyal ízet, a képer fürkezéké pedig hidattal vagy límállyal. A csípősség gyakran együtt csépegető a csipszergi szegecskével vagy a képer szegecskével. Így például egy vern csipszergi fürkezékben az egyik sulajla szavalja a csípősség idélyét.'},
    { 'nev'   : 'utalas',
    'felirat' : 'Banki előreutalás',
    'leiras'  : 'Lórum ipse mint árás lató szakodás, elsősorban egy vekvő dalazás. A csipszergi fürkezék és a képer fürkezék ömbejtől szélterű fattyú és bozékos makabagokkal vénedik. A csipszergi fürkezék releménye rendszerint límállyal ízet, a képer fürkezéké pedig hidattal vagy límállyal. A csípősség gyakran együtt csépegető a csipszergi szegecskével vagy a képer szegecskével. Így például egy vern csipszergi fürkezékben az egyik sulajla szavalja a csípősség idélyét.'},
    { 'nev'   : 'utanvet',
    'felirat' : 'Utánvét',
    'leiras'  : 'Lórum ipse mint árás lató szakodás, elsősorban egy vekvő dalazás. A csipszergi fürkezék és a képer fürkezék ömbejtől szélterű fattyú és bozékos makabagokkal vénedik. A csipszergi fürkezék releménye rendszerint límállyal ízet, a képer fürkezéké pedig hidattal vagy límállyal. A csípősség gyakran együtt csépegető a csipszergi szegecskével vagy a képer szegecskével. Így például egy vern csipszergi fürkezékben az egyik sulajla szavalja a csípősség idélyét.'}
    ];


  var szallitasi_fizetesi_modok = [];
  szallitasi_fizetesi_modok['futar'] = [];
  szallitasi_fizetesi_modok['csomagpont'] = [];
  szallitasi_fizetesi_modok['szemelyes'] = [];

  //Ebben a tömbben adhatja meg a létrehozott szállítási/fizetési módok, és a rádiógombok kapcsolatát:
  //Minden kombinációt meg kell adnia. Ha egy szállítási módhoz nem lehetséges minden fizetési mód, a nem engedélyezett párosítások értéke legyen üres szöveg, tehát a két aposztróf közé ne írjon semmit.
  szallitasi_fizetesi_modok['futar']['kartyas']       = '#shipping_method_1234';
  szallitasi_fizetesi_modok['futar']['utalas']        = '#shipping_method_5678';
  szallitasi_fizetesi_modok['futar']['utanvet']       = '#shipping_method_9012';
  szallitasi_fizetesi_modok['csomagpont']['kartyas']  = '#shipping_method_3456';
  szallitasi_fizetesi_modok['csomagpont']['utalas']   = '#shipping_method_7890';
  szallitasi_fizetesi_modok['csomagpont']['utanvet']  = '#shipping_method_2708';
  szallitasi_fizetesi_modok['szemelyes']['kartyas']   = '#shipping_method_4567';
  szallitasi_fizetesi_modok['szemelyes']['utalas']    = '#shipping_method_6789';
  szallitasi_fizetesi_modok['szemelyes']['utanvet']   = '';
  
  //Létrehozzuk a radio gombokat
  var radios = "<h3>Szállítási módok</h3>";
  for( var i in szallitasi_modok) {
    radios += "<p><input type='radio' name='szallitasi_mod' value='" + szallitasi_modok[i]['nev'] + "'><span class='felirat'>" + szallitasi_modok[i]['felirat'] + "</span></p>";
    radios += "<p class='leiras szallmod " + szallitasi_modok[i]['nev'] + "'>" + szallitasi_modok[i]['leiras'] + "</p>";
  }

  radios += "<br><h3>Fizetési módok</h3>";
  for( var i in fizetesi_modok) {
    radios += "<div id='" + fizetesi_modok[i]['nev'] + "'>";
    radios += "<p><input type='radio' name='fizetesi_mod' value='" + fizetesi_modok[i]['nev'] + "'><span class='felirat'>" + fizetesi_modok[i]['felirat'] + "</span></p>";
    radios += "<p class='leiras fizmod " + fizetesi_modok[i]['nev'] + "'>" + fizetesi_modok[i]['leiras'] + "</p>";
    radios += "</div>"
  }

  //Lecseréljük az alap megjelenítést a rádiógombosra
  mmjQuery("#shipping-method-container").children().hide();
  mmjQuery("#shipping-method-container").append(radios);
  
  //Új szállítási mód választása esetén megjelenítjük a leírást, és eltűntetjük a hozzá em engedélyezett fizetési módokat
  mmjQuery('input[name="szallitasi_mod"]').change( function() {
    var szallmod = mmjQuery('input[name="szallitasi_mod"]:checked').val();
    mmjQuery('.szallmod').hide();
    mmjQuery('.' + szallmod).show();

    for( var i in fizetesi_modok) {
      var fizmod = fizetesi_modok[i]['nev'];
      if(szallitasi_fizetesi_modok[szallmod][fizmod] == "") {
        mmjQuery('#' + fizmod).hide();
        mmjQuery('#' + fizmod + ' input[type="radio"]').prop('checked',false);
      } else {
        mmjQuery('#' + fizmod).show();
      }
    }

    set_shipping_method();
  });

  //Új fizetési mód választása esetén megjelenítjük a leírást, és eltűntetjük a hozzá em engedélyezett fizetési módokat
  mmjQuery('input[name="fizetesi_mod"]').change( function() {
    var fizmod   = mmjQuery('input[name="fizetesi_mod"]:checked').val();
    mmjQuery('.fizmod').hide();
    mmjQuery('.' + fizmod).show();

    set_shipping_method();
  }); 

  function set_shipping_method() {
    var szallmod = mmjQuery('input[name="szallitasi_mod"]:checked').val();
    var fizmod   = mmjQuery('input[name="fizetesi_mod"]:checked').val();

    //Ha van szállítási és fizetési mód is választva, akkor beállítjuk a hozzá tartozó száálítási-fizetési módot az űrlapon
    //Ha valamelyik nincs beállítva, akkor csak töröljük a korábban beállított száálítási-fizetési mód választást, hogy semmi ne legyen kiválasztva
    if (!szallmod || !fizmod) {
      mmjQuery(".shippingmethodradio").prop("checked", false).change();
      console.log("Törölve!");
    }
    else {
      mmjQuery(szallitasi_fizetesi_modok[szallmod][fizmod]).prop("checked", true).change();
      //Fejlesztési fázisban érdemes logolni, hogy melyik mód lett kiválasztva, hiszen ez az űrlapon rejtve van.
      console.log(szallitasi_fizetesi_modok[szallmod][fizmod]);
    }
  }
});
</script>