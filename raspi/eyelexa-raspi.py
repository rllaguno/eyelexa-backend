import pygame
import pygame.camera
from pygame.locals import *
import os
from gtts import gTTS
import time
import requests

url = "http://172.20.10.4:3000/api/uploadImage"

# Placeholder for the upload_image function
def upload_image(image_path):
    print(image_path)
    with open(image_path, 'rb') as img_file:
        files = {'image': img_file}
        print (files)
        response = requests.post(url, files=files)
        print ("Response ")
        print("Response:")
        print(response.status_code)
        print(response.text)
    return response.text # Return the plain text response

def take_photo(camera):
    # Capture an image
    img = camera.get_image()

    # Save the image
    pygame.image.save(img, "image_req.png")
    print("SAVING PHOTO")
    # Upload the image
    response = upload_image("image_req.png")

    return response

def t2s(text):
    myobj = gTTS(text=text, lang='es', slow=False)
    myobj.save("restaurant.mp3")
    # Playing the converted file
    os.system("xdg-open restaurant.mp3")
    return 0

def main():
    pygame.init()
    pygame.camera.init()

    # List available cameras
    camlist = pygame.camera.list_cameras()

    if not camlist:
        print("No cameras found!")
        return

    # Initialize the camera
    camera = pygame.camera.Camera(camlist[0], (640, 480))
    camera.start()

    screen = pygame.display.set_mode((640, 480))
    pygame.display.set_caption("Press 'p' to take a photo and upload it. Press 'q' to quit.")

    running = True

    while running:
        frame = camera.get_image()
        screen.blit(frame, (0, 0))
        pygame.display.flip()

        for event in pygame.event.get():
            if event.type == QUIT:
                running = False
            if event.type == KEYDOWN:
                if event.key == K_p:
                    print("Taking photo...")
                    response = take_photo(camera)
                    print("Response of take photo:")
                    print(response)  # Print the plain text response
                    t2s(response)
                    time.sleep(5)  # Wait for 5 seconds
                elif event.key == K_q:
                    running = False

    camera.stop()
    pygame.quit()

if __name__ == "__main__":
    main()

