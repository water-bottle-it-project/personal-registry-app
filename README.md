<div align="center">

<img src="public/icon.png" alt="logo" width="100" height="auto" />
  <h1>SnapSave</h1>
  
  [![build](https://github.com/water-bottle-it-project/personal-registry-app/actions/workflows/build.yml/badge.svg)](https://github.com/water-bottle-it-project/personal-registry-app/actions/workflows/build.yml)
  [![Website](https://img.shields.io/website?down_color=red&down_message=offline&label=deployment&up_color=green&up_message=online&url=https%3A%2F%2Fpersonal-registry-app-zx936.ondigitalocean.app%2F)](https://personal-registry-app-zx936.ondigitalocean.app/)

  <p>
   We are Team 055 (Water Bottle). Our team consists of Ian, Kian, Sean, Jack and Calvin.
  </p>

<h4>
    <a href="https://personal-registry-app-zx936.ondigitalocean.app/">View deployed demo</a>
  <span> · </span>
    <a href="https://water-bottle.atlassian.net/wiki/spaces/DEV/pages/66440/Team+Tools">Documentation</a>
  </h4>
</div>

<br />

## :star2: About the Project

SnapSave is a web app developed for COMP30022 IT Project Semester 2 2022, which allows users to
upload memories containing optional textual descriptions and photos, organise memories into
collections, and search their memories and photos.

[View deployed demo](https://personal-registry-app-zx936.ondigitalocean.app/)

## :orange_book: Documentation

[All documentation is located on our Confluence space. ](https://water-bottle.atlassian.net/wiki/spaces/DEV/pages/66440/Team+Tools)
We have done this to provide a single source of truth, since we have a lot of regularly-updated
documentation!

It also has all the links to tools used e.g. Jira for task tracking, Slack for communication, Figma
for design etc.

We have mirrored just the app build and contributing instructions here only. For all links to tools
& assessable documentation e.g. meeting notes, requirements, design etc. please go to the Confluence
linked above.

## :key: Environment Variables

To build the app or use dev mode to see a live preview of code changes, please reach out to a team
member (details at the bottom) for an `.env.local` file to add to your project. **Otherwise, you
cannot start the app and authentication will not work.**

## :bangbang: Building the app

1. Install node.js, minimum version 16.10 using https://nodejs.org/en/ (the LTS version) or using
   nvm https://github.com/nvm-sh/nvm, if you don't already have node.js installed.
   ```bash
   $ node -v
   v16.15.1 // just needs to be 16.10 or newer
   ```
2. We are using yarn, not the regular included npm, as our package manager. Visit
   https://yarnpkg.com/getting-started/install#install-corepack, using `corepack enable` (which is
   available by default with node.js 16.10+). If reason corepack isn't a recognized command (this is
   _unlikely_ to occur if you have installed at least version 16.10 of node.js), then first run
   `npm i -g corepack`. After finishing this step, do not use the `npm` command for this project.
3. Clone this repo. `git clone https://github.com/water-bottle-it-project/personal-registry-app`
4. Go to the project directory using `cd personal-registry-app`
5. Checkout the branch that has been requested to be assessed, or stay on main if none has been
   specified.
6. Copy the provided `.env.local` file into the root folder. You need it or else the app will not
   build and authentication will not work. Please make sure it is `.env.local`, **not** `env.local`
   or anything else.

   When downloading the `.env.local` file from Slack or your email, it might get automatically
   renamed to a different name – you will have to rename the file to `.env.local` exactly. If you
   cannot see the file, then it may be because your system is set to hide hidden files (which begin
   with a `.`). To fix this, see Note 1.

   **Note 1:** by default, files beginning with `.` are hidden files in the macOS Finder and Linux.
   On macOS, press `Cmd` `Shift` `.` in Finder to toggle showing hidden files. In the terminal, the
   `-a` flag shows all files.

   **Note 2:** if your computer (particularly macOS) complains that it cannot make the filename
   begin with a dot, you can still rename the file through the Terminal using the `mv` command:

   ```
   # Rename files through the terminal
   $ ls -a
   .		..		env.local

   $ mv env.local .env.local

   $ ls -a
   .		..		.env.local
   ```

   Check that the root folder looks like this using either the screenshot or the terminal command
   below.

   - **screenshot** of folder structure inside VSCode, showing `.env.local` at the top level of the
     directory:

      <p align="center">
        <img width="350" src="help/env_file_location.png" alt="Screenshot of .env.local file location" style="margin-right: 20px; border: 3px solid">
      </p>

   - **terminal command**: output after running `tree -L 1 -a` which shows `.env.local` and the
     folder structure in the terminal:

     ```
     # terminal output
     ~/Users/me/Code/personal-registry-app
     $ tree -L 1 -a
     .
     ├── .DS_Store
     ├── .editorconfig
     ├── .env.local
     ├── .env.local.example
     ├── .eslintignore
     ├── .eslintrc.json
     ├── .git
     ├── .gitattributes
     ├── .github
     ├── .gitignore
     ├── .idea
     ├── .next
     ├── .prettierignore
     ├── .prettierrc.json
     ├── .vscode
     ├── README.md
     ├── confluence
     ├── help
     ├── mermaid
     ├── next-env.d.ts
     ├── next.config.js
     ├── node_modules
     ├── package.json
     ├── public
     ├── src
     ├── tsconfig.json
     └── yarn.lock

     11 directories, 16 files
     ```

7. Run `yarn`. This will install all the dependencies needed to test the application. **You need to
   do this to prevent red squiggles which indicate problems/errors in your editor (VSCode, IntelliJ,
   etc) when reading code**.
8. Run `yarn build && yarn start`. Once this has completed, you should see a link to open the page
   in the browser (by default `localhost:3000`).

   ```
   info  - SWC minify release candidate enabled. https://nextjs.link/swcmin
   info  - Linting and checking validity of types
   info  - Creating an optimized production build
   info  - Compiled successfully
   info  - Collecting page data
   info  - Generating static pages (18/18)
   info  - Finalizing page optimization

   Route (pages)                              Size     First Load JS
   ┌ ○ /                                      57.5 kB         357 kB
   ├   /_app                                  0 B             226 kB
   ├ ○ /404                                   6.6 kB          306 kB
   ├ ○ /about                                 10.8 kB         236 kB
   ├ λ /api/auth/signin                       0 B             226 kB
   ├ λ /api/auth/signout                      0 B             226 kB
   ├ λ /api/trpc/[trpc]                       0 B             226 kB
   ├ ○ /collections                           5.23 kB         336 kB
   ├ ○ /collections/[id]                      2.96 kB         310 kB
   ├ ○ /collections/create                    2.25 kB         255 kB
   ├ ○ /collections/edit                      434 B           331 kB
   ├ ○ /create                                6.66 kB         631 kB
   ├ ○ /debug/authed                          1.49 kB         227 kB
   ├ ○ /forgotpassword                        1.1 kB          250 kB
   ├ ○ /memories                              3.7 kB          321 kB
   ├ ○ /memories/[id]                         21.2 kB         598 kB
   ├   └ css/b0d7eac1e0377b2a.css             1.88 kB
   ├ ○ /memories/[id]/edit                    8.91 kB         707 kB
   ├ ○ /photos                                25.6 kB         340 kB
   ├   └ css/b68d142d44689e33.css             1.59 kB
   ├ ○ /profile                               6.21 kB         255 kB
   ├ ○ /signin                                6.86 kB         256 kB
   └ ○ /signup                                3.8 kB          253 kB
   + First Load JS shared by all              226 kB
     ├ chunks/framework-9b5d6ec4444c80fa.js   45.7 kB
     ├ chunks/main-3123a443c688934f.js        30.9 kB
     ├ chunks/pages/_app-8baed015ed77f06b.js  148 kB
     └ chunks/webpack-84209fb2022d3d30.js     1.05 kB

   λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
   ○  (Static)  automatically rendered as static HTML (uses no initial props)

   ✨  Done in 20.76s.
   ```

   **Caution #1:** if you have other projects running, you should close them first, or else the port
   might not be able to bind:

   ```bash
   Error: listen EADDRINUSE: address already in use 0.0.0.0:3000
       at Server.setupListenHandle [as _listen2] (node:net:1372:16)
       at listenInCluster (node:net:1420:12)
       at doListen (node:net:1559:7)
       at processTicksAndRejections (node:internal/process/task_queues:84:21) {
     code: 'EADDRINUSE',
     errno: -48,
     syscall: 'listen',
     address: '0.0.0.0',
     port: 3000
   }
   ```

   **Caution #2:** if you receive the following error, then you forgot to include the .env.local
   file correctly:

   ```
   info  - Compiled successfully
   info  - Collecting page data ..node:internal/process/promises:279
               triggerUncaughtException(err, true /* fromPromise */);
               ^

   Error: Invalid next-firebase-auth options: The "firebaseClientInitConfig.apiKey" value is required. The "cookies.keys" setting must be set if "cookies.signed" is true.
       at m (/Users/sky/Code/wk12/node_modules/next-firebase-auth/build/index.node.js:2:5278)
       at /Users/sky/Code/wk12/node_modules/next-firebase-auth/build/index.node.js:2:38994
       at init (/Users/sky/Code/wk12/node_modules/next-firebase-auth/build/index.node.js:2:38999)
       at initAuth (/Users/sky/Code/wk12/.next/server/pages/_app.js:65:42)
       at Object.292 (/Users/sky/Code/wk12/.next/server/pages/_app.js:676:1)
       at __webpack_require__ (/Users/sky/Code/wk12/.next/server/webpack-runtime.js:25:42)
       at __webpack_exec__ (/Users/sky/Code/wk12/.next/server/pages/_app.js:1007:39)
       at /Users/sky/Code/wk12/.next/server/pages/_app.js:1008:78
       at Function.__webpack_require__.X (/Users/sky/Code/wk12/.next/server/webpack-runtime.js:177:21)
       at /Users/sky/Code/wk12/.next/server/pages/_app.js:1008:47 {
     type: 'Error'
   }
   error Command failed with exit code 1.
   info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
   ```

## :pencil: Contributing

### :paperclip: Consistency

To keep the codebase tidy, please ensure your editor has these extensions installed:

| Extension    | VSCode                                                                                        | Jetbrains IDEs                                   |
| ------------ | --------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| EditorConfig | [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) | Included (open file and choose "Use code style") |
| ESLint       | [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)          | ""                                               |
| Prettier     | [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)        | ""                                               |

### :arrow_down: Install dependencies

```bash
yarn
```

### :runner: Start the app

```bash
# dev mode (for hot module reload).
yarn dev

# production mode (for demos and assessment).
yarn build && yarn start
```

### :package: Adding package dependencies using yarn

```bash
# Packages used by app
yarn add package_name

# Packages used only in dev e.g. eslint plugins, code generators.
yarn add -D package_name
```

## :warning: License

This web app is only for use for COMP30022 IT Project 2022 Semester 2 Project

## :handshake: Contact

- Yi Sheon Tan - ystan@student.unimelb.edu.au
- Kian Dsouza - kiand@student.unimelb.edu.au
- Ian Chen - icche@student.unimelb.edu.au
- Jack Woodman - jdwoodman@student.unimelb.edu.au
- Qiawen Yu - qiaweny@student.unimelb.edu.au
