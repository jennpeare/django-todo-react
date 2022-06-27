import { Add } from "@mui/icons-material";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { ItemDialog } from "./components/ItemDialog";
import { ItemList } from "./components/ItemList";
import { TabList } from "./components/TabList";
import { TodoItem } from "./types";

export const Main = () => {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [showItemDialog, setShowItemDialog] = useState(false);
  const [activeItem, setActiveItem] = useState<TodoItem>({
    title: "",
    description: "",
    completed: false,
  });
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = async () => {
    try {
      const res = await axios.get("/api/todos/");
      setTodoList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTab = (displayCompleted: boolean) => {
    setViewCompleted(displayCompleted);
  };

  const createItem = () => {
    setActiveItem({ title: "", description: "", completed: false });
    setShowItemDialog(true);
  };

  const editItem = (item: TodoItem) => {
    setActiveItem(item);
    setShowItemDialog(true);
  };

  const saveItem = async (item: TodoItem) => {
    if (item.id) {
      await axios.put(`/api/todos/${item.id}/`, item);
    } else {
      await axios.post("/api/todos/", item);
    }
    setShowItemDialog(false);
    refreshList();
  };

  const deleteItem = async (item: TodoItem) => {
    await axios.delete(`/api/todos/${item.id}/`);
    refreshList();
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
      {showItemDialog ? (
        <ItemDialog
          activeItem={activeItem}
          onClose={() => setShowItemDialog(false)}
          onSave={saveItem}
        />
      ) : null}
    </Stack>
  );
};
