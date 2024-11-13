<template>
  <!--begin::Tables Widget 9-->
  <div class="card" :class="widgetClasses">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1"
          >Search Results ({{ list.length }})</span
        >

        <span class="text-muted mt-1 fw-semibold fs-7"
          >Over 5,000 Related Works</span
        >
      </h3>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <div class="table-responsive">
        <!--begin::Table-->
        <table
          class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4"
        >
          <!--begin::Table head-->
          <thead>
            <tr class="fw-bold text-muted">
              <th class="min-w-150px">Books</th>
              <th class="min-w-140px">Title</th>
              <th class="min-w-200px">Action</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-if="list.length > 0">
              <template v-for="(item, index) in list" :key="index">
                <tr>
                  <td>
                    <div class="d-flex align-items-center">
                      <div class="symbol symbol-45px me-5"></div>
                      <div class="d-flex justify-content-start flex-column">
                        <a
                          href="#"
                          class="text-gray-900 fw-bold text-hover-primary fs-6"
                          >{{ item.title }}</a
                        >

                        <span
                          class="text-muted fw-semibold text-muted d-block fs-7"
                          >{{ getAllAuthors(item.authors) }}</span
                        >
                      </div>
                    </div>
                  </td>

                  <td>
                    <a
                      href="#"
                      class="text-gray-900 fw-bold text-hover-primary d-block fs-6 mx-2"
                      >{{ item.title }}</a
                    >
                  </td>

                  <td>
                    <a
                      class="btn btn-sm btn-light btn-active-light-primary"
                      data-kt-menu-trigger="click"
                      data-kt-menu-placement="bottom-end"
                      data-kt-menu-flip="top-end"
                      >Actions
                      <KTIcon icon-name="down" icon-class="fs-5 m-0" />
                    </a>
                    <!--begin::Menu-->
                    <div
                      class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4"
                      data-kt-menu="true"
                    >
                      <!--begin::Menu item-->
                      <div
                        class="menu-item px-3"
                        v-if="item?.availability?.is_readable"
                      >
                        <a
                          :href="`https://openlibrary.org/borrow/ia/${item?.ia}`"
                          target="_blank"
                          class="menu-link px-3"
                          >Read</a
                        >
                      </div>
                      <div class="menu-item px-3" v-else>
                        <a
                          :href="`https://openlibrary.org/${item.key}`"
                          target="_blank"
                          class="menu-link px-3"
                          >Preview</a
                        >
                      </div>
                      <div class="menu-item px-3">
                        <a
                          :href="`https://openlibrary.org/${item.key}`"
                          target="_blank"
                          class="menu-link px-3"
                          >Bookmark</a
                        >
                      </div>
                      <div class="menu-item px-3">
                        <router-link
                          to="/apps/customers/customer-details"
                          class="menu-link px-3"
                          >Assign
                        </router-link>
                      </div>
                      <!--end::Menu item-->
                      <!--begin::Menu item-->
                      <div class="menu-item px-3">
                        <a
                          @click.prevent="(e) => console.log(e)"
                          class="menu-link px-3"
                          >Bookmark</a
                        >
                      </div>
                      <!--end::Menu item-->
                    </div>
                    <!--end::Menu-->
                  </td>
                </tr>
              </template>
            </template>

            <template v-else>
              <div class="d-flex justify-content-center">
                <h3>No Data To Display</h3>
              </div>
            </template>
          </tbody>
          <!--end::Table body-->
        </table>
        <!--end::Table-->
      </div>
      <!--end::Table container-->
    </div>
    <!--begin::Body-->
  </div>
  <!--end::Tables Widget 9-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import type { Work } from "@/stores/genre";
import { getAllAuthors, getAllGenres } from "@/core/helpers/helpers";

export default defineComponent({
  name: "kt-widget-9",
  methods: { getAllGenres, getAllAuthors },
  components: {},
  props: {
    widgetClasses: String,
    list: {
      type: Array<Work>,
      default: () => [] as Work[],
    },
  },
  setup() {
    const checkedRows = ref<Array<number>>([]);

    return {
      checkedRows,
      getAssetPath,
    };
  },
});
</script>
