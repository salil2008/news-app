/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { SourceENUM } from '../enum';
import { FilterQueryProps, NewsArticle, SourceQueryResponse } from '../types';
import { v4 as uuidv4 } from 'uuid';

type SourceMapType = {
  [key in SourceENUM]: (query: FilterQueryProps) => string;
};

export const newsSourceTransformer = (input): NewsArticle[] => {
  return input.map((res) => ({
    id: uuidv4(),
    title: res?.title || res?.webTitle || res?.headline?.main,
    description: res?.description || res?.snippet || res?.webTitle,
    imgURL: res?.urlToImage || 'https://picsum.photos/200',
    publishedOn: new Date(res?.webPublicationDate || res?.pub_date || res?.publishedAt),
  }));
};

export const sourceQueryTransformer = (input: FilterQueryProps): SourceQueryResponse => {
  /*
              NewsAPI: 
                  search -> q=&searchIn=title,content
                  sources -> sources=source1,source2
                  category -> domnains=bbc.co.uk
                  date->from & to ISO format
                  page -> page
  
              The New York Times API:
                  search -> q=election
                  sources -> fq=source:("The New York Times")
                  category -> fq=news_desk:("Sports", "Foreign")
                  date -> pub_date=Timestamp YYYY-MM-DD
                  page -> page
              
              The Guardian API
                  search -> q=debate
                  sources -> production-office=aus
                  category -> section=football
                  date -> from-date & to-date ex.2014-02-16
                  page -> pages
          */

  const sourceMap: SourceMapType = {
    [SourceENUM.NEWSAPI]: ({ search, category, from, to, page }: FilterQueryProps) => {
      const searchParams = new URLSearchParams();
      searchParams.append('pageSize', '10');
      if (page) searchParams.append('page', page as unknown as string);
      if (search && search !== '') {
        searchParams.append('q', search);
        searchParams.append('searchIn', 'title,content');
      }

      if (category && category !== '') searchParams.append('domnains', category);
      if (from) searchParams.append('from', from.toISOString());
      if (to) searchParams.append('to', to.toISOString());

      return searchParams.toString();
    },
    [SourceENUM.NYTIMES]: ({ search, category, from, page }: FilterQueryProps) => {
      const searchParams = new URLSearchParams();
      if (page) searchParams.append('page', page as unknown as string);
      if (search && search !== '') searchParams.append('q', search);
      if (category && category !== '') searchParams.append('fq', `news_desk:(${category})`);
      if (from) searchParams.append('pub_date', from.format('YYYY-MM-DD'));

      return searchParams.toString();
    },
    [SourceENUM.GUARDIAN]: ({ search, category, from, to, page }: FilterQueryProps) => {
      const searchParams = new URLSearchParams();
      if (page) searchParams.append('pages', page as unknown as string);
      if (search && search !== '') searchParams.append('q', search);
      if (category && category !== '') searchParams.append('section', category);
      if (from) searchParams.append('from-date', from.toISOString());
      if (to) searchParams.append('to-date', to.toISOString());

      return searchParams.toString();
    },
  };

  return Object.keys(sourceMap).reduce(
    (acc: SourceQueryResponse, curr: string) => {
      acc[curr] = sourceMap[curr](input);
      return acc;
    },
    {
      [SourceENUM.NEWSAPI]: '',
      [SourceENUM.GUARDIAN]: '',
      [SourceENUM.NYTIMES]: '',
    }
  );
};
