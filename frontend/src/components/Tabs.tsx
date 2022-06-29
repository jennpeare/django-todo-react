import { Button, ButtonGroup } from "@mui/material";

interface TabListProps {
  onToggle: (displayCompleted: boolean) => void;
  viewCompleted: boolean;
}

export const Tabs = (props: TabListProps) => {
  const { onToggle, viewCompleted } = props;

  return (
    <ButtonGroup variant="contained">
      <Button
        onClick={() => onToggle(true)}
        variant={viewCompleted ? "contained" : "outlined"}
      >
        Completed
      </Button>
      <Button
        onClick={() => onToggle(false)}
        variant={viewCompleted ? "outlined" : "contained"}
      >
        Incomplete
      </Button>
    </ButtonGroup>
  );
};
