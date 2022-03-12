
var customerDB=new Array();
var itemDB=new Array();
var orderDB = new Array();
var cartDB = new Array();

function addCart(cart){
    cartDB.push(cart);
}

function updateCustomer(id, name, address, tp) {
    for (let i = 0; i < customerDB.length; i++) {
        if(customerDB[i].getCusID()===id){
            customerDB[i].setCusName(name);
            customerDB[i].setCusAddress(address);
            customerDB[i].setCusTp(tp);
            return true;
        }
    }
    return false;
}

function updateItem(code, desc, unitPrice, qtyOnHand) {
    for (let i = 0; i < itemDB.length; i++) {
        if(itemDB[i].getItemCode()===code){
            itemDB[i].setItemDesc(desc);
            itemDB[i].setItemUnitPrice(unitPrice);
            itemDB[i].setItemQtyOnHand(qtyOnHand);
            return true;
        }
    }
    return false;
}

function deleteCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if(customerDB[i].getCusID() === id){
            customerDB.splice(i,1);
            $("#customerDetailsTable").empty();
            loadAllCustomers();
            clearAll();
        }
    }
    return false;
}
function deleteItem(code) {
    for (let i = 0; i < itemDB.length; i++) {
        if(itemDB[i].getItemCode() === code){
            itemDB.splice(i,1);
            $("#itemDetailsTable").empty();
            loadAllItems();
            clearAllItems();
        }
    }
    return false;
}
function saveCustomer(customer) {
    customerDB.push(customer);

    $("#customerDetailsTable>tr").on("click", function () {

        let id = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let address = $(this).children(":eq(2)").text();
        let tp = $(this).children(":eq(3)").text();
        console.log(id, name, address,tp);

        $("#addNewCustomerModal2").modal('show');

        $("#txtCustomerID1").val(id);
        $("#txtCustomerName1").val(name);
        $("#txtCustomerAddress1").val(address);
        $("#txtTelephone1").val(tp);
    });

}

function saveItem(item) {
    itemDB.push(item);

    $("#itemDetailsTable>tr").on("click", function () {

        let code = $(this).children(":eq(0)").text();
        let desc = $(this).children(":eq(1)").text();
        let unitPrice = $(this).children(":eq(2)").text();
        let qtyOnHand = $(this).children(":eq(3)").text();
        console.log(code,desc,unitPrice,qtyOnHand);

        $("#modelItem").modal('show');

        $("#txtItemCode1").val(code);
        $("#txtDescription1").val(desc);
        $("#txtUnitPrice1").val(unitPrice);
        $("#txtQtyOnHand1").val(qtyOnHand);
    });

}

function loadAllCustomers() {
    $("#customerDetailsTable").empty();
    for (var i of customerDB) {
        let customerRow = `<tr><td>${i.getCusID()}</td><td>${i.getCusName()}</td><td>${i.getCusAddress()}</td><td>${i.getCusTp()}</td></tr>`;
        console.log(customerRow)
        $("#customerDetailsTable").append(customerRow);
    }
}

function loadAllItems() {
    $("#itemDetailsTable").empty();
    for (var i of itemDB) {
        let itemRow = `<tr><td>${i.getItemCode()}</td><td>${i.getItemDesc()}</td><td>${i.getItemUnitPrice()}</td><td>${i.getItemQtyOnHand()}</td></tr>`;
        console.log(itemRow)
        $("#itemDetailsTable").append(itemRow);
    }
}

function searchCustomer(id) {
    for (let i = 0; i<customerDB.length;i++){
        if (customerDB[i].getCusID()===id){
            return customerDB[i];
        }
    }
    return false;
}

function searchItem(code) {
    for (let i = 0; i<itemDB.length;i++){
        if (itemDB[i].getItemCode()===code){
            return itemDB[i];
        }
    }
    return false;
}
function loadAllItemIDs(){
    $("#inputItem").empty();
    $("#inputItem").append(`<option value="" disabled selected hidden>Select ID</option>`);
    for (let i = 0; i < itemDB.length; i++) {
        let code= `<option value="${itemDB[i].getItemCode()}">${itemDB[i].getItemCode()}</option>`;
        $("#inputItem").append(code);
    }
}

function loadItemDetails(id){
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getItemCode() === id) {
            $("#txtItemCodeInOrder").val(itemDB[i].getItemCode());
            $("#txtDescInOrder").val(itemDB[i].getItemDesc());
            $("#txtUnitPriceInOrder").val(itemDB[i].getItemUnitPrice());
            $("#txtQtyOnHandInOrder").val(itemDB[i].getItemQtyOnHand());
        }
    }
}