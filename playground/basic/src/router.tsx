import { Router } from "@tanstack/react-router";
import { routeTree } from "./routes.gen";

// Set up a Router instance
export const router = new Router({
	routeTree,
	defaultPreload: "intent",
});

// Register things for typesafety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}


