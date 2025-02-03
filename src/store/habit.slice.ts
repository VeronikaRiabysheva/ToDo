import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Habit {
  id: string;
  name: string;
  frequency: "День" | "Неделя";
  completedDates: string[];
  createdAt: string;
}

export interface HabitState {
  habits: Habit[];
  isLoading: boolean;
  error: string | null;
}
const initialState: HabitState = {
  habits: [],
  isLoading: false,
  error: null,
};

export const fetchHabits = createAsyncThunk("habits/fetchHabits", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const mockHabits: Habit[] = [
    {
      id: "1",
      name: "Выучить Redux toolkit",
      frequency: "День",
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Прочитать книгу",
      frequency: "День",
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
  ];
  return mockHabits;
});

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (
      state,
      action: PayloadAction<{
        name: string;
        frequency: "День" | "Неделя";
      }>
    ) => {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };

      state.habits.push(newHabit);
    },
    toggleHabit: (
      state,
      action: PayloadAction<{ id: string; date: string }>
    ) => {
      const habit = state.habits.find((h) => h.id === action.payload.id);

      if (habit) {
        const index = habit.completedDates.indexOf(action.payload.date);
        if (index > -1) {
          habit.completedDates.splice(index, 1);
        } else {
          habit.completedDates.push(action.payload.date);
        }
      }
    },
    removeHabit: (state, action: PayloadAction<{ id: string }>) => {
      const habit = state.habits.find(
        (newHabit) => newHabit.id === action.payload.id
      );
      if (habit) {
        const index = state.habits.indexOf(habit);
        state.habits.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHabits.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHabits.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch habits";
    });
    builder.addCase(fetchHabits.fulfilled, (state, action) => {
      state.isLoading = false;
      state.habits = action.payload;
    });
  },
});

export const { addHabit, toggleHabit, removeHabit } = habitSlice.actions;
export default habitSlice.reducer;
