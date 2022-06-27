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
        label="Completed"
        variant={viewCompleted ? "filled" : "outlined"}
        onClick={() => onToggle(true)}
      />
      <Chip
        label="Incomplete"
        variant={viewCompleted ? "outlined" : "filled"}
        onClick={() => onToggle(false)}
      />
    </Box>
  );
};
