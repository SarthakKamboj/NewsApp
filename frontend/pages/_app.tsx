import type { AppProps } from "next/app";
import "../styles/app.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

import {
    faCheckSquare,
    faSearch,
    faNewspaper,
    faCaretRight,
    faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(
    fab,
    faExternalLinkAlt,
    faCaretRight,
    faNewspaper,
    faSearch,
    faCheckSquare
);

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
