# BookShelf Frontend 📚

## Description 💻

BookShelf is a fullstack platform for book lovers. This is the frontend built with React + Vite, connected to the [BookShelf API](https://github.com/Ren-mayday/proyecto-13-bookshelf-backend-react).

Users can browse the book catalogue, register, log in, add books, and write reviews. The interface adapts to dark and light mode and is fully responsive.

---

## Tech Stack 🛠️

| Technology | Usage |
|------------|-------|
| React + Vite | Frontend framework |
| React Router DOM | Client-side routing |
| Chakra UI v3 | Component library |
| CSS Variables | Global design tokens |

---

## Features ✨

- 🌙 Dark / Light mode toggle (default: dark)
- 📱 Fully responsive with hamburger menu on mobile
- 🔐 Login and register with auto-login after registration
- 📖 Browse and search books by title or author
- ➕ Add and edit books (authenticated users only)
- ⭐ Write, edit and delete reviews with star rating
- 🚫 One review per book per user
- 👤 Profile page with tabs — user reviews and books added
- 🏷️ Book cards show who added the book
- 🔒 Protected routes for authenticated users

---

## Project Structure 📁

```
src/
├── components/
│   ├── BookCard.jsx          # Book preview card with author info
│   ├── Navbar.jsx            # Responsive navigation bar
│   ├── ProtectedRoute.jsx    # Auth guard for private routes
│   ├── ReviewCard.jsx        # Review card with inline edit/delete
│   ├── SearchBar.jsx         # Reusable search component with ref support
│   └── StarRating.jsx        # Reusable star rating (read-only or interactive)
├── context/
│   └── AuthContext.jsx       # Global auth state (user + token)
├── hooks/
│   └── useAuth.js            # Custom hook for auth context
├── pages/
│   ├── Home.jsx              # Landing page with recent books
│   ├── Books.jsx             # Full book catalogue with search
│   ├── BookDetails.jsx       # Book info + reviews
│   ├── AddBook.jsx           # Form to add a new book
│   ├── EditBook.jsx          # Form to edit an existing book
│   ├── Login.jsx             # Login form
│   ├── Register.jsx          # Register form
│   └── Profile.jsx           # User profile with tabs (reviews / books)
├── services/
│   ├── booksService.js       # API calls for books
│   └── reviewsService.js     # API calls for reviews
├── App.jsx                   # Route definitions
├── main.jsx                  # App entry point
├── theme.js                  # Chakra UI custom theme
└── index.css                 # Global CSS variables
```

---

## React Hooks Used 🪝

| Hook | Where | Why |
|------|-------|-----|
| `useState` | All pages | Local state management |
| `useEffect` | Home, Books, BookDetails, EditBook, Profile | Data fetching on mount |
| `useCallback` | Books.jsx | Prevents `fetchBooks` from recreating on every render |
| `useRef` | Books.jsx → SearchBar | Auto-focus on search input on page load |
| `useContext` | via `useAuth` | Global access to user and token |
| `useParams` | BookDetails, EditBook | Get book ID from URL |
| `useNavigate` | Multiple pages | Programmatic navigation |
| `useColorMode` | All components | Dark / light mode |

---

## Getting Started 🚀

### Prerequisites ✅
- Node.js v18+
- BookShelf backend running locally or deployed

### Installation 📦

1. Clone the repository
```bash
git https://github.com/Ren-mayday/proyecto-13-bookshelf-frontend-react
cd proyecto-13-bookshelf-frontend-react
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root of the project
```bash
cp .env.example .env
```

4. Start the development server
```bash
npm run dev
```

### Environment Variables ⚙️

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:4000/api/v1` |

---

## Pages 📄

| Page | Route | Access |
|------|-------|--------|
| Home | `/` | Public |
| Books | `/books` | Public |
| Book Details | `/books/:id` | Public |
| Add Book | `/books/new` | Auth required |
| Edit Book | `/books/:id/edit` | Auth required (owner / admin) |
| Login | `/login` | Public |
| Register | `/register` | Public |
| Profile | `/profile` | Auth required |

---

## Deployment 🌐

- **Frontend:** Not deployed yet
- **Backend:** Not rendered yet

---

## Author 👩🏽‍💻

- **Name:** Rencel
- **GitHub:** [Ren-mayday](https://github.com/Ren-mayday)