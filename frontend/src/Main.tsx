import { Add } from "@mui/icons-material";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { ItemDialog } from "./components/ItemDialog";
import { ItemList } from "./components/ItemList";
import { SearchBar } from "./components/SearchBar";
import { Tabs } from "./components/Tabs";
import { Sorter, TodoItem } from "./types";

const getNewItem = (): TodoItem => ({
  title: "",
  description: "",
  completed: false,
  priority: 0,
  due_date: null,
});

export const Main = () => {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [showItemDialog, setShowItemDialog] = useState(false);
  const [activeItem, setActiveItem] = useState<TodoItem>(getNewItem());
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
    setActiveItem(getNewItem());
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

  const handleSearch = async (searchTerm: string) => {
    const res = await axios.get(`/api/todos/?search=${searchTerm}`);
    setTodoList(res.data);
  };

  const handleSort = async (sorters: Sorter[]) => {
    const query = sorters
      .map((sorter) => {
        if (sorter.state === "off") return "";
        return `${sorter.state === "desc" ? "-" : ""}${sorter.type}`;
      })
      .filter((q) => q !== "")
      .join(",");
    const res = await axios.get(`/api/todos/?ordering=${query}`);
    setTodoList(res.data);
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
            mb: 2,
          }}
        >
          <Tabs viewCompleted={viewCompleted} onToggle={toggleTab} />
          <SearchBar onSearch={handleSearch} />
          <Button variant="contained" startIcon={<Add />} onClick={createItem}>
            Add task
          </Button>
        </Box>
        <ItemList
          items={todoList.filter((t) => t.completed === viewCompleted)}
          onEdit={editItem}
          onDelete={deleteItem}
          onSort={handleSort}
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
