import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { SWRConfig } from "swr";
import { AppProvider } from "../store/context";
import { fetcher } from "../lib/fetcher";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import AppLayout from "../layouts/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ChakraProvider resetCSS={true}>
      <AppProvider>
        <SWRConfig
          value={{
            refreshInterval: 0,
            fetcher: fetcher,
          }}
        >
          <AppLayout>
            <AnimatePresence
              exitBeforeEnter
              initial={false}
              onExitComplete={() => window.scrollTo(0, 0)}
            >
              <Box key={router.route}>
                <Component {...pageProps} />
              </Box>
            </AnimatePresence>
          </AppLayout>
        </SWRConfig>
      </AppProvider>
    </ChakraProvider>
  );
}
