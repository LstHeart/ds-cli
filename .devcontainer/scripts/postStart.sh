#!/bin/sh

# A command to run each time the container is successfully started (execute everytime)
echo `date +"[%Y/%m/%d %H:%M:%S]"` 'postStartCommand will begin✨' \
  && echo '[working-dir]:' `pwd`

# copy dotfiles log if exist
DofilesLog='/workspaces/.codespaces/.persistedshare/dotfiles/dotfiles.log'
[ -f $DofilesLog ] && cp -f $DofilesLog .devcontainer/logs/

# cat ~/.bashrc
## update project dependencies and so on
# echo 'update dependencies' && ni
# nr serve
# nr build
## ...

echo `date +"[%Y/%m/%d %H:%M:%S]"` 'postStartCommand has done🎉'
exit