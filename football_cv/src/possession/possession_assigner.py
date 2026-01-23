import sys

class PossessionAssigner:
    def __init__(self, max_distance_threshold=70, frame_persistence=10):
        """
        Args:
            max_distance_threshold (int): Max pixels between ball and player center.
            frame_persistence (int): Frames to hold possession if ball is lost/occluded.
        """
        self.max_distance_threshold = max_distance_threshold
        self.frame_persistence = frame_persistence
        
        self.current_possessor_id = None
        self.frames_since_possession = 0

    def assign(self, detections):
        """
        Assigns possession to the closest player to the ball.
        
        Args:
            detections (sv.Detections): Detections containing players/ball.
            
        Returns:
            int | None: The track_id of the possessing player, or None.
        """
        ball_detections = detections[detections.class_id == 32]
        player_detections = detections[detections.class_id == 0]

        # If no ball detected, handle persistence
        if len(ball_detections) == 0:
            self.frames_since_possession += 1
            if self.frames_since_possession > self.frame_persistence:
                self.current_possessor_id = None
            return self.current_possessor_id

        if len(player_detections) == 0:
            self.frames_since_possession += 1
            if self.frames_since_possession > self.frame_persistence:
                self.current_possessor_id = None
            return self.current_possessor_id

        # Get ball center (take ball with highest confidence)
        ball_idx = ball_detections.confidence.argmax()
        ball_box = ball_detections.xyxy[ball_idx]
        ball_center = self.get_center(ball_box)

        min_dist = float('inf')
        closest_player_id = None

        # Find closest player
        for i, player_box in enumerate(player_detections.xyxy):
            player_center = self.get_center(player_box)
            dist = self.measure_distance(ball_center, player_center)

            if dist < min_dist:
                min_dist = dist
                # Use tracker_id if available (safeguard against None)
                if player_detections.tracker_id is not None:
                     closest_player_id = player_detections.tracker_id[i]

        # Valid Possession
        if min_dist < self.max_distance_threshold and closest_player_id is not None:
            self.current_possessor_id = closest_player_id
            self.frames_since_possession = 0
            return self.current_possessor_id

        # Ball visible but too far from any player -> Lose possession immediately or keep?
        # Logic: If ball is clearly far away (e.g. mid-pass), no one has possession.
        # But "Possession" implies control. If passed, control is lost.
        # So we reset possession if min_dist > threshold.
        
        self.current_possessor_id = None
        self.frames_since_possession = 0
        return None

    def get_center(self, box):
        x1, y1, x2, y2 = box
        return (int((x1 + x2) / 2), int((y1 + y2) / 2))

    def measure_distance(self, p1, p2):
        return ((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)**0.5
