(()=>{var e={2837:(e,t,n)=>{"use strict";n(738),n(9130),e=n.hmd(e)},9130:()=>{var e=Array.from(document.getElementsByClassName("p-liability-faq__content__question"));e&&e.forEach((function(e){return e.addEventListener("click",(function(){return n(e,"p-icon--collapse")}),!1)}));var t=Array.from(document.getElementsByClassName("header-collapse"));function n(e,t){var n,r=e.id.split("-")[1],o=document.getElementById("content-"+r),c=e.getElementsByClassName("p-icon")[0];o&&(o.classList.toggle("show-content"),null===(n=o.parentElement)||void 0===n||n.classList.toggle("content-box")),c&&c.classList.toggle(t)}t&&t.forEach((function(e){return e.addEventListener("click",(function(){return n(e,"p-liability__icon--up")}),!1)}));var r=document.querySelector(".p-article__toc-container__header--link");r&&r.addEventListener("click",(function(e){e.preventDefault();var t=document.querySelector(".article-toc-container__content"),n=document.querySelector(".p-article__toc-container__header");t&&n&&("閉じる"===r.innerText?(r.innerText="開く",t.style.display="none"):"開く"===r.innerText&&(r.innerText="閉じる",t.style.display="block"),n.classList.toggle("p-article__toc-header--collapse"))}),!1)},738:()=>{var e=document.getElementById("js-header_menu_switch");if(!e)throw new Error("id=js-header_menu_switchのdom要素が見つかりません");e.addEventListener("click",(function(){var e=document.getElementById("js-header_menu");if(!e)throw new Error("id=js-header_menuのdom要素が見つかりません");e.classList.toggle("is-header_menu_open")}))}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var c=t[r]={id:r,loaded:!1,exports:{}};return e[r](c,c.exports,n),c.loaded=!0,c.exports}n.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),n(2837)})();