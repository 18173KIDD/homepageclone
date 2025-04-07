// ヘッダーメニュー機能
function setupHeaderMenu() {
    const hamburgerButton = document.querySelector('.p-header__hamburger_menu_button');
    const overlay = document.querySelector('.l-header__overlay');
    const body = document.body;

    if (hamburgerButton) {
        hamburgerButton.addEventListener('click', function() {
            body.classList.toggle('is-header_menu_open');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function() {
            body.classList.remove('is-header_menu_open');
        });
    }
}

// フォームバリデーション
function setupFormValidation() {
    const form = document.querySelector('.diagnosis__form'); // クラス名修正
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        // 必須フィールドのチェック
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                showError(field, '必須項目です');
            } else {
                removeError(field);
            }
        });

        // 電話番号のバリデーション
        const phoneField = form.querySelector('#phone');
        if (phoneField && phoneField.value.trim()) {
            const phonePattern = /^0[0-9]{9,10}$/;
            if (!phonePattern.test(phoneField.value.trim())) {
                isValid = false;
                showError(phoneField, '正しい電話番号を入力してください');
            } else {
                 removeError(phoneField); // 正しい場合はエラー解除
            }
        }

        // メールアドレスのバリデーション（任意項目）
        const emailField = form.querySelector('#email');
        if (emailField && emailField.value.trim()) {
            const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (!emailPattern.test(emailField.value.trim())) {
                isValid = false;
                showError(emailField, '正しいメールアドレスを入力してください');
            } else {
                 removeError(emailField); // 正しい場合はエラー解除
            }
        }

        // フォーム送信
        if (isValid) {
            // 実際の送信処理はここに実装
            // この例ではアラートを表示するだけ
            alert('相場診断フォームが送信されました。実際のサイトでは診断結果が表示されます。');
            form.reset();
            // 全フィールドのエラー解除
            form.querySelectorAll('.error-message').forEach(el => el.remove());
            form.querySelectorAll('input, select').forEach(el => el.style.borderColor = '');
        }
    });

    // エラーメッセージの表示
    function showError(field, message) {
        // 既存のエラーメッセージを削除
        removeError(field);

        // エラーメッセージの作成
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        errorDiv.style.textAlign = 'left'; // 左寄せ追加

        // フィールドの後にエラーメッセージを挿入
        field.parentNode.appendChild(errorDiv);

        // フィールドにエラースタイルを適用
        field.style.borderColor = 'red';
    }

    // エラーメッセージの削除
    function removeError(field) {
        const parent = field.parentNode;
        const errorMessage = parent.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        field.style.borderColor = ''; // 枠線の色を元に戻す
    }

    // 入力時にエラーを消す
    form.querySelectorAll('input, select').forEach(field => {
        field.addEventListener('input', () => removeError(field));
        field.addEventListener('change', () => removeError(field));
    });
}

// アコーディオン機能 (FAQ)
function setupAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.top-page__faq-question');
        const answer = item.querySelector('.top-page__faq-answer');

        if (questionButton && answer) {
            // 初期状態を設定 (CSSで制御する方が望ましい)
            answer.style.maxHeight = '0';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.3s ease-out, padding 0.3s ease-out'; // アニメーション
            answer.style.paddingTop = '0';
            answer.style.paddingBottom = '0';


            questionButton.addEventListener('click', function() {
                const isActive = item.classList.contains('active');

                // 他のアイテムを閉じる
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.top-page__faq-answer');
                        otherAnswer.style.maxHeight = '0';
                        otherAnswer.style.paddingTop = '0';
                        otherAnswer.style.paddingBottom = '0';
                    }
                });

                // クリックされたアイテムの開閉
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.display = 'block'; // display: block に戻す
                    // 高さを計算してmaxHeightを設定
                    answer.style.paddingTop = '5rem'; // 元のpadding値 (CSSで定義推奨)
                    answer.style.paddingBottom = '5rem'; // 元のpadding値 (CSSで定義推奨)
                    answer.style.maxHeight = answer.scrollHeight + "px";
                } else {
                    item.classList.remove('active');
                    answer.style.maxHeight = '0';
                    answer.style.paddingTop = '0';
                    answer.style.paddingBottom = '0';
                    // アニメーション完了後に display: none にする場合 (任意)
                    // setTimeout(() => {
                    //     if (!item.classList.contains('active')) {
                    //         answer.style.display = 'none';
                    //     }
                    // }, 300); // transitionの時間に合わせる
                }
            });
        }
    });
}


// スライダー機能
function setupSlider() {
    // カラーセレクター用のスライダー
    setupColorSelector();

    // コラムスライダー (今回はスキップ)
    // setupColumnSlider();
}

// カラーセレクター
function setupColorSelector() {
    const colorPreview = document.querySelector('.mv-house__color-preview');
    const colorButtons = document.querySelectorAll('.mv-house__cycling-button');

    if (!colorPreview || colorButtons.length === 0) return;

    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedColor = this.dataset.color;

            // プレビューのクラスを更新
            // 既存の色クラスをすべて削除
            colorPreview.classList.remove('preview--light-blue', 'preview--blue', 'preview--green', 'preview--yellow', 'preview--orange');
            // 新しい色クラスを追加
            colorPreview.classList.add(`preview--${selectedColor}`);

            // アクティブボタンのスタイルを更新
            colorButtons.forEach(btn => btn.classList.remove('button-active'));
            this.classList.add('button-active');
        });
    });
}

// コラムスライダー (今回はスキップ)
/*
function setupColumnSlider() {
    // ... (省略) ...
}
*/

// スムーススクロール
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // ヘッダーの高さを考慮してスクロール位置を調整
                const headerHeight = document.querySelector('.l-header')?.offsetHeight || 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// エリア検索 SP用アコーディオン機能
function setupAreaAccordion() {
    const areaListSp = document.querySelector('.top-page__prefectures-map__area-list-sp');
    if (!areaListSp || window.innerWidth >= 768) return; // SP表示のみ

    // 本来はサーバーから地域データを取得するか、HTMLに埋め込む
    const regions = [
        { name: '北海道・東北', prefs: ['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'] },
        { name: '関東', prefs: ['東京都', '神奈川県', '千葉県', '埼玉県', '茨城県', '栃木県', '群馬県'] },
        { name: '甲信越・北陸', prefs: ['山梨県', '長野県', '石川県', '新潟県', '富山県', '福井県'] },
        { name: '東海', prefs: ['愛知県', '静岡県', '岐阜県', '三重県'] },
        { name: '関西', prefs: ['大阪府', '兵庫県', '京都府', '滋賀県', '奈良県', '和歌山県'] },
        { name: '中国', prefs: ['岡山県', '広島県', '島根県', '鳥取県', '山口県'] },
        { name: '四国', prefs: ['愛媛県', '香川県', '高知県', '徳島県'] },
        { name: '九州・沖縄', prefs: ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'] }
    ];
     // 都道府県コードのマッピング (仮) - 本来はデータとして持つべき
    const prefCodeMap = {
        '北海道': 1, '青森県': 2, '岩手県': 3, '宮城県': 4, '秋田県': 5, '山形県': 6, '福島県': 7,
        '茨城県': 8, '栃木県': 9, '群馬県': 10, '埼玉県': 11, '千葉県': 12, '東京都': 13, '神奈川県': 14,
        '新潟県': 15, '富山県': 16, '石川県': 17, '福井県': 18, '山梨県': 19, '長野県': 20,
        '岐阜県': 21, '静岡県': 22, '愛知県': 23, '三重県': 24,
        '滋賀県': 25, '京都府': 26, '大阪府': 27, '兵庫県': 28, '奈良県': 29, '和歌山県': 30,
        '鳥取県': 31, '島根県': 32, '岡山県': 33, '広島県': 34, '山口県': 35,
        '徳島県': 36, '香川県': 37, '愛媛県': 38, '高知県': 39,
        '福岡県': 40, '佐賀県': 41, '長崎県': 42, '熊本県': 43, '大分県': 44, '宮崎県': 45, '鹿児島県': 46, '沖縄県': 47
    };


    areaListSp.innerHTML = ''; // 中身をクリア

    regions.forEach(region => {
        const regionContainer = document.createElement('div');
        regionContainer.className = 'region-container';

        const regionTitle = document.createElement('h3');
        regionTitle.className = 'region-title';
        regionTitle.textContent = region.name;

        const prefecturesList = document.createElement('ul');
        prefecturesList.className = 'prefectures-list';
        prefecturesList.style.display = 'none'; // 初期状態は非表示
        prefecturesList.style.maxHeight = '0';
        prefecturesList.style.overflow = 'hidden';
        prefecturesList.style.transition = 'max-height 0.3s ease-out, padding 0.3s ease-out';
        prefecturesList.style.paddingTop = '0';
        prefecturesList.style.paddingBottom = '0';


        region.prefs.forEach(pref => {
            const prefItem = document.createElement('li');
            const prefLink = document.createElement('a');
            const prefCode = prefCodeMap[pref] || '#'; // マップからコード取得
            prefLink.href = `/clients/prefectures/${prefCode}`;
            prefLink.textContent = pref;
            prefItem.appendChild(prefLink);
            prefecturesList.appendChild(prefItem);
        });

        regionContainer.appendChild(regionTitle);
        regionContainer.appendChild(prefecturesList);
        areaListSp.appendChild(regionContainer);

        // アコーディオンのクリックイベント
        regionTitle.addEventListener('click', function() {
            const isOpen = regionContainer.classList.contains('--open');

            // 他のリージョンを閉じる (任意)
            // document.querySelectorAll('.region-container.--open').forEach(openContainer => {
            //     if (openContainer !== regionContainer) {
            //         openContainer.classList.remove('--open');
            //         const list = openContainer.querySelector('.prefectures-list');
            //         list.style.maxHeight = '0';
            //         list.style.paddingTop = '0';
            //         list.style.paddingBottom = '0';
            //     }
            // });

            if (!isOpen) {
                regionContainer.classList.add('--open');
                prefecturesList.style.display = 'grid'; // grid表示に戻す
                prefecturesList.style.paddingTop = '1.6rem'; // 元のpadding
                prefecturesList.style.paddingBottom = '1.6rem'; // 元のpadding
                prefecturesList.style.maxHeight = prefecturesList.scrollHeight + "px";
            } else {
                regionContainer.classList.remove('--open');
                prefecturesList.style.maxHeight = '0';
                prefecturesList.style.paddingTop = '0';
                prefecturesList.style.paddingBottom = '0';
                 // アニメーション完了後に display: none にする場合 (任意)
                // setTimeout(() => {
                //     if (!regionContainer.classList.contains('--open')) {
                //         prefecturesList.style.display = 'none';
                //     }
                // }, 300);
            }
        });
    });
}

// DOMContentLoadedでエリアアコーディオンも初期化
document.addEventListener('DOMContentLoaded', setupAreaAccordion);
// ウィンドウリサイズ時にも再評価 (ブレークポイントをまたいだ場合のため)
window.addEventListener('resize', setupAreaAccordion);
