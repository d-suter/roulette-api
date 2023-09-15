import requests
import time

urls = [
    "http://localhost:3000/spin/eu",
    "http://localhost:3000/spin/fr",
    "http://localhost:3000/spin/usa"
]

request_count = 100000

def spam_url(url, count):
    for _ in range(count):
        try:
            response = requests.get(url)
            print(f"Sent request to {url}, Status code: {response.status_code}")
        except requests.ConnectionError:
            print(f"Failed to connect to {url}")

start_time = time.time()

for url in urls:
    spam_url(url, request_count)

end_time = time.time()

print(f"Total time taken: {end_time - start_time:.2f} seconds")
