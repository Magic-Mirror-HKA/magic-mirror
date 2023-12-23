import { extendTheme } from "@mui/joy/styles";

export const deepPurpleTheme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    50: "#ede8f1",
                    100: "#d1c5dd",
                    200: "#b29ec6",
                    300: "#9377af",
                    400: "#7c599d",
                    500: "#653c8c",
                    600: "#5d3684",
                    700: "#532e79",
                    800: "#49276f",
                    900: "#371a5c",
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    "50": "#f8fafc",
                    "100": "#f1f5f9",
                    "200": "#e2e8f0",
                    "300": "#cbd5e1",
                    "400": "#94a3b8",
                    "500": "#653C8C",
                    "600": "#5e35b1",
                    "700": "#334155",
                    "800": "#1e293b",
                    "900": "#0f172a",
                },
            },
        },
    },
});
