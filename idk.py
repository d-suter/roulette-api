import requests
import time

# The URLs to be tested
urls = [
    "http://localhost:3000/spin/eu",
    "http://localhost:3000/spin/fr",
    "http://localhost:3000/spin/usa"
]

# Number of times to send a request to each URL
request_count = 100000

def spam_url(url, count):
    for _ in range(count):
        try:
            response = requests.get(url)
            print(f"Sent request to {url}, Status code: {response.status_code}")
        except requests.ConnectionError:
            print(f"Failed to connect to {url}")

for url in urls:
    spam_url(url, request_count)
