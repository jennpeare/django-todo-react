import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
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
          rows={2}
          value={activeItem.description}
        />
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
