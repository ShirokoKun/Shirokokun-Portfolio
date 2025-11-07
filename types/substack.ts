export interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  content: string;
  contentSnippet: string;
  guid: string;
  isoDate: string;
  categories?: string[];
  enclosure?: {
    url: string;
    type: string;
  };
}


