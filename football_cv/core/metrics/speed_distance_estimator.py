from collections import deque
import math

class SpeedDistanceEstimator:
    def __init__(self, fps=30, frame_window=5, max_distance_jump=100):
        """
        Args:
            fps (int): Frames per second of the video.
            frame_window (int): Number of frames for smoothing speed (moving average).
            max_distance_jump (int): Max pixels a player can move in 1 frame. 
                                     Prevents artifacts from ID switches.
        """
        self.fps = fps
        self.frame_window = frame_window
        self.max_distance_jump = max_distance_jump
        
        # storage: { 
        #   tracker_id: { 
        #       'last_position': (x, y), 
        #       'total_distance': 0.0, 
        #       'speed_history': deque(maxlen=frame_window) 
        #   } 
        # }
        self.tracks = {}

    def update(self, detections):
        """
        Updates speed and distance for given detections.
        
        Args:
            detections (sv.Detections): Must have tracker_id and xyxy.
            
        Returns:
            speed_map (dict): {tracker_id: speed_in_pps}
            distance_map (dict): {tracker_id: total_distance_in_pixels}
        """
        current_speed_map = {}
        current_distance_map = {}

        if detections.tracker_id is None:
            return current_speed_map, current_distance_map

        active_ids = set(detections.tracker_id)

        for i, tracker_id in enumerate(detections.tracker_id):
            box = detections.xyxy[i]
            center = self.get_center(box)

            # Initialize track if new
            if tracker_id not in self.tracks:
                self.tracks[tracker_id] = {
                    'last_position': center,
                    'total_distance': 0.0,
                    'speed_history': deque(maxlen=self.frame_window)
                }
                # No movement on first frame
                current_speed_map[tracker_id] = 0.0
                current_distance_map[tracker_id] = 0.0
                continue

            track = self.tracks[tracker_id]
            last_pos = track['last_position']

            # Calculate distance moved in this frame
            dist_pixels = self.measure_distance(last_pos, center)

            # Sanity Check: Ignore unrealistic jumps (ID switches or bad detections)
            if dist_pixels > self.max_distance_jump:
                # Do not update position, do not add distance.
                # Just report last known stats or 0 speed?
                # Best to treat as if they stood still or just skip update?
                # We'll skip adding to total distance, but we might want to update 
                # last_pos IF we trust the new one? 
                # "Do NOT add distance" -> imply we might still track them?
                # Safest is to reset last_pos to current so we resume tracking next frame 
                # relative to this one, BUT don't count the jump.
                track['last_position'] = center
                # Speed for this frame is 0 (or undefined), let's push 0 to smooth it out
                track['speed_history'].append(0.0)
            else:
                # Valid movement
                track['total_distance'] += dist_pixels
                track['last_position'] = center
                
                # Instantaneous speed (pixels per second)
                speed_pps = dist_pixels * self.fps
                track['speed_history'].append(speed_pps)

            # Calculate smoothed speed
            avg_speed = sum(track['speed_history']) / len(track['speed_history'])
            
            # Update output maps
            current_speed_map[tracker_id] = avg_speed
            current_distance_map[tracker_id] = track['total_distance']

        return current_speed_map, current_distance_map

    def get_center(self, box):
        x1, y1, x2, y2 = box
        return (int((x1 + x2) / 2), int((y1 + y2) / 2))

    def measure_distance(self, p1, p2):
        return math.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)
