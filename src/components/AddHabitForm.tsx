import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { addHabit } from "../store/habit.slice";

const AddHabitForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [frequency, setFrequency] = useState<"День" | "Неделя">("День");

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(
        addHabit({
          name,
          frequency,
        })
      );
      setName("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите задачу"
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Частота</InputLabel>
          <Select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as "День" | "Неделя")}
          >
            <MenuItem value="День">День</MenuItem>
            <MenuItem value="Неделя">Неделя</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Добавить
        </Button>
      </Box>
    </form>
  );
};
export default AddHabitForm;
