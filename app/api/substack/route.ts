import Parser from 'rss-parser';
import { NextResponse } from 'next/server';
import type { SubstackPost } from '@/types/substack';

const parser = new Parser();

export async function GET() {
  try {
    const feed = await parser.parseURL('https://shirokokun.substack.com/feed');

    const posts: SubstackPost[] = (feed.items || []).map((item: any) => ({
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || '',
      author: item.creator || item.author || '',
      content: item.content || '',
      contentSnippet: item.contentSnippet || '',
      guid: item.guid || '',
      isoDate: item.isoDate || '',
      categories: item.categories || [],
      enclosure: item.enclosure,
    }));

    return NextResponse.json(
      { posts },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching Substack feed:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}


