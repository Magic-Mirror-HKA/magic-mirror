import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import "@fontsource/inter";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import ApplicationContainerComponent from "@/components/ApplicationContainerComponent";
import ThemeRegistry from "@/app/themeRegistry";
import { FullScreenContextProvider } from "@/context/FullScreenContext";
export const metadata: Metadata = {
    title: "Magic Mirror",
    description: "Magic Mirror",
};

type PropsRootLayout = {
    children: React.ReactNode;
};
export default function RootLayout(props: PropsRootLayout) {
    const { children } = props;
    return (
        <html lang="de">
            <body>
                <ThemeRegistry options={{ key: "joy" }}>
                    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                        <FullScreenContextProvider>
                            <ApplicationContainerComponent>
                                {children}
                            </ApplicationContainerComponent>
                        </FullScreenContextProvider>
                    </AppRouterCacheProvider>
                </ThemeRegistry>
            </body>
        </html>
    );
}
