#!/bin/sh

# the script execute when a dev container is created (execute once)
echo `date +"[%Y/%m/%d %H:%M:%S]"` 'onCreateCommand will begin✨' \
  && echo '[working-dir]:' `pwd`

# config chezmoi
echo y | chezmoi init --apply $GITHUB_USER

echo `date +"[%Y/%m/%d %H:%M:%S]"` 'onCreateCommand has done🎉'
exit