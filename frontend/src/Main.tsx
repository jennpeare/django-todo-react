import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { ItemDialog } from "./components/ItemDialog";
import { ItemList } from "./components/ItemList";
import { SearchBar } from "./components/SearchBar";
import { Tabs } from "./components/Tabs";
import { Sorter, TabState, TodoItem } from "./types";

const ITEMS_PER_PAGE = 5;

const getNewItem = (): TodoItem => ({
  title: "",
  description: "",
  completed: false,
  priority: 0,
  due_date: null,
});

export const Main = () => {
  const [activeTab, setActiveTab] = useState<TabState>("all");
  const [showItemDialog, setShowItemDialog] = useState(false);
  const [activeItem, setActiveItem] = useState<TodoItem>(getNewItem());
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [meta, setMeta] = useState<{
    count: number;
    next: string | null;
    previous: string | null;
  }>({ count: 0, next: null, previous: null });
  const [currentPage, setCurrentPage] = useState<number>(1);

  const refreshList = async (page?: number) => {
    try {
      const res = await axios.get(`/api/todos/?page=${page ?? currentPage}`);
      const { count, next, previous, results } = res.data;
      setTodoList(results);
      setMeta({ count, next, previous });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refreshList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTab = (tabState: TabState) => {
    setActiveTab(tabState);
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

  const handlePagination = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    refreshList(page);
  };

  return (
    <Paper
      component={Stack}
      spacing={2}
      sx={{ p: 2, width: "100%", minHeight: 600 }}
    >
      <Typography variant="h4" sx={{ alignSelf: "center" }}>
        TODO APP
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Tabs activeTab={activeTab} onToggle={toggleTab} />
        <SearchBar onSearch={handleSearch} />
        <Button variant="contained" startIcon={<Add />} onClick={createItem}>
          Add task
        </Button>
      </Box>

      <ItemList
        items={
          activeTab === "all"
            ? todoList
            : todoList.filter((t) => t.completed !== (activeTab === "complete"))
        }
        onEdit={editItem}
        onDelete={deleteItem}
        onSort={handleSort}
        sx={{ flex: "1 0 auto" }}
      />

      {meta.count !== 0 ? (
        <Pagination
          count={Math.ceil(meta.count / ITEMS_PER_PAGE)}
          onChange={handlePagination}
          sx={{ alignSelf: "center" }}
        />
      ) : null}
      {showItemDialog ? (
        <ItemDialog
          activeItem={activeItem}
          onClose={() => setShowItemDialog(false)}
          onSave={saveItem}
        />
      ) : null}
    </Paper>
  );
};
