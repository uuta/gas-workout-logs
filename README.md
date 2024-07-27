# gas-clasp-workout-logs

The goal in this project is to calcurate scores with daily workout logs, which has weight and count in each workout. This repository is mainly built by [howdy39/gas-clasp-starter](https://github.com/howdy39/gas-clasp-starter) template.

## Tech Stack

- [google/clasp](https://github.com/google/clasp)
- [TypeScript](http://www.typescriptlang.org/)
- [ESLint](https://github.com/eslint/eslint)
- [Prettier](https://prettier.io/)

## Prerequisites

- [Node.js](https://nodejs.org/)

## Getting Started

### Clone the repository

```
$ git clone --depth=1 https://github.com/uuta/gas-workout-logs <project_name>
$ cd <project_name>
$ rm -Rf .git
```

### Install dependencies

```
$ yarn install
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
$ yarn run build
```

### Push & Open Google Apps Script

```
$ yarn run push
```

## How to use

### 1. Open a blank Google Spreadsheet

![blank spreadsheet](https://i.gyazo.com/a8a97f54dce7f30d03dbc80f1099266b.png)

### 2. Open the script editor

![script editor](https://i.gyazo.com/b32780121b2c108f748df9023588276a.png)

### 3. Copy the script ID from the URL

Copy the script ID from the URL of the script editor which is like the below.

```sh
https://script.google.com/home/projects/<scriptId>/edit
```

### 4. Build and push the project

Run the following command in the project directory.

```sh
$ yarn run push
```

### 5. Run updateWorkoutLogs function

![run function](https://i.gyazo.com/5308857cd8413e62ebf71309cd5d6ee4.png)

### 6. Set the trigger

Set the trigger to run the main function every 5 minutes. The main function can calculate the scores with the workout logs based on each weight and count.

![Set the trigger](https://i.gyazo.com/d898d4a9a45b585f853192128be52f46.png)

### 7. Check the scores

The calculated scores can be integrated with BI tools like Google Looker Studio. Check the maximum weights and daily scores

![Check the scores](https://i.gyazo.com/1f23392a7f54292dd9185d77da0036aa.png)
