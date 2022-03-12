function ItemDTO(code, desc, unitPrice, qtyOnHand) {
    var __itemCode = code;
    var __itemDesc = desc;
    var __itemUnitPrice = unitPrice;
    var __itemQtyOnHand = qtyOnHand;

    this.setItemCode=function (code) {
        __itemCode=code;
    }
    this.setItemDesc=function (desc) {
        __itemDesc=desc;
    }
    this.setItemUnitPrice=function (unitPrice) {
        __itemUnitPrice=unitPrice;
    }
    this.setItemQtyOnHand=function (qtyOnHand) {
        __itemQtyOnHand=qtyOnHand;
    }
    this.getItemCode=function () {
        return __itemCode;
    }
    this.getItemDesc=function () {
        return __itemDesc;
    }
    this.getItemUnitPrice=function () {
        return __itemUnitPrice;
    }
    this.getItemQtyOnHand=function () {
        return __itemQtyOnHand;
    }

}