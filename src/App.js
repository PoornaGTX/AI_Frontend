import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppContext } from "./context/appContext";
import {
  Landing,
  Error,
  Register,
  FrogetPassword,
  ProtectedRoute,
  PasswordRest,
} from "./pages"; //this is export from index.js in pages
import {
  Profile,
  Method,
  SharedLayout,
  ReasonHistory,
  AdminUpdateUser,
  Occupation,
  Reason,
  Education,
  EducationHistory,
} from "./pages/dashboard";
function App() {
  const { user } = useAppContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="/" element={<Reason />} />
          <Route path="method" element={<Method />} />
          <Route path="reason-histroy" element={<ReasonHistory />} />
          <Route path="admin-update" element={<AdminUpdateUser />} />
          <Route path="occupation" element={<Occupation />} />

          <Route path="education" element={<Education />} />
          <Route path="education-history" element={<EducationHistory />} />
        </Route>

        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login/frogetpassword" element={<FrogetPassword />} />
        <Route path="/reset-password/:id/:token" element={<PasswordRest />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
