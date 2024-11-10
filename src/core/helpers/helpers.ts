import type { Author } from "@/stores/genre";

export const getAllAuthors = (authors: Author[]) => {
  // return only two authors + others if count is more than 2
  if (authors.length > 2) {
    const remainingAuthors = authors.length - 2;
    const pluralize = remainingAuthors > 1 ? "others" : "other";
    return `${authors[0].name}, ${authors[1].name} +${remainingAuthors} ${pluralize}`;
  }
  return authors.map((author) => author.name).join(", ");
}

export const getAllGenres = (genres: String[]) => {
  // return only two genres + others if count is more than 2
  if (genres.length > 2) {
    const remainingAuthors = genres.length - 2;
    const pluralize = remainingAuthors > 1 ? "others" : "other";
    return `${genres[0]}, ${genres[1]} +${remainingAuthors} ${pluralize}`;
  }
  return genres.map((author) => author).join(", ");
}

export const getUrlEncodedSlug = (searchTerm: String) => {
  const words = searchTerm.split(" ");
  return words.map((word) => word).join("+");

}