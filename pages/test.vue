<template>
  <div>
    <h3 class="mt-4">
      ติดต่อ หรือผู้ดูแลระบบ เพื่อทำการเปิดใช้งาน permission ของแต่ละเมนู
    </h3>

    <div>
      <button @click.prevent="logout">LOGOUT</button>
    </div>
  </div>


</template>

<script>
export default {


  
  layout: "session",

  methods: {
    logout() {
      this.$router.push("/login");
    }
  }
};
</script>

<style></style>
