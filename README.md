# Next-Fire-Auth 🔥

## **Demo Here:** [Next-Fire-Auth](https://next-fire-auth.vercel.app/)

Try Logging with the following

```
Email Address: user@gmail.com
Password: test@12345
```

## Steps

- [Why Next Fire Auth](#why-next-fire-auth)
- [Technologies](#technologies-used)
- [Features](#features)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Recommended IDE Setup](#recommended-ide-setup)

### Why Next Fire Auth

Starting a new project that involves using Firebase for authentication can be time-consuming and tedious, as it requires setting up various features and functionality such as **routes, protected routes, login and register components, styling, and form validation**. These tasks can be particularly frustrating if they need to be set up from scratch **every time** a new project is started.

Here is **Next-Fire-Auth** template for you.

I have used latest NextJs version 13, with latest routing method and focus on Server Components. You will find all pages in `/app/` directory

### Technologies used

1. [Next v13](https://beta.nextjs.org/docs/)
1. [Firebase v9](https://firebase.google.com/docs/web/modular-upgrade)
1. [Tailwind CSS v3](https://tailwindcss.com/)
1. [Reactjs v18](https://reactjs.org/docs/getting-started.html)
1. [Typescipt](https://www.typescriptlang.org/)
1. [React-Firebase-Hooks](https://github.com/csfrequency/react-firebase-hooks)

### Features

1. Email Password Authetication & Google Authetication
1. Forgot Password Feature
1. Login & SignUp forms validations
1. NextJs 13 routing

### Quick Start

```bash
git clone https://github.com/hrushikedar33/next-fire-auth my-project
yarn
```

> Make sure you replace **my-project** with your own project name

<details><summary>If you don't have yarn installed</summary>
<p>

```bash
npm i
```

> Remove **yarn.lock** as you will already have **package.lock**

</p>
</details>

1. Go to Firebase console. Add Project. In project overview, click on the web icon and register the app. You will see `firebaseConfig object`, We will require its details further. Click on Authetication, then on set up sign-in method. Enable `Email/password authentication` & `google authentication`.
1. Create a `.env.local` file in your project's root. Example of `.env.local` file is given below. Make sure you replace `YOUR_FIREBASE_CONSOLE_DETAILS` with your `firebaseConfig object` details.

```
NEXT_PUBLIC_API_KEY=YOUR_FIREBASE_CONSOLE_DETAILS
NEXT_PUBLIC_AUTH_DOMAIN=YOUR_FIREBASE_CONSOLE_DETAILS
NEXT_PUBLIC_PROJECT_ID=YOUR_FIREBASE_CONSOLE_DETAILS
NEXT_PUBLIC_STORAGE_BUCKET=YOUR_FIREBASE_CONSOLE_DETAILS
NEXT_PUBLIC_MESSAGING_SENDER_ID=YOUR_FIREBASE_CONSOLE_DETAILS
NEXT_PUBLIC_APP_ID=YOUR_FIREBASE_CONSOLE_DETAILS
```

3. That's It ! Finally run the application

```
yarn dev # OR npm run dev
```

### Documentation

#### Pages

Location: `/app/`

- Home Page
- Login Page
- Sign Up Page
- Forgot Password Page
- Profile Page - `Auth Required`

#### Helpers

- Global CSS will be found `/style/globals.css`
- Firebase configuration will be found in `/config/firebase.ts`
- `Loading` in `/components/Loading.tsx` - Loading spinner

### Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [React Snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
