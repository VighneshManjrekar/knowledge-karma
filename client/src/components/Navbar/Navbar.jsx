import React from "react";
import styles from './Navbar.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../features/auth/authService";
import { reset } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


const Navbar = ({ loggedIn, setLoggedIn }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth)

    if (user === null) {
        navigate('/marketplace')
    }


    const logoutUser = async () => {
        // console.log("Test 1")
        // Log out User
        const response = await authService.logoutUser();
        if (response.success) {
            dispatch(reset());
            setLoggedIn(false)
            navigate('/marketplace');
        }

    }

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };



    return (
        <div className={styles.navWrapper}>
            <div className={`${styles.logo} hover:cursor-pointer`} onClick={() => navigate('/marketplace')}>KnowledgeKarma</div>
            <div className={styles.navTabs}>
                <span>
                    <Link to='/marketplace' style={{ textDecoration: 'none' }}>
                        <div className={`${styles.navTab} ${location.pathname === '/marketplace' ? styles.active : ''}`}>Marketplace</div>
                    </Link>
                </span>
                <span>
                    <Link to='/community' style={{ textDecoration: 'none' }}>
                        <div className={`${styles.navTab} ${location.pathname === '/community' ? styles.active : ''}`}>Community</div>
                    </Link>
                </span>
                <span>
                    <Link to='/contributers' style={{ textDecoration: 'none' }}>
                        <div className={`${styles.navTab} ${location.pathname === '/contributers' ? styles.active : ''}`}>Contributers</div>
                    </Link>
                </span>
            </div>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
            {
                (user || loggedIn) ? (
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <div className={`${styles.userSection} hover:cursor-pointer flex items-center justify-center`} onClick={handleOpenUserMenu}>
                                <span className="font-semibold text-2xl text-white">{user?.name.charAt(0).toUpperCase()}</span>
                            </div>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Link to={'/profile'} style={{ textDecoration: 'none' }}>
                                    <Typography textAlign="center">{"Profile"}</Typography>
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={logoutUser}>
                                <Link to={'/'} style={{ textDecoration: 'none' }}>
                                    <Typography textAlign="center">{"Logout"}</Typography>
                                </Link>
                            </MenuItem>
                        </Menu>
                    </Box>
                ) : (
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <button className={styles.registerBtn}>Login</button>
                    </Link>
                )
            }
        </div>
    );
};

export default Navbar;