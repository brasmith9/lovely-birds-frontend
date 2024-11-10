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
        <div>
          <button
            tabindex="3"
            @click.prevent="handleRandomize"
            id="kt_sign_in_submit"
            class="btn btn-lg btn-success w-100 mb-5"
            :data-kt-indicator="randomizeIndicatorActive ? 'on' : 'off'"
            :disabled="randomizeIndicatorActive"
          >
            <span class="indicator-label"> {{ !selectedGenre ? 'Randomize' : 'Randomize Again' }} </span>

            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
        <!--begin::Block-->
        <div v-if="selectedGenre" class="d-lg-flex align-lg-items-center">
          <!--begin::Simple form-->
          <div
            class="rounded d-flex flex-column flex-lg-row align-items-lg-center bg-body p-5 w-xxl-950px h-lg-60px me-lg-10 my-5"
          >
            <!--begin::Row-->
            <div class="row flex-grow-1 mb-5 mb-lg-0">
              <div class="col-lg-12 d-flex align-items-center mb-5 mb-lg-0">
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
                <input
                  class="form-select border-0 flex-grow-1 w-100"
                  v-model="selectedGenre"
                />
                <!--end::Select-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Row-->

            <!--begin::Action-->
            <div class="min-w-150px w-100 text-end">
              <button
                @click.prevent="handleSubmit"
                class="btn btn-dark"
                id="kt_advanced_search_button_1"
                :data-kt-indicator="randomizeIndicatorActive ? 'on' : 'off'"
              >
                Search
              </button>
            </div>
            <!--end::Action-->
          </div>
          <!--end::Simple form-->
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

    const randomizeIndicatorActive = ref(false);

    onMounted(() => {
      if (selectedGenre.value) {
        genresStore.getGenre(selectedGenre.value).then((resolve) => {});
      }
    });
    const handleCategoryChange = () => {
      showDefault.value = false;
      genres.value = selectedCategory.value.genres;
    };

    const handleRandomize = () => {
      randomizeIndicatorActive.value = true;
      setTimeout(() => {
        const allGenres = categories.map((category) => category.genres).flat();
        const randomGenre =
          allGenres[Math.floor(Math.random() * allGenres.length)];
        selectedGenre.value = randomGenre;
        router.push({
          name: "dashboard",
          query: {
            genre: selectedGenre.value,
          },
        });
        randomizeIndicatorActive.value = false;
      }, 2000);
    };
    const handleSubmit = () => {
      genresStore.getGenre(selectedGenre.value).then((resolve) => {});
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
      handleRandomize,
      showDefault,
      randomizeIndicatorActive,
    };
  },
});
</script>
