import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Meetings from "./pages/meetings/Meetings";
import MeetingDetails from "./pages/meetings/MeetingDetails";
import CreateMeeting from "./pages/meetings/CreateMeeting";
import AppLayout from "./components/layout/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
  <Route element={<AppLayout />}>

    <Route
      path="/dashboard"
      element={<Dashboard />}
    />

    <Route
      path="/meetings"
      element={<Meetings />}
    />

      <Route
      path="/meetings/create"
      element={<CreateMeeting />}
    />

     <Route path="/meetings/:id" element={<MeetingDetails />} />
{/* 
    <Route
      path="/tasks"
      element={<Tasks />}
    />

    <Route
      path="/teams"
      element={<Teams />}
    /> */}

  </Route>
</Route>

        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;