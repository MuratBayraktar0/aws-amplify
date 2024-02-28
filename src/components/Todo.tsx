import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { get, del, post, put } from "aws-amplify/api";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { TextField, Button, Checkbox } from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

type Todo = {
  id: number;
  context: string;
  check: boolean;
};

function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [context, setContext] = useState("");
  const [addSuccess, setAddSuccess] = useState(true);
  const [deleteSuccess, setDeleteSuccess] = useState(true);
  const [updateSuccess, setUpdateSuccess] = useState(true);

  console.log(addSuccess);
  console.log(deleteSuccess);
  console.log(updateSuccess);

  useEffect(() => {
    get({
      apiName: "apiTodo",
      path: "/todos",
    })
      .response.then((res) => res.body.json())
      .then((json) => setTodos(json as Todo[]));
  }, [todos]);

  const handleDeleteTodo = (id: number) => {
    del({
      apiName: "apiTodo",
      path: `/todos/object/${id}`,
    })
      .response.then(() => {
        const filteredTodos = todos.filter((todo) => todo.id !== id);
        setTodos(filteredTodos);
        setDeleteSuccess(true);
      })
      .catch(() => setDeleteSuccess(false));
  };

  const handleAddTodo = (context: string) => {
    const todo = {
      id: todos[0] ? todos[0].id + 1 : 0,
      context: context,
      check: false,
    };

    post({
      apiName: "apiTodo",
      path: "/todos",
      options: {
        body: todo,
      },
    })
      .response.then((res) => res.statusCode)
      .then(() => {
        setTodos((prevTodos) => [todo].concat(prevTodos));
        setContext("");
        setAddSuccess(true);
      })
      .catch(() => {
        setAddSuccess(false);
      });
  };

  const handleUpdateTodo = (todo: Todo, index: number) => {
    put({
      apiName: "apiTodo",
      path: `/todos`,
      options: {
        body: {
          id: todo.id,
          context: todo.context,
          check: !todos[index].check,
        },
      },
    })
      .response.then((res) => res.statusCode)
      .then(() => {
        todos[index].check = !todos[index].check;

        setUpdateSuccess(true);
      })
      .catch(() => {
        setUpdateSuccess(false);
      });
  };

  return (
    <div>
      <h1 style={{ color: "white", display: "block" }}>Todo List</h1>

      <Box
        className="profile-frame"
        sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}
        style={{
          backgroundColor: "rgb(25,118,210)",
          borderRadius: "3px",
        }}
      >
        <StyledPaper
          sx={{
            mx: "auto",
            m: 2,
            p: 0,
            bgcolor: "rgb(25,118,210)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              columnGap: "10px",
            }}
          >
            <TextField
              id="todo-field"
              label="Add a todo..."
              variant="filled"
              style={{ backgroundColor: "white" }}
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
            <Button
              variant="contained"
              style={{
                backgroundColor: "white",
                color: "rgb(25,118,210)",
                fontWeight: "bold",
              }}
              onClick={() => handleAddTodo(context)}
            >
              Add
            </Button>
          </div>
        </StyledPaper>
        {todos
          ? todos.map((todo, index) => (
              <StyledPaper
                sx={{
                  my: 1,
                  mx: "auto",
                  p: 2,
                  m: 2,
                }}
                key={index}
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
                    <Checkbox
                      key={index}
                      checked={todo.check}
                      onChange={() => handleUpdateTodo(todo, index)}
                    />

                    <Typography noWrap>
                      <b style={{ fontSize: "21px" }}>{todo.context}</b>
                    </Typography>
                    <IconButton
                      onClick={() => handleDeleteTodo(todo["id"])}
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
