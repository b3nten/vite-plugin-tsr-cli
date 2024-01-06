import { Plugin } from "vite";
import { Config } from "@tanstack/router-cli/src/config";
import jiti from "jiti";
import { join } from "path";
import { readFile } from "fs/promises";

const generator = jiti(__dirname)(
	"@tanstack/router-cli/src/generator"
).generator;

const CONFIG_FILE_NAME = "tsr.config.json"

type UserConfig = Partial<Config>;

async function readConfigFile(path: string): Promise<UserConfig> {
	try {
		const raw = await readFile(path, "utf-8");
		return JSON.parse(raw) as UserConfig;
	} catch {
		return {} as UserConfig;
	}
}

async function buildConfig(config: UserConfig, root: string): Promise<Config> {
	const routesDirectory = config.routesDirectory ?? "./src/routes";
	const generatedRouteTree =
		config.generatedRouteTree ?? routesDirectory + ".gen.ts";
	const fileConfig = await readConfigFile(
		join(root, CONFIG_FILE_NAME )
	);
	return {
		...config,
		quoteStyle: config.quoteStyle ?? "single",
		routeFileIgnorePrefix: config.routeFileIgnorePrefix ?? "-",
		routesDirectory,
		generatedRouteTree,
		...fileConfig,
	};
}

export default function router(inlineConfig: UserConfig = {}): Plugin {
	let ROOT: string;
	let userConfig: Config;

	const generate = async () => {
		try {
			await generator(userConfig);
		} catch (err) {
			console.error(err);
			console.info();
		}
	};

	return {
		name: "vite-plugin-tanstack-router",
		configResolved: async (vite) => {
			ROOT = vite.root;
			userConfig = await buildConfig(inlineConfig, ROOT);
			await generate();
		},
		handleHotUpdate: async ({ file }) => {
			if (file === join(ROOT, CONFIG_FILE_NAME)) {
				userConfig = await buildConfig(inlineConfig, ROOT);
				return;
			}
			if (file.startsWith(join(ROOT, userConfig.routesDirectory))) {
				await generate();
			}
		},
	};
}
