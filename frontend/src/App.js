import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { Loading } from "@nextui-org/react";

// Pages
const SignIn = React.lazy(() => import("./components/SignIn/SignIn"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const UserSignUp = React.lazy(() => import("./pages/User/UserSignUp.jsx"));
const MechanicSignUp = React.lazy(() =>
  import("./pages/Mechanic/MechanicSignUp.jsx")
);
const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));
const Profile = React.lazy(() => import("./components/Profile/Profile"));
const NotFound = React.lazy(() => import("./components/NotFound/NotFound"));
const ForgotPassword = React.lazy(() =>
  import("./pages/ForgotPassword/ForgotPassword")
);
const ResetPassword = React.lazy(() =>
  import("./pages/ForgotPassword/ResetPasword")
);
const Services = React.lazy(() => import("./pages/Services/Services"));
const MechServices = React.lazy(() =>
  import("./pages/MechServices/MechServices")
);
const UserRequests = React.lazy(() => import("./pages/Requests/UserRequests"));
const RequestDetails = React.lazy(() =>
  import("./pages/Requests/RequestDetails")
);
const MechanicRequests = React.lazy(() =>
  import("./pages/Requests/MechanicRequests")
);

const NearbyMechanics = React.lazy(() =>
  import("./components/NearbyMechanics/NearbyMechanics")
);

function App() {
  const { token, role } = useSelector((state) => state.auth);

  return (
    <>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              height: "100vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading type="default" size="xl" />
          </div>
        }
      >
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/user/signup" element={<UserSignUp />} />
            <Route path="/mechanic/signup" element={<MechanicSignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:resetToken"
              element={<ResetPassword />}
            />
            {token && role === "user" && (
              <Route path="/">
                <Route path="/nearbymechanics" element={<NearbyMechanics />} />
                <Route path="/user/profile" element={<Profile />} />
                <Route path="/user/requests" element={<UserRequests />} />
                <Route
                  path="/nearbymechanics/:mechname"
                  element={<MechServices />}
                />
                <Route
                  path="/user/requests/:requestId"
                  element={<RequestDetails />}
                />
              </Route>
            )}
            {token && role === "mechanic" && (
              <Route path="/">
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/mechanic/profile" element={<Profile />} />
                <Route path="/mechanic/services" element={<Services />} />
                <Route
                  path="/mechanic/requests"
                  element={<MechanicRequests />}
                />
                <Route
                  path="/mechanic/requests/:requestId"
                  element={<RequestDetails />}
                />
              </Route>
            )}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
