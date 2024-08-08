


export async function exampleCall({ commit }, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.post(
        `http://localhost:3000`
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
