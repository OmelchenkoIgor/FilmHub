export function showFooter(page: string): boolean {
  return page.startsWith('/movie/') || page.startsWith('/tv/') || page.startsWith('/bookmark');
}
