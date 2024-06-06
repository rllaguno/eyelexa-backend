# eyelexa-backend

### Nodejs Application for eyelexa
This nodejs application has a single api route `/api/uploadImage` for sending an image with an [ArUco](https://chev.me/arucogen) (6x6) in frame within the request and recieves a parsed string with restaurant name and menu items depending on the ArUco id in the response.

### src:
Contains NodeJS application

Run application with:
``` bash
npm start
```
Create a request for `/api/uploadImage`
```
http://<server_ip>:<port>/api/uploadImage
```
### raspi:
Contains Raspi Client Python code

Run code with:
```bash
python3 eyelexa-raspi.py
```
