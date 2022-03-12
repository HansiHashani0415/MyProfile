function CustomerDTO(id, name, address, tp) {
    var __cusID = id;
    var __cusName = name;
    var __cusAddress = address;
    var __cusTp = tp;

    this.setCusID=function (id) {
        __cusID=id;
    }
    this.setCusName=function (name) {
        __cusName=name;
    }
    this.setCusAddress=function (address) {
        __cusAddress=address;
    }
    this.setCusTp=function (tp) {
        __cusTp=tp;
    }
    this.getCusID=function () {
         return __cusID;
    }
    this.getCusName=function () {
        return __cusName;
    }
    this.getCusAddress=function () {
        return __cusAddress;
    }
    this.getCusTp=function () {
        return __cusTp;
    }

}