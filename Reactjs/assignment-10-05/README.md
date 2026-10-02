# Assignment 10.05 - Bacon Ipsum Fetch App

A responsive React application that fetches Bacon Ipsum text from the Bacon Ipsum API and displays it as readable cards.

## Requirements Covered

- HTML structure using React markup
- `fetch()` GET request to `https://baconipsum.com/api/?type=all`
- Modern `async/await` syntax
- Dynamic rendering of API paragraphs
- `try/catch/finally` error and loading handling
- Responsive CSS styling for desktop and mobile
- Refresh button for a new API request
- Loading spinner while data is being fetched

## Run the Application

Open PowerShell in this folder:

```powershell
cd "C:\Users\admin\Desktop\FULL STACK\Reactjs\assignment-10-05"
npm install
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

## Production Build

```powershell
npm run build
```

To preview the production build:

```powershell
npm run preview
```

## Main Files

- `index.html`: HTML document and React mount point
- `src/main.jsx`: React UI, API request, state, and error handling
- `src/styles.css`: Responsive visual design
