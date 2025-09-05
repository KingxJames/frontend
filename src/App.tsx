// App.tsx
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Loader } from "./common/Loader/Loader";
import DefaultLayout from "./layout/DefaultLayout";
import { Login } from "./pages/Login/Login";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Settings } from "./pages/Settings/Settings";
import UBPrivateRoute from "./components/UBPrivateRoute/UBPrivateRoute";
import { UsersTable } from "./common/crudTables/usersTable";
import { IncidentReportTable } from "./common/crudTables/incidentReportsTable";
import { BuildingsTable } from "./common/crudTables/buildingsTable";
import UBMessengerListAnonymous from "./components/UBMessenger/UBMessengerList/UBMessengerListAnonymous";
import WhatsappWeb from "./pages/WhatsappWeb/WhatsappWeb";
import NotFound from "./pages/NotFound/NotFound";
import { FormNames } from "./pages/Forms/FormNames";
import { IncidentReportForm } from "./components/UBForms/incidentReportForm/incidentReportForm";

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
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      {/* Protected routes */}
      <Route element={<UBPrivateRoute />}>
        <Route
          path="*"
          element={
            <DefaultLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/Settings" element={<Settings />} />
                <Route path="/Messages" element={<WhatsappWeb />} />
                <Route path="/Forms" element={<FormNames />} />
                <Route
                  path="/anonymous"
                  element={<UBMessengerListAnonymous />}
                />
                <Route path="/buildings" element={<BuildingsTable />} />
                <Route path="/users" element={<UsersTable />} />
                <Route
                  path="/incidentReports"
                  element={<IncidentReportTable />}
                />
                <Route
                  path="/forms/incidentReportForm/:caseNumber"
                  element={<IncidentReportForm />}
                />
              </Routes>
            </DefaultLayout>
          }
        ></Route>
      </Route>
      {/* 404 Not Found */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
