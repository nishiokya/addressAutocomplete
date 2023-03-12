# W3C住所autocompletion
W3Cの住所autocompletionは、ウェブフォームの自動入力機能を改善するための標準化された方法です。この機能を使用することで、ユーザーは住所をより迅速かつ正確に入力することができます。この機能は、HTMLのautocomplete属性を使用して実現されます。

# 使い方
住所の自動入力機能を実装するには、各住所フィールドに対してautocomplete属性に特定の値を指定する必要があります。以下は、住所フィールドに対して指定できるautocomplete属性の値の一覧です。


|autocomplete属性	|説明	|日本の住所でのサンプル|
|---|---|---|
|street-address	|番地と建物名を含む住所.※市町村名、郵便番号、国名は含めるべきではありません	|神南1-1-1 渋谷ヒカリエ21階|
|address-line1|	番地を含む住所　street-addresがない場合のみ利用可能|東京都渋谷区神南1-1-1|
|address-line2|	建物名を含む住所の自動入力	|渋谷ヒカリエ21階|
|address-level1|	都道府県や州の自動入力	|東京都|
|address-level2|	市区町村の自動入力	|渋谷区|
|address-level3|	市区町村以下の地域の自動入力|	神南|
|postal-code	|郵便番号の自動入力|	150-8510|
|country	|国コードです。	|日本|
|country-name	|国名です。	|日本|
以下は、これらの値を使用して実装された住所の自動入力機能のサンプルです。

html
```
<form>
  <label for="street-address">Street address:</label>
  <input type="text" id="street-address" name="street-address" autocomplete="street-address">
  <br>
  <label for="city">City:</label>
  <input type="text" id="city" name="city" autocomplete="address-level2">
  <br>
  <label for="state">State:</label>
  <input type="text" id="state" name="state" autocomplete="address-level1">
  <br>
  <label for="zip-code">Zip code:</label>
  <input type="text" id="zip-code" name="zip-code" autocomplete="postal-code">
</form>
このサンプルでは、autocomplete属性に適切な値が指定され、それによりユーザーが住所をより迅速かつ正確に入力できるようになっています。
```
# 利点
住所の自動入力機能には、いくつかの利点があります。

- ユーザーが入力する必要がある情報が少なくなるため、入力時間が短縮されます。
- ユーザーが入力する情報が正確になるため、間違いやタイポが減ります。


# 詳細情報

1. [w3.org](https://www.w3.org/WAI/WCAG21/Techniques/html/H98)
2. [Living Standard — Last Updated 8 March 2023](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill)
3. [HTML 属性: autocomplete](https://developer.mozilla.org/ja/docs/Web/HTML/Attributes/autocomplete)
4. [ややこしい､フォームで使える住所系autocomplete属性の一覧と解説](https://blog.kentokanai.net/autocomplete/)