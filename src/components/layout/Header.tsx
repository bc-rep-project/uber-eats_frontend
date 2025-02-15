import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Box, Typography, InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DeliveryAddress } from '../../types/restaurant';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[100],
  marginTop: theme.spacing(1),
  width: '100%',
  padding: theme.spacing(1),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

interface HeaderProps {
  currentAddress: DeliveryAddress;
  notificationCount: number;
  onAddressClick: () => void;
  onNotificationClick: () => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  currentAddress,
  notificationCount,
  onAddressClick,
  onNotificationClick,
  onSearch,
}) => {
  return (
    <AppBar position="sticky" color="inherit" elevation={0}>
      <Toolbar sx={{ flexDirection: 'column', p: 2 }}>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box 
            onClick={onAddressClick}
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer'
            }}
          >
            <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
              Deliver now
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" color="text.secondary" sx={{ ml: 1 }}>
                {currentAddress.address}
              </Typography>
              <KeyboardArrowDownIcon color="action" />
            </Box>
          </Box>
          <IconButton 
            size="large" 
            onClick={onNotificationClick}
            sx={{ ml: 2 }}
          >
            <Badge badgeContent={notificationCount} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Box>
        
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search Uber Eats"
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => onSearch(e.target.value)}
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 