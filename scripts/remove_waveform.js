#!/usr/bin/env node

const sharp = require('sharp');
const path = require('path');

async function removeWaveform() {
  const inputPath = path.join(__dirname, '../public/screenshots/03_voice_recording.png');
  const outputPath = path.join(__dirname, '../public/screenshots/03_voice_recording_clean.png');
  
  console.log('📸 Removing static waveform from screenshot...');
  
  try {
    // Read the image
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`Image size: ${metadata.width}x${metadata.height}`);
    
    // Create a white rectangle to cover the waveform area
    // The waveform appears to be roughly in the center of the phone screen
    // Based on standard iPhone screenshot dimensions and the marketing frame
    const coverWidth = 200;
    const coverHeight = 100;
    const centerX = Math.floor(metadata.width / 2);
    const centerY = Math.floor(metadata.height / 2);
    const coverX = centerX - Math.floor(coverWidth / 2);
    const coverY = centerY - Math.floor(coverHeight / 2);
    
    // Create white rectangle overlay
    const whiteRect = Buffer.from(
      `<svg width="${coverWidth}" height="${coverHeight}">
        <rect x="0" y="0" width="${coverWidth}" height="${coverHeight}" fill="white" rx="12"/>
      </svg>`
    );
    
    // Composite the white rectangle over the waveform
    await image
      .composite([{
        input: whiteRect,
        left: coverX,
        top: coverY,
      }])
      .toFile(outputPath);
    
    console.log('✅ Clean screenshot saved to:', outputPath);
    console.log('📝 Now replace the original file');
    
  } catch (error) {
    console.error('❌ Error processing image:', error);
    process.exit(1);
  }
}

removeWaveform();


