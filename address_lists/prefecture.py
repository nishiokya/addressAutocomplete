import pandas as pd
import requests
from io import BytesIO
import jaconv
from pykakasi import kakasi

url = "https://www.soumu.go.jp/main_content/000730858.xlsx"

response = requests.get(url)

# Excelファイルを読み込む
excel_data = pd.read_excel(BytesIO(response.content), engine="openpyxl", header=None)

# 都道府県と市区町村のカラムを抽出
prefectures_and_cities = excel_data[[0, 1, 2, 3, 4]].drop(0)  # 最初の行（ヘッダ）を削除
prefectures_and_cities = prefectures_and_cities.dropna()  # NaNを含む行を削除

# 半角カタカナを全角カタカナに変換
prefectures_and_cities[3] = prefectures_and_cities[3].apply(jaconv.h2z)
prefectures_and_cities[4] = prefectures_and_cities[4].apply(jaconv.h2z)

# カタカナをひらがなに変換
prefectures_and_cities[3] = prefectures_and_cities[3].apply(jaconv.kata2hira)
prefectures_and_cities[4] = prefectures_and_cities[4].apply(jaconv.kata2hira)

# ひらがなをローマ字に変換
kakasi = kakasi()
kakasi.setMode("H", "a")
conv = kakasi.getConverter()

def convert_romaji(text):
    return conv.do(text)

prefectures_and_cities[5] = prefectures_and_cities[3].apply(convert_romaji)
prefectures_and_cities[6] = prefectures_and_cities[4].apply(convert_romaji)

# 都道府県名をキーとして、市区町村のリストをグループ化
grouped = prefectures_and_cities.groupby(1)[[2, 4, 6]].apply(lambda x: x.values.tolist()).to_dict()

print(grouped)