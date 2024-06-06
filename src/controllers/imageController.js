const { spawn } = require('child_process');
const mysql = require('../database/db');
const fs = require('fs');
const path = require('path');

class ImageController {
    async processImage(req, res) {
        try {
            const imageFile = req.file;

            // Check if an image file was uploaded
            if (!imageFile) {
                console.error("No image file uploaded");
                return res.status(400).send({ error: "Image file is required" });
            }

            // Check the file buffer
            if (!imageFile.buffer) {
                console.error("Image file buffer is undefined");
                return res.status(400).send({ error: "Invalid image file" });
            }

            // Save the uploaded image to a temporary location
            const tempImagePath = path.join(__dirname, '../uploads', imageFile.originalname);
            fs.writeFileSync(tempImagePath, imageFile.buffer);

            // Run the Python script
            try {
                const arucoId = await runPythonScript(tempImagePath);
                console.log(`Detected Aruco ID: ${arucoId}`);

                if (isNaN(arucoId)) {
                    throw new Error("No se identifico un Aruco valido en la imagen");
                }

                // Query the database with the obtained ID
                mysql.query('SELECT restaurant_name, menu FROM restaurant WHERE id = ?', [arucoId], (dbError, results) => {
                    // Remove the temporary image file
                    fs.unlinkSync(tempImagePath);

                    // Handle database query errors
                    if (dbError) {
                        console.error(`Database query error: ${dbError}`);
                        return res.status(500).send({ error: "Database query failed" });
                    }

                    // Handle case where no restaurant is found
                    if (results.length === 0) {
                        console.warn(`No restaurant found with ID: ${arucoId}`);
                        return res.status(404).send({ error: "No restaurant found with the given ID" });
                    }

                    // Format and send the response
                    const restaurant = results[0];
                    const responseMessage = `El nombre del restaurante es ${restaurant.restaurant_name}, el menu es: ${restaurant.menu}`;
                    res.send(responseMessage);
                });
            } catch (error) {
                fs.unlinkSync(tempImagePath); // Ensure the temporary file is removed in case of an error
                console.error(`Error processing image: ${error}`);
                res.status(500).send({ error: error.toString() });
            }
        } catch (error) {
            console.error(`Internal Server Error: ${error}`);
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
}

//Run the Python script and capture the output
async function runPythonScript(imagePath) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', [path.join(__dirname, '../scripts/process_image.py'), imagePath]);

        // Capture data from stdout
        pythonProcess.stdout.on('data', (data) => {
            console.log(`Python script output: ${data}`);
            resolve(parseInt(data.toString().trim(), 10));
        });

        // Capture data from stderr
        pythonProcess.stderr.on('data', (data) => {
            console.error(`Python script stderr: ${data}`);
            reject(data.toString());
        });

        // Handle script closure
        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`Python script exited with code ${code}`);
                reject(`Python script exited with code ${code}`);
            }
        });

        pythonProcess.on('error', (error) => {
            console.error(`Error spawning Python process: ${error}`);
            reject(`Error spawning Python process: ${error}`);
        });
    });
}

const imageController = new ImageController();
module.exports = imageController;