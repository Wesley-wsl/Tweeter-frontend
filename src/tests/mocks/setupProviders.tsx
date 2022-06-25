import { render, RenderOptions } from "@testing-library/react";
import React, { FC, ReactElement } from "react";
import { ThemeProvider } from "styled-components";

import { IAuthContext } from "../../@types";
import { AuthContext } from "../../contexts/AuthContext";
import { dark } from "../../styles/themes";

export const authContextValue: IAuthContext = {
    user: { name: "None", avatar: "something", id: "2" },
    setUser: jest.fn(),
    loadingSignIn: false,
    signIn: jest.fn(),
};

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider theme={dark}>
            <AuthContext.Provider value={authContextValue}>
                {children}
            </AuthContext.Provider>
        </ThemeProvider>
    );
};

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
