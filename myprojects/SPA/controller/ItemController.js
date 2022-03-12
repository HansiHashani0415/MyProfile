//  Save Item ---------------------------------------------



$("#btnSearchItem").on("click", function () {
    var searchResult = searchItem($("#inputNameNICTp").val());
    if (!searchResult){
        clearAll();
        alert("Item doesn't exist..");
    }else{


        $("#modelItem").modal('show');

        $("#txtItemCode1").val(searchResult.getItemCode());
        $("#txtDescription1").val(searchResult.getItemDesc());
        $("#txtUnitPrice1").val(searchResult.getItemUnitPrice());
        $("#txtQtyOnHand1").val(searchResult.getItemQtyOnHand());
    }
});

$("#btnDeleteItem").on("click",function () {
    if(!searchItem( $("#txtItemCode1").val())){
        let serchedID =  $("#txtItemCode1").val();
        clearAll();
        checkIfValidItem();
    }else {
        deleteItem( $("#txtItemCode1").val());
    }
});

$("#btnUpdateItem1").on("click",function () {
    if(updateItem($("#txtItemCode1").val(), $("#txtDescription1").val(), $("#txtUnitPrice1").val(), $("#txtQtyOnHand1").val())){
        loadAllItems();
        clearAll();
    }
});

$("#btnSaveItem").on("click", function () {

    let newItem=new ItemDTO($("#txtItemCode").val(), $("#txtDescription").val(), $("#txtUnitPrice").val(), $("#txtQtyOnHand").val());
    console.log(newItem.getItemCode(),newItem.getItemDesc());
    if (!searchItem($("#txtItemCode").val())){
        if (checkIfValidItem()){
            saveItem(newItem);
            clearAll();
            loadAllItems();
        }
    }
});

const regExItemCode = /^I[0-9]{3,4}$/;
const regExDesc = /^[A-z]{2,25}$/;
const regExUnitPrice =  /^[0-9]{1,}[.]?[0-9]{1,2}$/;
const regExQtyOnHand =  /^[0-9]{1,4}$/;

$('#txtItemCode,#txtDescription,#txtUnitPrice,#txtQtyOnHand,#txtItemCode1,#txtDescription1,#txtUnitPrice1,#txtQtyOnHand1').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
});

$('#txtItemCode,#txtDescription,#txtUnitPrice,#txtQtyOnHand,#txtItemCode1,#txtDescription1,#txtUnitPrice1,#txtQtyOnHand1').on('blur', function () {
    formValidItem();
});

//-------------------------focusing events
$("#txtItemCode,#txtItemCode1").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValidItem();
    }

    if (eventOb.key == "Control") {
        var typedItemCode = $("#txtItemCode").val();
        var srcCustomer = searchItem(typedItemCode);
        // $("#txtCusID").val(srcCustomer.getCustomerID());
        // $("#txtCusName").val(srcCustomer.getCustomerName());
        // $("#txtCusAddress").val(srcCustomer.getCustomerAddress());
        // $("#txtCusTP").val(srcCustomer.getCustomerSalary());
    }
});

$("#txtDescription,#txtDescription1").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValidItem();
    }
});

$("#txtUnitPrice,#txtUnitPrice1").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValidItem();
    }
});

$("#txtQtyOnHand,#txtQtyOnHand1").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValidItem();
    }
});
// ----------------------focusing events end
$("#btnSaveItem").attr('disabled', true);

function clearAllItems() {
    $('#txtItemCode,#txtDescription,#txtUnitPrice,#txtQtyOnHand,#txtItemCode1,#txtDescription1,#txtUnitPrice1,#txtQtyOnHand1').val("");
    $('#txtItemCode,#txtDescription,#txtUnitPrice,#txtQtyOnHand,#txtItemCode1,#txtDescription1,#txtUnitPrice1,#txtQtyOnHand1').css('border', '2px solid #ced4da');
    $('#txtItemCode,#txtItemCode1').focus();
    $("#btnSaveItem").attr('disabled', true);
    loadAllItems();
    $("#lblItemCode,#lblItemDesc,#lblUnitPrice,#lblQtyOnHand").text("");
}

function formValidItem() {
    var itemCode = $("#txtItemCode").val();
    $("#txtItemCode").css('border', '2px solid green');
    $("#lblItemCode").text("");
    if (regExItemCode.test(itemCode)) {
        var description = $("#txtDescription").val();
        if (regExDesc.test(description)) {
            $("#txtDescription").css('border', '2px solid green');
            $("#lblItemDesc").text("");
            var unitPrice = $("#txtUnitPrice").val();
            if (regExUnitPrice.test(unitPrice)) {
                var qty = $("#txtQtyOnHand").val();
                var resp = regExQtyOnHand.test(qty);
                $("#txtUnitPrice").css('border', '2px solid green');
                $("#lblUnitPrice").text("");
                if (resp) {
                    $("#txtQtyOnHand").css('border', '2px solid green');
                    $("#lblQtyOnHand").text("");
                    return true;
                } else {
                    $("#txtQtyOnHand").css('border', '2px solid red');
                    $("#lblQtyOnHand").text("Item QtyOnHand is a required field : Pattern >0");
                    return false;
                }
            } else {
                $("#txtUnitPrice").css('border', '2px solid red');
                $("#lblUnitPrice").text("Item Unit Price is a required field : Pattern >0.00");
                return false;
            }
        } else {
            $("#txtDescription").css('border', '2px solid red');
            $("#lblItemDesc").text("Item Description is a required field : Minimum 2, Max 25, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtItemCode").css('border', '2px solid red');
        $("#lblItemCode").text("Item Code is a required field : Pattern I001");
        return false;
    }
}

function checkIfValidItem() {

    var cusID = $("#txtItemCode").val();
    if (regExItemCode.test(cusID)) {
        $("#txtDescription").focus();
        var cusName = $("#txtDescription").val();
        if (regExDesc.test(cusName)) {
            $("#txtUnitPrice").focus();
            var cusAddress = $("#txtUnitPrice").val();
            if (regExUnitPrice.test(cusAddress)) {
                $("#txtQtyOnHand").focus();
                var cusTp = $("#txtQtyOnHand").val();
                var resp = regExQtyOnHand.test(cusTp);
                if (resp) {
                    clearAll();
                    return true;
                } else {
                    $("#txtQtyOnHand").focus();
                }
            } else {
                $("#txtUnitPrice").focus();
            }
        } else {
            $("#txtDescription").focus();
        }
    } else {
        $("#txtItemCode").focus();
    }
}

function setButton() {
    let b = formValidItem();
    if (b) {
        $("#btnSaveItem").attr('disabled', false);
    } else {
        $("#btnSaveItem").attr('disabled', true);
    }
}

$('#btnSaveItem').click(function () {
    checkIfValidItem();
});
