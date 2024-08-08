<template>
  <v-card color="rgb(249, 246, 224)" class="pay-card pl-3 my-5 mt-0">
    <v-row>
      <v-col cols="3">
        <img src="" alt="profileImage" height="50" width="50" />
        <div>GroceryName</div>
      </v-col>
      <v-col cols="5">
        <div>ID Order : 555xxxxx</div>
        <div>Order from : ชื่อร้าน Wholesale</div>
        <div>Status Order : ชำระแล้ว (Paid)</div>
      </v-col>
      <v-col cols="4">
        <div>99,999.99 บาท</div>
        <div>เวลา : XX.XX </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

export default{
  name: 'PayCard',

}
</script>

<style>
.pay-card{
  font-size: 12px;
}

</style>