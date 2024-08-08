export function set_login(state, payload) {


  state.key = payload.token;
  state.user = payload.username;
  state.role = payload.role
  localStorage.setItem("key", payload.token);
  localStorage.setItem("username", payload.username);
  localStorage.setItem("user", payload.username);
  localStorage.setItem("role", payload.role);
}

export function set_website(state, payload) {
  state.website = payload;
}

export function setTFAdata(state, payload) {
  state.tfa_data = payload;
}


export function setVerify(state, payload) {
  state.verify = payload;
}
export function serTfa_credential(state, payload) {
  state.tfa_credential = payload;
}
export function set_data_secret(state, payload) {
  state.hash = payload.hash;
  state.tokenMember = payload.token;
  localStorage.setItem("hash", payload.hash);
  localStorage.setItem("tokenMember", payload.token);
}