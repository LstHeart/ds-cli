#!/bin/sh

# A command to run each time the container is successfully started (execute everytime)
# 一般用于项目启动
echo `date +"[%Y/%m/%d %H:%M:%S]"` 'postStartCommand will begin✨' \
  && echo '[working-dir]:' `pwd`

# cat ~/.bashrc
## update project dependencies and so on
# echo 'update dependencies' && ni
# nr serve
ni
## ...

echo `date +"[%Y/%m/%d %H:%M:%S]"` 'postStartCommand has done🎉'
exit