<template>
  <div class="overlay-layer card-rounded bg-opacity-5 d-flex justify-content-center">
    <div class="spinner-border text-primary text-center" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "kt-loading",
  components: {},
});
</script>
