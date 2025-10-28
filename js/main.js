"use strict";

document.addEventListener('DOMContentLoaded', function() {

    // ページ内スムーススクロールの設定
    function smoothScroll(target) {
        const sectionId = target.getAttribute('href').substring(1);
        const targetSection = document.getElementById(sectionId); 
        if (targetSection) {
          const sectionTop = targetSection.getBoundingClientRect().top + window.pageYOffset;
          const isMobileSize = window.innerWidth <= 768;
          const offset = isMobileSize ? 6 : 80;
          const offsetPosition = sectionTop - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
  
      // スムーススクロールのイベントリスナー設定
      document.querySelectorAll('.header-list__item, .header-cta, .hero-cta, .drawer-content__item, .drawer-button, .cta-btn').forEach(nav => {
        nav.addEventListener('click', function(e) {
          const targetUrl = new URL(nav.getAttribute('href'), document.baseURI);
          if (targetUrl.hash && window.location.pathname === targetUrl.pathname) {
            e.preventDefault();
            smoothScroll(nav);
          }
        });
      });
      
      // ドロワーメニューのトグル処理
      function toggleDrawer() {
          ['drawer-icon', 'drawer-content', 'drawer-background'].forEach(className => {
            const element = document.querySelector(`.${className}`);
            element.classList.toggle('clicked');
          });
        }
        const drawerItem = document.querySelectorAll('.drawer-content__item');
        for (let i = 0; i < drawerItem.length; i++) {
          drawerItem[i].addEventListener('click', () => {
            toggleDrawer();
          });
        }
      
        // ドロワーメニューとバックグラウンドのクリックイベント
        ['.drawer-icon', '.drawer-background', '.drawer-button'].forEach(selector => {
          const element = document.querySelector(selector);
          element && element.addEventListener('click', toggleDrawer);
      });

      const header = document.getElementById('header');
      const THRESHOLD = 1; // 1px動いたら色付与
      let ticking = false;

      function onScroll() {
        if (!ticking) {
          requestAnimationFrame(() => {
            const scrolled = window.scrollY > THRESHOLD;
            header.classList.toggle('scrolled', scrolled);
            ticking = false;
          });
          ticking = true;
        }
      }

// 受動リスナーでパフォーマンス向上
window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // 初期判定



    // 締切が来た時の実装
    const deadline = new Date(2025, 11, 5, 16, 30, 0);
    const now = new Date(); //現在の時刻を取得
    const heroDeadline = document.querySelector('.hero-deadline');
    const formElement = document.getElementById('mktoForm_2265'); // フォーム要素を選択
    const formParent = formElement.parentNode;
    const cta = document.querySelectorAll('.cta');

    if (now >= deadline) {
        // heroDeadlineを表示する
        heroDeadline.style.display = 'block';

        // p要素を作成して、テキストを設定
        const pElement = document.createElement('p');
        pElement.className = 'hero-deadline__text';
        pElement.textContent = '※イベントは開催されました。';

        // a要素を作成して、テキストとリンクを設定
        const aElement = document.createElement('a');
        aElement.className = 'hero-deadline__link';
        aElement.href = ''; // リンク先を適宜設定
        aElement.textContent = '開催レポートはこちら';

        // 作成した要素をheroDeadlineに追加
        heroDeadline.appendChild(pElement);
        heroDeadline.appendChild(aElement);
        
        // CTAボタンを非表示にする
        cta.forEach(button => {
            button.style.display = 'none';
        });
        // フォームを非表示にする
        formElement.style.display = 'none';
        // 終了メッセージを表示する新しい要素を作成
        const endMessageElement = document.createElement('h2');
        endMessageElement.className = 'end-message'
        endMessageElement.textContent = 'お申し込みは終了しました。';

        // 終了メッセージをフォームの親要素に追加
        formParent.appendChild(endMessageElement);
    }

    // スクロールイベントの実装
    function checkVisibility() {
        // 対象となる全てのセクションを取得
        const sections = document.querySelectorAll('.timetable, .outline, .access');

        sections.forEach(section => {
            const position = section.getBoundingClientRect();

            // 画面内に要素が入ったかどうかをチェックし、一度表示されたらそのままにする
            if (position.top < window.innerHeight && position.bottom >= 0 && !section.classList.contains('visible')) {
                section.classList.add('visible');
            }
        });
    }

    // スクロールイベントに関数を紐づけ
    window.addEventListener('scroll', checkVisibility);

    // 初期ロード時にもチェックを行う
    checkVisibility();

});