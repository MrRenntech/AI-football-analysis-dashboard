import cv2
import numpy as np
from sklearn.cluster import KMeans

class TeamAssigner:
    def __init__(self):
        self.kmeans = None
        self.player_team_map = {}
        
        # Buffer to accumulate data for the first fit
        self.feature_buffer = [] # list[np.ndarray]
        self.feature_ids = []    # list[int]
        self.min_samples = 30    # Robust buffer size before training

    def extract_feature(self, frame, bbox):
        """
        Extracts the mean HSV color of the player's upper torso (jersey).
        """
        x1, y1, x2, y2 = map(int, bbox)
        
        # Valid crop check
        if y2 <= y1 or x2 <= x1: return None
        
        cropped_player = frame[y1:y2, x1:x2]
        height = cropped_player.shape[0]
        
        if height == 0: return None
        
        # Crop upper 50% (Torso)
        upper_torso = cropped_player[:height//2, :]
        
        # Convert to HSV and compute mean
        hsv_torso = cv2.cvtColor(upper_torso, cv2.COLOR_BGR2HSV)
        mean_color = np.mean(hsv_torso, axis=(0, 1))
        
        return mean_color

    def update(self, frame, detections):
        """
        Updates team assignments for the given detections using consistent K-Means.
        Teams are locked to {0, 1}.
        
        Args:
            frame (np.ndarray): The current video frame.
            detections (sv.Detections): Detections containing players.
            
        Returns:
            team_map (dict): {tracker_id: team_id (0 or 1)}
        """
        if detections.tracker_id is None:
            return {}

        current_map = {}
        
        # 1. Collect features for unassigned players
        for i, tracker_id in enumerate(detections.tracker_id):
            if tracker_id not in self.player_team_map:
                feature = self.extract_feature(frame, detections.xyxy[i])
                if feature is not None:
                    # If model not trained yet, buffer it
                    if self.kmeans is None:
                        self.feature_buffer.append(feature)
                        self.feature_ids.append(tracker_id)
                    else:
                        # Model exists, predict immediately
                        team_id = self.kmeans.predict(feature.reshape(1, -1))[0]
                        self.player_team_map[tracker_id] = team_id

        # 2. Train model if buffer is ready (Run K-Means ONCE)
        if self.kmeans is None and len(self.feature_buffer) >= self.min_samples:
            self.kmeans = KMeans(n_clusters=2, init="k-means++", n_init=10, random_state=42)
            self.kmeans.fit(np.array(self.feature_buffer))
            
            # Assign teams to buffered players
            labels = self.kmeans.labels_
            for idx, tid in enumerate(self.feature_ids):
                self.player_team_map[tid] = labels[idx]
            
            # Clear buffer (optional, but good for memory cleanliness)
            self.feature_buffer = []
            self.feature_ids = []

        # 3. Build map for current frame
        for tracker_id in detections.tracker_id:
            if tracker_id in self.player_team_map:
                current_map[tracker_id] = self.player_team_map[tracker_id]
        
        return current_map
