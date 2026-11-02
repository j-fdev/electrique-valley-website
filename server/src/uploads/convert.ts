

import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';



async function checkFFmpeg(): Promise<boolean> {
    return new Promise((resolve) => {
        exec('ffmpeg -version', (error) => {
            if (error) {
                console.error('❌ FFmpeg is not installed or not in PATH');
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

async function convertAllVideos(): Promise<void> {
    console.log("▶️  convertAllVideos() was invoked");

    const ffmpegInstalled = await checkFFmpeg();
    if (!ffmpegInstalled) {
        throw new Error('FFmpeg is required but not installed');
    }
    
    return new Promise((resolve, reject) => {
        try {
            const inputFolder = path.join(process.cwd(), 'src', 'uploads', 'uploadedVideos');
            const outputFolder = path.join(process.cwd(), 'src', 'uploads', 'convertedVideos');
            
            console.log('Input folder:', inputFolder);
            console.log('Output folder:', outputFolder);

            // Check if input folder exists
            if (!fs.existsSync(inputFolder)) {
                console.log("⚠️ Input folder doesn't exist");
                fs.mkdirSync(inputFolder, { recursive: true });
                resolve(); // No files to process
                return;
            }

            // Create output folder if it doesn't exist
            if (!fs.existsSync(outputFolder)) {
                console.log("Creating output folder...");
                fs.mkdirSync(outputFolder, { recursive: true });
            }

            // Read directory contents
            fs.readdir(inputFolder, (err, files) => {
                if (err) {
                    console.error('Error reading input folder:', err);
                    reject(err);
                    return;
                }

                // Filter for video files
                const videoFiles = files.filter(file => 
                    ['.mp4', '.mov', '.avi'].includes(path.extname(file).toLowerCase())
                );

                console.log(`Found ${videoFiles.length} video files to convert`);

                // Nothing to convert: finish now, otherwise the promise never resolves
                // and the API never starts listening.
                if (videoFiles.length === 0) {
                    resolve();
                    return;
                }

                let completedCount = 0;

                videoFiles.forEach(file => {
                    const inputPath = path.join(inputFolder, file);
                    const outputFileName = `${path.parse(file).name}.webm`;
                    const outputPath = path.join(outputFolder, outputFileName);
                
                    // Check if converted file already exists
                    if (fs.existsSync(outputPath)) {
                        console.log(`Checking path: ${outputPath}`);
                        console.log(`⏭️  File ${completedCount + 1}/${videoFiles.length}: Skipping ${file} - already converted`);
                        completedCount++;
                        
                        if (completedCount === videoFiles.length) {
                            console.log('🎯 All video conversions completed');
                            resolve();
                        }
                        return;
                    }
                
                    // Changed this log message to be more descriptive
                    console.log(`🎬 File ${completedCount + 1}/${videoFiles.length}: Starting conversion of ${file}`);
                    
                    exec(
                        `ffmpeg -i "${inputPath}" -c:v libvpx-vp9 -c:a libopus "${outputPath}"`,
                        (error, stdout, stderr) => {
                            completedCount++;
                            
                            if (error) {
                                console.error(`❌ File ${completedCount}/${videoFiles.length}: Error converting ${file}:`, error.message);
                            } else {
                                console.log(`✅ File ${completedCount}/${videoFiles.length}: Successfully converted ${file}`);
                            }
                
                            if (completedCount === videoFiles.length) {
                                console.log('🎯 All video conversions completed');
                                resolve();
                            }
                        }
                    );
                });
            });
        } catch (error) {
            console.error('Conversion setup error:', error);
            reject(error);
        }
    });
}

export { convertAllVideos };