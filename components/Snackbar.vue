<!-- components/Snackbar.vue -->
<template>
  <div v-if="visible" :class="['snackbar', snackbarColor]" @click="hideSnackbar">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'Snackbar',
  props: {
    message: {type: String, required: true},
    color: {type: String, default: "red"},
  },
  data() {
    return {
      visible: true,
      snackbarColor: `snackbar-${props.color}`,
    };
  },
  computed: {
    snackbarColor() {
      return `snackbar-${this.color}`;
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.visible = false;
        }, 3000); // Delay of 3 seconds
      }
    }
  },
  methods: {
    hideSnackbar() {
      this.visible = false;
    }

  }
};
</script>

<style scoped>
.snackbar {
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  padding: 16px;
  border-radius: 4px;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.snackbar-green {
  background-color: green;
}

.snackbar-red {
  background-color: red;
}
</style>
