#!/bin/bash

# switch nodejs && set default nodejs
nvm use 14 && nvm default 14

# custom global npm
npm install -g @devcontainers/cli pnpm yarn

# vscode extension
npm install -g vsce yo

# ni
npm install -g @antfu/ni && echo "defaultAgent=npm" > ~/.nirc

# angular
npm install -g @angular/cli @angular-devkit/schematics-cli