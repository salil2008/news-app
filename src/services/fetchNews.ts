import axios from 'axios';
import { FilterQueryProps, NewsArticle, Preferences, SourceQueryResponse } from '../types';
import { newsSourceTransformer, sourceQueryTransformer } from './transformers';
import { SourceENUM } from '../enum';

const NEWS_API_KEY = 'eb1ddc664f67402aa541a21fe0ad545c';
const GUARDIAN_API_KEY = '7a10bac8-8200-4c25-83ec-fab90d5fc689';
const NYT_API_KEY = 'DJ0aAG5Ak1Hz7Hs2YCZm7uFOiBnTs8ON';

const getNewsAPIArticles = (query: string) => {
  return axios.get(`https://newsapi.org/v2/everything?${query}&apiKey=${NEWS_API_KEY}`);
};

const getGuardianArticles = (query: string) => {
  return axios.get(`https://content.guardianapis.com/search?${query}&api-key=${GUARDIAN_API_KEY}`);
};

const getNYTArticles = (query: string) => {
  return axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?${query}&api-key=${NYT_API_KEY}`);
};

const fetchArticles = async (
  query: FilterQueryProps,
  preferences: Preferences = {
    sources: [],
    categories: [],
    authors: [],
  }
): Promise<NewsArticle[]> => {
  const sources =
    preferences.sources && preferences.sources.length
      ? preferences.sources
      : query?.source && query?.source !== ''
        ? query.source
        : Object.values(SourceENUM);
  const requests = [];

  // Special handling for removed posts in NewsAPI
  const removedPlaceholder: string = '[Removed]';

  // Transform query for all targets
  const transformedQuery: SourceQueryResponse = sourceQueryTransformer(query);

  console.log({ transformedQuery });

  if (sources.includes(SourceENUM.NEWSAPI)) {
    requests.push(getNewsAPIArticles(transformedQuery[SourceENUM.NEWSAPI]));
  }
  if (sources.includes(SourceENUM.GUARDIAN)) {
    requests.push(getGuardianArticles(transformedQuery[SourceENUM.GUARDIAN]));
  }
  if (sources.includes(SourceENUM.NYTIMES)) {
    requests.push(getNYTArticles(transformedQuery[SourceENUM.NYTIMES]));
  }

  const responses = await Promise.all(requests);

  const articles = responses.flatMap((response) => {
    if (response.data.articles) return response.data.articles; // NewsAPI
    if (response.data.response.results) return response.data.response.results; // Guardian
    if (response.data.response.docs) return response.data.response.docs; // NYT
    return [];
  });

  // Further filter articles based on categories and authors
  const filteredArticles = articles.filter((article) => {
    const matchesCategory = preferences.categories.length === 0 || preferences.categories.includes(article.category);
    const matchesAuthor = preferences.authors.length === 0 || preferences.authors.includes(article.author);

    return article?.title === removedPlaceholder ? false : matchesCategory && matchesAuthor;
  });

  return newsSourceTransformer(filteredArticles);
};

export default fetchArticles;
