import requests
import time

WEBHOOK_URL = "https://discord.com/api/webhooks/1146166632763359272/MJQKKYn4Mks8jg1i6yxM__yhfc6O2DUjrFbC1Mfa-A7dA6d7bWlvq930Evqz4HxRtY1e"

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
        time.sleep(0.05)

def send_discord_message(content):
    data = {
        "content": content
    }
    response = requests.post(WEBHOOK_URL, json=data)
    if response.status_code == 204:
        print("Successfully sent message to Discord!")
    else:
        print("Failed to send message to Discord.")

start_time = time.time()

for url in urls:
    spam_url(url, request_count)

end_time = time.time()

message = f"Total time taken: {end_time - start_time:.2f} seconds | Sent {request_count} requests to each URL. | Total requests sent: {request_count * len(urls)}"
print(message)
send_discord_message(message)
