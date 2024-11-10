import { computed, ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import { getUrlEncodedSlug } from "@/core/helpers/helpers";

interface Genre {
  key: string;
  name: string;
  subject_type: string;
  work_count: number;
  works: Work[];
}

export interface Work {
  key: string;
  title: string;
  edition_count: number;
  cover_id?: number;
  cover_edition_key: string;
  subject: string[];
  ia_collection: string[];
  lendinglibrary: boolean;
  printdisabled: boolean;
  lending_edition?: string;
  lending_identifier?: string;
  authors: Author[];
  first_publish_year: number;
  ia?: string;
  public_scan: boolean;
  has_fulltext: boolean;
  availability: Availability;
}

export interface Author {
  key: string;
  name: string;
}

interface Availability {
  status: string;
  available_to_browse: boolean;
  available_to_borrow: boolean;
  available_to_waitlist: boolean;
  is_printdisabled: boolean;
  is_readable: boolean;
  is_lendable: boolean;
  is_previewable: boolean;
  identifier?: string;
  isbn?: string;
  oclc?: string | null;
  openlibrary_work: string;
  openli;
}

export const useGenreStore = defineStore("genre", () => {
  const errors = ref({});
  const loading = ref(false);
  const genres = ref<Genre>({} as Genre);

  function setGenres(subject: Genre) {
    genres.value = { ...subject };

    console.log("genres", genres.value);
    errors.value = {};
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function purgeGenre() {
    genres.value = {} as Genre;
    errors.value = [];
  }

  function getGenre(subject: string) {
    loading.value = true;
    ApiService.setHeader();
    return ApiService.get(
      `/subjects/${getUrlEncodedSlug(subject).toLowerCase()}.json`,
    )
      .then(({ data }) => {
        setGenres(data);
        loading.value = false;
      })
      .catch((response) => {
        setError(response);
        loading.value = false;
      });
  }

  const works = computed(() => genres.value.works || []);
  return {
    errors,
    genres,
    works,
    getGenre,
    loading,
  };
});
