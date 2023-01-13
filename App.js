import React from "react";

// Navigator
import { NativeBaseProvider, extendTheme } from "native-base";

// Routers
import Router from "./components/Router";

export default function App() {
  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        textColor: '#048345',
        error: '#FF7572',
        200: '#A2D4EC',
        300: '#7AC1E4',
        400: '#47A9DA',
        500: '#0088CC',
        600: '#007AB8',
        700: '#006BA1',
        800: '#005885',
        900: '#003F5E',
      },
      // Redefining only one shade, rest of the color will remain same.
      amber: {
        400: '#d97706',
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'light',
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <Router />
    </NativeBaseProvider>
  );
}
