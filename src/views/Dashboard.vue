<template>
  <!--begin::Row-->
  <div class="row g-5 g-xl-8">
    <!--begin::Col-->
    <!--end::Col-->

    <!--begin::Col-->
    <div class="col-xxl-12">
      <TablesWidget9 widget-classes="card-xxl-stretch mb-5 mb-xl-8" />
    </div>
    <!--end::Col-->
  </div>
  <!--end::Row-->
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "vue";
import MixedWidget5 from "@/components/widgets/mixed/Widget5.vue";
import TablesWidget9 from "@/components/widgets/tables/Widget9.vue";
import ListsWidget5 from "@/components/widgets/lists/Widget5.vue";
import MixedWidget11 from "@/components/widgets/mixed/Widget11.vue";
import ListsWidget4 from "@/components/widgets/lists/Widget4.vue";
import MixedWidget9 from "@/components/widgets/mixed/Widget9.vue";
import LayoutService from "@/core/services/LayoutService";
import { LS_CONFIG_NAME_KEY } from "@/stores/config";

export default defineComponent({
  name: "main-dashboard",
  components: {
    TablesWidget9,
  },
  setup() {
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
  },
});
</script>
