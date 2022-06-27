import { Add } from "@mui/icons-material";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { ItemDialog } from "./components/ItemDialog";
import { ItemList } from "./components/ItemList";
import { TabList } from "./components/TabList";
import { TodoItem } from "./types";

const todoItems: TodoItem[] = [
  {
    id: 1,
    title: "Go to Market",
    description: "Buy ingredients to prepare dinner",
    completed: true,
  },
  {
    id: 2,
    title: "Study",
    description: "Read Algebra and History textbook for the upcoming test",
    completed: false,
  },
  {
    id: 3,
    title: "Sammy's books",
    description: "Go to library to return Sammy's books",
    completed: true,
  },
  {
    id: 4,
    title: "Article",
    description: "Write article on how to use Django with React",
    completed: false,
  },
];

export const Main = () => {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [activeItem, setActiveItem] = useState<TodoItem>({
    title: "",
    description: "",
    completed: false,
  });
  const [todoList, setTodoList] = useState<TodoItem[]>(todoItems);

  const toggleTab = (displayCompleted: boolean) => {
    setViewCompleted(displayCompleted);
  };

  const createItem = () => {
    setActiveItem({ title: "", description: "", completed: false });
    setShowAddItem(true);
  };

  const editItem = (item: TodoItem) => {
    setActiveItem(item);
    setShowAddItem(true);
  };

  const saveItem = (item: TodoItem) => {
    alert("save" + JSON.stringify(item));
  };

  const deleteItem = (item: TodoItem) => {
    alert("delete" + JSON.stringify(item));
  };

  return (
    <Stack sx={{ alignItems: "center" }}>
      <Typography variant="h4" sx={{ my: 2 }}>
        TODO APP
      </Typography>
      <Paper sx={{ p: 2, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TabList viewCompleted={viewCompleted} onToggle={toggleTab} />
          <Button variant="contained" startIcon={<Add />} onClick={createItem}>
            Add task
          </Button>
        </Box>
        <ItemList
          items={todoList.filter((t) => t.completed === viewCompleted)}
          onEdit={editItem}
          onDelete={deleteItem}
        />
      </Paper>
      {showAddItem ? (
        <ItemDialog
          activeItem={activeItem}
          onClose={() => setShowAddItem(false)}
          onSave={saveItem}
        />
      ) : null}
    </Stack>
  );
};
