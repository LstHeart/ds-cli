#!/bin/bash
sudo apt-get update -y
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
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