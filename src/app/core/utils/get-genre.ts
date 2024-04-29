export function getGenre(genres: any) {
  return genres.map((genre: any) => genre.name).join(', ')
}
