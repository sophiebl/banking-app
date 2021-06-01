const axios = require("axios");

// Rebuilds auth headers from Auth token stored in browser's localstorage
function authHeaders() {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${localStorage.getItem("token")}` };
}

module.exports = {
  async login(identifier, password) {
    const res = await axios.post(
      `https://qontoz.challenge.cloud.escape.tech/auth/local`,
      { identifier, password }
    );
    localStorage.setItem("token", res.data.jwt);
    localStorage.setItem("user", global.JSON.stringify(res.data.user));
    return res.data.user;
  },

  getUser() {
    const str = localStorage.getItem("user");
    let user = {};
    try {
      user = JSON.parse(str);
    } catch (err) {
      localStorage.removeItem("user");
    }
    return user;
  },

  async fetchMe(options = {}) {
    const userId = this.getUser().id;
    if (userId) {
      return await axios
        .get(`https://qontoz.challenge.cloud.escape.tech/users/me`, {
          headers: authHeaders(),
          ...(options || {}),
        })
        .then((res) => res.data);
    }
    return null;
  },

  // function that checks if a user is actually logged in
  checkLogin() {
    return localStorage.getItem("token") != null;
  },

  // Logout current logged in user
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getOneTransaction(id, options) {
    return axios
      .get(`https://qontoz.challenge.cloud.escape.tech/transactions/${id}`, {
        headers: authHeaders(),
        ...(options || {}),
      })
      .then((res) => res.data);
  },

  getTransactions(options) {
    return axios
      .get(`https://qontoz.challenge.cloud.escape.tech/transactions`, {
        headers: authHeaders(),
        ...(options || {}),
      })
      .then((res) => res.data);
  },

  createTransaction(data, options) {
    return axios
      .post(`https://qontoz.challenge.cloud.escape.tech/transactions`, data, {
        headers: authHeaders(),
        ...(options || {}),
      })
      .then((res) => res.data);
  },

  editTransaction(id, data, options) {
    return axios
      .put(
        `https://qontoz.challenge.cloud.escape.tech/transactions/${id}`,
        data,
        {
          headers: authHeaders(),
          ...(options || {}),
        }
      )
      .then((res) => res.data);
  },

  deleteTransaction(id, options) {
    return axios
      .delete(`https://qontoz.challenge.cloud.escape.tech/transactions/${id}`, {
        headers: authHeaders(),
        ...(options || {}),
      })
      .then((res) => res.data);
  },

  countTransactions(options) {
    return axios
      .get(`https://qontoz.challenge.cloud.escape.tech/transactions/count`, {
        headers: authHeaders(),
        ...(options || {}),
      })
      .then((res) => res.data);
  },
};
