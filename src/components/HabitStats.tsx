import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { RootState } from "../store/store";
import { fetchHabits } from "../store/habit.slice";
import { LinearProgress, Paper, Typography } from "@mui/material";
import { Habit } from "../store/habit.slice";

export const HabitStats: React.FC = () => {
  const { habits, isLoading, error } = useSelector(
    (state: RootState) => state.habits
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchHabits());
  }, []);

  const getCompletedToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return habits.filter((habit) => habit.completedDates.includes(today))
      .length;
  };

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

  const getLongetsStreak = () => {
    return Math.max(...habits.map(getStreak), 0);
  };

  if (isLoading) {
    return <LinearProgress />;
  }
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Статистика
      </Typography>
      <Typography variant="body1">Всего задач: {habits.length}</Typography>
      <Typography variant="body1">
        Завершено сегодня: {getCompletedToday()}
      </Typography>
      <Typography variant="body1">
        Максимальное время выполнения задачи: {getLongetsStreak()}
      </Typography>
    </Paper>
  );
};
