import uuid

TASKS = {}

def create_task():
    task_id = str(uuid.uuid4())
    TASKS[task_id] = {
        "status": "pending",
        "result": None,
        "error": None
    }
    return task_id

def update_task(task_id, **kwargs):
    if task_id in TASKS:
        TASKS[task_id].update(kwargs)

def get_task(task_id):
    return TASKS.get(task_id)
