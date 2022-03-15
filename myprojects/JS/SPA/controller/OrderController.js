
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


$("#btnConfirmOrder").click(function () {
    var list = new Array();
    for (let cartDBElement of cartDB) {
        list.push(cartDBElement);
    }
    var newOrder = new OrderDTO($("#txtOrderID").val(),$("#txtCusIdInOrder").val(),$("#txtDate").val(),"10:14",$("#total").text(),list);
    saveOrder(newOrder);
    clearDetailsInPlaceOrder();
});

$("#btnCancelOrder").click(function () {
     clearDetailsInPlaceOrder();
    clearOrderItem();
});

function clearDetailsInPlaceOrder() {
    $("#tblCart").empty();
    cartDB.splice(0,cartDB.length);
    genarateOrderID();
    calculate();
    $("#txtCusIdInOrder").val("");
    $("#txtNameInOrder").val("");
    $("#txtAddressInOrder").val("");
    $("#txtTpInOrder").val("");
    $("#txtCash").val("");
    $("#txtDiscount").val("");
    $("#txtBalance").val("");
}

function genarateOrderID() {
    try{
        let lastOrderID = orderDB[orderDB.length-1].getOrderId();
        let newOrderID = parseInt(lastOrderID.substring(1,4))+1;
        if (newOrderID<10){
            $("#txtOrderID").val("O00"+newOrderID);
        }else if (newOrderID<100){
            $("#txtOrderID").val("O0"+newOrderID);
        }else{
            $("#txtOrderID").val("O"+newOrderID);
        }
    }
    catch (e) {
        $("#txtOrderID").val("O001");
    }

}

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
    $("#txtItemCodeInOrder").val("");
    $("#txtDescInOrder").val("");
    $("#txtUnitPriceInOrder").val("");
    $("#txtQtyOnHandInOrder").val("");
    $("#txtOrderQty").val("");
    loadAllItemIDs();
}

function calculate(){
    var total = 0;
    for (var i of cartDB) {
        total += i.getTotPrice();
    }
    $("#total").text("Total : "+total+".00 Rs/=");
    $("#subTotal").text("SubTotal : "+total+".00 Rs/=");
}

function loadOrderDetails() {
    $("#orderDetailsTbl").empty();
    for (var i of orderDB) {
        let noOfItems=i.getCart().length;
        let row = `<tr><td>${i.getOrderId()}</td><td>${i.getDate()}</td><td>${i.getTime()}</td><td>${i.getCustomerId()}</td><td>${noOfItems}</td><td>${i.getTotal()}</td></tr>>`;
        $("#orderDetailsTbl").append(row);
    }

}

