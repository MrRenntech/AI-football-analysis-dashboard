import cv2
import numpy as np

class ViewTransformer:
    def __init__(self, source_points=None, target_points=None):
        """
        Initializes the ViewTransformer with source (pixel) and target (pitch) points.
        
        Args:
            source_points (np.ndarray): Array of 4 points from the image [pixel_x, pixel_y].
            target_points (np.ndarray): Array of 4 corresponding points on the 2D pitch [meter_x, meter_y].
        """
        self.homography_matrix = None
        
        if source_points is not None and target_points is not None:
             self.fit(source_points, target_points)

    def fit(self, source_points, target_points):
        """
        Computes the homography matrix from source to target points.
        
        Args:
            source_points (np.ndarray): Shape (N, 2) array of pixel coordinates.
            target_points (np.ndarray): Shape (N, 2) array of real-world coordinates.
        """
        source_points = np.array(source_points, dtype=np.float32)
        target_points = np.array(target_points, dtype=np.float32)
        
        self.homography_matrix, _ = cv2.findHomography(source_points, target_points)

    def transform_point(self, point):
        """
        Transforms a single point (x, y) from image space to pitch space.
        
        Args:
            point (tuple): (x, y) pixel coordinates.
            
        Returns:
            tuple: (x, y) pitch coordinates (meters) or None if matrix not set.
        """
        if self.homography_matrix is None:
            return None
            
        point_array = np.array([[point]], dtype=np.float32)
        transformed_point = cv2.perspectiveTransform(point_array, self.homography_matrix)
        
        return tuple(transformed_point[0][0])

    def transform_bbox_center(self, bbox):
        """
        Calculates the center (bottom-center) of a bounding box and transforms it.
        Using bottom-center is standard for players standing on a pitch.
        
        Args:
            bbox (list/tuple): [x1, y1, x2, y2]
            
        Returns:
            tuple: (x, y) pitch coordinates.
        """
        x1, y1, x2, y2 = bbox
        
        # Bottom center is the best approximation for foot position
        foot_x = int((x1 + x2) / 2)
        foot_y = int(y2)
        
        return self.transform_point((foot_x, foot_y))
