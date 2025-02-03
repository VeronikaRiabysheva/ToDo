import { Container, Typography } from "@mui/material";
import "./App.css";
import { HabitList } from "./components/HabitList";
import { HabitStats } from "./components/HabitStats";
import AddHabitForm from "./components/AddHabitForm";

function App() {
  return (
    <div>
      <Container maxWidth="md">
        <Typography component="h1" variant="h2" align="center">
          Список задач
        </Typography>
        <AddHabitForm />
        <HabitList />
        <HabitStats />
      </Container>
    </div>
  );
}

export default App;
