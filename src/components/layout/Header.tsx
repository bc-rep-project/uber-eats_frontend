import React from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
  width: '100%',
  maxWidth: 600,
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1.5, 1.5, 6),
    width: '100%',
  },
}));

const Header: React.FC = () => {
  const navigate = useNavigate();
  const cartItemCount = 2; // Get this from your cart state

  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          {/* Logo */}
          <img 
            src="/logo.png" 
            alt="UberEats" 
            style={{ height: 24, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />

          {/* Search Bar */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search restaurants and dishes"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          {/* Right Side Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            <Button
              color="inherit"
              startIcon={<PersonOutlineIcon />}
              onClick={() => navigate('/account')}
            >
              Log in
            </Button>
            <IconButton 
              color="inherit"
              onClick={() => navigate('/cart')}
              sx={{ position: 'relative' }}
            >
              <ShoppingBagOutlinedIcon />
              {cartItemCount > 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    backgroundColor: 'secondary.main',
                    borderRadius: '50%',
                    width: 20,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.75rem',
                  }}
                >
                  {cartItemCount}
                </Box>
              )}
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 