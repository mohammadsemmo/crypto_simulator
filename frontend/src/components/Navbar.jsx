import {
  AppBar,
  Toolbar,
  styled,
  Typography,
  Box,
  Button,
  Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const authDispatch = useDispatch();
  const navigate = useNavigate();

  const formatter = Intl.NumberFormat('en', {
    currency: 'usd',
    style: 'currency',
    maximumSignificantDigits: 3,
  });
  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: 'none',
      }}
    >
      <StyledToolbar>
        <Typography
          variant="h3"
          component={Link}
          to="/"
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            fontFamily: 'monospace',
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          <CurrencyBitcoinIcon fontSize="large" />
        </Typography>

        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Crypto Simulator
        </Typography>

        {user && (
          <Box component={Paper} p={1}>
            <Typography>Balance: {formatter.format(user.balance)}</Typography>
          </Box>
        )}

        <Box>
          {user ? (
            <>
              <Button
                component={Link}
                to="/trades"
                sx={{ my: 2, mx: 1, color: 'white' }}
              >
                Trades
              </Button>
              <Button
                onClick={() => {
                  authDispatch(logout());
                  navigate('/');
                }}
                sx={{ my: 2, mx: 1, color: 'white' }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{ my: 2, mx: 1, color: 'white' }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                sx={{ my: 2, mx: 1, color: 'white' }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};
export default Navbar;
