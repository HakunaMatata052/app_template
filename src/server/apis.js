import Axios from "./axios";

class Api extends Axios {
  async getUserInfo(params = {}) {
    return await this.axios("POST", "user/getUserInfo", params);
  }  
  

}

export default new Api();