#!/bin/sh

# the script execute when a dev container is created (execute once)
echo `date +"[%Y/%m/%d %H:%M:%S]"` 'onCreateCommand will begin✨' \
  && echo '[working-dir]:' `pwd`

# setup nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm install 14 && nvm install 16 \
  && nvm default 14
# install global npms
npm install -g @devcontainers/cli @antfu/ni pnpm yarn vsce yo

## install fzf
brew install fzf && echo y y y| $(brew --prefix)/opt/fzf/install

# install other softs by homebrew
brew install fisher \
    lua luarocks \
    gh git-lfs \
    ranger

echo `date +"[%Y/%m/%d %H:%M:%S]"` 'onCreateCommand has done🎉'
exit