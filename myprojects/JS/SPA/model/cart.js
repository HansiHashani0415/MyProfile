function Cart(code,qtyForSale,totPrice){
    var __code=code;
    var __qtyForSale =qtyForSale;
    var __totPrice =totPrice;

    this.setCode=function (code){
        __code=code;
    }
    this.setQtyForSale=function (qty){
        __qtyForSale=qty;
    }
    this.setTotPrice=function (price){
        __totPrice=price;
    }

    this.getTotPrice=function (){
        return __totPrice;
    }
    this.getCItemCode=function (){
        return __code;
    }
    this.getQtyForSale = function (){
        return __qtyForSale;
    }

}