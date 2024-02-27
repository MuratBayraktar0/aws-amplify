import React, { useState, useEffect } from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { get } from "aws-amplify/api";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

function Todo({ title }) {
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    get({
      apiName: "todo",
      path: "/todo",
    })
      .response.then((res) => res.body.json())
      .then((json) => setTodos(json));
  }, []);

  return (
    <div>
      <h1 sx={{ my: 2, color: "white", display: "block" }}>{title}</h1>

      <Box
        className="profile-frame"
        sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}
        style={{ backgroundColor: "rgb(25,118,210)", borderRadius: "3px" }}
      >
        {todos
          ? todos.map((todo) => (
              <StyledPaper
                sx={{
                  my: 1,
                  mx: "auto",
                  p: 2,
                  m: 2,
                }}
              >
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid
                    item
                    xs
                    zeroMinWidth
                    style={{
                      display: "flex",
                      margin: "auto",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "300px",
                    }}
                  >
                    <Typography noWrap>
                      <b key={todo.id} style={{ fontSize: "21px" }}>
                        {todo["context"]}
                      </b>
                    </Typography>
                    <IconButton
                      aria-label="delete"
                      style={{
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </StyledPaper>
            ))
          : "Loading..."}
      </Box>
    </div>
  );
}

export default Todo;
