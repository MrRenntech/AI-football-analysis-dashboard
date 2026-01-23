# AI Football Analysis Dashboard ⚽🚀

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.9%2B-blue)
![YOLOv8](https://img.shields.io/badge/YOLOv8-Ultralytics-orange)

An end-to-end AI system to analyze football matches using Computer Vision. Detects players, referees, and the ball, tracks them across frames, assigns team colors, and estimates possession statistics.

## ✨ Features

- **Object Detection**: Uses **YOLOv8** to detecting players, referees, and the ball.
- **Robust Tracking**: Implements **ByteTrack** for persistent player IDs even through occlusions.
- **Smart Possession**: Calculates real-time ball possession based on player proximity and temporal smoothing.
- **Streaming Pipeline**: Memory-efficient video processing that handles long matches without crashing.
- **Visual Analytics**: Draws bounding boxes, IDs, and possession markers directly on the video.

## 🛠️ Architecture

The project is structured into a modular Python pipeline:

```
football_cv/
├── data/               # Input videos
├── output/             # PROCESSED videos
├── src/
│   ├── detector.py     # YOLOv8 logic (Person/Ball)
│   ├── tracker.py      # ByteTrack logic
│   ├── video_utils.py  # Streaming Video I/O
│   ├── possession/     # Possession logic
│   └── pipeline.py     # Main orchestrator
└── requirements.txt    # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- [FFmpeg](https://ffmpeg.org/) (optional, for video compression usually)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/ai-football-analysis.git
    cd ai-football-analysis
    ```

2.  **Install dependencies**:
    ```bash
    pip install -r football_cv/requirements.txt
    ```

3.  **Prepare Data**:
    Place your input video at `football_cv/data/input.mp4`.

### Usage

Run the main pipeline:

```bash
python football_cv/src/pipeline.py
```

The annotated video will be saved to `football_cv/output/annotated_output.mp4`.

## 📈 Roadmap

- [x] **Phase 1**: Minimal CV Pipeline (Detection + Tracking)
- [x] **Phase 2A**: Player-Ball Possession (Logic + Persistence + Edge Cases)
- [ ] **Phase 2B**: Team Assignment (Color Clustering)
- [ ] **Phase 3**: Camera Movement Stabilization
- [ ] **Phase 4**: Perspective Transformation (Real-world distance)
- [ ] **Phase 5**: Web Dashboard (Next.js + FastAPI)

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
