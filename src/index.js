import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

ReactDOM.render(
	<BrowserRouter>
		{/* <MantineProvider withGlobalStyles withNormalizeCSS> */}
		<App />
		{/* </MantineProvider> */}
	</BrowserRouter>,
	document.querySelector("#root")
);
