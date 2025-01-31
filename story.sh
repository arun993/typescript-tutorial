#!/bin/bash

# Function to run a command with a 15-second sleep after
run_command() {
    echo "Running: $1"
    $1
    echo "Sleeping for 3 seconds..."
    sleep 3
}

# Run commands sequentially
run_command "npm run mint-and-register"
run_command "npm run create-spg-collection"
run_command "npm run register-music"
run_command "npx ts-node scripts/OpenAiOnIP.ts"
run_command "npm run register-deriv-non-com"

# Prompt user to complete the task
echo "\nYou have to do these 2 tasks: https://github.com/arun993/typescript-tutorial/blob/main/guide.md"
read -p "Enter y/n if you are done: " response

# Check user input
if [ "$response" != "y" ]; then
    echo "Exiting script. Complete the tasks and try again."
    exit 1
fi

# Continue running the remaining commands
run_command "npm run register-deriv-com"
run_command "npm run register-deriv-com-spg"
run_command "npm run dispute-ip"

echo "All tasks completed!"
