<div align="center">

# ⚽ AI Football Analysis Dashboard

![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green?style=for-the-badge&logo=fastapi&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-Frontend-black?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-Design-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)

**Enterprise-grade computer vision platform for tactical football analysis.**
*Precision · Intelligence · Motion*
</div>

---

## 🏗️ Architecture

```mermaid
graph LR
    UI[Next.js Client] -->|POST| API[FastAPI Server]
    API -->|Background Job| Core[YOLOv8 + ByteTrack]
    Core -->|Cluster| Teams[K-Means Team Assigner]
    Core --> Video[Output MP4 Stream]
    Video --> UI
```

---

## 🚀 Quick Start
**Backend:**
`uvicorn football_cv.api.server:app --reload`
**Frontend:**
`npm run dev`
