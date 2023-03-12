# autocompletion属性
 autocompletion属性の住所正規化は、ウェブフォームの自動入力機能を改善するための標準化された方法です。この機能を使用することで、ユーザーは住所をより迅速かつ正確に入力することができます。この機能は、HTMLのautocomplete属性を使用して実現されます。

# 使い方
住所の自動入力機能を実装するには、各住所フィールドに対してautocomplete属性に特定の値を指定する必要があります。以下は、住所フィールドに対して指定できるautocomplete属性の値の一覧です。


|autocomplete属性	|説明	|iOS|Android|
|---|---|---|
|postal-code	|郵便番号の自動入力|	-|-|
|country	|国コードです。	|-|-|
|country-name	|国名です。	|-|-|
|address-level1|住所の一番上行政レベルです。これはふつう、住所がある都道府県です。合衆国では州になります。スイスでは、カートンになります。イギリスでは、ポストタウンになります。|都道府県|都道府県|
|address-level2|	少なくとも2段階の行政レベルがある住所において、2番目の行政レベルです。2つの行政レベルがある国では、これはふつう市町村や、住所のあるその他の地域を表します|市区町村|市区郡|
|address-level3|	少なくとも3段階の行政レベルがある住所において、3番目の行政レベルです。|	-|-
|address-level4|	住所が4段階まである場合のもっとも細かい行政レベルです。 |	-|-|
|street-address	|番地と建物名を含む住所. ※市町村名、郵便番号、国名は含めるべきではありません	|-|番地|
|address-line1|	住所のそれぞれの行です。これらは "street-address" が存在しない場合のみ置くことができます。　※street-addresがない場合のみ利用可能|番地|住所1行目|
|address-line2|	住所のそれぞれの行です。これらは "street-address" が存在しない場合のみ置くことができます。	※street-addresがない場合のみ利用可能|建物名など(オプション)|住所2行目|
|address-line3|	住所のそれぞれの行です。これらは "street-address" が存在しない場合のみ置くことができます。	※street-addresがない場合のみ利用可能|-|-|


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
5. [autocomplete属性のものすごく簡単なメモ](https://momdo.hatenablog.jp/entry/20230204/1675497918)