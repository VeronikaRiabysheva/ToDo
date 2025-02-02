import { RootState } from "../store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Grid2,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { CheckCircle, Delete, Hail } from "@mui/icons-material";
import { AppDispatch } from "../store/store";
import { Habit, toggleHabit } from "../store/habit.slice";

export const HabitList: React.FC = () => {
  const { habits } = useSelector((state: RootState) => state.habits);

  const dispatch = useDispatch<AppDispatch>();
  const today = new Date().toISOString().split("T")[0];

  const getStreak = (habit: Habit) => {
    let streak = 0;
    const currentDate = new Date();

    while (true) {
      const dateString = currentDate.toISOString().split("T")[0];
      if (habit.completedDates.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      {habits.map((habit) => {
        return (
          <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
            <Grid2 container alignItems={"center"}>
              <Grid2>
                <Typography variant="h6">{habit.name}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textTransform: "capitalize" }}
                >
                  {habit.frequency}
                </Typography>
              </Grid2>
            </Grid2>
            <Grid2 xs={12} sm={6}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <Button
                  variant="outlined"
                  color={
                    habit.completedDates.includes(today) ? "success" : "primary"
                  }
                  startIcon={<CheckCircle></CheckCircle>}
                  onClick={() =>
                    dispatch(toggleHabit({ id: habit.id, date: today }))
                  }
                >
                  {habit.completedDates.includes(today)
                    ? "Completed"
                    : "Mark Complete"}
                </Button>
                <Button variant="outlined" color="error" startIcon={<Delete />}>
                  Remove
                </Button>
              </Box>
            </Grid2>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                Current Streak: {getStreak(habit)} days
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(getStreak(habit) / 30) * 100}
                sx={{ mt: 1 }}
              />
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
};
