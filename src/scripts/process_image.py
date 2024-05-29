import cv2 as cv
import cv2.aruco as aruco
import sys

def findAruco(img, marker_size=6, total_markers=250, draw=True):
    gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    key = getattr(aruco, f'DICT_{marker_size}X{marker_size}_{total_markers}')
    arucoDict = aruco.getPredefinedDictionary(key)
    arucoParam = aruco.DetectorParameters()
    aruco_detector = aruco.ArucoDetector(arucoDict, arucoParam)
    bbox, ids, _ = aruco_detector.detectMarkers(gray)
    
    if ids is not None:
        return ids[0][0]
    else:
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python process_image.py <image_path>")
        sys.exit(1)

    image_path = sys.argv[1]
    img = cv.imread(image_path)

    if img is None:
        print("Error: Image not found")
        sys.exit(1)

    aruco_id = findAruco(img)
    if aruco_id is not None:
        print(aruco_id)
    else:
        print("Error: No Aruco marker found")
        sys.exit(1)
