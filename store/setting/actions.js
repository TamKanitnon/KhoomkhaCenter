
export async function deleteUserData(context,userData) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.delete(
        `${process.env.ALL_SUPPORT_V2}/auth/DeleteUser/${userData.id}`
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export async function saveUserData(context,userData) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.patch(
        `${process.env.ALL_SUPPORT_V2}/auth/UpdateUser`,userData
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export async function createUserSupport(context,userData) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.post(
        `${process.env.ALL_SUPPORT_V2}/auth/CreateUser`,userData
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export async function getSupportUser(context,params) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `${process.env.ALL_SUPPORT_V2}/support/UserSupport`,{params:params}
      );
      // const test = data.data.filter(x=> {return  !x.username.startsWith("mt") }  )
      // data.data = test
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}


export async function getStaffLogs(context, param) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `${process.env.ALL_SUPPORT_V2}/auth/Stafflog`, {params:param}
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
