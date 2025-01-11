import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid2";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VideoCall from "./components/VideoCall";
import Login from "./components/Login";
import Projects from "./pages/Projects";
import { Workspaces } from "@mui/icons-material";
import ProjectDetail from "./pages/ProjectDetail";

// Updated Navigation with links
const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/dashboard",
  },
  {
    segment: "projects",
    title: "Projects",
    icon: <Workspaces />,
    link: "/projects",
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <DescriptionIcon />,
        link: "/reports/sales",
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <DescriptionIcon />,
        link: "/reports/traffic",
      },
    ],
  },
  {
    segment: "videocall",
    title: "Integrations",
    icon: <LayersIcon />,
    link: "/videocall",
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
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

const Skeleton = styled("div")(({ theme, height }) => ({
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
  </div>
);

const OrdersPage = () => (
  <div>
    <h2>Orders</h2>
    <Skeleton height={200} />
  </div>
);

const SalesPage = () => (
  <div>
    <h2>Sales Report</h2>
    <Skeleton height={200} />
  </div>
);

const TrafficPage = () => (
  <div>
    <h2>Traffic Report</h2>
    <Skeleton height={200} />
  </div>
);

const IntegrationsPage = () => (
  <div>
    <h2>Integrations</h2>
    <Skeleton height={200} />
  </div>
);

// Main App Component with Authentication
export default function App(props) {
  const { window } = props;

  // Check if the user is authenticated in localStorage
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  const handleLogin = (email, password) => {
    if (email && password) {
      // Set authentication status in localStorage
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    // Clear authentication status from localStorage
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {/* Show login screen if not authenticated */}
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <AppProvider
          navigation={NAVIGATION}
          theme={demoTheme}
          window={demoWindow}
        >
          <DashboardLayout>
            <PageContainer>
              <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/reports/sales" element={<SalesPage />} />
                <Route path="/reports/traffic" element={<TrafficPage />} />
                <Route path="/videocall" element={<VideoCall />} />
                <Route
                  path="/project/:projectName"
                  element={<ProjectDetail />}
                />
                <Route path="/" element={<h2>Welcome to the Admin Panel</h2>} />
              </Routes>
            </PageContainer>
          </DashboardLayout>
        </AppProvider>
      )}
    </Router>
  );
}
