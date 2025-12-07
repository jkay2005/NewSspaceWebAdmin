import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';

import { format } from 'date-fns';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import api from 'src/services/api';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

const fallbackCover = '/assets/images/cover/cover-1.webp';

function extractContent(htmlString: string) {
  if (typeof window === 'undefined' || !htmlString) {
    return { description: '', coverUrl: fallbackCover };
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  // Find the first image for the cover
  const firstImage = doc.querySelector('img');
  const coverUrl = firstImage?.src || fallbackCover;

  // Extract text and find the first meaningful sentence for description
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  const textContent = tempDiv.textContent || tempDiv.innerText || '';
  const description = textContent.trim().split('. ')[0] || '';

  return { description, coverUrl };
}

// ----------------------------------------------------------------------

type Article = {
  id: string;
  title?: string | null;
  coverUrl?: string | null;
  description?: string | null;
  createdAt?: string | number | null;
};

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list?: Article[];
};

export function AnalyticsNews({ title, subheader, list, sx, ...other }: Props) {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (list) {
      setArticles(list);
    } else {
      api
        .get('/api/articles', { params: { page: 1, limit: 5 } })
        .then((res) => {
          const items: Article[] = (res.data || []).map((a: any) => {
            const { description, coverUrl } = extractContent(a.content);
            return {
              id: a.id?.toString() || `${Math.random()}`,
              title: a.title || a.rssItem?.topic,
              description,
              coverUrl,
              createdAt: a.createdAt,
            };
          });
          setArticles(items);
        })
        .catch((err) => {
          console.error('Failed to fetch articles:', err);
        });
    }
  }, [list]);

  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 1 }} />

      <Scrollbar sx={{ minHeight: 405 }}>
        <Box sx={{ minWidth: 640 }}>
          {articles.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </Box>
      </Scrollbar>

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ItemProps = BoxProps & {
  item: Article;
};

function Item({ item, sx, ...other }: ItemProps) {
  const createdAt = item.createdAt ? format(new Date(item.createdAt), 'dd/MM/yyyy') : '';

  return (
    <Box
      sx={[
        (theme) => ({
          py: 2,
          px: 3,
          gap: 2,
          display: 'flex',
          alignItems: 'center',
          borderBottom: `dashed 1px ${theme.vars.palette.divider}`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Avatar
        variant="rounded"
        alt={item.title ?? ''}
        src={item.coverUrl ?? ''}
        sx={{ width: 48, height: 48, flexShrink: 0 }}
      />

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'fontWeightBold' }} noWrap>
          <Link color="inherit" underline="none">
            {item.title}
          </Link>
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }} noWrap>
          {item.description}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ flexShrink: 0, color: 'text.secondary' }}>
        {createdAt}
      </Typography>
    </Box>
  );
}
