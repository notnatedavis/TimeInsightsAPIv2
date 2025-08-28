#   setupScript.sh
#   bash script for installing prerequisites (only supports MacOS & Linux)
#   : Git, Node.js, etc.

# update package lists
sudo apt update || sudo dnf update || brew update

# install Git
if command -v apt &> /dev/null; then
    sudo apt install -y git
elif command -v dnf &> /dev/null; then
    sudo dnf install -y git
elif command -v brew &> /dev/null; then
    brew install git
fi

# install Node.js
if command -v apt &> /dev/null; then
    sudo apt install -y nodejs npm
elif command -v dnf &> /dev/null; then
    sudo dnf install -y nodejs
elif command -v brew &> /dev/null; then
    brew install node
fi

# verify installations
git --version
node --version
npm --version