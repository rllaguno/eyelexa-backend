const { spawn } = require('child_process');
const mysql = require('../database/db');
const fs = require('fs');
const path = require('path');

class MainController {
    async uploadImage(req, res) {
        try {
            const imageFile = req.file;

            // Check if an image file was uploaded
            if (!imageFile) {
                return res.status(400).send({ error: "Image file is required" });
            }

            // Save the uploaded image to a temporary location
            const tempImagePath = path.join(__dirname, '../uploads', imageFile.originalname);
            fs.writeFileSync(tempImagePath, imageFile.buffer);

            // Run the Python script
            try {
                const arucoId = await runPythonScript(tempImagePath);

                if (isNaN(arucoId)) {
                    throw new Error("No valid Aruco marker found in image");
                }

                // Query the database with the obtained ID
                mysql.query('SELECT restaurant_name, menu FROM restaurant WHERE id = ?', [arucoId], (dbError, results) => {
                    // Remove the temporary image file
                    fs.unlinkSync(tempImagePath);

                    // Handle database query errors
                    if (dbError) {
                        return res.status(500).send({ error: "Database query failed" });
                    }

                    // Handle case where no restaurant is found
                    if (results.length === 0) {
                        return res.status(404).send({ error: "No restaurant found with the given ID" });
                    }

                    // Format and send the response
                    const restaurant = results[0];
                    const responseMessage = `El nombre del restaurante es ${restaurant.restaurant_name}, el menu es: ${restaurant.menu}`;
                    res.send(responseMessage);
                });
            } catch (error) {
                fs.unlinkSync(tempImagePath); // Ensure the temporary file is removed in case of an error
                res.status(500).send({ error: error.toString() });
            }

        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
}

// Async function to run the Python script and capture the output
async function runPythonScript(imagePath) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python3', [path.join(__dirname, '../scripts/process_image.py'), imagePath]);

        // Capture data from stdout (standard output)
        pythonProcess.stdout.on('data', (data) => {
            resolve(parseInt(data.toString().trim(), 10));
        });

        // Capture data from stderr (standard error)
        pythonProcess.stderr.on('data', (data) => {
            reject(data.toString());
        });

        // Handle script closure
        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                reject(`Python script exited with code ${code}`);
            }
        });
    });
}

const devController = new MainController();
module.exports = devController;