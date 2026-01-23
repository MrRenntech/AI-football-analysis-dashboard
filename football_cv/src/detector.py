from ultralytics import YOLO
import supervision as sv

class FootballDetector:
    def __init__(self, model_path):
        self.model = YOLO(model_path)

    def detect_frame(self, frame):
        # Run inference
        results = self.model(frame)[0]
        
        # Convert to supervision Detections
        detections = sv.Detections.from_ultralytics(results)
        
        # Filter by class (0=Person, 32=Sports ball)
        # Filter by confidence (> 0.4)
        filter_mask = (
            ((detections.class_id == 0) | (detections.class_id == 32)) & 
            (detections.confidence > 0.4)
        )
        detections = detections[filter_mask]
        
        return detections
