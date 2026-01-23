import cv2

def get_video_info(video_path):
    """
    Returns (width, height, fps) of the video.
    """
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        return 0, 0, 0
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    cap.release()
    return width, height, fps

def read_video(video_path):
    """
    Generator that yields one frame at a time.
    """
    cap = cv2.VideoCapture(video_path)
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        yield frame
    cap.release()

class VideoWriter:
    """
    Context manager for writing video frames incrementally.
    """
    def __init__(self, output_path, width, height, fps=24):
        self.output_path = output_path
        self.width = width
        self.height = height
        self.fps = fps
        self.writer = None

    def __enter__(self):
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        self.writer = cv2.VideoWriter(
            self.output_path, 
            fourcc, 
            self.fps, 
            (self.width, self.height)
        )
        return self

    def write(self, frame):
        if self.writer:
            self.writer.write(frame)

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.writer:
            self.writer.release()
