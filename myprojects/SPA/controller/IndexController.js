// hide contents except Dashboard ---------------------------

$("#dashboard").css("display","block");
$("#manageCustomer").css("display","none");
$("#manageStore").css("display","none");
$("#placeOrder").css("display","none");

$("#linkToDashboard").css("fontWeight","bold");
$("#linkToDashboard").css("cursor","pointer");
$("#linkToManageCustomer").css("cursor","pointer");
$("#linkToManageItem").css("cursor","pointer");
$("#linkToPlaceOrder").css("cursor","pointer");

$("#linkToDashboard").on("click", function () {
    $("#dashboard").css("display","block");
    $("#manageCustomer").css("display","none");
    $("#manageStore").css("display","none");
    $("#placeOrder").css("display","none");
    $("#orderDetail").css("display","none");

    $("#linkToDashboard").css("fontWeight","bold");
    $("#linkToManageCustomer").css("fontWeight","normal");
    $("#linkToManageItem").css("fontWeight","normal");
    $("#linkToPlaceOrder").css("fontWeight","normal");
    $("#linkToOrderDetails").css("fontWeight","normal");
});

$("#linkToManageCustomer").on("click", function () {

    loadAllCustomers();

    $("#manageCustomer").css("display","block");
    $("#dashboard").css("display","none");
    $("#manageStore").css("display","none");
    $("#placeOrder").css("display","none");
    $("#orderDetail").css("display","none");

    $("#linkToManageCustomer").css("fontWeight","bold");
    $("#linkToManageItem").css("fontWeight","normal");
    $("#linkToPlaceOrder").css("fontWeight","normal");
    $("#linkToOrderDetails").css("fontWeight","normal");
    $("#linkToDashboard").css("fontWeight","normal");
});

$("#linkToManageItem").on("click", function () {
    $("#manageStore").css("display","block");
    $("#manageCustomer").css("display","none");
    $("#dashboard").css("display","none");
    $("#placeOrder").css("display","none");
    $("#orderDetail").css("display","none");

    $("#linkToManageItem").css("fontWeight","bold");
    $("#linkToManageCustomer").css("fontWeight","normal");
    $("#linkToPlaceOrder").css("fontWeight","normal");
    $("#linkToOrderDetails").css("fontWeight","normal");
    $("#linkToDashboard").css("fontWeight","normal");
});

$("#linkToPlaceOrder").on("click", function () {

    loadAllItemIDs();

    $("#placeOrder").css("display","block");
    $("#manageStore").css("display","none");
    $("#manageCustomer").css("display","none");
    $("#dashboard").css("display","none");
    $("#orderDetail").css("display","none");

    $("#linkToPlaceOrder").css("fontWeight","bold");
    $("#linkToManageItem").css("fontWeight","normal");
    $("#linkToManageCustomer").css("fontWeight","normal");
    $("#linkToOrderDetails").css("fontWeight","normal");
    $("#linkToDashboard").css("fontWeight","normal");
});

$("#btnLinkToManageCustomer").on("click", function () {

    loadAllCustomers();

    $("#manageCustomer").css("display","block");
    $("#dashboard").css("display","none");
    $("#manageStore").css("display","none");
    $("#placeOrder").css("display","none");
    $("#orderDetail").css("display","none");

    $("#linkToManageCustomer").css("fontWeight","bold");
    $("#linkToManageItem").css("fontWeight","normal");
    $("#linkToPlaceOrder").css("fontWeight","normal");
    $("#linkToOrderDetails").css("fontWeight","normal");
    $("#linkToDashboard").css("fontWeight","normal");
});

$("#btnLinkToManageStore").on("click", function () {
    $("#manageStore").css("display","block");
    $("#manageCustomer").css("display","none");
    $("#dashboard").css("display","none");
    $("#placeOrder").css("display","none");
    $("#orderDetail").css("display","none");

    $("#linkToManageItem").css("fontWeight","bold");
    $("#linkToManageCustomer").css("fontWeight","normal");
    $("#linkToPlaceOrder").css("fontWeight","normal");
    $("#linkToOrderDetails").css("fontWeight","normal");
    $("#linkToDashboard").css("fontWeight","normal");
});

$("#btnLinkToPlaceOrder").on("click", function () {
    loadAllItemIDs();

    $("#placeOrder").css("display","block");
    $("#manageStore").css("display","none");
    $("#manageCustomer").css("display","none");
    $("#dashboard").css("display","none");
    $("#orderDetail").css("display","none");

    $("#linkToPlaceOrder").css("fontWeight","bold");
    $("#linkToManageItem").css("fontWeight","normal");
    $("#linkToManageCustomer").css("fontWeight","normal");
    $("#linkToOrderDetails").css("fontWeight","normal");
    $("#linkToDashboard").css("fontWeight","normal");
});