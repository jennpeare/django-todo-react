import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { TabState } from "../types";

interface TabListProps {
  activeTab: TabState;
  onToggle: (tabState: TabState) => void;
}

export const Tabs = (props: TabListProps) => {
  const { activeTab, onToggle } = props;

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    nextView: TabState
  ) => {
    onToggle(nextView);
  };

  return (
    <ToggleButtonGroup exclusive onChange={handleChange} value={activeTab}>
      <ToggleButton value="all">All</ToggleButton>
      <ToggleButton value="complete">Complete</ToggleButton>
      <ToggleButton value="incomplete">Incomplete</ToggleButton>
    </ToggleButtonGroup>
  );
};
