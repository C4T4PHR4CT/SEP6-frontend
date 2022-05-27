export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  tagline: string;
  runtime: string;
  revenue: string;
  genres: Genre[];
  production_companies?: ProductionCompany[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface SortOptions {
  value: string;
  viewValue: string;
}
export interface ProductionCompany {
  id: number;
  name: string;
  origin_country: string;
}

export interface MovieSearchResult {
  page: number;
  total_results: number;
  total_pages: number;
  results: Movie[];
}

export interface SearchQueryParameters {
  search?: string;
  year?: number;
  page: number;
}

export interface DiscoveryQueryParameters {
  sortBy?: string;
  with_genres?: string[];
  year?: number;
  page: number;
}

export interface MovieComment {
  username: string;
  content: string;
  date: number;
}

export const SORT_BY_OPTIONS: SortOptions[] = [
  {
    value: 'popularity.desc',
    viewValue: 'Popularity',
  },
  {
    value: 'popularity.asc',
    viewValue: 'Popularity (ascending)',
  },
  {
    value: 'release_date.desc',
    viewValue: 'Release date',
  },
  {
    value: 'release_date.asc',
    viewValue: 'Release date (ascending)',
  },
  {
    value: 'revenue.desc',
    viewValue: 'Revenue',
  },
  {
    value: 'revenue.asc',
    viewValue: 'Revenue (ascending)',
  },
  {
    value: 'primary_release_date.desc',
    viewValue: 'Primary release date',
  },
  {
    value: 'primary_release_date.asc',
    viewValue: 'Primary release date (ascending)',
  },
  {
    value: 'original_title.desc',
    viewValue: 'Original title',
  },
  {
    value: 'original_title.asc',
    viewValue: 'Original title (ascending)',
  },
  {
    value: 'vote_average.desc',
    viewValue: 'Vote average',
  },
  {
    value: 'vote_average.asc',
    viewValue: 'Vote average (ascending)',
  },
  {
    value: 'vote_count.desc',
    viewValue: 'Vote count',
  },
  {
    value: 'vote_count.asc',
    viewValue: 'Vote count (ascending)',
  },
];
