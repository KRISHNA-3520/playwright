class APIUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async getToken() {
    //Login API
    const loginRequest = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayload,
      }
    );
    const loginResponseJson = await loginRequest.json();
    const token = loginResponseJson.token;
    console.log(token);
    return token;
  }

  async createOrder(orderPayload) {
    let response = {};
    response.token = await this.getToken();
    //call create order API
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          Authorization: response.token,
          "Content-Type": "application/json",
        },
      }
    );
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    const orderID = orderResponseJson.orders[0];
    response.orderID = orderID;
    return response;
  }
}

module.exports = { APIUtils };
