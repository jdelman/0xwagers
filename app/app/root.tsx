import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import type { MetaFunction } from "remix";

import Header from "~/components/Header";
import ConnectWalletModal from "~/components/ConnectWalletModal";
import { WalletContextProvider } from "./contexts/WalletContext";

import styles from "./styles/app.css";

export const meta: MetaFunction = () => {
  return { title: "0xwagers" };
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"},
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <script
          src="https://cdn.jsdelivr.net/npm/ipfs/dist/index.min.js"
          defer
        ></script>
      </head>
      <body id="root">
        <WalletContextProvider>
          <Header />
          <div className="p-3 lg:px-0 mx-auto max-w-3xl pb-24 leading-loose">
            <Outlet />
          </div>
          <ConnectWalletModal />
        </WalletContextProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
