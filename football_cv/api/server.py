from fastapi import FastAPI, UploadFile, BackgroundTasks, HTTPException
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import shutil
import json

from football_cv.core.pipeline import run_analysis
from football_cv.api.task_manager import create_task, update_task, get_task

BASE_DIR = Path("football_cv/storage")
UPLOAD_DIR = BASE_DIR / "uploads"
OUTPUT_DIR = BASE_DIR / "outputs"
RESULT_DIR = BASE_DIR / "results"

for d in [UPLOAD_DIR, OUTPUT_DIR, RESULT_DIR]:
    d.mkdir(parents=True, exist_ok=True)

app = FastAPI(title="AI Football Analysis API")

# Mount storage for static access (e.g. video playback)
app.mount("/football_cv/storage", StaticFiles(directory=BASE_DIR), name="storage")


def process_video(task_id: str, input_path: Path):
    try:
        output_video = OUTPUT_DIR / f"{task_id}.mp4"
        result_path = RESULT_DIR / f"{task_id}.json"

        update_task(task_id, status="processing")

        analytics = run_analysis(
            source_video_path=str(input_path),
            output_video_path=str(output_video),
            config={}
        )

        with open(result_path, "w") as f:
            json.dump(analytics, f, indent=2)

        update_task(
            task_id,
            status="completed",
            result={
                "video": str(output_video),
                "analytics": str(result_path)
            }
        )

    except Exception as e:
        update_task(task_id, status="failed", error=str(e))


@app.post("/upload")
async def upload_video(file: UploadFile, background_tasks: BackgroundTasks):
    if not file.filename.endswith(".mp4"):
        raise HTTPException(status_code=400, detail="Only MP4 videos supported")

    task_id = create_task()
    input_path = UPLOAD_DIR / f"{task_id}.mp4"

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    background_tasks.add_task(process_video, task_id, input_path)

    return {"task_id": task_id}


@app.get("/status/{task_id}")
def get_status(task_id: str):
    task = get_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@app.get("/result/{task_id}")
def get_result(task_id: str):
    task = get_task(task_id)
    if not task or task["status"] != "completed":
        raise HTTPException(status_code=404, detail="Result not ready")
    return task["result"]
