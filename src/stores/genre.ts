import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";

interface Genre {
  key: string;
  name: string;
  subject_type: string;
  work_count: number;
  works: Work[];
}

interface Work {
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

interface Author {
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
  openli
}

export const useGenreStore = defineStore("genre", () => {
  const errors = ref({});
  const genres = ref<Genre[]>([]);

  function setGenres(subject: Genre[]) {
    genres.value = subject;
    errors.value = {};
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function purgeGenre() {
    genres.value = [] ;
    errors.value = [];
  }

  function getGenre(subject: string) {
    return ApiService.get(`/subjects/love.json`)
      .then((data) => {
        setGenres(data.data);
      })
      .catch((response) => {
        console.log(response);
        setError(response.data.errors);
      });
  }


  return {
    errors,
    genres,
    getGenre,
  };
});
