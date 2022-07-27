# fisher tools
if [ ! -d ~/.config/fish/conf.d ]; then
  mkdir -p ~/.config/fish/conf.d
fi
curl https://raw.githubusercontent.com/skywind3000/z.lua/master/z.lua > ~/.config/fish/conf.d/z.lua \
&& echo "lua ~/.config/fish/conf.d/z.lua --init fish | source" > ~/.config/fish/conf.d/z.fish

fisher install jorgebucaran/nvm.fish
fisher install PatrickF1/fzf.fish
fisher install franciscolourenco/done
fisher install jorgebucaran/autopair.fish
fisher install andreiborisov/sponge
echo y | fisher install ilancosman/tide@v5