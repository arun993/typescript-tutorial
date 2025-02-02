#!/bin/bash

# This script requires fzf (https://github.com/junegunn/fzf) for interactive selection.
# Ensure fzf is installed and in your PATH.

# Function to run a command and then sleep for 15 seconds.
run_command() {
    echo "Running: $1"
    eval "$1"
    echo "Sleeping for 15 seconds..."
    sleep 15
}

# Function to run all commands sequentially
run_all() {
    run_command "npm run mint-and-register"
    run_command "npm run create-spg-collection"
    run_command "npm run register-music"
    run_command "npx ts-node scripts/OpenAiOnIP.ts"
    run_command "npm run register-deriv-non-com"

    # Ask user to complete the extra tasks
    echo -e "\nYou have to do these 2 tasks: https://github.com/arun993/typescript-tutorial/blob/main/guide.md"
    read -p "Enter y/n if you are done: " response
    if [ \"$response\" != \"y\" ]; then
        echo "Exiting run-all sequence. Please complete the tasks and try again."
        return
    fi

    run_command "npm run register-deriv-com"
    run_command "npm run register-deriv-com-spg"
    run_command "npm run dispute-ip"

    echo "All tasks completed!"
}

# Array of menu options
options=(
    "npm run mint-and-register"
    "npm run create-spg-collection"
    "npm run register-music"
    "npx ts-node scripts/OpenAiOnIP.ts"
    "npm run register-deriv-non-com"
    "npm run register-deriv-com"
    "npm run register-deriv-com-spg"
    "npm run dispute-ip"
    "Run all one by one"
    "Exit"
)

# Main loop: prompt user to select a command and run it.
while true; do
    echo -e "\nWhich command do you want to run? Use arrow keys to select:"
    selected=$(printf "%s\n" "${options[@]}" | fzf --height=10 --border --prompt="Select command> ")

    # If no selection is made, continue the loop.
    if [ -z "$selected" ]; then
        continue
    fi

    case "$selected" in
        "npm run mint-and-register")
            run_command "npm run mint-and-register"
            ;;
        "npm run create-spg-collection")
            run_command "npm run create-spg-collection"
            ;;
        "npm run register-music")
            run_command "npm run register-music"
            ;;
        "npx ts-node scripts/OpenAiOnIP.ts")
            run_command "npx ts-node scripts/OpenAiOnIP.ts"
            ;;
        "npm run register-deriv-non-com")
            run_command "npm run register-deriv-non-com"
            ;;
        "npm run register-deriv-com")
            run_command "npm run register-deriv-com"
            ;;
        "npm run register-deriv-com-spg")
            run_command "npm run register-deriv-com-spg"
            ;;
        "npm run dispute-ip")
            run_command "npm run dispute-ip"
            ;;
        "Run all one by one")
            run_all
            ;;
        "Exit")
            echo "Exiting..."
            exit 0
            ;;
        *)
            echo "Invalid selection. Try again."
            ;;
    esac
done
