import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Remove,
} from "@mui/icons-material";
import { TodoItem } from "../types";

interface PriorityIconProps {
  priority: TodoItem["priority"];
}

export const PriorityIcon = (props: PriorityIconProps) => {
  const { priority } = props;

  switch (priority) {
    case 0:
      return <KeyboardArrowDown color="success" />;
    case 2:
      return <KeyboardArrowUp color="error" />;
    case 1:
    default:
      return <Remove color="warning" />;
  }
};
