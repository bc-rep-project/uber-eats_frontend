import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Container,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

// Components
import CategoryScroll from './components/CategoryScroll';
import FeaturedStores from './components/FeaturedStores';
import StoreSection from './components/StoreSection';
import DailyOffers from './components/DailyOffers';

// Services and Types
import groceryService, { GroceryCategory, GroceryStore, GroceryProduct } from '../../services/groceryService';

const SearchBar = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
  },
}));

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '200px',
});

const GroceryPage: React.FC = () => {
  const [categories, setCategories] = useState<GroceryCategory[]>([]);
  const [featuredStores, setFeaturedStores] = useState<GroceryStore[]>([]);
  const [regularStores, setRegularStores] = useState<GroceryStore[]>([]);
  const [products, setProducts] = useState<GroceryProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  const loadStores = useCallback(async () => {
    try {
      const params: { category?: string; search?: string } = {};
      if (selectedCategory) params.category = selectedCategory;
      if (searchQuery) params.search = searchQuery;
      
      const stores = await groceryService.getStores(params);
      setRegularStores(stores);

      // Load products from the first store if available
      if (stores.length > 0) {
        const storeProducts = await groceryService.getStoreProducts(stores[0].id);
        setProducts(storeProducts);
      } else {
        setProducts([]);
      }
    } catch (err: any) {
      setError('Failed to load stores. Please try again later.');
      setShowError(true);
    }
  }, [selectedCategory, searchQuery]);

  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [categoriesData, featuredStoresData] = await Promise.all([
        groceryService.getCategories(),
        groceryService.getStores({ featured: true }),
      ]);
      
      setCategories(categoriesData);
      setFeaturedStores(featuredStoresData);
      await loadStores();
    } catch (err: any) {
      setError('Failed to load grocery data. Please try again later.');
      setShowError(true);
    } finally {
      setLoading(false);
    }
  }, [loadStores]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  useEffect(() => {
    if (!loading) {
      loadStores();
    }
  }, [loadStores, loading]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(prevCategory => prevCategory === categoryId ? null : categoryId);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  return (
    <Container maxWidth="lg">
      <Snackbar open={showError} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Box sx={{ py: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Grocery
        </Typography>

        <SearchBar
          fullWidth
          placeholder="Search grocery, drinks, stores"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <CategoryScroll 
          categories={categories} 
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />

        {featuredStores.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Featured stores
            </Typography>
            <FeaturedStores stores={featuredStores} />
          </Box>
        )}

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
              {selectedCategory ? `${selectedCategory} Stores` : 'All Stores'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fresh groceries delivered to your door
            </Typography>
          </Box>
          <StoreSection stores={regularStores} />
        </Box>

        {products.length > 0 && (
          <DailyOffers products={products} />
        )}
      </Box>
    </Container>
  );
};

export default GroceryPage; 