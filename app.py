import requests
from bs4 import BeautifulSoup

# Send an HTTP request
url = "https://example.com"
response = requests.get(url)

# Parse the HTML content
soup = BeautifulSoup(response.content, "html.parser")

# Extract the title
title = soup.title
print(title)

# Extract another content
#content = soup.find("div", class_="content").text
#print("Content:", content)
