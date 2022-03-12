
function loadItemCodes(){
    var select = document.getElementById("inputItem");
    loadItemDetails(select.options[select.selectedIndex].value);
}

$("#btnAddToCart").click(function () {
    var itemCode = $("#txtItemCodeInOrder").val();
    var itemName = $("#txtDescInOrder").val();
    var itemPrice = $("#txtUnitPriceInOrder").val();
    var itemQty = $("#txtQtyOnHandInOrder").val();
    var orderQty = $("#txtOrderQty").val();

    if (regExQtyOnHand.test(orderQty)) {

        var itemTotal = itemPrice*orderQty;
        let newItemToCart = new Cart(itemCode,orderQty,itemTotal);
        addCart(newItemToCart);
        loadCartAll();

        $("#txtOrderQty").css('border', '2px solid #ced4da');
        clearOrderItem();
    } else {
        $("#txtOrderQty").css('border', '2px solid red');
    }
});

/*$("#txtCusIdInOrder").onkeydown(function (e) {
    if(e.key == "Enter"){
        let searchCustomer = searchCustomer($("#txtCusIdInOrder").val());
        $("#txtNameInOrder").val(searchCustomer.getCusName());
    }

});*/
$("#txtCusIdInOrder").on('keyup', function (eventOb) {
    if (eventOb.key == "Enter") {
    let result = searchCustomer($("#txtCusIdInOrder").val());
        console.log(result)
    $("#txtNameInOrder").val(result.getCusName());
    $("#txtAddressInOrder").val(result.getCusAddress());
    $("#txtTpInOrder").val(result.getCusTp());
}
});


function loadCartAll() {
    $("#tblCart").empty();
    for (var i of cartDB) {
        let item = searchItem(i.getCItemCode());
        let row = `<tr><td>${i.getCItemCode()}</td><td>${item.getItemDesc()}</td><td>${item.getItemUnitPrice()}</td><td>${i.getQtyForSale()}</td><td>${i.getTotPrice()}</td></tr>`;
        $("#tblCart").append(row);
    }
    calculate();
}

function clearOrderItem(){
    $('#txtItemCodeInOrder,#txtDescInOrder,#txtUnitPriceInOrder,#txtQtyOnHandInOrder,#txtOrderQty').val("");
    loadItemCodes();
}

function calculate(){
    var total = 0;
    for (var i of cartDB) {
        total += i.getTotPrice();
    }
    $("#total").text("Total : "+total+".00 Rs/=");
    $("#subTotal").text("SubTotal : "+total+".00 Rs/=");
}