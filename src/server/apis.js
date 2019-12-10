import Axios from "./axios";

class Api extends Axios {
  async getUserInfo(params = {}) {
    return await this.axios("GET", "user", params);
  }
  async login(params = {}) {
    return await this.axios("POST", "login", params);
  }
  async upload(params = {}) {
    return await this.axios("POST", "upload/image", params);
  }
  async logout(params = {}) {
    return await this.axios("GET", "logout", params);
  }
  async userEdit(params = {}) {
    return await this.axios("POST", "user/edit", params);
  }
  async dryingList(params = {}) {
    return await this.axios("GET", "drying/list", params);
  }
  async dryingAdd(params = {}) {
    return await this.axios("POST", "drying/dryingadd", params);
  }
  async index(params = {}) {
    return await this.axios("GET", "index", params,{LOADING:true});
  }
  async productDetail(params = {}) {
    return await this.axios("GET", "product/detail/"+params,{},{LOADING:true});
  }
  async addCart(params = {}) {
    return await this.axios("POST", "cart/add", params);
  }
  async addressList(params = {}) {
    return await this.axios("GET", "address/list", params);
  }
  async orderConfirm(params = {}) {
    return await this.axios("POST", "order/confirm", params);
  }
  async cartCount(params = {}) {
    return await this.axios("GET", "cart/count", params);
  }
  async cartList(params = {}) {
    return await this.axios("GET", "cart/list", params);
  }
  async cartNum(params = {}) {
    return await this.axios("POST", "cart/num", params);
  }
  async orderComputed(params = {}) {
    return await this.axios("POST", "order/computed/"+ params);
  }
  async cartDel(params = {}) {
    return await this.axios("POST", "cart/del", params);
  }
  async orderList(params = {}) {
    return await this.axios("POST", "order/list", params);
  }
  async productHot(params = {}) {
    return await this.axios("GET", "product/hot", params);
  }
  async search(params = {}) {
    return await this.axios("GET", "products", params,{LOADING:true});
  }
  async category(params = {}) {
    return await this.axios("GET", "category", params);
  }
  async messageList(params = {}) {
    return await this.axios("GET", "message/list", params);
  }
  async messageEdit(params = {}) {
    return await this.axios("GET", "message/edit", params,{LOADING:true});
  }
  async messageDel(params = {}) {
    return await this.axios("GET", "message/del", params);
  }
  async userBank(params = {}) {
    return await this.axios("GET", "user/userbank", params,{LOADING:true});
  }  
  async BankDel(params = {}) {
    return await this.axios("POST", "user/bank_del", params,{LOADING:true});
  }
  
}

export default new Api();