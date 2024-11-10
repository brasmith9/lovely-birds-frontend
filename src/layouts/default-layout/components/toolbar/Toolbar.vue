<template>
  <!--begin::Search form-->
  <div
    class="card rounded-0 bgi-no-repeat bgi-position-x-end bgi-size-cover"
    :style="`
      background-color: #663259;
      background-size: auto 100%;
      background-image: url(${getAssetPath('media/misc/taieri.svg')});
    `"
  >
    <!--begin::body-->
    <div class="card-body container-xxl pt-10 pb-8">
      <!--begin::Title-->
      <div class="d-flex align-items-center">
        <h1 class="fw-semibold me-3 text-white">Search Book</h1>

        <span class="fw-semibold text-white opacity-50">Nice words here</span>
      </div>
      <!--end::Title-->

      <!--begin::Wrapper-->
      <div class="d-flex flex-column">
        <!--begin::Block-->
        <div class="d-lg-flex align-lg-items-center">
          <!--begin::Simple form-->
          <div
            class="rounded d-flex flex-column flex-lg-row align-items-lg-center bg-body p-5 w-xxl-950px h-lg-60px me-lg-10 my-5"
          >
            <!--begin::Row-->
            <div class="row flex-grow-1 mb-5 mb-lg-0">
              <!--begin::Col-->
              <div class="col-lg-4 d-flex align-items-center mb-3 mb-lg-0">
                <KTIcon
                  icon-name="magnifier"
                  icon-class="fs-1 text-gray-500 me-1"
                />

                <!--begin::Input-->
                <input
                  type="text"
                  class="form-control form-control-flush flex-grow-1"
                  name="search"
                  value=""
                  placeholder="Your Search"
                />
                <!--end::Input-->
              </div>
              <!--end::Col-->

              <!--begin::Col-->
              <div class="col-lg-4 d-flex align-items-center mb-5 mb-lg-0">
                <!--begin::Desktop separartor-->
                <div
                  class="bullet bg-secondary d-none d-lg-block h-30px w-2px me-5"
                ></div>
                <!--end::Desktop separartor-->

                <KTIcon
                  icon-name="element-11"
                  icon-class="fs-1 text-gray-500 me-1"
                />

                <!--begin::Select-->
                <select
                  class="form-select border-0 flex-grow-1"
                  v-model="selectedCategory"
                  @change="handleCategoryChange"
                >
                  <option
                    v-if="showDefault"
                    :value="selectedCategory"
                    disabled
                    selected
                  >
                    Category
                  </option>
                  <option
                    v-for="(grouping, index) in categories"
                    :key="index"
                    :value="grouping"
                  >
                    {{ grouping.category }}
                  </option>
                </select>
                <!--end::Select-->
              </div>

              <div class="col-lg-4 d-flex align-items-center mb-5 mb-lg-0">
                <!--begin::Desktop separartor-->
                <div
                  class="bullet bg-secondary d-none d-lg-block h-30px w-2px me-5"
                ></div>
                <!--end::Desktop separartor-->

                <KTIcon
                  icon-name="element-11"
                  icon-class="fs-1 text-gray-500 me-1"
                />

                <!--begin::Select-->
                <select
                  class="form-select border-0 flex-grow-1"
                  v-model="selectedGenre"
                >
                  <option value="Genre" disabled selected>Genre</option>
                  <option
                    v-for="(genre, index) in genres"
                    :key="index"
                    :value="genre"
                  >
                    {{ genre }}
                  </option>
                </select>
                <!--end::Select-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Row-->

            <!--begin::Action-->
            <div class="min-w-150px text-end">
              <button
                @click.prevent="handleSubmit"
                class="btn btn-dark"
                id="kt_advanced_search_button_1"
              >
                Search
              </button>
            </div>
            <!--end::Action-->
          </div>
          <!--end::Simple form-->

          <!--begin::Action-->
          <div class="d-flex align-items-center">
            <a class="fw-semibold link-white fs-5 text-light" href="#"
              >Advanced Search
            </a>
          </div>
          <!--end::Action-->
        </div>
        <!--end::Block-->
      </div>
      <!--end::Wrapper-->
    </div>
    <!--end::body-->
  </div>
  <!--end::Search form-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref } from "vue";
import { toolbarWidthFluid } from "@/layouts/default-layout/config/helper";
import categories from "@/core/data/book-categories";
import { useGenreStore } from "@/stores/genre";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "layout-toolbar",
  components: {},
  setup() {
    const route = useRoute();
    const query = route.query;
    const router = useRouter();
    const genresStore = useGenreStore();
    const selectedCategory = ref();
    const selectedGenre = ref(query.genre as string);
    const genres = ref();
    const showDefault = ref(true);

    onMounted(() => {
      if (selectedGenre.value) {
        genresStore.getGenre(selectedGenre.value).then((resolve) => {});
      }
    });
    const handleCategoryChange = () => {
      showDefault.value = false;
      genres.value = selectedCategory.value.genres;
    };

    const handleSubmit = () => {
        router.push({
          name: "dashboard",
          query: {
            category: selectedCategory.value.category,
            genre: selectedGenre.value,
          },
        });
      genresStore.getGenre(selectedGenre.value).then((resolve) => {
      });
    };

    return {
      toolbarWidthFluid,
      getAssetPath,
      categories,
      genres,
      selectedCategory,
      selectedGenre,
      handleCategoryChange,
      handleSubmit,
      showDefault,
    };
  },
});
</script>
