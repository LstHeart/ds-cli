#!/bin/sh

# 开发容器分配给用户的时候执行
echo `date +"[%Y/%m/%d %H:%M:%S]"` 'postCreateCommand will begin✨' \
  && echo '[working-dir]:' `pwd`

# update softs
sudo apt update && export DEBIAN_FRONTEND=noninteractive && sudo apt upgrade -y \
    && brew update && brew upgrade \
    && chezmoi update

# clean unused
sudo apt autoremove -y && sudo apt clean

echo `date +"[%Y/%m/%d %H:%M:%S]"` 'postCreateCommand has done🎉'
exit