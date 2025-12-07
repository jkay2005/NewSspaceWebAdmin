import type { CardProps } from '@mui/material/Card';
import type { ChartOptions } from 'src/components/chart';

import { format, subDays } from 'date-fns';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';

import api from 'src/services/api';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  chart?: {
    colors?: string[];
    categories?: string[];
    series?: {
      name: string;
      data: number[];
    }[];
    options?: ChartOptions;
  };
};

export function AnalyticsWebsiteVisits({ title, subheader, sx, ...other }: Props) {
  const theme = useTheme();

  const [series, setSeries] = useState([
    {
      name: 'Tin tức',
      data: [] as number[],
    },
  ]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get('/api/articles');
        
        let articles: { createdAt: string | number | Date }[] = [];
        if (Array.isArray(response.data)) {
          articles = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          articles = response.data.data;
        }

        const last7Days = Array.from({ length: 7 }, (_, i) => subDays(new Date(), i));

        const articleCounts = last7Days.map((day) => {
          const formattedDay = format(day, 'yyyy-MM-dd');
          return articles.filter(
            (article) =>
              article &&
              article.createdAt &&
              format(new Date(article.createdAt), 'yyyy-MM-dd') === formattedDay
          ).length;
        });

        const formattedDates = last7Days.map((day) => format(day, 'dd/MM')).reverse();

        setSeries([{ name: 'Tin tức', data: articleCounts.reverse() }]);
        setCategories(formattedDates);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const chartOptions = useChart({
    colors: [theme.palette.primary.main],
    xaxis: {
      categories,
    },
    tooltip: {
      y: {
        formatter: (value: number) => `${value} tin tức`,
      },
    },
  });

  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Chart
        type="bar"
        series={series}
        options={chartOptions}
        slotProps={{ loading: { p: 2.5 } }}
        sx={{
          pl: 1,
          py: 2.5,
          pr: 2.5,
          height: 364,
        }}
      />
    </Card>
  );
}
