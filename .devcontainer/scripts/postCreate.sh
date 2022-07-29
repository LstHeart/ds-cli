#!/bin/sh

# It happens after updateContentCommand and once the dev container has been assigned to a user for the first time(execute once)
echo `date +"[%Y/%m/%d %H:%M:%S]"` 'postCreateCommand will begin✨' \
  && echo '[working-dir]:' `pwd`

# ln -sf $HOME/config $PWD/.devcontainer/config && set +x

## setup fish
if [ ! -d ~/.config/fish/conf.d ]; then
  mkdir -p ~/.config/fish/conf.d
fi
curl https://raw.githubusercontent.com/skywind3000/z.lua/master/z.lua > ~/.config/fish/conf.d/z.lua \
&& echo "lua ~/.config/fish/conf.d/z.lua --init fish | source" > ~/.config/fish/conf.d/z.fish

fish -c "fisher install jorgebucaran/nvm.fish"
fish -c "fisher install PatrickF1/fzf.fish"
fish -c "fisher install franciscolourenco/done "
fish -c "fisher install jorgebucaran/autopair.fish"
fish -c "fisher install andreiborisov/sponge"
fish -c "echo y | fisher install ilancosman/tide@v5"

# git-completion
wget https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash \
  -O $HOME/.git-completion.bash

echo `date +"[%Y/%m/%d %H:%M:%S]"` 'postCreateCommand has done🎉'
exit