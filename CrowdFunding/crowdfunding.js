<script>
//Ez a script olyan űrlapon használható, ami egy ermékes, bruttó árakat jelenít meg, és nincs rajta szállítási költségel rendelkező szállítási mód
mmjQuery(document).ready(function() {
    mmjQuery('span[id*="brsumprice"]').parent().hide();
    mmjQuery('.subtotal').hide();
    mmjQuery('#shipping-method-container').css('margin-bottom','30px');
    mmjQuery("#ordertotal").hide();
    mmjQuery("#ordertotal").after('<span id="newtotal" style="display: inline;"></span>');
    mmjQuery('#newtotal').hide();

    var brunitprice = mmjQuery('span[id*="brunitprice"]')[0]
    var onlyId      = mmjQuery(brunitprice).prop('id').replace('brunitprice','');

    var vat_percent = parseInt(mmjQuery(brunitprice).attr('vat_percent'));
    vat_percent     = (100+vat_percent)/100;
    mmjQuery(brunitprice).parent().prop('width','200');
    mmjQuery(brunitprice).html('<input type="number" style="display:none" name="prod_price_' + onlyId + '">');
    mmjQuery(brunitprice).before('<input type="number" style="width: 60%; margin: 0 5px; padding: 10px;" id="newprice">');

    mmjQuery('#newprice').change( function(){
        var brutto  = parseFloat(mmjQuery(this).val());
        var netto   = brutto/vat_percent;
        mmjQuery('input[name="prod_price_' + onlyId+ '"]').val(netto);
        mmjQuery("#newtotal").html(brutto).show();
    });
});
</script>