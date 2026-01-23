# 📂 Project File Structure & Descriptions

> **Reference**: This map details every file's purpose in the productized architecture.

```plaintext
AI-FOOTBALL-ANALYSIS-DASHBOARD
├── football_cv/                     # BACKEND ROOT
│   ├── core/                        # [ANALYTICS] Frozen Core Logic (No API/prints)
│   │   ├── metrics/
│   │   │   └── speed_distance_estimator.py
│   │   ├── team_assignment/
│   │   │   └── team_assigner.py
│   │   ├── possession/
│   │   │   └── possession_assigner.py
│   │   ├── pitch_mapping/
│   │   │   └── view_transformer.py
│   │   ├── detector.py              # YOLOv8 Wrapper
│   │   ├── tracker.py               # ByteTrack Wrapper
│   │   ├── video_utils.py           # Video I/O
│   │   └── pipeline.py              # [LIBRARY] The pure analytics engine provided as run_analysis().
│   │
│   ├── api/                         # [BACKEND] FastAPI Server
│   │   ├── server.py                # API Entry point
│   │   ├── task_manager.py          # Job state management
│   │   └── schemas.py               # Pydantic models
│   │
│   ├── storage/                     # [DATA] File Persistance
│   │   ├── uploads/                 # Raw video uploads
│   │   ├── outputs/                 # Annotated video outputs
│   │   └── results/                 # JSON analytics results
│   │
│   └── requirements.txt             # Python Dependencies
│
├── frontend/                        # FRONTEND ROOT (Next.js)
│   ├── app/                         # App Router
│   │   ├── page.tsx                 # Landing Page
│   │   ├── upload/                  # Upload UI
│   │   ├── processing/              # Processing Status UI
│   │   └── results/                 # Analytics Dashboard UI
│   ├── components/                  # [UI] Reusable Components (Charts, VideoPlayer)
│   └── ...                          # Config files
│
├── docs/                            # DOCUMENTATION
│   ├── HO_TO_RUN.md                 # Usage Guide
│   ├── DEVELOPMENT_STEPS.md         # Architecture Log
│   └── PROJECT_TREE.md              # (This File)
│
└── README.md                        # Project Homepage
```
