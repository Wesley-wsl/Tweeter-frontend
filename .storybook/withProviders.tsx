import React from "react";
import GlobalStyles from "../src/styles/GlobalStyle";
import { AuthProvider } from "../src/contexts/AuthContext";
import { ThemeContextProvider } from "../src/contexts/Theme";
import { AnimatePresence } from "framer-motion";

const withProviders = story => (
    <>
        <ThemeContextProvider>
            <AuthProvider>
                <AnimatePresence exitBeforeEnter>
                    {story()}
                    <GlobalStyles />
                </AnimatePresence>
            </AuthProvider>
        </ThemeContextProvider>
    </>
);

export default withProviders;
