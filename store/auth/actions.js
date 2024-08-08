import dayjs from 'dayjs';
export function login(context, { username, password }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `${process.env.ALL_SUPPORT_V2}/auth/Login`,
        {
          username,
          password
        }
      );
      console.log(response.data)
      context.commit("set_login", response.data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function twofactor(context, input) {
  return new Promise(async (resolve, reject) => {
    console.log(process.env.VUE_APP_PATH_MICROSERVICE, "env");
    try {
      let { data } = await this.$axios.post(
        `${process.env.ALL_SUPPORT_V2}/auth/two-factor`,
        // `${process.env.ALL_SUPPORT_V2}/api/Auth/two-factor`,
        input
      );
      await context.commit("set_login", data);
      resolve(data);
      // return;
    } catch (error) {
      reject(error);
    }
  });
}

export function changePasswordMember(context, { old_password, new_password ,retype_new_password}) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `${process.env.ALL_SUPPORT_V2}/auth/ChangePassword`,
        {
          old_password,
          new_password,
          retype_new_password
        }
      );
      console.log(response.data)

      resolve(response);
    } catch (error) {
      
      reject(error);
    }
  });
}

