#!/bin/bash

# Log file path (adjust as needed)
LOG_FILE="server.log"

# ANSI color codes
GREEN='\033[0;32m'  # Green color for success
RED='\033[0;31m'    # Red color for errors
NC='\033[0m'        # No color (reset)

# Function to log messages to both console and log file
log_message() {
    local log_message="$1"
    local timestamp=$(date +'%Y-%m-%d %H:%M:%S')

    # Log to file
    echo "$timestamp $log_message" >> "$LOG_FILE"

    # Determine color based on message content (optional)
    local color="${GREEN}"  # Default color is green
    if [[ "$log_message" == *"Error"* || "$log_message" == *"Aborting"* ]]; then
        color="${RED}"  # Use red for errors or abort messages
    fi

    # Print to terminal with color
    echo -e "${timestamp} ${color}${log_message}${NC}"
}

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    log_message "npm is required but not installed. Aborting." >&2
    exit 1
fi

# Check if package.json exists
if [ ! -f package.json ]; then
    log_message "package.json not found in the current directory. Aborting." >&2
    exit 1
fi

# Check if node_modules directory exists
if [ -d "node_modules" ]; then
    log_message "Node.js modules already installed. Skipping installation."
else
    # Install npm modules
    log_message "Installing Node.js modules..."
    npm install | tee -a "$LOG_FILE"
fi

# Check if frontend directory exists
if [ ! -d "frontend" ]; then
    log_message "frontend directory not found. Aborting." >&2
    exit 1
fi

# Build Next.js application in frontend
log_message "Building Next.js application..."
(cd frontend && npm run build | tee -a "../$LOG_FILE")

# Start server using npm start
log_message "Starting server..."
# Run npm start in the background and capture its output
npm start >> "$LOG_FILE" 2>&1 &

# Capture npm start's process ID
npm_pid=$!

# Wait for npm start to complete
sleep 10  # Adjust this timeout as needed based on your application's startup time

# Check if npm start process is still running
if ps -p $npm_pid > /dev/null; then
    log_message "Server started."
    
else
    log_message "Failed to start server." >&2
fi
