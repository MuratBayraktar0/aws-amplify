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
                    {profile.name}
                  </h1>
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <AccountCircleIcon style={{fontSize:"50px"}}/>
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

            <h1 sx={{ my: 2, color: "white", display: "block" }}>{title}</h1>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              unde fugit veniam eius, perspiciatis sunt? Corporis qui ducimus
              quibusdam, aliquam dolore excepturi quae. Distinctio enim at
              eligendi perferendis in cum quibusdam sed quae, accusantium et
              aperiam? Quod itaque exercitationem, at ab sequi qui modi delectus
              quia corrupti alias distinctio nostrum. Minima ex dolor modi
              inventore sapiente necessitatibus aliquam fuga et. Sed numquam
              quibusdam at officia sapiente porro maxime corrupti perspiciatis
              asperiores, exercitationem eius nostrum consequuntur iure aliquam
              itaque, assumenda et! Quibusdam temporibus beatae doloremque
              voluptatum doloribus soluta accusamus porro reprehenderit eos
              inventore facere, fugit, molestiae ab officiis illo voluptates
              recusandae. Vel dolor nobis eius, ratione atque soluta, aliquam
              fugit qui iste architecto perspiciatis. Nobis, voluptatem! Cumque,
              eligendi unde aliquid minus quis sit debitis obcaecati error,
              delectus quo eius exercitationem tempore. Delectus sapiente,
              provident corporis dolorum quibusdam aut beatae repellendus est
              labore quisquam praesentium repudiandae non vel laboriosam quo ab
              perferendis velit ipsa deleniti modi! Ipsam, illo quod. Nesciunt
              commodi nihil corrupti cum non fugiat praesentium doloremque
              architecto laborum aliquid. Quae, maxime recusandae? Eveniet
              dolore molestiae dicta blanditiis est expedita eius debitis
              cupiditate porro sed aspernatur quidem, repellat nihil quasi
              praesentium quia eos, quibusdam provident. Incidunt tempore vel
              placeat voluptate iure labore, repellendus beatae quia unde est
              aliquid dolor molestias libero. Reiciendis similique
              exercitationem consequatur, nobis placeat illo laudantium! Enim
              perferendis nulla soluta magni error, provident repellat similique
              cupiditate ipsam, et tempore cumque quod! Qui, iure suscipit
              tempora unde rerum autem saepe nisi vel cupiditate iusto. Illum,
              corrupti? Fugiat quidem accusantium nulla. Aliquid inventore
              commodi reprehenderit rerum reiciendis! Quidem alias repudiandae
              eaque eveniet cumque nihil aliquam in expedita, impedit quas ipsum
              nesciunt ipsa ullam consequuntur dignissimos numquam at nisi porro
              a, quaerat rem repellendus. Voluptates perspiciatis, in pariatur
              impedit, nam facilis libero dolorem dolores sunt inventore
              perferendis, aut sapiente modi nesciunt.
            </Typography>
          </Box>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
