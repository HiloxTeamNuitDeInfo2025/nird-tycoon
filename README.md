# ECO-SCHOOL TYCOON

An interactive educational game that teaches the benefits of open-source software through a school migration simulation. Players make strategic decisions about adopting free software alternatives while managing time, budget, and credibility constraints.

## 🎮 Game Overview

In ECO-SCHOOL TYCOON, you play as a school administrator tasked with migrating your institution away from proprietary software before Windows 10 support ends. Make choices between:

- **Open-Source Tools**: Free, community-supported software that earns NIRD (Non-proprietary Innovation Resistance Dividend) points
- **Proprietary Solutions**: Paid, vendor-locked options that save time but cost money

Balance your budget (€150,000), time (30 days), and credibility (50%) to achieve victory and join the resistance!

## ✨ Features

### Core Gameplay
- **8 Decision Points**: Operating system, office suite, security, finance, LMS, portals, SIS, communication
- **Resource Management**: Track budget, days remaining, credibility, and NIRD score
- **Quiz Challenges**: Knowledge checks that affect credibility and scoring
- **Victory Conditions**: Achieve 80+ NIRD points to win

### Educational Components
- **Open-Source Advisor Chatbot**: AI-powered assistant for questions about Linux, LibreOffice, pfSense, and more
- **Tool Information Popups**: Detailed explanations and official links for chosen tools
- **Community Integration**: Direct links to NIRD (Non-proprietary Innovation Resistance Dividend) community

### Technical Features
- **Authentication System**: JWT-based login/register with role management
- **Responsive Design**: Mobile-friendly interface with custom chalkboard aesthetics
- **Real-time Chat**: Persistent conversation history with the AI advisor
- **Animated UI**: Framer Motion animations and particle effects

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks and concurrent features
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Framer Motion** - Animation library
- **Three.js** - 3D graphics (future features)
- **SweetAlert2** - Beautiful modal dialogs

### Backend & APIs
- **FastAPI** - Python web framework for the chatbot API
- **LangChain** - LLM orchestration framework
- **OpenRouter** - AI model hosting (Llama 3.3 70B)
- **Vercel** - Cloud hosting for authentication and main API
- **PostgreSQL** - Database for user management

### Development Tools
- **ESLint** - Code linting
- **Vite Plugin React** - React integration
- **Autoprefixer & PostCSS** - CSS processing

## 📁 Project Structure

```
e:/ing/nuitInfo/frontend/
├── api/                          # Python chatbot API
│   ├── index.py                 # FastAPI application
│   ├── Instruction.txt          # AI system prompt
│   └── .env                     # API keys (OpenRouter, Gemini)
├── backend/                     # Main backend (Vercel)
│   └── .env                     # Database and JWT config
├── public/                      # Static assets
├── src/
│   ├── api/
│   │   └── client.js            # Axios client with JWT interceptor
│   ├── components/
│   │   ├── GameArea.jsx         # Main game logic and UI
│   │   ├── CommunityHub.jsx     # Victory screen and community links
│   │   ├── Chatbot.jsx          # AI advisor chat interface
│   │   └── ChalkParticles.jsx   # Background animation component
│   ├── context/
│   │   └── AuthContext.jsx      # Authentication state management
│   ├── fonts/                   # Custom Determination fonts
│   ├── pages/
│   │   ├── LoginPage.jsx        # Authentication UI
│   │   └── Dashboard.jsx        # Main app layout with tabs
│   ├── utils/
│   │   ├── Questions.js         # Game scenarios and choices
│   │   └── TOOL_INFO.js         # Open-source tool descriptions
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles and animations
├── package.json                 # Dependencies and scripts
├── vite.config.js               # Vite configuration with proxy
└── README.md                    # This file
```

## 🚀 Installation

### Prerequisites
- Node.js 18+
- Python 3.8+
- PostgreSQL (for backend)
- Git

### Frontend Setup
```bash
# Clone the repository
git clone <repository-url>
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Python API Setup
```bash
# Navigate to API directory
cd api

# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables in .env
# OPEN_ROUTER_API_KEY=your_key_here
# OPEN_ROUTER_MODEL=meta-llama/llama-3.3-70b-instruct:free

# Start the API server
python index.py
```

### Backend Setup
The main backend is hosted on Vercel. Configure environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `CORS_ORIGIN`: Frontend URL for CORS

## 🎯 Usage

### Starting the Game
1. **Register/Login**: Create an account or sign in
2. **Intro Screen**: Read the mission briefing
3. **Gameplay**: Make strategic choices for each software category
4. **Victory**: Achieve high NIRD score to unlock community features

### Game Mechanics
- **Time Management**: Each choice consumes days (1-7)
- **Budget Control**: Open-source = free, proprietary = costly
- **Credibility**: Affected by quiz answers and choice combinations
- **NIRD Scoring**: Earn points for open-source adoption

### Chatbot Usage
- Ask questions about specific open-source tools
- Get comparisons with proprietary alternatives
- Learn about implementation and benefits

## 🔧 API Endpoints

### Chatbot API (Port 8000)
- `GET /` - API information
- `POST /chat` - Send question to AI advisor
- `DELETE /history/{session_id}` - Clear chat history
- `GET /sessions` - List active sessions
- `GET /health` - Health check

### Authentication API (Vercel)
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `PATCH /user/current/setrole` - Set user role

## 🎨 Design System

### Color Palette
- **Primary Green**: `#0b3d20` (dark forest)
- **Secondary Green**: `#1a4d2e` (board green)
- **Accent Orange**: `#d4a373` (chalk gold)
- **Background**: `#e8e4d0` (parchment)

### Typography
- **Primary Font**: Determination Mono Web (custom)
- **Fallback**: Monospace system fonts

### UI Patterns
- Chalkboard aesthetic with rounded borders
- Particle animations for atmosphere
- SweetAlert2 modals for interactions
- Responsive grid layouts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Use ESLint configuration
- Follow React best practices
- Test API endpoints thoroughly
- Maintain accessibility standards

## 📄 License

This project uses the Determination font under Creative Commons (by-nc-nd) Attribution Non-commercial No Derivatives license.

All other code is proprietary - see LICENSE file for details.

## 🙏 Acknowledgments

- **NIRD Community**: Real-world open-source education advocates
- **FontSpace**: For the Determination font
- **OpenRouter**: AI model hosting
- **Vercel**: Cloud infrastructure

---

**"Tonight we played. Tomorrow we liberate schools for real."**

Join the open-source resistance at [NIRD Community](https://nird.forge.apps.education.fr/)
