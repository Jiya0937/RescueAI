# RescueAI – Offline Emergency Assistant

RescueAI is a modern, AI-powered offline emergency assistant designed to provide critical guidance, medical steps (CPR, bleeding, burns, etc.), and mapping services during natural disasters and medical emergencies. The application is designed to operate completely offline (via local services) while being fully compatible with online hosting for demonstration purposes.

---

## 🚀 System Architecture

```text
                    RescueAI
                         │
        ┌────────────────┼─────────────────┐
        │                │                 │
        ▼                ▼                 ▼
 React + Vite       FastAPI          SQLite Database
 (Responsive UI)         │
                          │
        ┌─────────────────┼─────────────────────────┐
        │                 │                         │
        ▼                 ▼                         ▼
 Offline AI         Computer Vision          Speech AI
 (Ollama)        (YOLO + EasyOCR)        (Vosk + Piper)
        │
        ▼
 Knowledge Base (English / Hindi JSON)
```

---

## 🛠️ Technology Stack

### Frontend
- **React + Vite**: High-performance single page application framework.
- **Tailwind CSS v4**: Ultra-fast utility-first CSS styling.
- **Lucide Icons**: Crisp, vector emergency & system iconography.
- **Responsive Layout**: Pixel-perfect scaling for mobile and desktop screens.
- **PWA (Progressive Web App)**: Enabling offline static asset serving directly on the user's browser.

### Backend
- **Python FastAPI**: Modern, fast (high-performance) web framework.
- **Modular Directory Layout**: Organized routes, models, and AI runners.
- **Local AI Engines**:
  - **Ollama**: Local LLM execution for AI Chatbot responses.
  - **EasyOCR / OpenCV**: OCR analysis of text (like medication labels).
  - **YOLOv8 Nano**: Local object detection for environmental hazard scanning.
  - **Vosk / Piper**: Offline Speech-to-Text and Text-to-Speech assistants.

### Database & Storage
- **SQLite**: Local relational database for local caches and tracking configuration logs.

---

## 📁 Key Directories

- `frontend/`: Single page React application.
- `backend/`: FastAPI Python server containing AI wrappers and JSON knowledge bases.
- `docs/`: Product design documents, UML diagrams, and research notes.
- `docker/`: Docker container structures for orchestrating local containers.

---

## ⚙️ Running Locally

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the application on `http://localhost:3000`.

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   ```
3. Install standard requirements:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the FastAPI development server:
   ```bash
   uvicorn app.main:app --reload
   ```

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more details.
