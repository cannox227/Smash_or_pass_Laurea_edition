#!/bin/bash

# Function to create copies of files
create_copies() {
    local input_folder="$1"
    local output_folder="$2"
    local num_copies="$3"

    # Ensure that the output folder exists
    mkdir -p "$output_folder"

    # Iterate through files in the input folder
    for filename in "$input_folder"/*.webp; do
        # Extract year from filename
        year=$(basename "$filename" | cut -d'.' -f1)

        # Iterate to create copies
        for (( i=0; i<num_copies; i++ )); do
            # Construct new filename with sequential id
            new_filename="${year}_$i.webp"

            # Copy the file to the output folder
            cp "$filename" "$output_folder/$new_filename"
        done
    done
}

# Check if all required arguments are provided
if [ $# -ne 3 ]; then
    echo "Usage: $0 <input_folder> <output_folder> <num_copies>"
    exit 1
fi

# Call the function to create copies
create_copies "$1" "$2" "$3"
