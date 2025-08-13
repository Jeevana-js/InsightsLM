# Samacheer Kalvi AI Learning Platform

An AI-powered learning platform that provides homework assistance using official Tamil Nadu Samacheer Kalvi textbooks.

## 🏗️ Project Structure

\`\`\`
samacheer-ai-learning/
├── frontend/          # Next.js React application
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   └── public/       # Static assets
├── backend/          # Python Flask API
│   ├── utils/        # Utility modules
│   ├── app.py        # Main Flask application
│   └── requirements.txt
└── README.md
\`\`\`

## 🚀 Features

- **Official Textbook Content**: Extracts answers directly from Samacheer Kalvi textbooks
- **English-Only Responses**: All answers provided in English with exact textbook content
- **Page References**: Includes specific page numbers and chapter references
- **File Upload Support**: Upload images, PDFs, and documents for context
- **Recent Homework History**: Track and review previous questions
- **Subject Coverage**: History, Geography, Civics, Economics for Class 10

## 🛠️ Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
\`\`\`bash
cd backend
\`\`\`

2. Create a virtual environment:
\`\`\`bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
\`\`\`

3. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

4. Create environment file:
\`\`\`bash
cp .env.example .env
\`\`\`

5. Add your OpenAI API key to `.env`:
\`\`\`
OPENAI_API_KEY=your_api_key_here
\`\`\`

6. Run the Flask server:
\`\`\`bash
python app.py
\`\`\`

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
\`\`\`bash
cd frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create environment file:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Update the API URL in `.env.local`:
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:5000
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

The frontend will run on `http://localhost:3000`

## 📚 Textbook Integration

Place your Samacheer Kalvi PDF textbooks in the `frontend/public/textbooks/` directory with the following naming convention:

- `tn-class-10-social-science-official.pdf`
- `tn-class-10-mathematics.pdf`
- `tn-class-10-science.pdf`
- `tn-class-10-english.pdf`
- `tn-class-10-tamil.pdf`

## 🔧 Configuration

### Backend Configuration
- Set your OpenAI API key in the `.env` file
- Configure CORS origins for your frontend domain
- Adjust file upload limits and textbook paths as needed

### Frontend Configuration
- Update `NEXT_PUBLIC_API_URL` in `.env.local` to point to your backend server
- Modify `next.config.mjs` for additional Next.js settings

## 🚀 Deployment

### Frontend Deployment (Vercel)
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend Deployment (Railway/Heroku)
1. Create a new app on your preferred platform
2. Set environment variables
3. Deploy the backend directory

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes and uses official Tamil Nadu Samacheer Kalvi textbook content.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team

---

**Samacheer Kalvi AI Learning Platform** - Empowering Tamil Nadu students with AI-powered Samacheer Kalvi education.
