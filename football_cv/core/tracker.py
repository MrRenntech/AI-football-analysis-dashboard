import supervision as sv

class FootballTracker:
    def __init__(self):
        # Tuned parameters for football
        self.tracker = sv.ByteTrack(
            track_activation_threshold=0.25,
            lost_track_buffer=30,
            minimum_matching_threshold=0.8
        )

    def update_with_detections(self, detections):
        # Update tracker
        detections = self.tracker.update_with_detections(detections)
        return detections
