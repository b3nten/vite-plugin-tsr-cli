<div align="center">
<br />

![Archí](.github/banner.jpg)

<h3>vite-plugin-tsr-cli</h3>

#### Vite Plugin for Tanstack Router CLI Route Gen

[![Npm package yearly downloads](https://badgen.net/npm/dy/express)](https://npmjs.com/package/express)
[![GitHub stars](https://img.shields.io/github/stars/freeCodeCamp/freeCodeCamp.svg?style=social&label=Star&maxAge=2592000)](https://github.com/freeCodeCamp/freeCodeCamp)
[![NuGet stable version](https://badgen.net/nuget/v/newtonsoft.json)](https://nuget.org/packages/newtonsoft.json)

*Use the [Tanstack Router CLI](https://tanstack.com/router/v1/docs/api/router-cli) directly in Vite.*
</div>

## Usage

```js
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import router from "vite-plugin-tsr-cli";

export default defineConfig({
  plugins: [react(), router()]
})
```

The default route directory is `./src/routes` with the generated file living at `./src/routes.gen.ts`.


The available plugin options are the same as the [CLI Options](https://tanstack.com/router/v1/docs/api/router-cli), and can be defined in the vite config or in a `tsr.config.json` file in the root directory. Settings defined in the file take precedence over those defined in the vite config.

## License

Made with 💚

Published under [MIT License](./LICENSE).

