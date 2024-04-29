import {newParams} from '../const/paramsFilmHub';

function getParamsFilmHub() {
  const paramsFilmHubString: string | null = localStorage.getItem('paramsFilmHub');
  return paramsFilmHubString ? JSON.parse(paramsFilmHubString) : newParams;
}

function getTypeArray(type: string, paramsFilmHub: any): any[] {
  switch (type) {
    case 'movie':
      return paramsFilmHub.movies;
    case 'tv':
      return paramsFilmHub.tv;
    case 'revised':
      return paramsFilmHub.revised;
    case 'favorite':
      return paramsFilmHub.favorite;
    default:
      throw new Error('Invalid type');
  }
}

export function checking(movieId: number, type: string): boolean {
  const paramsFilmHub = getParamsFilmHub();
  const targetArray: any[] = getTypeArray(type, paramsFilmHub);

  if (type === 'revised' || type === 'favorite') {
    return targetArray.some(item => Object.values(item).includes(movieId));
  }

  return targetArray.includes(movieId);
}

export function moviesByType(type: string): number[] {
  const paramsFilmHub = getParamsFilmHub();
  return getTypeArray(type, paramsFilmHub) as number[];
}

export function save(movieId: number, type: string, category?: string) {
  const paramsFilmHub = getParamsFilmHub();
  const targetArray: any[] = getTypeArray(type, paramsFilmHub);

  if (category) {
    const index: number = targetArray.findIndex(item => typeof item === 'object' && item[category] === movieId);
    if (index !== -1) {
      targetArray.splice(index, 1);
    } else {
      const newItem: { [p: string]: number } = {[category]: movieId};
      targetArray.push(newItem);
    }
  } else {
    const index: number = targetArray.indexOf(movieId);
    if (index !== -1) {
      targetArray.splice(index, 1);
    } else {
      targetArray.push(movieId);
    }
  }

  localStorage.setItem('paramsFilmHub', JSON.stringify(paramsFilmHub));
}
