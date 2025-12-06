import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import api from 'src/services/api';
import { _posts } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { AnalyticsNews } from '../analytics-news';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  const [stats, setStats] = useState({ users: 0, blogs: 0, articles: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/api/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="User"
            percent={2.6}
            total={stats.users}
            icon={<img alt="User" src="/assets/icons/glass/users.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="New users"
            percent={-0.1}
            total={1352831}
            color="secondary"
            icon={<img alt="New users" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="News"
            percent={2.8}
            total={stats.articles}
            color="warning"
            icon={<img alt="News" src="/assets/icons/glass/newspaper.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Blogs"
            percent={3.6}
            total={stats.blogs}
            color="error"
            icon={<img alt="Blogs" src="/assets/icons/glass/blogs.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentVisits
            title="Gender"
            chart={{
              series: [
                { label: 'Male', value: 3500 },
                { label: 'Female', value: 2500 },
                { label: 'Other', value: 1500 },
                { label: 'Hide', value: 500 },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="News/Blogs"
            subheader="(+43%) than last year"
            chart={{
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              series: [
                { name: 'News', data: [43, 33, 22, 37, 67, 68, 37, 24, 55, 48, 52, 60] },
                { name: 'Blogs', data: [51, 70, 47, 67, 40, 37, 24, 70, 24, 36, 44, 50] },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 12 }}>
          <AnalyticsConversionRates
            title="Category"
            chart={{
              // 16 categories
              categories: [
                'Thời sự',
                'Chính trị',
                'Thế giới',
                'Kinh tế',
                'Đời sống',
                'Du lịch',
                'Văn hóa',
                'Giải trí',
                'Giới trẻ',
                'Giáo dục',
                'Thể thao',
                'Sức khỏe',
                'Công nghệ',
                'Thời trang',
                'Xe',
                'Tiêu dùng',
              ],
              // single series to display a single horizontal bar per category
              series: [{ name: 'News', data: [120, 98, 75, 160, 110, 85, 70, 140, 95, 130, 88, 102, 60, 78, 56, 45] }],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 12 }}>
          <AnalyticsNews title="News" list={_posts.slice(0, 5)} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
