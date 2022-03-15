
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

$('#txtOrderID,#txtCash,#txtDiscount,#txtBalance').on('blur', function () {
    formValidOrder();
});


$("#btnSaveItem").attr('disabled', true);

const regExOrderID = /^O[0-9]{3,4}$/;
const regExDiscount = /^[0-9]{1,}$/;

function formValidOrder() {
    var orderID = $("#txtOrderID").val();
    $("#txtOrderID").css('border', '2px solid #ced4da');
    if (regExOrderID.test(orderID)) {
        var cash = $("#txtCash").val();
        if (regExUnitPrice.test(cash)){
            $("#txtCash").css('border', '2px solid #ced4da');
            var discount = $("#txtDiscount").val();
            if (regExDiscount.test(discount)){
                $("#txtDiscount").css('border', '2px solid #ced4da');
                var balance = $("#txtBalance").val();
                if (regExDiscount.test(balance)){
                    $("#txtBalance").css('border', '2px solid #ced4da');
                    $("#btnSaveItem").attr('disabled', false);
                    return true;
                }else{
                    $("#txtBalance").css('border', '2px solid red');
                    return false;
                }
            }else{
                $("#txtDiscount").css('border', '2px solid red');
                return false;
            }
        }else{
            $("#txtCash").css('border', '2px solid red');
            return false;
        }
    } else {
        $("#txtOrderID").css('border', '2px solid red');
        return false;
    }

}
function checkIfValidOrder() {
    var oId = $("#txtOrderID").val();
    if (regExOrderID.test(oId)) {
        $("#txtCash").focus();
        var c = $("#txtCash").val();
        if (regExUnitPrice.test(c)) {
            $("#txtDiscount").focus();
            var disc = $("#txtDiscount").val();
            if (regExDiscount.test(disc)) {
                $("#txtBalance").focus();
                var balanc = $("#txtBalance").val();
                var resp = regExDiscount.test(balanc);
                if (resp) {

                    // let res = confirm("Do you really want to save this customer..?");

                    //clearAll();
                    return true;
                } else {
                    $("#txtBalance").focus();
                }
            } else {
                $("#txtDiscount").focus();
            }
        } else {
            $("#txtCash").focus();
        }
    } else {
        $("#txtOrderID").focus();
    }
}
function setButtonOrder() {

    let b = formValidOrder();
    if (b) {
        $("#btnConfirmOrder").attr('disabled', false);
    } else {
        $("#btnConfirmOrder").attr('disabled', true);
    }
}

$("#btnConfirmOrder").click(function () {

   var list = new Array();
    for (let cartDBElement of cartDB) {
        list.push(cartDBElement);
    }
    var newOrder = new OrderDTO($("#txtOrderID").val(),$("#txtCusIdInOrder").val(),$("#txtDate").val(),"10:14",$("#total").text(),list);
    if (checkIfValidOrder()){
        saveOrder(newOrder);
        clearDetailsInPlaceOrder();
    }

});
$('#btnSaveCustomer').click(function () {
    checkIfValidOrder();
});

$("#txtOrderID").on('keyup', function (eventOb) {
    setButtonOrder();
    if (eventOb.key == "Enter") {
        checkIfValidOrder();
    }

    if (eventOb.key == "Control") {
        var typedCustomerID = $("#txtOrderID").val();
        var srcCustomer = searchCustomer(typedCustomerID);
        // $("#txtCusID").val(srcCustomer.getCustomerID());
        // $("#txtCusName").val(srcCustomer.getCustomerName());
        // $("#txtCusAddress").val(srcCustomer.getCustomerAddress());
        // $("#txtCusTP").val(srcCustomer.getCustomerSalary());
    }
});
$("#txtCash").on('keyup', function (eventOb) {
    setButtonOrder();
    if (eventOb.key == "Enter") {
        checkIfValidOrder();
    }
});

$("#txtDiscount").on('keyup', function (eventOb) {
    setButtonOrder();
    if (eventOb.key == "Enter") {
        checkIfValidOrder();
    }
});

$("#txtBalance").on('keyup', function (eventOb) {
    setButtonOrder();
    if (eventOb.key == "Enter") {
        checkIfValidOrder();
    }
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

