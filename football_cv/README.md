# Football CV Module

This module implements a minimal computer vision pipeline for football analysis.

## Structure
- `data/`: Contains input videos.
- `output/`: Contains processed videos.
- `src/`: Source code.
  - `pipeline.py`: Main entry point.
  - `detector.py`: YOLOv8 detection logic.
  - `tracker.py`: ByteTrack tracking logic.
  - `video_utils.py`: Video I/O helpers.

## Usage
1. Install dependencies: `pip install -r requirements.txt`
2. Run pipeline: `python src/pipeline.py`
