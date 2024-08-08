export function set_profile(state, payload) {
  state.profile = payload
  state.isClone = payload.isClone
  state.groups = payload.groups
  localStorage.setItem('profile', JSON.stringify(payload))
}


export function clear_account(state) {
  state.profile = null

}

