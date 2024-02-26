import "./App.css";
import React, { useState, useEffect } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { fetchUserAttributes } from "aws-amplify/auth";
import Profile from "./components/Profile";

function App() {
  const [title, setTitle] = useState("Todo List");
  const [profile, setProfile] = useState({
    email: "",
    email_verified: "",
    phone_number: "",
    phone_number_verified: "",
    name: "",
    family_name: "",
    sub: "",
  });
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState("");

  useEffect(() => {
    const fetchCreateLiveness = async () => {
      const userAttributes = await fetchUserAttributes();
      setProfile({
        ...userAttributes,
        name: userAttributes.name,
      });
    };

    fetchCreateLiveness();
  }, [fetchUserAttributes, setProfile]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setTitle("Todo List");
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (e) => {
    setTitle("Profile");
    setAnchorElUser(null);
  };

  return (
    <Authenticator
      loginMechanisms={["email"]}
      signUpAttributes={["email", "family_name", "name", "phone_number"]}
    >
      {({ signOut, user }) => (
        <main>
          <AppBar component="nav">
            <Container maxWidth="lg">
              <Toolbar disableGutters>
                <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  LOGO
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography>Todo List</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
                <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  LOGO
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Button
                      style={{ backgroundColor: "white", borderRadius: "20px" }}
                      variant="outlined"
                    >
                      Todo List
                    </Button>
                  </MenuItem>
                  <h1 style={{ marginRight: "10px", marginLeft: "auto" }}>
                    {`${profile.name} ${profile.family_name}`}
                  </h1>
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <AccountCircleIcon style={{ fontSize: "50px" }} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography href="/profile" textAlign="center">
                        Profile
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <div onClick={signOut}>Sign out</div>
                    </MenuItem>
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>

          <Box component="main" sx={{ p: 3 }}>
            <Toolbar />
            <Profile
              title={title}
              name={profile.name}
              surname={profile.family_name}
              email={profile.email}
              phoneNumber={profile.phone_number}
            />
          </Box>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
