# 🚀 How to Run & Recreate

> **Guide**: This document covers both **running the existing code** and **setting up the environment** from scratch.

---

## 1. 🛠️ Environment Setup

To recreate the development environment exactly, follow these steps.

### A. System Requirements
*   **OS**: Windows, macOS, or Linux.
*   **Python**: Version 3.8 or higher.
*   **Hardware**: A dedicated GPU (NVIDIA) is recommended for real-time speed, but CPU works (slower).

### B. Python Dependencies
The project relies on specific AI and CV libraries. Install them via pip:

```bash
pip install -r football_cv/requirements.txt
```

**Key Libraries Explained:**
*   `ultralytics`: Provides the YOLOv8 object detection model.
*   `supervision`: Handles complex geometry, drawing, and ByteTrack tracking logic.
*   `opencv-python`: The standard library for reading/manipulating video frames.
*   `scikit-learn`: Used for K-Means clustering in the Team Assigner module.
*   `numpy`: Essential for matrix math and vector calculations.

---

## 2. 🎬 Running the Pipeline

### Step 1: Prepare Input Video
1.  Locate a football match video (1080p or 720p recommended).
2.  Rename the file to `input.mp4`.
3.  Place it within the project structure here:
    ```path
    football_cv/storage/uploads/input.mp4
    ```

### Step 2: Execute the Script
The project has been restructured. Run the core pipeline manually via:

```bash
python football_cv/core/pipeline.py
```

### Step 3: Monitor Progress
The script provides console feedback:
*   **Init**: Downloads weights (`yolov8x.pt`) if missing.
*   **Video Info**: Prints resolution and FPS.
*   **Progress**: Logs "Processing frame X..." (Updates every 50 frames).

---

## 3. 📊 Understanding the Output

**File Location**: `football_cv/output/annotated_output.mp4`

The output video contains a wealth of AI-generated overlay data. Here is how to read it:

| Visual Element | Logic Source | Description |
| :--- | :--- | :--- |
| **Bounding Box** | YOLOv8 | The detected area of a player or ball. |
| **#ID Tag** | ByteTrack | Unique ID (e.g., `#5`) that stays with the player. |
| **Team Label** | K-Means | `Team 1` or `Team 2` based on jersey color. |
| **Speed Metric** | Estimator | `14.5 px/s`. Live velocity (smoothed). |
| **POSSESSION** | Poss. Logic | Marks the player currently controlling the ball. |

---

## ❓ Troubleshooting

| Error | Cause | Fix |
| :--- | :--- | :--- |
| `ModuleNotFoundError` | Missing libraries | Run `pip install -r football_cv/requirements.txt`. |
| `FileNotFoundError` | Missing video | Ensure `football_cv/data/input.mp4` exists. |
| `AttributeError: ...tracker_id` | No detections | The code handles empty frames, but ensure video isn't black/corrupt. |
| **Slow Processing** | CPU bottleneck | Switch `yolov8x.pt` to `yolov8n.pt` in `pipeline.py` for 10x speedup (lower accuracy). |

---

## 🚀 Running the Full Stack App

### 1. Start the Backend (API)
From the project root:
```bash
uvicorn football_cv.api.server:app --reload
```
*Server will start at http://localhost:8000*

### 2. Start the Frontend
Open a **new** terminal window, navigate to `frontend/`, and run:
```bash
cd frontend
npm install
npm run dev
```
*Client will start at http://localhost:3000*

### 3. Use the App
1.  Go to `http://localhost:3000` in your browser.
2.  Click "Start Analysis".
3.  Upload your `input.mp4`.
4.  Wait for processing to complete and view stats!
