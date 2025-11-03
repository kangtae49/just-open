
```sh
PS C:\sources\just-open> uv init src-py
Initialized project `src-py` at `C:\sources\just-open\src-py`
```

```sh
PS C:\sources\just-open> pnpm create vite src-react
.../19a3889f83d-540                      |   +1 +
.../19a3889f83d-540                      | Progress: resolved 1, reused 1, downloaded 0, added 1, done
│
◇  Select a framework:
│  React
│
◇  Select a variant:
│  TypeScript + React Compiler
│
◇  Use rolldown-vite (Experimental)?:
│  No
│
◇  Install with pnpm and start now?
│  No
│
◇  Scaffolding project in C:\sources\just-open\src-react...
│
└  Done. Now run:

  cd src-react
  pnpm install
  pnpm dev

```

```
Install the official redux devtools cli and remote server: npm i -D @redux-devtools/cli @redux-devtools/remote
Add an npm script for running the remote server: "start-redux-devtools": "redux-devtools --hostname=localhost --port=8001"
Modify your store to add a middleware that the remote server can connect to:
import { devToolsEnhancer } from "@redux-devtools/remote";

export const store = configureStore({
  ...,
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(devToolsEnhancer({ realtime: true, hostname: "localhost", port: 8001 }))
});
Run your app server and the remote server in separate terminals: npm start/npm run start-redux-devtools
Open the Redux DevTools tool window within IntelliJ, click the "Settings" tab at the top, and set the port to match the remote server ("8001" for this example). Click "Connect".
Trigger some actions from your app server and you should see it update within the tool window.
```

## .idea/just-open.iml
- `<sourceFolder url="file://$MODULE_DIR$/src-py" isTestSource="false" />`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<module type="EMPTY_MODULE" version="4">
  <component name="FacetManager">
    <facet type="Python" name="Python facet">
      <configuration sdkName="uv (src-py)" />
    </facet>
  </component>
  <component name="NewModuleRootManager" inherit-compiler-output="true">
    <exclude-output />
    <content url="file://$MODULE_DIR$/">
      <excludeFolder url="file://$MODULE_DIR$/src-py/.venv" />
      <sourceFolder url="file://$MODULE_DIR$/src-py" isTestSource="false" />
    </content>
    <orderEntry type="inheritedJdk" />
    <orderEntry type="sourceFolder" forTests="false" />
    <orderEntry type="library" name="uv (src-py) interpreter library" level="application" />
  </component>
</module>
```