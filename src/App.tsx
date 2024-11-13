// App.tsx
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
// import { UBHeader } from "./components/UBHeader/UBHeader";
import { Loader } from "./common/Loader/Loader";
import DefaultLayout from "./layout/DefaultLayout";
import { Login } from "./pages/Login/Login";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Settings } from "./pages/Settings/Settings";
import { AnonymousTips } from "./pages/Messages/AnonymousTips/AnonymousTips";
import { Emergencies } from "./pages/Messages/Emergencies/Emergencies";
import Chats from "./pages/Messages/Chats/Chat";
import UBPrivateRoute from "./components/UBPrivateRoute/UBPrivateRoute";

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
                                <Route
                                    path="/Settings"
                                    element={<Settings />}
                                />
                                <Route
                                    path="/Messages/Anonymous-Tips"
                                    element={<AnonymousTips />}
                                />
                                <Route
                                    path="/Messages/Emergencies"
                                    element={<Emergencies />}
                                />
                                <Route
                                    path="/Messages/Chats"
                                    element={<Chats />}
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
