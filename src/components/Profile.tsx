import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

type ProfileProps = {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
};

function Profile({ name, surname, email, phoneNumber }: ProfileProps) {
  return (
    <div>
      <h1 style={{ color: "white", display: "block" }}>Profile</h1>

      <Box
        className="profile-frame"
        sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}
      >
        <StyledPaper
          sx={{
            my: 1,
            mx: "auto",
            p: 2,
          }}
        >
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs zeroMinWidth>
              <Typography noWrap>{name}</Typography>
            </Grid>
          </Grid>
        </StyledPaper>
        <StyledPaper
          sx={{
            my: 1,
            mx: "auto",
            p: 2,
          }}
        >
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs>
              <Typography noWrap>{surname}</Typography>
            </Grid>
          </Grid>
        </StyledPaper>
        <StyledPaper
          sx={{
            my: 1,
            mx: "auto",
            p: 2,
          }}
        >
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs>
              <Typography>{email}</Typography>
            </Grid>
          </Grid>
        </StyledPaper>
        <StyledPaper
          sx={{
            my: 1,
            mx: "auto",
            p: 2,
          }}
        >
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs>
              <Typography>{phoneNumber}</Typography>
            </Grid>
          </Grid>
        </StyledPaper>
      </Box>
    </div>
  );
}

export default Profile;
