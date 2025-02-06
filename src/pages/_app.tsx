
import AppQueryProvider from "@components/QueryClientProvider";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppQueryProvider>
        <Component {...pageProps} />
      </AppQueryProvider>
    </SessionProvider>
  );
}