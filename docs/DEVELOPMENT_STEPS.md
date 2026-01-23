# 🏗️ AI Football Analysis - Reconstruction Guide

> **Purpose**: This document serves as a detailed blueprint. By following these steps and logic descriptions, a developer should be able to recreate the entire system from scratch without seeing the original source code.

---

## 🟢 Phase 1: Core Video Pipeline
**Objective**: Establish a stable framework to read video, detect objects, and save the result.

### 1.1 Project Structure
**Action**: Create a modular Python package structure.
-   `football_cv/`: Root package.
-   `football_cv/src/`: Source code (logic).
-   `football_cv/data/`: Input storage (gitignored).
-   `football_cv/output/`: Render storage (gitignored).

### 1.2 Video I/O (`video_utils.py`)
**Requirement**: Process large videos (e.g., 90 mins) without RAM overflow.
-   **Logic**:
    -   Use `cv2.VideoCapture` to read input.
    -   Implement a **Python Generator** (`yield frame`) to load only one frame at a time.
    -   Use `cv2.VideoWriter` to write the output frame-by-frame.
-   **Critical Detail**: Ensure the output resolution and FPS match the input video.

### 1.3 Object Detection (`detector.py`)
**Requirement**: Accurately find players and the ball.
-   **Library**: `ultralytics` (YOLOv8).
-   **Model**: `yolov8x.pt` (Extra Large) for maximum small-object detection recall.
-   **Configuration**:
    -   **Classes**: Filter detection to only keep Class ID `0` (Person) and `32` (Sports Ball).
    -   **Confidence**: Set a reasonable threshold (e.g., 0.3) to reject noise.

### 1.4 Object Tracking (`tracker.py`)
**Requirement**: Maintain persistent IDs for players across frames.
-   **Library**: `supervision`.
-   **Algorithm**: **ByteTrack**.
-   **Why ByteTrack?**: It matches low-confidence detections (unclear frames) to existing tracks, which is crucial for players moving quickly or blurring.
-   **Implementation**: Initialize `sv.ByteTrack()` and call `update_with_detections()` every frame.

---

## 🟡 Phase 2: Possession & Logic
**Objective**: Add game understanding (who has the ball?).

### 2.1 The Coordinator (`pipeline.py`)
**Action**: Create a main script to orchestrate modules.
-   **Loop**:
    1.  `read_video()` → `frame`
    2.  `detector.detect(frame)` → `detections`
    3.  `tracker.update(detections)` → `tracks`
    4.  *(Logic Modules)*
    5.  *(Annotation)*
    6.  `writer.write(frame)`

### 2.2 Possession Logic (`possession_assigner.py`)
**Requirement**: Assign the ball to a single player.
-   **Algorithm**:
    1.  **Filter**: Separate Ball detections and Player detections.
    2.  **Best Ball**: If multiple balls detected (ghosting), pick the one with highest confidence.
    3.  **Proximity**: Calculate Euclidean distance between Ball Center and every Player BBox Center.
    4.  **Threshold**: If `min_distance < 70px`, assign possession.
-   **Persistence (Edge Case)**:
    -   If the ball is *not detected* (occluded by a player body), keep the **last known possessor** active for `10 frames`.
    -   This prevents the label from flickering "off" during a dribble or block.

---

## 🟠 Phase 3: Physics Metrics
**Objective**: Quantify player movement.

### 3.1 Speed Estimation (`speed_distance_estimator.py`)
**Requirement**: Calculate speed in Pixels-per-Second (px/s).
-   **Data Structure**: Dictionary mapping `{tracker_id: [last_position, total_distance, speed_history]}`.
-   **Logic (Per Frame)**:
    1.  Calculate distance $d$ between current center and previous center.
    2.  **Jump Rejection**: If $d > 100px$ (teleportation glitch), ignore this update.
    3.  **Speed Formula**: $Speed = d \times FPS$.
    4.  **Smoothing**: Store speed in a 5-frame `deque` and display the average. This removes jitter.

---

## 🔴 Phase 4: Team Assignment
**Objective**: Distinguish Team A from Team B automatically.

### 4.1 Color Clustering (`team_assigner.py`)
**Requirement**: Label players without manual training data.
-   **Technique**: Unsupervised K-Means Clustering ($k=2$).
-   **Step-by-Step Logic**:
    1.  **Crop**: For each player bbox, extract the **top 50%** (jersey area). Ignoring the bottom removes shorts/legs/grass.
    2.  **Featurize**: Convert image to **HSV** color space. Calculate the **Mean Color** of the crop.
    3.  **Cluster**: Collect samples from the frame. Fit `KMeans(n_clusters=2)` on these color vectors.
    4.  **Prediction**: The model assigns a label `0` or `1` to each player.
    5.  **Persistence**: Store the assigned team in a map `{tracker_id: team_id}` so it doesn't re-calculate (and potentially flip) every frame.

---

## 📚 Final Assembly
To rebuild this:
1.  Setup the folder structure (Phase 1.1).
2.  Implement the wrappers (`video_utils`, `detector`, `tracker`) one by one.
3.  Write the `pipeline` loop to verify video flows through.
4.  Add `possession_assigner` and verify "POSSESSION" labels.
5.  Add `speed_estimator` and verify "px/s" labels.
6.  Add `team_assigner` and verify "Team 1/2" labels.

---

## 🟣 Phase 6: Productization & Restructuring
**Objective**: Prepare the codebase for deployment as a web application.

### 6.1 Architecture Split
**Action**: Separated "Core Analytics" from "Backend Infrastructure".
-   **Old**: Monolithic `src/` folder mixing scripts and logic.
-   **New**:
    -   `football_cv/core/`: Pure analytics library. No side effects. No prints.
    -   `football_cv/api/`: FastAPI server for HTTP handling.
    -   `football_cv/storage/`: Dedicated data volume.

### 6.2 Pipeline Refactor
**Action**: Converted `pipeline.py` from a script to a callable function.
-   **Function**: `run_analysis(source, output, config)`
-   **Return**: Now returns a **Rich Analytics Dictionary** containing aggregated stats (Possession %, Distance Covered, etc.).
-   **Constraint**: Removed all `print()` statements to keep server logs clean.

### 6.3 Metric Aggregation
**Algorithm**:
-   Accumulate distance and frames per player/team throughout the video loop.
-   At the end, compute averages and percentages.
-   Return the structured JSON for the frontend to render charts.

---

## 🟣 Phase 7: API Implementation (FastAPI)
**Objective**: Expose the analytics engine via HTTP.

### 7.1 Job Management (`api/task_manager.py`)
-   **Logic**: Simple in-memory dictionary to track task states (`pending` -> `processing` -> `completed/failed`).
-   **UUID**: Generates unique IDs for every uploaded video.

### 7.2 Server Endpoints (`api/server.py`)
-   `POST /upload`: Handles file saves and triggers background processing.
-   `GET /status/{id}`: Polling endpoint for frontend progress bars.
-   `GET /result/{id}`: Delivers final video path and analytics JSON.
-   **Static Serving**: Mounted `football_cv/storage` to allow the frontend to play generated videos directly from disk.

---

## 🔵 Phase 8: Frontend (Next.js)
**Objective**: User-friendly interface for the system.

### 8.1 App Router Structure
-   `upload/page.tsx`: File input area.
-   `processing/[id]/page.tsx`: Polling loop that checks status every 2 seconds.
-   `results/[id]/page.tsx`: The dashboard view.

### 8.2 Components
-   `VideoPlayer.tsx`: HTML5 video tag sourcing from the FastAPI static mount.
-   `StatsPanel.tsx`: Renders the JSON analytics into Team/Player tables.

---

## 💎 Phase 9: Final Polish & Design
**Objective**: Elevate the user experience and code quality.

### 9.1 Audi Design System
-   Implemented a **Global Theme** (`globals.css`) inspired by Audi's digital design:
    -   **Colors**: Stark Black (`#000`), Clean White (`#FFF`), and Sport Red (`#bb0a30`).
    -   **Typography**: Inter font family for maximum legibility.
    -   **Layout**: Minimalist headers and flat, confident interactive elements.

### 9.2 Configuration & Stability
-   Added **TypeScript Configuration** (`tsconfig.json`) to resolve path aliases (`@/lib/...`).
-   Added **Tailwind Configuration** connecting the design tokens to the CSS utility classes.
-   Cleaned up all code paths and verified modular separation between `core` logic and `api` serving.


