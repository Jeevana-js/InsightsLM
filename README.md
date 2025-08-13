# InsightsLM - Samacheer Kalvi AI Learning Platform

An AI-powered learning platform specifically designed for Tamil Nadu Samacheer Kalvi curriculum, providing authentic textbook-based answers and educational assistance.

## 🏗️ Project Structure

\`\`\`
samacheer-ai-learning/
├── frontend/                 # Next.js React frontend
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   ├── lib/                 # Utility libraries
│   ├── public/              # Static assets and textbooks
│   └── package.json         # Frontend dependencies
├── backend/                 # Python Flask backend
│   ├── utils/               # Utility modules
│   ├── app.py              # Main Flask application
│   ├── config.py           # Configuration settings
│   └── requirements.txt    # Python dependencies
└── README.md
\`\`\`

## 🚀 Features

- **Authentic Samacheer Kalvi Content**: All answers sourced from official TN Board textbooks
- **Multi-Subject Support**: History, Geography, Civics, Economics, Mathematics, Science
- **AI-Powered Homework Assistant**: Get detailed explanations with chapter references
- **File Upload Support**: Upload images, PDFs, and documents for analysis
- **Recent Homework History**: Track and revisit previous questions
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Setup Instructions

### Frontend Setup (Next.js)

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

4. Update the environment variables in `.env.local`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

The frontend will be available at `http://localhost:3000`

### Backend Setup (Python Flask)

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

5. Update the environment variables in `.env` (especially `OPENAI_API_KEY`)

6. Start the Flask server:
\`\`\`bash
python app.py
\`\`\`

The backend API will be available at `http://localhost:5000`

## 📚 Textbook Integration

Place your Samacheer Kalvi PDF textbooks in the `frontend/public/textbooks/` directory with the following naming convention:

- `tn-class-10-social-science-official.pdf`
- `tn-class-10-mathematics.pdf`
- `tn-class-10-science.pdf`
- `tn-class-10-english.pdf`
- `tn-class-10-tamil.pdf`

## 🔧 Configuration

### Frontend Configuration
- Update `NEXT_PUBLIC_API_URL` in `.env.local` to point to your backend server
- Modify `next.config.mjs` for additional Next.js settings

### Backend Configuration
- Set your OpenAI API key in the `.env` file
- Configure CORS origins for your frontend domain
- Adjust file upload limits and textbook paths as needed

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

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team

---

**InsightsLM** - Empowering Tamil Nadu students with AI-powered Samacheer Kalvi education.
