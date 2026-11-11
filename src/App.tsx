import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import CustomerList from "./components/CustomerList";

function App() {
  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <CustomerList />
    </Container>
  )
}

export default App