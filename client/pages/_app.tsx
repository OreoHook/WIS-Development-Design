import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { SWRConfig } from "swr";
import { AppProvider } from "../store/context";
import { fetcher } from "../lib/fetcher";
import AppLayout from "../layouts/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Для работы ui кита Chakra ui */}
      <ChakraProvider resetCSS={true}>
        {/* Для работы с контекстом приложения ( открытие формы создать, обновить, закрытие формы ) */}
        <AppProvider>
          {/* Для работы с сетью и перезапроса данных */}
          <SWRConfig
            value={{
              refreshInterval: 0,
              fetcher: fetcher,
            }}
          >
            {/* Каркас для приложения ( верхний бар с кнопками, модалка ) */}
            <AppLayout>
              {/* Сюда вставляется компонент другой страницы, например Home из index файла в текущей папке */}
              <Component {...pageProps} />
            </AppLayout>
          </SWRConfig>
        </AppProvider>
      </ChakraProvider>
    </>
  );
}
