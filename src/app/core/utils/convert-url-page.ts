export function urlPage(movie: any): any {
  if (movie && movie['original_title']) {
    return 'movie';
  } else if (movie && movie['original_name']) {
    return 'tv';
  }
}


