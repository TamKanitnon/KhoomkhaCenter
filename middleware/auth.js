export default function({ store, redirect }) {
  if (!store.state.auth.key || store.state.auth.key == "undefined") {
    localStorage.clear();
    sessionStorage.clear();
    return redirect("/login");
  }
}
