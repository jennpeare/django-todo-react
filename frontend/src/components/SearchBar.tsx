import { Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export const SearchBar = (props: SearchBarProps) => {
  const { onSearch } = props;
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => onSearch(searchTerm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      onSearch("");
    }
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  return (
    <TextField
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end" onClick={() => onSearch(searchTerm)}>
              <Search />
            </IconButton>
          </InputAdornment>
        ),
      }}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Search..."
      size="small"
      sx={{ flex: "0 1 40%" }}
    />
  );
};
