<div align="center">

# ⚽ AI Football Analysis Dashboard

![Python](https://img.shields.io/badge/Python-3.8%2B-blue?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green?style=for-the-badge&logo=fastapi&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-Frontend-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-Design-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)

**An enterprise-grade computer vision platform for tactical football analysis.**
*Precision · Intelligence · Motion*

[Features](#-features) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Documentation](#-documentation)

</div>

---

## 🌟 Features

| Feature | Description | Status |
| :--- | :--- | :--- |
| **🕵️ Deep Analytics** | **YOLOv8x** + **ByteTrack** for SOTA object detection & tracking. | ✅ |
| **⚽ Possession Engine** | Logic-based algorithm with occlusion persistence (10-frame buffer). | ✅ |
| **⚡ Physical Metrics** | Real-time **Speed (px/s)** and **Distance** calculation with smoothing. | ✅ |
| **📊 Visual Analytics** | **Bar & Line Charts** for Possession & Distance (Audi-style design). | ✅ |
| **👕 Team Logic** | Unsupervised **K-Means Clustering** ($k=2$) on HSV + Lab colors. | ✅ |
| **🎨 Premium UI** | **Audi Design System** (Black/Red/White) with tailored components. | ✅ |
| **🚀 Scalable Backend** | Asynchronous **FastAPI** server with background task queues. | ✅ |

---

## 🚀 Quick Start

### 1. Backend (API)
```bash
# Install dependencies
pip install -r football_cv/requirements.txt

# Run Server (Port 8000)
uvicorn football_cv.api.server:app --reload
```

### 2. Frontend (UI)
```bash
# Navigate to frontend
cd frontend

# Install Node modules
npm install

# Run Client (Port 3000)
npm run dev
```

### 3. Usage
-   Open **[http://localhost:3000](http://localhost:3000)**.
-   Upload a match video (`.mp4`).
-   Watch the system analyze possession, teams, and movement in real-time.

---

## 🛠️ Architecture

The system is engineered as a split-stack application:

```mermaid
graph LR
    subgraph Frontend [Next.js Client]
        UI[Upload Page]
        Dash[Results Dashboard]
    end
    
    subgraph Backend [FastAPI Server]
        API[REST API]
        Task[Task Manager]
        Static[Static File Server]
    end
    
    subgraph Core [Analytics Engine]
        Pipe[Pipeline / run_analysis]
        YOLO[YOLOv8 Detector]
        Byte[ByteTrack]
        KMeans[Team Assigner]
    end
    
    UI -->|POST /upload| API
    Dash -->|GET /status| API
    API -->|Background Job| Pipe
    Pipe -->|Uses| YOLO
    Pipe -->|Uses| KMeans
    Pipe -->|Writes Video| Static
    Static -->|Stream MP4| Dash
```

---

## 📚 Documentation
Detailed guides for developers:

-   **[📖 How to Run](docs/HOW_TO_RUN.md)**: Full setup, troubleshooting, and manual CLI usage.
-   **[🏗️ Reconstruction Guide](docs/DEVELOPMENT_STEPS.md)**: Deep dive into the algorithms and "How it was built".
-   **[📂 Project Tree](docs/PROJECT_TREE.md)**: Map of the file structure.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<div align="center">
  <sub>Built with ❤️ by Antigravity</sub>
</div>
