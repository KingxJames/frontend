// App.tsx
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Loader } from "./common/Loader/Loader";
import DefaultLayout from "./layout/DefaultLayout";
import { Login } from "./pages/Login/Login";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Settings } from "./pages/Settings/Settings";
import { AnonymousTips } from "./pages/Messages/AnonymousTips/AnonymousTips";
import { Emergencies } from "./pages/Messages/Emergencies/Emergencies";
import UBPrivateRoute from "./components/UBPrivateRoute/UBPrivateRoute";
import UBMessenger from "./components/UBMessenger/UBMessenger";
import {
  AccessRightsTable,
  BuildingsTable,
  CampusesTable,
  DepartmentMembersTable,
  DepartmentsTable,
  IncidentFilesTable,
  IncidentReportsTable,
  IncidentStatusesTable,
  IncidentTypesTable,
  RolesTable,
  UsersTable,
} from "./common/crudTables/crudTables";

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
                <Route
                  path="/Messages/Anonymous-Tips"
                  element={<AnonymousTips />}
                />
                <Route path="/Messages/Emergencies" element={<Emergencies />} />
                <Route path="/Messages/Chats" element={<UBMessenger />} />
                <Route path="/accessRights" element={<AccessRightsTable />} />
                <Route path="/buildings" element={<BuildingsTable />} />
                <Route path="/campuses" element={<CampusesTable />} />
                <Route
                  path="/departmentMembers"
                  element={<DepartmentMembersTable />}
                />
                <Route path="/departments" element={<DepartmentsTable />} />
                <Route
                  path="/incidentFiles"
                  element={<IncidentFilesTable />}
                />
                <Route
                  path="/incidentReports"
                  element={<IncidentReportsTable />}
                />
                <Route
                  path="/incidentStatuses"
                  element={<IncidentStatusesTable />}
                />
                <Route
                  path="/incidentTypes"
                  element={<IncidentTypesTable />}
                />
                <Route path="/roles" element={<RolesTable />} />
                <Route path="/users" element={<UsersTable />} />
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
