import { useState, useEffect, useMemo } from "react";
import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ConfigProvider } from "antd";
import routes from "./routes.jsx";
import RoutesContext from "./contexts/routesContext.js";
import { ResultContextProvider } from "./contexts/resultContext";
import PageInfoContextProvider from "./contexts/PageInfoContext.jsx";
import { lightTheme, darkTheme } from "./configs/theme.js";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import buildAbility from "@/utils/buildAbility.js";
import { useSelector, useDispatch } from "react-redux";
import { setAbility } from "./slices/AbilitySlice.js";
import { ThemeProvider } from "styled-components";
import ar_Eg from "antd/lib/locale/ar_EG";
import en_US from "antd/lib/locale/en_US";
import getUserHome from "./utils/getUserHome.js";
const client = new QueryClient();

function App() {
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  console.log(routesFromUser(routes, user));
  const router = createHashRouter(routesFromUser(routes, user));

  function getDirectionFromLanguage() {
    return i18n.language === "ar" ? "rtl" : "ltr";
  }
  function getLocaleFromLanguage() {
    return i18n.language === "ar" ? ar_Eg : en_US;
  }

  useEffect(() => {
    if (user) {
      dispatch(setAbility(buildAbility(user)));
    }
  }, [user]);

  return (
    <QueryClientProvider client={client}>
      <RoutesContext.Provider value={{ routes: routes }}>
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <ConfigProvider
            theme={theme === "light" ? lightTheme : darkTheme}
            direction={getDirectionFromLanguage()}
            locale={getLocaleFromLanguage()}
          >
            <ResultContextProvider>
              <PageInfoContextProvider>
                <RouterProvider router={router} />
              </PageInfoContextProvider>
            </ResultContextProvider>
          </ConfigProvider>
        </ThemeProvider>
      </RoutesContext.Provider>
    </QueryClientProvider>
  );
}
function routesFromUser(routes, user) {
  if (!user) {
    return [
      ...routes.filter((route) => !route.isPrivate),
      {
        path: "*",
        element: <Navigate to={"/auth/login"} />,
      },
    ];
  }
  return [
    ...routes.slice(1),
    {
      index: true,
      element: <Navigate to={getUserHome(user)} />,
    },
  ];
}
export default App;
