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
import { UserStatusesTable } from "./common/crudTables/userStatusesTable";
import { UserCampusTable } from "./common/crudTables/userCampusesTable";
import { RecipientTable } from "./common/crudTables/recipientTable";
import { MessageCategoriesTable } from "./common/crudTables/messageCategoriesTable";
import { MenuTable } from "./common/crudTables/menuTable";
import { AccessRightsTable } from "./common/crudTables/accessRightsTable";
import { UsersTable } from "./common/crudTables/usersTable";
import { IncidentTypesTable } from "./common/crudTables/incidentTypesTable";
import { IncidentStatusesTable } from "./common/crudTables/incidentStatusesTable";
import { IncidentReportTable } from "./common/crudTables/incidentReportsTable";
import { IncidentFilesTable } from "./common/crudTables/incidentFilesTable";
import { DepartmentsTable } from "./common/crudTables/departmentsTable";
import { DepartmentMembersTable } from "./common/crudTables/departmentMembersTable";
import { SubMenusTable } from "./common/crudTables/subMenusTable";
import { CampusesTable } from "./common/crudTables/campusesTable";
import { BuildingsTable } from "./common/crudTables/buildingsTable";
import { RolesTable } from "./common/crudTables/roleTable";

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
                <Route path="/incidentTypes" element={<IncidentTypesTable />} />
                <Route path="/roles" element={<RolesTable />} />
                <Route path="/users" element={<UsersTable />} />
                <Route
                  path="/departmentMembers"
                  element={<DepartmentMembersTable />}
                />
                <Route path="/departments" element={<DepartmentsTable />} />
                <Route path="/incidentFiles" element={<IncidentFilesTable />} />
                <Route
                  path="/incidentReports"
                  element={<IncidentReportTable />}
                />
                <Route
                  path="/incidentStatuses"
                  element={<IncidentStatusesTable />}
                />
                {/* <Route path="/menus" element={<MenuTable />} /> */}
                <Route
                  path="/messageCategories"
                  element={<MessageCategoriesTable />}
                />
                {/* <Route path="/recipients" element={<RecipientTable />} /> */}
                {/* <Route path="/subMenus" element={<SubMenusTable />} /> */}
                <Route path="/userCampuses" element={<UserCampusTable />} />
                <Route path="/userStatuses" element={<UserStatusesTable />} />
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
