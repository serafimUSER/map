import requests
import json
import os


# Const Data
labels = ['mon', 'mus', 'oth']
# Local data 
data_load = {}

# All images for download
urls = []

# Read Example Json
with open('data__.json', 'rb') as json_file:
    data = json.loads(json_file.read())

# Recode in normal state
for colum in data.keys():
    if colum in labels:
        data_load[colum] = {}
        for row in data[colum]:
            data_load[colum][row] = {
                'card_image': data[colum][row]['src'],
                'by_title': data[colum][row]['title'],
                'ru_title': data[colum + "_ru"][row]['title'],
                'slider': [
                    data[colum][row]['src'],
                    data[colum][row]['src'],
                    data[colum][row]['src']
                ],
                'by_text': data[colum][row]['text'],
                'ru_text': data[colum + '_ru'][row]['text'],
                'location': data[colum][row]['loc']
            }
            urls.append(data[colum][row]['src'])

# Load normal data
with open('data.json', 'w+') as result_file:
    result_file.write(json.dumps(data_load, indent=4))
