const prefectures = ["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県", "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県", "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県", "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"];

// 都道府県のautocomplete機能を実装するためのコード
document.addEventListener("DOMContentLoaded", function() {
  const prefectureInput = document.getElementById("address-level1");

  // イベントリスナーを追加
  prefectureInput.addEventListener("input", function() {
    const value = prefectureInput.value;
    const datalist = document.getElementById("prefectures");
    datalist.innerHTML = "";

    // 入力値が空の場合はdatalistを非表示にする
    if (value === "") {
      datalist.style.display = "none";
      return;
    }

    // 都道府県リストから一致するものを検索する
    const matches = prefectures.filter(prefecture => {
      // かな入力やローマ字入力にも対応する
      const kana = prefecture.replace(/[ぁ-ん]/g, match => String.fromCharCode(match.charCodeAt(0) + 0x60));
      return prefecture.includes(value) || kana.includes(value);
    });

    // 一致する都道府県がある場合、datalistを表示する
    if (matches.length > 0) {
      matches.forEach(match => {
        const option = document.createElement("option");
        option.value = match;
        datalist.appendChild(option);
      });
      datalist.style.display = "block";
    } else {
      datalist.style.display = "none";
    }
  });

  // フォーカスが外れた場合はdatalist