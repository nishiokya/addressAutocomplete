document.addEventListener('DOMContentLoaded', function() {
    // 郵便番号から住所を取得する関数
    function getAddressByPostalCode(postalCode) {
        return new Promise((resolve, reject) => {
            const apiUrl = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`;
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 200 && data.results) {
                        const result = data.results[0];
                        resolve({
                            prefecture: result.address1,
                            city: result.address2,
                            town: result.address3
                        });
                    } else {
                        reject(new Error('住所が見つかりませんでした'));
                    }
                })
                .catch(() => {
                    reject(new Error('APIリクエストに失敗しました'));
                });
        });
    }

    // 郵便番号入力時に住所を自動入力する処理
    const postalCodeInput = document.getElementById('postal-code');
    postalCodeInput.addEventListener('blur', function() {
        const postalCode = postalCodeInput.value;
        getAddressByPostalCode(postalCode)
            .then(function(address) {
                document.getElementById('prefecture').value = address.prefecture;
                document.getElementById('city').value = address.city;
                document.getElementById('street').value = address.town;
            })
            .catch(function(error) {
                console.error(error);
            });
    });
});


$(document).ready(function() {
    // 都道府県のデータ
    // 本来はサーバーサイドから都道府県のデータを取得する必要がありますが、
    // ここでは簡易的なデモンストレーションとして、配列を使用しています。
    const prefectures = [
        "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
        "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
        "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県",
        "岐阜県", "静岡県", "愛知県", "三重県",
        "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
        "鳥取県", "島根県", "岡山県", "広島県", "山口県",
        "徳島県", "香川県", "愛媛県", "高知県",
        "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
    ];

    // 都道府県のオートコンプリート機能
    $("#prefecture").autocomplete({
        source: prefectures
    });
});
