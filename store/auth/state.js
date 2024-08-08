export default function() {
  return {
    key: localStorage.getItem("key") || "",
    user: localStorage.getItem("username") || "",
    role:localStorage.getItem("role") || "",
    website: null,
    verify: false,
    tfa_credential: null,
    tfa_data: null,
    hash: localStorage.getItem("hash") || null, //token
    tokenMember: localStorage.getItem("tokenMember") || null,


 
  };
}
