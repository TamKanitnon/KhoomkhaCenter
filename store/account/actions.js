export function CreatePreset(
  { commit },
  params = {
    id: undefined,
    detail: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `http://localhost:3000}`,
        {
          palette: params.detail,
        }
      )
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}
