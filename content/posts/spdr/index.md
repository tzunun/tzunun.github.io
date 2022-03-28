---
title: "SPDR S&P 500 ETF Trust (SPY)"
date: 2020-06-08T08:06:25+06:00
description: Introduction to Sample Post
menu:
  sidebar:
    name: SPDR S&P 500 ETF Trust (SPY)
    identifier: spdr
    weight: 10
hero: stocks.jpg
tags: ["Basic", "Multi-lingual"]
categories: ["Basic"]
---



The initial aim of this project was to make a trend prediction on the daily price of the SPDR S&P 500 ETF from STATE STREET GLOBAL ADVISORS, from this point forwar reffered to as SPDR.  This ETF (exchange traded fund) was chosen because it tracks the Standard & Poor's 500 index.

## Results

The model was able to provide a rudimentary prediction after 10 epochs, further training resulted in a more accurate prediction graph after 40 epochs.

### Graph After 10 Epochs
![LSTM Diagram](/img/10epochs.png)
### Graph After 40 Epochs
![LSTM Diagram](/img/40epochs.png)

## Data
What follows is the script I wrote to obtain the data from Quandl.

{{< highlight python >}}
import quandl
import pandas as pd

# Load the file that would be used to obtain the components of the S&P500 index
sp500 = pd.read_csv('sp500.csv') # This assumes the csv file and this file are in the same folder.

# Open the file containing the api key
api = open('quandl_api_key', 'r')
if api.mode == 'r':
api_key = api.read()
# Close the api file
api.close()

quandl.ApiConfig.api_key = api_key.strip()

# Test the connection to the Quandl API
test = quandl.get('WIKI/IBM')
test.head()

missing_stock = [] # List to keep track of the unobtainable data.
for x in range (len(sp500) - 1): # Minus 1 because the last line of the sp500 file refers to the source
try:
stock_symbol = str(sp500['Symbol'][x]) # Get the stock symbol
stock = ''.join(['WIKI/', stock_symbol]) # String required for quandl api ex. WIKI/AAPL
file_name = ''.join([stock_symbol, '.csv']) # Create file name for the csv file
print(x, file_name)
stock_data = quandl.get(stock) # Get the data from Quandl
stock_data.to_csv(''.join(['csv_files/', file_name])) # Save the data to the local csv_files directory
except Exception:
missing_stock.append(x) # Keep track of stock_symbol causing issues with a request to quandl
print(x)
pass
''' List the stocks that were not acquired from Quandl. Some data is not free and some sites use a slight variation of the stock symbol.''' 

'''Show stock symbol and name of the data not obtained from Quandl. These represent about 1 percent of all the data
At this point I decided to not include them in the data, although I wonder how this will affect the model. '''
for x in missing_stock:
print(sp500['Symbol'][x], sp500['Name'][x])

{{< / highlight >}}

### Organizing The Data Into The Dataset I Needed
After running the code above I was left with a csv_files folder with about 500 csv files. I was not able to obtain all the data I wanted from Quandl, either because some information is not available from them free of charge or because of slight variations in the way ticker symbols were written on the Barchart components' list. 

One thing to note is that the S&P500 components change from time to time and for various reasons; for example, companies get added and removed because of acquisitions and corporate spin-offs. My strategy was to work with the S&P500 components that were current the day I obtained the component list from Barchart. I started working on this available data immediately so that, after obtaining some insights into its structure, I could focus on improving its accuracy.

### Decisions on the data...
For the purpose of this exercise, the following choices were made. Use data
starting from the first trading day of the year 2000, and up until the last
day on the data from Quandl. The dates are January 03, 2000 to March 27,
2018. This range of time gives 4586 days of historical trading data.

 In order to combine all the data from each component into one unit, I used
a 3D matrix. That is, total number of days multiplied by number of
components multiplied by the number of features from each of those
components (High, Low, Open and Close stock price). So 4586x499x4 is the
matrix size.

The data for some of the components doesn’t go back all they way to January
03, 2000. Some only went back a few years, a few more only went back a
couple of months. So I decided to create my 3D matrix of 4586x499x4 using
numpy.zeros, which took care of introducing the missing values as well as
making it easier to insert the data in its appropriate location within the
3D matrix. Here's how. When I ran the program, it would stop at what seemed
to be random points and display an error about not being able add data to
the 3D matrix. The problem was that I was adding the data to the matrix
starting from the earliest day in the csv file. After many hours I finally
figured I had to open the files that were causing the issues and look at
their data as a spreadsheet. There were less than 3500 days of data for some
of the troublesome files. It occurred to me to do calculations using dates
to find the appropriate index for inserting the data. After doing some
reading on how to accomplish this, I took a look at the data again and saw
that the only thing that all the data had in common was its last reported
trading day. So I modified the code to start reading and inserting data
backwards, from the last day until January 03, 2000.

Up until this moment I had devoted most of my time to looking at the data
from the components and not the data from the SPY. When I first tried to
plot a graph using both data sources, S&P 500 components as X and SPY as Y,
I kept getting an error that they didn’t match. I tried iterations of the
same code and..., same error. When I finally printed the length of the S&P
500 data and SPY, I saw that there was an extra day in the SPY. I checked
both start and end dates and they matched. I ran the graph cell again and
got the same error about X and Y being different in size. I uncovered the
problem by doing a manual binary search on the SPY data and, after a couple
of minutes discovering that the SPY data which I downloaded manually from
Yahoo Finance contained data for November 8th, 2017. All the data sets I
checked from Quandl were missing that day, so I had to remove it from the
SPY data.

SPY and APPL obtained from Yahoo Finance. APPL, along with two randomly chosen datasets obtained from Quandl. 2017-11-08 missing on the last three.

![Missing Data](/img/missing_data.jpg)

Code used to assemble the data.....
{{< highlight python >}}

import pandas as pd
from numba import jit
import numpy as np
import os.path # To check whether a file exist

# Load the s&p500 csv file to read the csv names
sp500_components = pd.read_csv('sp500.csv')

# Create a matrix of 4586 by ~504 by 4, I only need 4 columns per stock, per day, for 4586 days of data or ~18 years.
days = 4586 
components = len(sp500_components)
columns = 4 # I'm only using the High, Low, Open and Close columns 
prepared_data_matrix = np.zeros((days,components,columns))

@jit
def add_to_data_matrix(csv_file, index):

csv_data = pd.read_csv(csv_file)
date = (days - 1)
data_size = (len(csv_data) -1)
if date <= data_size:
counter = date # 4586 spots counting from the 0th index
else:
counter = data_size # Some number less than 4586
print('counter =', counter)
while counter >= 0:
prepared_data_matrix[date][index][0] = csv_data['Open'][counter]
prepared_data_matrix[date][index][1] = csv_data['High'][counter]
prepared_data_matrix[date][index][2] = csv_data['Low'][counter]
prepared_data_matrix[date][index][3] = csv_data['Close'][counter]
date -= 1
counter -= 1

# Create each stock's csv filename 
for index in range (len(sp500_components) - 1):
stock_symbol = str(sp500_components['Symbol'][index]) # Get the stock symbol
csv_file = ''.join([stock_symbol, '.csv']) # This is the actual file to read from the local directory 
print(csv_file)
# Read files found in the local directory
if os.path.isfile(csv_file):
add_to_data_matrix(csv_file, index) # Add the contents of the file to the proper location within the prepared_data_matrix(4586x504x4)
else:
print("File not found!")
print('Done creating prepared_data_matrix!') # This process takes a while.

# Save the combined components data prepared_data_matrix as a numpy array to be used in the future and avoid reassembling the matrix again.
np.save('data_matrix.npy', prepared_data_matrix, allow_pickle=False)

{{< / highlight >}}

## Running The Initial Tests
After getting the different parts of the code to work as expected, I split the data into two parts: 70 percent for training and the rest for testing. The result is the following.

![First Test Graph](/img/test_graph.png)

The model is able to identify that the stock prices do not change by much from one day to the next. At this point this was fine since I just wanted to see that the LSTM was working and I could refactor the code to be more flixible for future uses (speciffically the 3D matrix that was created when I combined the data from all the components).

## The Model
I am not including the code to build the model here.  Rather, I have chosen to provide a picture of the structure of the model, and for this I made use of Tensorboard. The code to build the test model is available at https://github.com/tzunun/sp500_project/blob/master/build_model.py 

### LSTM Model Used For The Prediction
![LSTM Diagram](/img/lstm_diagram.png)
### Loss Function
![LSTM Diagram](/img/10epochs_loss_graph.png)

## Challenges ##
The first day on the project, it turned out that I had overestimated the data I had available, in the event about 20 years of the daily starting, high, low, and ending price the SPDR. Then I realized that if this was a supervised model, I had the prediction part of the training and testing data but not the data needed to make those predictions.

I first had to get a list of the companies that make up the S&P 500 because it is what the SPDR is based on. The S&P 500 is based on the market capitalization of about 500 large companies whose common stock is listed on the New York Stock Exchange or the NASDAQ stock market. The list I obtained from Barchart, in a nicely formatted csv file, served to make the automation of the data gathering process easier.

Obtaining the historical data from each of the companies in the S&P500 took longer than I had anticipated. Having decided to use Yahoo Finance to gather this data, and since I had tested downloading historical data from random companies, I erroneously believed that the process could be easily automated.  Not so!  First I had to figure out how the Yahoo Finance website was assembling its requests to fetch the historical data of a particular company. I wrote a script using the list of the S&P 500 components that I obtained from Barchart to automatically create the fetch requests and save the data to its own-name csv file. For example, a request for historical data from Ford Motor Company would be saved to F.csv, F being the abbreviation used to uniquely identify publicly traded shares of Ford Motor Company (also know as "ticker symbol" or "stock symbol").

The script worked as intended, except that Yahoo's servers stopped responding after 20 or so requests. I tried modifying the time between request along with other tactics, none of which worked. I went looking for a different source of historical and I found Quandl. The Quandl website had numerous examples of how to use their API and the API key they provided me to obtain data. 

## Final Observations

This is an ongoing project, which I plan to revisit an update as I gain more experience with Data Science and Machine Learning. I have no delusions of being able to predict the movement of the stock market, especially when it is affected by factors that I am not able to consider. The purpose of the project was

<style type="text/css">
    ol { list-style-type: upper-alpha; }
</style>

1. To build something almost from scratch, with data that I had to find and piece together myself. 
- To create a model using Keras and Tensorflow. 
- And to create visualizations using Matplotlib and Tensorboard.

 Along the way, I came up with ways to reduce the time it takes to train a model (considering I don't have a GPU). Furthermore, I found myself seeking advise in order to become more proficient in reasoning about a project and writing better code. The complete code for this project is available on my github account at  https://github.com/tzunun/sp500_project 
