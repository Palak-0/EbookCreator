# EbooklyCreator

A full-stack web application for creating and managing ebooks with AI-powered content generation features.

## Features

- 📚 **Book Management**: Create, edit, and organize your ebooks
- ✍️ **Chapter Editor**: Rich markdown editor for writing chapters
- 🤖 **AI Content Generation**: Powered by Google Gemini AI
- 📄 **Export Options**: Export books to PDF and DOCX formats
- 🔐 **User Authentication**: Secure user registration and login
- 📸 **Cover Images**: Upload and manage book cover images
- 🎨 **Modern UI**: Built with React and Tailwind CSS

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Markdown Editor** - Rich text editing

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database (via Mongoose)
- **JWT** - Authentication
- **Multer** - File uploads
- **Google Gemini AI** - AI content generation
- **PDFKit** - PDF generation
- **Docx** - DOCX generation

## Project Structure

```
EbookCreator/
├── api/                    # Vercel serverless functions wrapper
│   └── index.js            # Express app wrapper for Vercel
│
├── backend/                 # Node.js/Express backend
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middlewares/        # Custom middlewares
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── uploads/            # Uploaded files
│   └── server.js           # Entry point (for local dev)
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context
│   │   └── utils/          # Utility functions
│   ├── public/            # Static assets
│   └── package.json
│
├── vercel.json             # Vercel configuration
├── .gitignore             # Git ignore rules
├── DEPLOYMENT_GUIDE.md    # Deployment instructions
├── LOCAL_DEVELOPMENT.md    # Local development guide
└── README.md              # This file
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Google Gemini API key

### Installation

See [LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md) for detailed local development setup.

**Quick Start:**

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/EbookCreator.git
   cd EbookCreator
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**

   Create `backend/.env`:
   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   FRONTEND_URL=http://localhost:5173
   ```

   Create `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

4. **Start development servers**

   Terminal 1 (Backend):
   ```bash
   cd backend
   npm run dev
   ```

   Terminal 2 (Frontend):
   ```bash
   cd frontend
   npm run dev
   ```

5. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Books
- `GET /api/books` - Get all books (protected)
- `POST /api/books` - Create a new book (protected)
- `GET /api/books/:id` - Get a specific book (protected)
- `PUT /api/books/:id` - Update a book (protected)
- `DELETE /api/books/:id` - Delete a book (protected)

### AI
- `POST /api/ai/generate` - Generate content using AI (protected)

### Export
- `POST /api/export/pdf/:bookId` - Export book as PDF (protected)
- `POST /api/export/docx/:bookId` - Export book as DOCX (protected)

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `GEMINI_API_KEY` - Google Gemini API key

### Frontend (.env)
- `VITE_API_URL` - Backend API URL

## Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

**Recommended**: Deploy both frontend and backend to **Vercel** as a fullstack application.

The project is configured for Vercel deployment with:
- Frontend served as static files
- Backend API as serverless functions
- Single domain deployment (no CORS issues)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Security

- Never commit `.env` files
- Use strong JWT secrets in production
- Keep API keys secure
- Regularly update dependencies
- Validate and sanitize user inputs

## License

This project is licensed under the ISC License.

## Author

**ivanarre**

## Acknowledgments

- Google Gemini AI for content generation
- MongoDB for database services
- All open-source contributors

---

For more information, see the [Deployment Guide](./DEPLOYMENT_GUIDE.md).
