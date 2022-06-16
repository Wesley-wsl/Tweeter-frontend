import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";

import { IChildren, IThemeContext } from "../@types";
import { dark, light } from "../styles/themes";

export const ThemeContext = createContext({} as IThemeContext);

export function ThemeContextProvider({ children }: IChildren) {
    const { theme: theme } = parseCookies(null);

    const [lightMode, setLightMode] = useState(false);

    function toggleTheme() {
        if (lightMode) {
            destroyCookie(null, "theme", {
                path: "/",
            });
            setLightMode(false);
        }

        if (!lightMode) {
            setCookie(null, "theme", "light", {
                path: "/",
            });
            setLightMode(true);
        }
    }

    useEffect(() => {
        setLightMode(theme ? true : false);
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                setLightMode,
                lightMode,
                toggleTheme,
            }}
        >
            <ThemeProvider theme={lightMode === false ? dark : light}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}
