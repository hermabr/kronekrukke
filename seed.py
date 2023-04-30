import requests

names = [
    "Jakob Sønstebø",
    "Herman Brunborg",
    "Julie Bjørnstad",
    "Ben Bjørsvik",
    "Carl Fredrik Nordbø Knutsen",
    "Gaute Johannessen",
    "Emma Storberg",
    "August Gude",
    "Yasmine Krukkenes-Gomez",
]

url = 'http://localhost:5173/api/user'

headers = {
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
    'Origin': 'http://localhost:5173',
    'Referer': 'http://localhost:5173/user',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
    'sec-ch-ua': '"Not:A-Brand";v="99", "Chromium";v="112"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Linux"',
}

for name in names:
    print("Adding", name)
    data = {"name": name}
    response = requests.post(url, headers=headers, json=data)
    print(response.text)
    print()

fees = [
    {"comment": "nice - majs", "amount": 1, "userId": 5, "addedBy": "Herman Brunborg"},
    {"comment": "wow", "amount": 2, "userId": 1, "addedBy": "Admin"},
    {"comment": "wow - vov", "amount": 1, "userId": 5, "addedBy": "Jakob"},
]

import time
import random

for fee in fees:
    print("Posting fee", fee["comment"])
    response = requests.post("http://localhost:5173/api/fee", headers=headers, json=fee)
    print(response.text)
    print()
    if fee != fees[-1]:
        time.sleep(random.random()*3+1)
