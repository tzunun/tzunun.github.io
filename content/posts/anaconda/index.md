---
title: "AI/ML Python Environment"
date: 2020-06-08T08:06:25+06:00
description: Using Anaconda's Distribution of Python
menu:
  sidebar:
    name: AI/ML Python Environment
    identifier: ai/ml python environment
    weight: 10
hero: jupyterlab.png
tags: ["Basic", "Multi-lingual"]
categories: ["Basic"]
---

---
If the you have to use Python 3 for anything related to the following:

* Machine Learning
* Data Science

And are starting out on your own, or would like to know what your choices are other than the default Python for your OS, or Linux Distribution.  I recommend Anaconda's distribution of Python.

### The benefits of Anaconda are:

1. Optimized math libraries from Intel, which if you have an Intel processor take advantage of the built-in functionality of you processor

2. The conda package manager for installation of additional libraries as well as creating virtual environments.  Conda only install packages in a virtual environment.  If a library is not available in their repositories or through the conda-forge channel, you can still use pip to install software, just make sure the intended environment is activated.



3. A Data Science specific platform.  When you install Anaconda it install most of the libraries you need in order to start your Data Science or Machine Learning journey.

## Other Options:
**Enthought Canopy:** This a brief description from their website. (I don't know much about Canopy)

Enthought Canopy provides a proven scientific and analytic Python package distribution plus key integrated tools for iterative data analysis, data visualization, and application development

**Intel Distribution For Python:** Description from their website.

Supercharge Python* applications and speed up core computational packages with this performance-oriented distribution.


## Links of interest

[Anaconda](https://www.anaconda.com/distribution/)

[Canopy](https://www.enthought.com/product/canopy/)

[Conda: Myths and Misconceptions](https://jakevdp.github.io/blog/2016/08/25/conda-myths-and-misconceptions/)

[Intel Distribution For Python](https://software.intel.com/en-us/distribution-for-python)

## Warning:  

People choose to install software from the conda-forge repository (aka channel) for various reasons, from what I've seen preference is placed on using Open Source Software.  That is fine with me but I want the Intel optimized libraries available through the Anaconda channel.  When you add the conda-forge channel you have the option to use either of the following commands:


**conda config --add channels new_channel**

**conda config --prepend channels new_channel**

This sets the added channel at the top of the list and makes it the highest priority, meaning that when you run the command; conda install new_library. It will look for the new_library from the channel with the highest priority first and then make its way down if it doesn't find it there.  

### I prefer the following method

Conda also now has a command that adds the new channel to the bottom of the channel list, making it the lowest priority:

**conda config --append channels new_channel**