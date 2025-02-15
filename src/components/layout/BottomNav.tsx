import React from 'react';
import { BottomNavigation, BottomNavigationAction, Badge, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, useLocation } from 'react-router-dom';

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const StyledBottomNavigationAction = styled(BottomNavigationAction)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

interface BottomNavProps {
  cartItemCount: number;
  notificationCount: number;
}

const BottomNav: React.FC<BottomNavProps> = ({ cartItemCount, notificationCount }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const pathToIndex: { [key: string]: number } = {
      '/': 0,
      '/grocery': 1,
      '/browse': 2,
      '/cart': 3,
      '/account': 4,
    };
    setValue(pathToIndex[location.pathname] || 0);
  }, [location]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const indexToPath: { [key: number]: string } = {
      0: '/',
      1: '/grocery',
      2: '/browse',
      3: '/cart',
      4: '/account',
    };
    navigate(indexToPath[newValue]);
    setValue(newValue);
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <StyledBottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
      >
        <StyledBottomNavigationAction 
          label="Home" 
          icon={<HomeIcon />} 
        />
        <StyledBottomNavigationAction 
          label="Grocery" 
          icon={<LocalGroceryStoreIcon />} 
        />
        <StyledBottomNavigationAction 
          label="Browse" 
          icon={<SearchIcon />} 
        />
        <StyledBottomNavigationAction 
          label="Cart" 
          icon={
            <Badge badgeContent={cartItemCount} color="primary">
              <ShoppingCartIcon />
            </Badge>
          } 
        />
        <StyledBottomNavigationAction 
          label="Account" 
          icon={
            <Badge badgeContent={notificationCount} color="primary" variant="dot">
              <PersonIcon />
            </Badge>
          } 
        />
      </StyledBottomNavigation>
    </Paper>
  );
};

export default BottomNav; 