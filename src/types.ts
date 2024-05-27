import type { Dayjs } from 'dayjs';
import { SourceENUM } from './enum';

interface Preferences {
  sources: string[];
  categories: string[];
  authors: string[];
}

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  imgURL: string;
  publishedOn: Date;
}

interface FilterQueryProps {
  search?: string;
  source?: string;
  category?: string;
  from?: Dayjs;
  to?: Dayjs;
  page?: number;
}

interface ReactChildrenInterface {
  children: React.ReactNode[] | React.ReactNode;
}

type SourceQueryResponse = {
  [key in SourceENUM]: string;
};

export type { Preferences, NewsArticle, FilterQueryProps, SourceQueryResponse, ReactChildrenInterface };
