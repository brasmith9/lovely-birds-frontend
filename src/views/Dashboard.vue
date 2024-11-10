<template>
  <!--begin::Row-->
  <div class="row g-5 g-xl-8">
    <!--begin::Col-->
    <!--end::Col-->

    <!--begin::Col-->
    <div class="col-xxl-12">
      <Loading v-if="loading" />
      <TablesWidget9 v-else :list="workList" widget-classes="card-xxl-stretch mb-5 mb-xl-8" />
    </div>
    <!--end::Col-->
  </div>
  <!--end::Row-->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";
import TablesWidget9 from "@/components/widgets/tables/Widget9.vue";
import LayoutService from "@/core/services/LayoutService";
import { LS_CONFIG_NAME_KEY } from "@/stores/config";
import Loading from "@/components/kt-datatable/table-partials/Loading.vue";


import { useGenreStore, type Work } from "@/stores/genre";

export default defineComponent({
  name: "main-dashboard",
  components: {
    TablesWidget9,
    Loading
  },
  setup() {
    const genresStore = useGenreStore();

    const workList = computed(() => genresStore.works);
    const loading = computed(() => genresStore.loading);
    onMounted(() => {
      if (!localStorage.getItem(LS_CONFIG_NAME_KEY)) {
        LayoutService.enableToolbar();
      }
    });

    onUnmounted(() => {
      if (!localStorage.getItem(LS_CONFIG_NAME_KEY)) {
        LayoutService.disableToolbar();
      }
    });

    return {
      workList,
      loading
    }
  },
});
</script>
