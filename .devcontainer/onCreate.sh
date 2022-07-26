#!/bin/bash
# install homebrew
sudo apt-get update -y && \
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf

# install fish by homebrew
brew install fish
# install fzf
brew install fzf &&
# ~/.fzf/install
# install an additional version of node using nvm

# sudo node -c "source /usr/local/share/nvm/nvm.sh && nvm install 16"

fisher install jethrokuan/z
fisher install andreiborisov/sponge
fisher install jorgebucaran/autopair.fish
fisher install PatrickF1/fzf.fish
fisher install jorgebucaran/nvm.fish
fisher install IlanCosman/tide@v5
npm install -g @antfu/ni @angular/cli@13 @angular-devkit/schematics-cli pnpm yarn vsce yo
