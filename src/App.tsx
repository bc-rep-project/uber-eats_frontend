import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from './theme';
import { useState, useCallback } from 'react';

// Components
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
import CategoryNav from './components/home/CategoryNav';
import RestaurantCard from './components/restaurant/RestaurantCard';

// Types
import { Restaurant, DeliveryAddress, Category } from './types/restaurant';

const MainContainer = styled(Box)(({ theme }) => ({
  paddingBottom: '56px', // Height of bottom navigation
  backgroundColor: theme.palette.background.default,
}));

const RestaurantGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
}));

const categories: Category[] = [
  { id: 'breakfast', name: 'Breakfast', icon: 'FastfoodIcon' },
  { id: 'coffee', name: 'Coffee', icon: 'LocalCafeIcon' },
  { id: 'chinese', name: 'Chinese', icon: 'RestaurantIcon' },
  { id: 'healthy', name: 'Healthy', icon: 'EmojiFoodBeverageIcon' },
  { id: 'pizza', name: 'Pizza', icon: 'LocalPizzaIcon' },
  { id: 'asian', name: 'Asian', icon: 'RamenDiningIcon' },
  { id: 'mexican', name: 'Mexican', icon: 'RestaurantIcon' },
  { id: 'sushi', name: 'Sushi', icon: 'RestaurantIcon' },
  { id: 'korean', name: 'Korean', icon: 'RamenDiningIcon' },
  { id: 'thai', name: 'Thai', icon: 'RestaurantIcon' },
];

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: "McDonald's",
    rating: 4.7,
    deliveryFee: 3.99,
    deliveryTime: { min: 10, max: 20 },
    imageUrl: 'https://tb-static.uber.com/prod/image-proc/processed_images/3c3d111e7d53fa962724747d0d16fe67/719c6bd2757b08684c0faae44d43159d.jpeg',
    isLiked: false,
    cuisineType: ['Fast Food', 'Burgers'],
    priceRange: '$$',
  },
  {
    id: '2',
    name: 'Starbucks',
    rating: 4.8,
    deliveryFee: 3.99,
    deliveryTime: { min: 10, max: 20 },
    imageUrl: 'https://tb-static.uber.com/prod/image-proc/processed_images/9e0c6236d4821f3b1e88b727133af9a1/719c6bd2757b08684c0faae44d43159d.jpeg',
    isLiked: true,
    cuisineType: ['Coffee', 'Breakfast'],
    priceRange: '$$',
    offers: [{ text: '20% off on orders above $25' }],
  },
  {
    id: '3',
    name: 'The Posh Bagel',
    rating: 4.8,
    deliveryFee: 0.49,
    deliveryTime: { min: 10, max: 20 },
    imageUrl: 'https://tb-static.uber.com/prod/image-proc/processed_images/53f3e89c9c6e0b7921913bc79e0dc7a1/719c6bd2757b08684c0faae44d43159d.jpeg',
    isLiked: false,
    cuisineType: ['Breakfast', 'Bagels'],
    priceRange: '$$',
  },
  {
    id: '4',
    name: "Noah's Bagels",
    rating: 4.4,
    deliveryFee: 4.99,
    deliveryTime: { min: 15, max: 30 },
    imageUrl: 'https://tb-static.uber.com/prod/image-proc/processed_images/ec9d81e31e4e558e7c6b5f3c6f2a3cb3/719c6bd2757b08684c0faae44d43159d.jpeg',
    isLiked: false,
    cuisineType: ['Breakfast', 'Bagels'],
    priceRange: '$$',
  },
  {
    id: '5',
    name: 'Joe & The Juice',
    rating: 4.8,
    deliveryFee: 0.99,
    deliveryTime: { min: 10, max: 25 },
    imageUrl: 'https://tb-static.uber.com/prod/image-proc/processed_images/2e7f4b23c6d9d8f9c05d8573ab50a8b1/719c6bd2757b08684c0faae44d43159d.jpeg',
    isLiked: false,
    cuisineType: ['Healthy', 'Juice', 'Breakfast'],
    priceRange: '$$',
    offers: [{ text: '20% off (Spend $25)' }],
  },
  {
    id: '6',
    name: "Andronico's Community Markets",
    rating: 4.7,
    deliveryFee: 11.99,
    deliveryTime: { min: 35, max: 55 },
    imageUrl: 'https://tb-static.uber.com/prod/image-proc/processed_images/1d66fb8f6f9b3ea2d9f5b0054461bb8d/719c6bd2757b08684c0faae44d43159d.jpeg',
    isLiked: false,
    cuisineType: ['Grocery', 'Convenience'],
    priceRange: '$$',
  },
  {
    id: '7',
    name: 'Rite Aid',
    rating: 4.9,
    deliveryFee: 7.49,
    deliveryTime: { min: 20, max: 40 },
    imageUrl: 'https://tb-static.uber.com/prod/image-proc/processed_images/7c8de9248dd53316957048a1172e2d91/719c6bd2757b08684c0faae44d43159d.jpeg',
    isLiked: false,
    cuisineType: ['Convenience', 'Pharmacy'],
    priceRange: '$$',
  },
  {
    id: '8',
    name: 'Lucky California Beer, Wine & Spirits',
    rating: 4.7,
    deliveryFee: 3.49,
    deliveryTime: { min: 25, max: 45 },
    imageUrl: 'https://tb-static.uber.com/prod/image-proc/processed_images/9b05150e6b5b6c7ed0d74ccfb4c838b2/719c6bd2757b08684c0faae44d43159d.jpeg',
    isLiked: false,
    cuisineType: ['Alcohol', 'Beer', 'Wine'],
    priceRange: '$$',
    offers: [{ text: 'Offers available' }],
  }
];

const currentAddress: DeliveryAddress = {
  id: '1',
  label: 'Home',
  address: '1226 University Dr',
  isDefault: true,
};

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartItemCount, setCartItemCount] = useState(2);
  const [notificationCount] = useState(1);
  const [activeFilters, setActiveFilters] = useState({
    rating: 0,
    priceRange: [] as string[],
    dietary: [] as string[],
    sortBy: ''
  });
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(prevCategory => prevCategory === categoryId ? null : categoryId);
  };

  const handleFavoriteClick = (restaurantId: string) => {
    mockRestaurants.forEach(restaurant => {
      if (restaurant.id === restaurantId) {
        restaurant.isLiked = !restaurant.isLiked;
      }
    });
    setCartItemCount(prev => prev);
  };

  const handleRestaurantClick = useCallback((restaurantId: string) => {
    navigate(`/restaurant/${restaurantId}`);
  }, [navigate]);

  const handleSearch = (query: string) => {
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleAddressClick = () => {
    navigate('/addresses');
  };

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  const handleFilterSelect = (filterId: string) => {
    switch (filterId) {
      case 'rating':
        setActiveFilters(prev => ({
          ...prev,
          rating: prev.rating === 0 ? 4 : prev.rating + 0.5 > 5 ? 0 : prev.rating + 0.5
        }));
        break;
      case 'price':
        // Toggle through price ranges
        const priceRanges = ['$', '$$', '$$$', '$$$$'];
        setActiveFilters(prev => {
          const currentPriceRange = prev.priceRange[0] || '';
          const nextIndex = (priceRanges.indexOf(currentPriceRange) + 1) % priceRanges.length;
          return {
            ...prev,
            priceRange: [priceRanges[nextIndex]]
          };
        });
        break;
      case 'dietary':
        // Toggle dietary preferences
        const dietaryOptions = ['vegetarian', 'vegan', 'gluten-free'];
        setActiveFilters(prev => ({
          ...prev,
          dietary: prev.dietary.length === dietaryOptions.length ? [] : dietaryOptions
        }));
        break;
    }
  };

  const handleSortSelect = (sortId: string) => {
    setActiveFilters(prev => ({
      ...prev,
      sortBy: prev.sortBy === sortId ? '' : sortId
    }));
  };

  const filteredRestaurants = mockRestaurants
    .filter(restaurant => {
      // Category filter
      if (selectedCategory && !restaurant.cuisineType.some(type => 
        type.toLowerCase().includes(selectedCategory.toLowerCase())
      )) {
        return false;
      }
      
      // Rating filter
      if (activeFilters.rating > 0 && restaurant.rating < activeFilters.rating) {
        return false;
      }

      // Price range filter
      if (activeFilters.priceRange.length > 0 && 
          !activeFilters.priceRange.includes(restaurant.priceRange)) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (activeFilters.sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.priceRange.length - b.priceRange.length;
        case 'price-high':
          return b.priceRange.length - a.priceRange.length;
        default:
          return 0;
      }
    });

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Header
        currentAddress={currentAddress}
        notificationCount={notificationCount}
        onAddressClick={handleAddressClick}
        onNotificationClick={handleNotificationClick}
        onSearch={handleSearch}
      />
      
      <MainContainer>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CategoryNav
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategorySelect={handleCategorySelect}
                  onFilterSelect={handleFilterSelect}
                  onSortSelect={handleSortSelect}
                />
                <RestaurantGrid>
                  {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                      onFavoriteClick={handleFavoriteClick}
                      onClick={handleRestaurantClick}
                    />
                  ))}
                </RestaurantGrid>
              </>
            }
          />
          <Route path="/restaurant/:id" element={<Box>Restaurant Detail Page</Box>} />
          <Route path="/search" element={<Box>Search Results Page</Box>} />
          <Route path="/addresses" element={<Box>Address Selection Page</Box>} />
          <Route path="/notifications" element={<Box>Notifications Page</Box>} />
          <Route path="/grocery" element={<Box>Grocery Page</Box>} />
          <Route path="/browse" element={<Box>Browse Page</Box>} />
          <Route path="/cart" element={<Box>Cart Page</Box>} />
          <Route path="/account" element={<Box>Account Page</Box>} />
        </Routes>
      </MainContainer>

      <BottomNav
        cartItemCount={cartItemCount}
        notificationCount={notificationCount}
      />
    </Box>
  );
}

function App() {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
        <AppContent />
        </Router>
      </ThemeProvider>
  );
}

export default App; 