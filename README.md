# gas-clasp-workout-logs

The goal in this project is to calcurate scores with daily workout logs, which has weight and count in each workout. This repository is mainly built by [howdy39/gas-clasp-starter](https://github.com/howdy39/gas-clasp-starter) template.

## Tech Stack

- [google/clasp](https://github.com/google/clasp)
- [rollup](https://rollupjs.org/)
- [TypeScript](http://www.typescriptlang.org/)
- [ESLint](https://github.com/eslint/eslint)
- [Prettier](https://prettier.io/)
- [Jest](https://facebook.github.io/jest/)

## Prerequisites

- [Node.js](https://nodejs.org/)

## Getting Started

### Clone the repository

```
git clone --depth=1 https://github.com/howdy39/gas-clasp-starter.git <project_name>
cd <project_name>
rm -Rf .git
```

### Install dependencies

```
npm install
```

### Configuration

#### Open `.clasp.json`, change scriptId

What is scriptId ? https://github.com/google/clasp#scriptid-required

```
{
  "scriptId": <your_script_id>,
  "rootDir": "dist"
}
```

#### Open `.package.json`, change properties

The name, version, description, and homepage properties are output as comments at the beginning of the output GAS.

```
...
  "name": "your application name",
  "version": "your application version",
  "description": "your application description",
  "homepage" "your repository url"
...
```

#### Open `src/appsscript.json`, change timeZone (optional)

[Apps Script Manifests](https://developers.google.com/apps-script/concepts/manifests)

```
{
  "timeZone": "Asia/Tokyo", ## Change timeZone
  "dependencies": {
  },
  "exceptionLogging": "STACKDRIVER"
}
```

### Development and build project

```
npm run build
```

### Push & Open Google Apps Script

```
npm run push
```
