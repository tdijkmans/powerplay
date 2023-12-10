import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import "./reset.scss";

const getRootElem = () => {
	const rootElem = document.getElementById("root");

	if (!rootElem) {
		throw new Error("Root element not found");
	}

	return rootElem;
};

ReactDOM.createRoot(getRootElem()).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
