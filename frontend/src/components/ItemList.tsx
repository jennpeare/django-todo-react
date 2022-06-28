import { Delete, Edit, Schedule } from "@mui/icons-material";
import {
  Box,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { TodoItem } from "../types";
import { PriorityIcon } from "./PriorityIcon";

interface ItemListProps {
  onDelete: (item: TodoItem) => void;
  onEdit: (item: TodoItem) => void;
  items: TodoItem[];
}

export const ItemList = (props: ItemListProps) => {
  const { items, onDelete, onEdit } = props;

  return (
    <List sx={{ width: "100%" }}>
      {items.map((item, index) => (
        <Box key={item.id}>
          <ListItem
            secondaryAction={
              <>
                {item.due_date ? (
                  <Chip
                    icon={<Schedule />}
                    label={item.due_date}
                    size="small"
                    sx={{ mr: 3 }}
                  />
                ) : null}
                <IconButton onClick={() => onEdit(item)}>
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  color="error"
                  sx={{ ml: 2 }}
                  onClick={() => onDelete(item)}
                >
                  <Delete />
                </IconButton>
              </>
            }
          >
            <ListItemIcon>
              <PriorityIcon priority={item.priority} />
            </ListItemIcon>
            <ListItemText primary={item.title} secondary={item.description} />
          </ListItem>
          {index !== items.length - 1 ? <Divider component="li" /> : null}
        </Box>
      ))}
    </List>
  );
};
