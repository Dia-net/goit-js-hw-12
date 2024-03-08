import{i as c,a as p,S as h}from"./assets/vendor-951421c8.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const g=document.querySelector(".search-form"),f=document.querySelector(".search-images"),y=document.querySelector(".input-form"),l=document.querySelector(".loader"),d=document.querySelector(".load-more-btn");let n=1,u="";g.addEventListener("submit",L);d.addEventListener("click",b);async function L(r){r.preventDefault();const o=y.value.trim();if(o===""){c.error({title:"Error",message:"Please enter a search term.",position:"topRight"});return}u=o,n=1,await m(u,n)}l.classList.remove("hidden");f.innerHTML="";async function b(){n++,await m(u,n)}async function m(r,o){try{l.classList.remove("hidden");const s=`https://pixabay.com/api/?key=35210145-a84c43ab2193c18f9a40991ef&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${o}&q=${r}`,e=await p.get(s);if(e.status!==200)throw new Error("Network response was not ok");const t=e.data;if(t.hits.length===0){c.warning({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!"});return}v(t.hits),t.totalHits>o*15?d.classList.remove("hidden"):d.classList.add("hidden")}catch(a){console.error("Error fetching data:",a),c.error({title:"Error",position:"topRight",message:"An error occurred while fetching data. Please try again."})}finally{l.classList.add("hidden")}}function w(r){return`
        <div class='photo-card'>
            <a href='${r.largeImageURL}'>
                <img src='${r.webformatURL}' alt='${r.tags}' loading='lazy' class='image-gallery' />
            </a>
            <div class='info-card'>
                <p class='info-item'>
                    <b>Likes</b> ${r.likes}
                </p>
                <p class='info-item'>
                    <b>Views</b> ${r.views}
                </p>
                <p class='info-item'>
                    <b>Comments</b> ${r.comments}
                </p>
                <p class='info-item'>
                    <b>Downloads</b> ${r.downloads}
                </p>
            </div>
        </div>
    `}function v(r){const o=r.map(s=>w(s)).join("");f.innerHTML=o,new h(".search-images .photo-card a",{captionsData:"alt",captionDelay:250,enableKeyboard:!0,showCounter:!1,scrollZoom:!1,close:!1}).refresh()}
//# sourceMappingURL=commonHelpers.js.map
