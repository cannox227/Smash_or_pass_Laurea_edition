#!/bin/bash

# Check if the correct number of arguments are provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 input_directory output_directory"
    exit 1
fi

# Define input and output directories from arguments
INPUT_DIR="$1"
OUTPUT_DIR="$2"

# Create the output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# List of supported image formats including HEIC
SUPPORTED_FORMATS="jpg jpeg png bmp tiff heic avif"

# Iterate over all files in the input directory
for FILE in "$INPUT_DIR"/*; do
    # Get the file extension
    EXT="${FILE##*.}"
    EXT_LOWER=$(echo "$EXT" | tr '[:upper:]' '[:lower:]')
    
    # Check if the file is an image of supported format
    if [[ $SUPPORTED_FORMATS =~ (^|[[:space:]])$EXT_LOWER($|[[:space:]]) ]]; then
        # Get the filename without the extension
        FILENAME=$(basename "$FILE" ".$EXT")
        # Define the output file path
        OUTPUT_FILE="$OUTPUT_DIR/$FILENAME.webp"
        
        # Use FFmpeg to convert the image to WebP format
        ffmpeg -i "$FILE" "$OUTPUT_FILE"
    fi
done

echo "Conversion completed."


