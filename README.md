# 🍽️ Recipe Finder App

A React-based recipe discovery app that lets users search, filter, and explore meals from around the world using the [TheMealDB API](https://www.themealdb.com/).

---

## Table of Contents

- [Overview](#overview)
  - [The App](#the-app)
  - [Links](#links)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [What I Learned](#what-i-learned)
  - [Continued Development](#continued-development)
  - [Useful Resources](#useful-resources)
- [Author](#author)

---

## Overview

### The App

Users are able to:

- Search for recipes by name using the search bar
- Browse recipes filtered by **cuisine/area** (e.g., Italian, Japanese, Indian)
- Filter recipes by **category** (e.g., Chicken, Dessert, Seafood)
- View detailed information for any recipe on its own page
- Navigate between Home, Search Results, and Recipe Detail views

### Links

- Solution URL: (https://github.com/ShubhangiMishra215/React_Recipe.git)
- Live Site URL: (https://react-recipe-iota.vercel.app/)

---

## My Process

### Built With

- [React](https://reactjs.org/) — UI library
- [React Router DOM](https://reactrouter.com/) — Client-side routing (`BrowserRouter`, `Routes`, `Route`)
- [TheMealDB API](https://www.themealdb.com/api.php) — Free recipe data API
- Tailwind CSS — Utility-first styling (`bg-gray-950`, `text-gray-100`, etc.)
- Mobile-first, responsive layout

### What I Learned

**Memoizing API calls with `useCallback`**

Keeping `handleSearch` and `filterRecipe` stable across renders prevents child components like `NavBar` and `CuisineBar` from re-rendering unnecessarily:

```js
const handleSearch = useCallback(async (query) => {
  setSearchLoading(true);
  const res = await fetch(`${API_URL}search.php?s=${query}`);
  const result = await res.json();
  setSearchResult(result?.meals || []);
  setSearchLoading(false);
}, []);
```

**Abstracting filter logic**

A single `filterRecipe` function handles both category (`c=`) and area (`a=`) filters by accepting a `filterType` parameter, keeping the code DRY:

```js
const filterRecipe = useCallback(async (query, filterType) => {
  const res = await fetch(`${API_URL}filter.php?${filterType}=${query}`);
  // ...
}, []);
```

**Sharing state between routes**

Search results and loading state live in `App` and are passed as props to `SearchView`, so they persist correctly across route-driven re-renders.

### Continued Development

- Add **favorites/bookmarking** with `localStorage` so users can save recipes across sessions
- Implement **pagination or infinite scroll** for large search result sets
- Add **ingredient-based filtering** (TheMealDB supports `filter.php?i=chicken_breast`)
- Improve **error handling UI** — currently errors are only logged to the console
- Add **skeleton loading states** for a better perceived performance experience
- Write **unit and integration tests** with React Testing Library

### Useful Resources

- [TheMealDB API Docs](https://www.themealdb.com/api.php) — Full reference for all available endpoints (search, filter, lookup, categories, areas)
- [React Router Docs](https://reactrouter.com/en/main) — Especially helpful for understanding dynamic route params (`:id`, `:type/:query`)

---

## Author

- GitHub — (https://github.com/ShubhangiMishra215)
- Frontend Mentor — (https://www.frontendmentor.io/profile/ShubhangiMishra215)

