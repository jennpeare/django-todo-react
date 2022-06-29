import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Chip, Divider } from "@mui/material";
import { useState } from "react";
import { Sorter, SortState, SortType } from "../types";

interface ListOrderingProps {
  onSort: (sorters: Sorter[]) => void;
}

const getStateIcon = (state: SortState) => {
  switch (state) {
    case "asc":
      return <ArrowUpward />;
    case "desc":
      return <ArrowDownward />;
    default:
    case "off":
      return undefined;
  }
};

const getNextState = (state: SortState): SortState => {
  switch (state) {
    case "off":
      return "asc";
    case "asc":
      return "desc";
    case "desc":
      return "off";
  }
};

export const SortingChips = (props: ListOrderingProps) => {
  const { onSort } = props;
  const [sorters, setSorters] = useState<Sorter[]>([
    {
      name: "Priority",
      type: "priority",
      state: "off",
    },
    {
      name: "Title",
      type: "title",
      state: "off",
    },
    {
      name: "Due Date",
      type: "due_date",
      state: "off",
    },
  ]);

  const handleSort = (type: SortType) => {
    setSorters((prev) => {
      const updatedSorters = prev.map((s) => {
        if (s.type === type) {
          return { ...s, state: getNextState(s.state) };
        }
        return s;
      });
      onSort(updatedSorters);
      return updatedSorters;
    });
  };

  return (
    <Divider sx={{ "& > span": { display: "flex", gap: 1 } }}>
      {sorters.map(({ name, type, state }) => {
        return (
          <Chip
            icon={getStateIcon(state)}
            key={type}
            label={name}
            onClick={() => handleSort(type)}
            size="small"
            variant={state === "off" ? "outlined" : "filled"}
          />
        );
      })}
    </Divider>
  );
};
