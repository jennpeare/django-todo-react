import { Box, Chip } from "@mui/material";

interface TabListProps {
  onToggle: (displayCompleted: boolean) => void;
  viewCompleted: boolean;
}

export const TabList = (props: TabListProps) => {
  const { onToggle, viewCompleted } = props;

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Chip
        color={viewCompleted ? "primary" : "default"}
        label="Completed"
        onClick={() => onToggle(true)}
        variant={viewCompleted ? "filled" : "outlined"}
      />
      <Chip
        color={viewCompleted ? "default" : "primary"}
        label="Incomplete"
        onClick={() => onToggle(false)}
        variant={viewCompleted ? "outlined" : "filled"}
      />
    </Box>
  );
};
