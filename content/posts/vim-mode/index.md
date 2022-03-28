---
title: "Vim Mode In Ipython"
date: 2020-06-08T08:06:25+06:00
description: Enabling Vim-Mode in The Ipython REPL
menu:
  sidebar:
    name: Vim Mode in Ipython
    identifier: vim Mode in Ipython
    weight: 10
hero: ipython-insert-mode.png
tags: ["Basic", "Multi-lingual"]
categories: ["Basic"]
---

Sometimes when I am writting code I need to use the Python3 REPL to test or
write a function.  I prefer to use Ipython because it does syntax highlight,indentation and other things that the regular Python repl doesn't. ***Warning: When you add/modify a tool in your workflow, it inherently introduces complexity which may be more trouble than the benefit it provides.*** 

I am in the process of learning vim, so I am always
enabling vim-mode by any method available in the tools that I use.  In Visual Studio Code it is by extensions, in the bash terminal it is by adding the following lines to your **.bashrc** file in Linux. (WSL/WSL2 have not been tested but should work)

### Vim-like Movement in Bash
{{< highlight bash >}}
# vim-mode in bash
set -o vi
# remap ESC to 'jk'
bind '"jk":vi-movement-mode'
{{< / highlight >}}

***Note:  When editing a config file always, leave notes in the file of what you've
changed and why you changed it, leave your name as well.  Better yet make a
backup of the current config file before making changes, and still leave notes
in the new file.***

Here is a simple way to create a simple backup of a file.
{{< highlight bash >}}
 # Bash command
cp config_file config_file_old
{{< / highlight >}}

# Vim-Mode in Ipython

To enable vim-mode in Ipython start by creating a file by running the following command from the terminal.

{{< highlight bash >}}
 # Bash command
ipython profile create
{{< / highlight >}}

change or add the following line in the newly created file 

{{< highlight bash >}}
 # Bash command
vi .ipython/profile_default/ipython_config.py
{{< / highlight >}}

(*note that vi can be substituted by your prefered editor and the . (dot) in
front of Ipython makes it a hidden file.*)

**Find the line:**

{{< highlight python>}}
# Python Code
c.TerminalInteractiveShell.editing_mode = 'emacs'
{{< / highlight >}}

 underneath it paste the following. (I just copied the above line replaced
 ***emacs*** with ***vi***, and deleted the ***#*** that comments out the above line)

{{< highlight python>}}
# Python code
c.TerminalInteractiveShell.editing_mode = 'vi'
{{< / highlight >}}
 

## Remap ESC to other key combination that is more to your liking:
This was tested in Ubuntu 18LTS, should work fine in other Linux distros.

creating a file keybindings.py 
{{< highlight bash >}}
 # Bash command
vi .ipython/profile_default/startup/keybindings.py
{{< / highlight >}}


paste the following code.

{{< highlight python "hl_lines=16,linenostart=1" >}}
# Python code

from IPython import get_ipython
from prompt_toolkit.enums import DEFAULT_BUFFER
from prompt_toolkit.filters import HasFocus, ViInsertMode
from prompt_toolkit.key_binding.vi_state import InputMode

ip = get_ipython()

def switch_to_navigation_mode(event):
   vi_state = event.cli.vi_state
   vi_state.input_mode = InputMode.NAVIGATION

if getattr(ip, 'pt_app', None):
   registry = ip.pt_app.key_bindings
   registry.add_binding(u'j',u'k',
                        filter=(HasFocus(DEFAULT_BUFFER)
                                 & ViInsertMode()))(switch_to_navigation_mode)

{{< / highlight >}}

Save the file.

![Ipython in navigation mode](/img/ipython-navigation-mode.png "Ipython With Vim-Mode Enabled")