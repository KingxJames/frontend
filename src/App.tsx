// App.tsx
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Loader } from "./common/Loader/Loader";
import DefaultLayout from "./layout/DefaultLayout";
import { Login } from "./pages/Login/Login";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Settings } from "./pages/Settings/Settings";
import UBPrivateRoute from "./components/UBPrivateRoute/UBPrivateRoute";
import UBMessenger from "./components/UBMessenger/UBMessenger";
import { UsersTable } from "./common/crudTables/usersTable";
import { IncidentReportTable } from "./common/crudTables/incidentReportsTable";
import { BuildingsTable } from "./common/crudTables/buildingsTable";
import UBMessengerListAnonymous from "./components/UBMessenger/UBMessengerList/UBMessengerListAnonymous";

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<UBPrivateRoute />}>
        <Route
          path="*"
          element={
            <DefaultLayout>
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="/Settings" element={<Settings />} />

              
                <Route path="/Messages" element={<UBMessenger />} />
                <Route path="/anonymous" element={<UBMessengerListAnonymous />} />


                <Route path="/buildings" element={<BuildingsTable />} />
                <Route path="/users" element={<UsersTable />} />
                <Route
                  path="/incidentReports"
                  element={<IncidentReportTable />}
                />
              </Routes>
            </DefaultLayout>
          }
        ></Route>
      </Route>
      <Route path="/*" element={<Navigate to={"/Login"} />} />
    </Routes>
  );
};

export default App;
