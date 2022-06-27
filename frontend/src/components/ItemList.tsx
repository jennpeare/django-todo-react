import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { TodoItem } from "../types";

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
            alignItems="flex-start"
            secondaryAction={
              <>
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
            <ListItemText primary={item.title} secondary={item.description} />
          </ListItem>
          {index !== items.length - 1 ? <Divider component="li" /> : null}
        </Box>
      ))}
    </List>
  );
};
