from video_utils import read_video, get_video_info, VideoWriter
from detector import FootballDetector
from tracker import FootballTracker
from possession.possession_assigner import PossessionAssigner
from metrics.speed_distance_estimator import SpeedDistanceEstimator
from team_assignment.team_assigner import TeamAssigner
import supervision as sv
import cv2
import numpy as np

def run_analysis(source_video_path, output_video_path, config=None):
    """
    Runs the full analysis pipeline on the source video and saves to output path.
    Returns aggregated analytics.

    Args:
        source_video_path (str): Path to input video.
        output_video_path (str): Path to save annotated video.
        config (dict, optional): Configuration dictionary. Defaults to None.

    Returns:
        dict: Aggregated analytics containing 'players' and 'teams'.
    """
    # 1. Configuration
    if config is None:
        config = {}
    
    model_path = config.get("model_path", "yolov8x.pt")
    
    # 2. Initialize Modules
    detector = FootballDetector(model_path=model_path)
    tracker = FootballTracker()
    assigner = PossessionAssigner(max_distance_threshold=70, frame_persistence=10)
    
    # Annotators
    box_annotator = sv.BoxAnnotator()
    label_annotator = sv.LabelAnnotator()

    # 3. Video Setup
    width, height, fps = get_video_info(source_video_path)
    if width == 0:
        return {"error": "Could not read video info"}

    speed_estimator = SpeedDistanceEstimator(fps=fps)
    team_assigner = TeamAssigner()

    # 4. Analytics Accomulators
    player_stats = {} # {tracker_id: {team: int, total_distance: float, speeds: []}}
    team_stats = {
        0: {"distance": 0.0, "possession_frames": 0},
        1: {"distance": 0.0, "possession_frames": 0}
    }
    total_frames = 0

    # 5. Processing Loop
    with VideoWriter(output_video_path, width, height, fps) as writer:
        for i, frame in enumerate(read_video(source_video_path)):
            total_frames += 1
            
            # --- CV Pipeline ---
            detections = detector.detect_frame(frame)
            tracked_detections = tracker.update_with_detections(detections)
            
            if tracked_detections.tracker_id is None:
                writer.write(frame)
                continue
            
            possessing_player_id = assigner.assign(tracked_detections)
            speed_map, distance_map = speed_estimator.update(tracked_detections)
            team_map = team_assigner.update(frame, tracked_detections)
            
            # --- Analytics Aggregation ---
            for tracker_id in tracked_detections.tracker_id:
                # Initialize player stats if new
                if tracker_id not in player_stats:
                    player_stats[tracker_id] = {
                        "team": None,
                        "total_distance": 0.0,
                        "speeds": []
                    }
                
                # Update Team (Consistency check: only update if not set or update dynamic?)
                # Phase 4 says persistence, so we trust team_map.
                if tracker_id in team_map:
                    current_team = team_map[tracker_id]
                    player_stats[tracker_id]["team"] = current_team # Keep updating or lock? Lock is safer usually.
                
                # Update Distance
                # Note: distance_map from speed_estimator contains TOTAL distance. 
                # We can just update the total.
                if tracker_id in distance_map:
                    player_stats[tracker_id]["total_distance"] = distance_map[tracker_id]
                
                # Update Speed
                if tracker_id in speed_map:
                    s = speed_map[tracker_id]
                    player_stats[tracker_id]["speeds"].append(s)

            # Update Team Stats (Possession)
            if possessing_player_id is not None:
                # Find team of possessor
                if possessing_player_id in team_map:
                    p_team = team_map[possessing_player_id]
                    if p_team in team_stats:
                        team_stats[p_team]["possession_frames"] += 1

            # --- Annotation ---
            annotated_frame = frame.copy()
            labels = []
            for tracker_id in tracked_detections.tracker_id:
                speed = speed_map.get(tracker_id, 0.0)
                team_str = ""
                if tracker_id in team_map:
                    tid = team_map[tracker_id]
                    team_str = f" | Team {tid + 1}"

                if tracker_id == possessing_player_id:
                    labels.append(f"#{tracker_id}{team_str} | {speed:.1f}px/s | POSSESSION")
                else:
                    labels.append(f"#{tracker_id}{team_str} | {speed:.1f}px/s")
            
            annotated_frame = box_annotator.annotate(scene=annotated_frame, detections=tracked_detections)
            annotated_frame = label_annotator.annotate(scene=annotated_frame, detections=tracked_detections, labels=labels)
            
            # Draw marker
            if possessing_player_id is not None:
                 mask = tracked_detections.tracker_id == possessing_player_id
                 if mask.any():
                    features_xyxy = tracked_detections.xyxy[mask][0]
                    x1, y1, x2, y2 = features_xyxy
                    cx = int((x1 + x2) / 2)
                    cy = int(y1) - 15
                    triangle_points = [(cx, cy), (cx - 10, cy - 20), (cx + 10, cy - 20)]
                    cv2.drawContours(annotated_frame, [np.array(triangle_points)], 0, (0, 0, 255), -1)

            writer.write(annotated_frame)

    # 6. Finalize Analytics
    
    # Aggregate Team Distance
    for pid, stats in player_stats.items():
        if stats["team"] is not None:
            t = stats["team"]
            if t in team_stats:
                team_stats[t]["distance"] += stats["total_distance"]

    # Calculate Possession %
    for tid, stats in team_stats.items():
        if total_frames > 0:
            stats["possession_pct"] = (stats["possession_frames"] / total_frames) * 100
        else:
            stats["possession_pct"] = 0.0
        # Cleanup internal counter
        del stats["possession_frames"]

    # Format Player Stats
    final_players = {}
    for pid, stats in player_stats.items():
        avg_speed = 0.0
        if stats["speeds"]:
            avg_speed = sum(stats["speeds"]) / len(stats["speeds"])
        
        final_players[str(pid)] = {
            "team": stats["team"],
            "total_distance_px": round(stats["total_distance"], 1),
            "avg_speed_px_s": round(avg_speed, 1)
        }

    final_teams = {}
    for tid, stats in team_stats.items():
        final_teams[str(tid)] = {
            "distance_px": round(stats["distance"], 1),
            "possession_pct": round(stats["possession_pct"], 1)
        }

    return {
        "players": final_players,
        "teams": final_teams
    }
