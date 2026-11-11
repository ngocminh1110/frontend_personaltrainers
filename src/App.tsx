import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Routes, Route, Navigate } from "react-router";
import NavBar from "./components/NavBar";
import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";

function App() {
  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/customers" />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/trainings" element={<TrainingList />} />
      </Routes>
    </Container>
  )
}

export default App