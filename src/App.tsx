import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import theme from './theme';
import { store } from './store';

// Layout
import MainLayout from './components/layout/MainLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RestaurantList from './pages/restaurants/RestaurantList';
import RestaurantDetail from './pages/restaurants/RestaurantDetail';
import RestaurantDashboard from './pages/restaurant/RestaurantDashboard';
import Cart from './pages/cart/Cart';
import Profile from './pages/profile/Profile';
import NotFound from './pages/NotFound';

// Auth Guard
import PrivateRoute from './components/auth/PrivateRoute';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/restaurants" element={<RestaurantList />} />
              <Route path="/restaurants/:id" element={<RestaurantDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              
              {/* Restaurant Management Routes */}
              <Route
                path="/restaurant-dashboard/*"
                element={
                  <PrivateRoute roles={['restaurant_owner']}>
                    <RestaurantDashboard />
                  </PrivateRoute>
                }
              />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App; 