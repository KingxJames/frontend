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
import CampusesTable from "./common/crudTables/campusesTable";
import IncidentTypesTable from "./common/crudTables/incidentTypesTable";
import UBMessengerListAnonymous from "./components/UBMessenger/UBMessengerList/UBMessengerListAnonymous";
import WhatsappWeb from "./pages/WhatsappWeb/WhatsappWeb";
import NotFound from "./pages/NotFound/NotFound";
import { FormNames } from "./pages/Forms/FormNames";
import { IncidentReportForm } from "./components/UBForms/incidentReportForm/incidentReportForm";
import { Reports } from "./pages/Reports/Reports";
import { EndOfShiftReportPatrol } from "../src/components/UBForms/endOfShiftReportPatrol/endOfShiftReportPatrol";
import { EndOfShiftReportSupervisor } from "../src/components/UBForms/endOfshiftReportSupervisor/endOfShiftReportSupervisor";

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
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/Settings" element={<Settings />} />
                <Route path="/Messages" element={<WhatsappWeb />} />
                <Route path="/Forms" element={<FormNames />} />
                <Route path="/Reports" element={<Reports />} />

                {/* ----------- messenger ----------- */}
                <Route
                  path="/anonymous"
                  element={<UBMessengerListAnonymous />}
                />
                {/* ----------- end of messenger ----------- */}

                {/* ----------- crud tables ----------- */}
                <Route path="/buildings" element={<BuildingsTable />} />
                <Route path="/users" element={<UsersTable />} />
                <Route path="/incidentTypes" element={<IncidentTypesTable />} />
                <Route path="/campuses" element={<CampusesTable />} />
                <Route
                  path="/incidentReports"
                  element={<IncidentReportTable />}
                />
                {/* ----------- end of crud tables ----------- */}

                {/* ----------- report forms ----------- */}

                <Route
                  path="/endOfShiftReportPatrol"
                  element={<EndOfShiftReportPatrol />}
                />

                <Route
                  path="/endOfShiftReportSupervisor"
                  element={<EndOfShiftReportSupervisor />}
                />

                <Route
                  path="/forms/incidentReportForm/:caseNumber"
                  element={<IncidentReportForm />}
                />
                {/* ----------- end of report forms ----------- */}
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
