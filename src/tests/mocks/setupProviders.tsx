import { render, RenderOptions } from "@testing-library/react";
import React, { FC, ReactElement } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { SWRConfig } from "swr";

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
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                newestOnTop
                closeOnClick
                rtl={false}
                draggable={true}
                pauseOnHover
                transition={Zoom}
                theme="light"
            />
            <ThemeProvider theme={dark}>
                <AuthContext.Provider value={authContextValue}>
                    <SWRConfig value={{ dedupingInterval: 0 }}>
                        {children}
                    </SWRConfig>
                </AuthContext.Provider>
            </ThemeProvider>
        </>
    );
};

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
