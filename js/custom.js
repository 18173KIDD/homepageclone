// カスタムJavaScriptファイル - サイトの機能を実装

document.addEventListener('DOMContentLoaded', function() {
    // フォームバリデーション
    setupFormValidation();
    
    // アコーディオン機能
    setupAccordion();
    
    // スライダー機能
    setupSlider();
    
    // スムーススクロール
    setupSmoothScroll();
});

// フォームバリデーション
function setupFormValidation() {
    const form = document.querySelector('.price-check-form');
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
            }
        }
        
        // メールアドレスのバリデーション（任意項目）
        const emailField = form.querySelector('#email');
        if (emailField && emailField.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailField.value.trim())) {
                isValid = false;
                showError(emailField, '正しいメールアドレスを入力してください');
            }
        }
        
        // フォーム送信
        if (isValid) {
            // 実際の送信処理はここに実装
            // この例ではアラートを表示するだけ
            alert('相場診断フォームが送信されました。実際のサイトでは診断結果が表示されます。');
            form.reset();
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
        
        // フィールドの後にエラーメッセージを挿入
        field.parentNode.appendChild(errorDiv);
        
        // フィールドにエラースタイルを適用
        field.style.borderColor = 'red';
    }
    
    // エラーメッセージの削除
    function removeError(field) {
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        field.style.borderColor = '';
    }
}

// アコーディオン機能
function setupAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            // アクティブ状態の切り替え
            const isActive = item.classList.contains('active');
            
            // すべてのアイテムを閉じる
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                const faqAnswer = faqItem.querySelector('.faq-answer');
                if (faqAnswer) {
                    faqAnswer.style.display = 'none';
                }
            });
            
            // クリックされたアイテムを開く（閉じていた場合）
            if (!isActive) {
                item.classList.add('active');
                answer.style.display = 'block';
            }
        });
    });
}

// スライダー機能
function setupSlider() {
    // カラーセレクター用のスライダー
    setupColorSelector();
    
    // コラムスライダー
    setupColumnSlider();
}

// カラーセレクター
function setupColorSelector() {
    const colorSelector = document.querySelector('.color-selector');
    if (!colorSelector) return;
    
    // カラーオプションの作成
    const colors = [
        { name: 'blue', code: '#4FC3F7' },
        { name: 'red', code: '#EF5350' },
        { name: 'green', code: '#66BB6A' },
        { name: 'yellow', code: '#FFEE58' },
        { name: 'purple', code: '#AB47BC' }
    ];
    
    // カラーボタンの作成
    colors.forEach(color => {
        const button = document.createElement('button');
        button.className = 'color-option';
        button.style.backgroundColor = color.code;
        button.style.width = '20px';
        button.style.height = '20px';
        button.style.borderRadius = '50%';
        button.style.margin = '0 5px';
        button.style.border = 'none';
        button.style.cursor = 'pointer';
        
        // クリックイベント
        button.addEventListener('click', function() {
            // 家の色を変更する処理
            const house = document.querySelector('.house-image');
            if (house) {
                house.style.backgroundColor = color.code;
            }
        });
        
        colorSelector.appendChild(button);
    });
}

// コラムスライダー
function setupColumnSlider() {
    const sliders = document.querySelectorAll('.column-list');
    if (sliders.length === 0) return;
    
    sliders.forEach(slider => {
        const prevBtn = slider.parentNode.querySelector('button[aria-label="前へ"]');
        const nextBtn = slider.parentNode.querySelector('button[aria-label="次へ"]');
        
        if (prevBtn && nextBtn) {
            let currentPosition = 0;
            const itemWidth = 300; // 各アイテムの幅
            const visibleItems = Math.floor(slider.offsetWidth / itemWidth);
            const maxPosition = Math.max(0, slider.children.length - visibleItems);
            
            // 前へボタン
            prevBtn.addEventListener('click', function() {
                if (currentPosition > 0) {
                    currentPosition--;
                    updateSliderPosition();
                }
            });
            
            // 次へボタン
            nextBtn.addEventListener('click', function() {
                if (currentPosition < maxPosition) {
                    currentPosition++;
                    updateSliderPosition();
                }
            });
            
            // スライダー位置の更新
            function updateSliderPosition() {
                slider.style.transform = `translateX(-${currentPosition * itemWidth}px)`;
            }
        }
    });
}

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
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}
