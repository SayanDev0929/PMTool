import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Updated Navigation with links
const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    link: '/dashboard', // Add links to each segment
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
    link: '/orders', // Add links to each segment
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
        link: '/reports/sales',
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
        link: '/reports/traffic',
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
    link: '/integrations',
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

// Page Components for each route
const DashboardPage = () => (
  <div>
    <h2>Dashboard</h2>
    <Skeleton height={200} />
    {/* You can add dashboard-specific content here */}
  </div>
);

const OrdersPage = () => (
  <div>
    <h2>Orders</h2>
    <Skeleton height={200} />
    {/* You can add orders-specific content here */}
  </div>
);

const SalesPage = () => (
  <div>
    <h2>Sales Report</h2>
    <Skeleton height={200} />
    {/* You can add sales report content here */}
  </div>
);

const TrafficPage = () => (
  <div>
    <h2>Traffic Report</h2>
    <Skeleton height={200} />
    {/* You can add traffic report content here */}
  </div>
);

const IntegrationsPage = () => (
  <div>
    <h2>Integrations</h2>
    <Skeleton height={200} />
    {/* You can add integrations content here */}
  </div>
);

export default function App(props) {
  const { window } = props;

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={demoTheme}
      window={demoWindow}
    >
      <Router>
        <DashboardLayout>
          <PageContainer>
            {/* Main Routing Area */}
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/reports/sales" element={<SalesPage />} />
              <Route path="/reports/traffic" element={<TrafficPage />} />
              <Route path="/integrations" element={<IntegrationsPage />} />
              <Route path="/" element={<h2>Welcome to the Admin Panel</h2>} />
            </Routes>
          </PageContainer>
        </DashboardLayout>
      </Router>
    </AppProvider>
  );
}
