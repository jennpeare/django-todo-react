import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import { TodoItem } from "../types";

interface ItemDialogProps {
  activeItem: TodoItem;
  onClose: () => void;
  onSave: (item: TodoItem) => void;
}

export const ItemDialog = (props: ItemDialogProps) => {
  const { activeItem: item, onClose, onSave } = props;
  const [activeItem, setActiveItem] = useState<TodoItem>(item);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setActiveItem((prev) => ({ ...prev, completed: e.target.checked }));
    } else {
      setActiveItem((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePriorityChange = (e: SelectChangeEvent<Number>) => {
    setActiveItem((prev) => ({ ...prev, priority: e.target.value as number }));
  };

  const handleDateChange = (newDate: Date | null) => {
    setActiveItem((prev) => ({
      ...prev,
      due_date: newDate ? format(newDate, "yyyy-MM-dd") : null,
    }));
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth>
      <DialogTitle>Todo Item</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          margin="dense"
          name="title"
          onChange={handleChange}
          placeholder="Enter Todo Title"
          required
          value={activeItem.title}
        />

        <TextField
          fullWidth
          label="Description"
          margin="dense"
          multiline
          name="description"
          onChange={handleChange}
          placeholder="Enter Todo description"
          required
          rows={2}
          value={activeItem.description}
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl fullWidth margin="dense" required>
            <InputLabel>Priority</InputLabel>
            <Select
              label="Priority"
              onChange={handlePriorityChange}
              value={activeItem.priority}
            >
              <MenuItem value={0}>Low</MenuItem>
              <MenuItem value={1}>Medium</MenuItem>
              <MenuItem value={2}>High</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <DatePicker
              label="Due Date"
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
              value={activeItem.due_date ? parseISO(activeItem.due_date) : null}
            />
          </FormControl>
        </Box>

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={activeItem.completed}
                onChange={handleChange}
              />
            }
            label="Completed"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={() => onSave(activeItem)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
