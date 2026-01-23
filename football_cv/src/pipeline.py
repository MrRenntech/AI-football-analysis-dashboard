from video_utils import read_video, get_video_info, VideoWriter
from detector import FootballDetector
from tracker import FootballTracker
from possession.possession_assigner import PossessionAssigner
import supervision as sv
import cv2

def main():
    # Paths
    VIDEO_PATH = "football_cv/data/input.mp4"
    OUTPUT_PATH = "football_cv/output/annotated_output.mp4"
    
    # Initialize
    print("Initializing...")
    detector = FootballDetector(model_path="yolov8x.pt")
    tracker = FootballTracker()
    assigner = PossessionAssigner(max_distance_threshold=70, frame_persistence=10)
    
    # Annotators
    box_annotator = sv.BoxAnnotator()
    label_annotator = sv.LabelAnnotator()

    # Get Video Info
    width, height, fps = get_video_info(VIDEO_PATH)
    if width == 0:
        print("Error: Could not read video info.")
        return

    print(f"Video Info: {width}x{height} @ {fps}fps")

    # Process Loop (Streaming)
    print(f"Processing and streaming to {OUTPUT_PATH}...")
    
    with VideoWriter(OUTPUT_PATH, width, height, fps) as writer:
        # Enumerate the generator
        for i, frame in enumerate(read_video(VIDEO_PATH)):
            
            # Detect
            detections = detector.detect_frame(frame)
            
            # Track
            tracked_detections = tracker.update_with_detections(detections)
            
            # Assign Possession
            possessing_player_id = assigner.assign(tracked_detections)
            
            # Annotate
            annotated_frame = frame.copy()
            
            labels = []
            for tracker_id in tracked_detections.tracker_id:
                if tracker_id == possessing_player_id:
                    labels.append(f"#{tracker_id} POSSESSION")
                else:
                    labels.append(f"#{tracker_id}")
            
            annotated_frame = box_annotator.annotate(
                scene=annotated_frame, 
                detections=tracked_detections
            )
            annotated_frame = label_annotator.annotate(
                scene=annotated_frame,
                detections=tracked_detections,
                labels=labels
            )
            
            # Highlight Possessor if exists
            if possessing_player_id is not None:
                # Find the box for the possessing player
                mask = tracked_detections.tracker_id == possessing_player_id
                if any(mask):
                    features_xyxy = tracked_detections.xyxy[mask][0]
                    # Draw a triangle marker or just distinct color?
                    # For now, let's just create a special dynamic label or color.
                    # Actually, the label above already says "POSSESSION".
                    # Let's add a visual marker triangle above player head.
                    x1, y1, x2, y2 = features_xyxy
                    cx = int((x1 + x2) / 2)
                    cy = int(y1) - 15
                    
                    # Draw inverted triangle
                    triangle_points = [
                        (cx, cy),
                        (cx - 10, cy - 20),
                        (cx + 10, cy - 20)
                    ]
                    import numpy as np
                    cv2.drawContours(annotated_frame, [np.array(triangle_points)], 0, (0, 0, 255), -1)

            # Write Frame
            writer.write(annotated_frame)
            
            if i % 50 == 0:
                print(f"Processed frame {i}...")

    print("Done!")

if __name__ == "__main__":
    main()
