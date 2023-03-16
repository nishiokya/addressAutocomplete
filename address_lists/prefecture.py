import requests
import json

url = "https://raw.githubusercontent.com/dataofjapan/land/master/japan.geojson"
response = requests.get(url)
data = response.json()

prefectures = []

for index, feature in enumerate(data["features"]):
    prefecture = {
       # "id": index + 1,
        "ja": feature["properties"]["nam_ja"],
        "romaji": feature["properties"]["nam"],
        #"latitude": feature["properties"]["latitude"],
        #"longitude": feature["properties"]["longitude"]
    }
    prefectures.append(prefecture)

with open("prefectures.json", "w", encoding="utf-8") as f:
    json.dump(prefectures, f, ensure_ascii=False, indent=2)