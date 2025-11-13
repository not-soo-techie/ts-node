# 🧩 Lab: Setup Node.js + TypeScript (CommonJS) and Create `POST /books` Route

## 🎯 Objective
In this lab, you will learn how to:
- Set up a **Node.js project using TypeScript** with **CommonJS** module syntax.
- Configure **TypeScript compiler (tsc)** properly.
- Run your TypeScript code directly using **ts-node** or **nodemon**.
- Create one working API route `POST /books` to add a book to a JSON file.
- Test it manually using Postman or `curl`.

This lab will teach you the foundation for writing backend APIs in TypeScript — without using `import/export` syntax.

---

## ⚙️ 1️⃣ Project Setup

### Step 1 — Initialize a new Node.js project
```bash
mkdir ts-node
cd ts-node
npm init -y
```

## ⚡ 2️⃣ Install Dependencies

### Install Express (for building the API):
```bash
npm install express
npm install --save-dev typescript ts-node @types/node @types/express nodemon
```

## 📘 3️⃣ Initialize TypeScript

### Run this to create a TypeScript config file:
```bash
npx tsc --init
```

### Now open the generated tsconfig.json and replace everything with this configuration 👇
```json
{
  "compilerOptions": {
    "target": "ES2019",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## 📂 4️⃣ Folder Structure

### Create these folders and files:
```bash
ts-node-commonjs-lab/
│
├── package.json
├── tsconfig.json
├── src/
│   ├── server.ts
│   ├── routes/
│   │   └── bookRoutes.ts
│   ├── controllers/
│   │   └── bookController.ts
│   └── data/
│       └── books.json
└── dist/   (will be generated after build)
```

## 📄 5️⃣ Write the Code
### 🧠 `src/server.ts`

## 📄 6️⃣ Tweak changes

### Add `node` and `express` type definitions to `tsconfig.json`
```json
"types": ["node", "express"]
```

### Add `any` in `server.ts`
```js
(req: any, res: any);
```

## ⚡ 7️⃣ Add NPM Scripts

### In your package.json, add these scripts:
```json
"scripts": {
    "dev": "nodemon --watch src --exec \"node --loader ts-node/esm --experimental-specifier-resolution=node\" src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
}
```

## 🚀 8️⃣ Run the App

### Start your development server:
```bash
npm run dev
```

## 📡 8️⃣ Test the API
### Now test your route POST /books.
Using curl
```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Atomic Habits","author":"James Clear","year":2018}'
```
