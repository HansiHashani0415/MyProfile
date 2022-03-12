//  Save Customer ---------------------------------------------



$("#btnCustomerSearch").on("click", function () {
    var searchResult = searchCustomer($("#inputNameNICTp1").val());
    if (!searchResult){
        clearAll();
        alert("Customer doesn't exist..");
    }else{


        $("#addNewCustomerModal2").modal('show');

        $("#txtCustomerID1").val(searchResult.getCusID());
        $("#txtCustomerName1").val(searchResult.getCusName());
        $("#txtCustomerAddress1").val(searchResult.getCusAddress());
        $("#txtTelephone1").val(searchResult.getCusTp());
    }
});

$("#btnDeleteCustomer2").on("click",function () {
    if(!searchCustomer( $("#txtCustomerID1").val())){
        let serchedID =  $("#txtCustomerID1").val();
        clearAll();
        checkIfValid();
    }else {
        deleteCustomer( $("#txtCustomerID1").val());
    }
});

$("#btnUpdateCustomer").on("click",function () {
    if(updateCustomer($("#txtCustomerID1").val(), $("#txtCustomerName1").val(), $("#txtCustomerAddress1").val(), $("#txtTelephone1").val())){
        loadAllCustomers();
        clearAll();
    }
});

$("#btnSaveCustomer").on("click", function () {

    let newCustomer=new CustomerDTO($("#txtCustomerID").val(), $("#txtCustomerName").val(), $("#txtCustomerAddress").val(), $("#txtTelephone").val());
    console.log(newCustomer.getCusID(),newCustomer.getCusName());
    if (!searchCustomer($("#txtCustomerID").val())){
        if (checkIfValid()){
            saveCustomer(newCustomer);
            clearAll();
            loadAllCustomers();
        }
    }
});

const regExCusID = /^C[0-9]{3,4}$/;
const regExCusName = /^[A-z]{5,25}$/;
const regExCusAddress = /^[0-9/A-z. ,]{5,}$/;
const regExCusTP = /^(071|077|078|075|076)[-]?[0-9]{7}$/;

$('#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtTelephone,#txtCustomerID1,#txtCustomerName1,#txtCustomerAddress1,#txtTelephone1').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
});

$('#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtTelephone,#txtCustomerID1,#txtCustomerName1,#txtCustomerAddress1,#txtTelephone1').on('blur', function () {
    formValid();
});

//-------------------------focusing events
$("#txtCustomerID,#txtCustomerID1").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }

    if (eventOb.key == "Control") {
        var typedCustomerID = $("#txtCustomerID").val();
        var srcCustomer = searchCustomer(typedCustomerID);
        // $("#txtCusID").val(srcCustomer.getCustomerID());
        // $("#txtCusName").val(srcCustomer.getCustomerName());
        // $("#txtCusAddress").val(srcCustomer.getCustomerAddress());
        // $("#txtCusTP").val(srcCustomer.getCustomerSalary());
    }
});

$("#txtCustomerName,#txtCustomerName1").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtCustomerAddress,#txtCustomerAddress1").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtTelephone,#txtTelephone1").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});
// ----------------------focusing events end
//$("#btnSaveCustomer").attr('disabled', true);

function clearAll() {
    $('#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtTelephone,#txtCustomerID1,#txtCustomerName1,#txtCustomerAddress1,#txtTelephone1').val("");
    $('#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtTelephone,#txtCustomerID1,#txtCustomerName1,#txtCustomerAddress1,#txtTelephone1').css('border', '2px solid #ced4da');
    $('#txtCustomerID,#txtCustomerID1').focus();
    //$("#btnSaveCustomer").attr('disabled', true);
    loadAllCustomers();
    $("#lblCusID,#lblCusName,#lblCusAddress,#lblCusTp").text("");
}

function formValid() {
    var cusID = $("#txtCustomerID").val();
    $("#txtCustomerID").css('border', '2px solid green');
    $("#lblCusID").text("");
    if (regExCusID.test(cusID)) {
        var cusName = $("#txtCustomerName").val();
        if (regExCusName.test(cusName)) {
            $("#txtCustomerName").css('border', '2px solid green');
            $("#lblCusName").text("");
            var cusAddress = $("#txtCustomerAddress").val();
            if (regExCusAddress.test(cusAddress)) {
                var cusTP = $("#txtTelephone").val();
                var resp = regExCusTP.test(cusTP);
                $("#txtCustomerAddress").css('border', '2px solid green');
                $("#lblCusAddress").text("");
                if (resp) {
                    $("#txtTelephone").css('border', '2px solid green');
                    $("#lblCusTp").text("");
                    return true;
                } else {
                    $("#txtTelephone").css('border', '2px solid red');
                    $("#lblCusTp").text("Cus Telephone is a required field : Pattern 07********");
                    return false;
                }
            } else {
                $("#txtCustomerAddress").css('border', '2px solid red');
                $("#lblCusAddress").text("Cus Address is a required field : Mimum 5");
                return false;
            }
        } else {
            $("#txtCustomerName").css('border', '2px solid red');
            $("#lblCusName").text("Cus Name is a required field : Minimum 5, Max 25, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtCustomerID").css('border', '2px solid red');
        $("#lblCusID").text("Cus ID is a required field : Pattern C001");
        return false;
    }
}

function checkIfValid() {

    var cusID = $("#txtCustomerID").val();
    if (regExCusID.test(cusID)) {
        $("#txtCustomerName").focus();
        var cusName = $("#txtCustomerName").val();
        if (regExCusName.test(cusName)) {
            $("#txtCustomerAddress").focus();
            var cusAddress = $("#txtCustomerAddress").val();
            if (regExCusAddress.test(cusAddress)) {
                $("#txtTelephone").focus();
                var cusTp = $("#txtTelephone").val();
                var resp = regExCusTP.test(cusTp);
                if (resp) {
                    clearAll();
                    return true;
                } else {
                    $("#txtTelephone").focus();
                }
            } else {
                $("#txtCustomerAddress").focus();
            }
        } else {
            $("#txtCustomerName").focus();
        }
    } else {
        $("#txtCustomerID").focus();
    }
}

function setButton() {
    let b = formValid();
    if (b) {
        $("#btnSaveCustomer").attr('disabled', false);
    } else {
        //$("#btnSaveCustomer").attr('disabled', true);
    }
}

$('#btnSaveCustomer').click(function () {
    checkIfValid();
});