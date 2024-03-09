import{i as c,a as h,S as p}from"./assets/vendor-951421c8.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const g=document.querySelector(".search-form"),u=document.querySelector(".search-images"),f=document.querySelector(".input-form"),d=document.querySelector(".loader"),l=document.querySelector(".load-more-btn"),y="35210145-a84c43ab2193c18f9a40991ef";let a=1;g.addEventListener("submit",b);l.addEventListener("click",L);async function b(t){t.preventDefault();const o=f.value.trim();if(o===""){c.error({title:"Error",message:"Please enter a search term.",position:"topRight"});return}a=1,u.innerHTML="",await m(o,a)}async function m(t,o){try{d.classList.remove("hidden");const n=`https://pixabay.com/api/?key=${y}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${o}&q=${t}`,s=await h.get(n);if(s.status!==200)throw new Error("Network response was not ok");const e=s.data;if(e.hits.length===0){c.warning({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!"});return}S(e.hits),e.totalHits>o*15?l.classList.remove("hidden"):l.classList.add("hidden")}catch(n){console.error("Error fetching data:",n),c.error({title:"Error",position:"topRight",message:"An error occurred while fetching data. Please try again."})}finally{d.classList.add("hidden")}}async function L(){a++;const t=f.value.trim();await m(t,a)}function w(){const t=document.querySelector(".photo-card").getBoundingClientRect().height;window.scrollBy({top:t*2,left:0,behavior:"smooth"})}function v(t){return`
        <div class='photo-card'>
            <a href='${t.largeImageURL}'>
                <img src='${t.webformatURL}' alt='${t.tags}' loading='lazy' class='image-gallery' />
            </a>
            <div class='info-card'>
                <p class='info-item'>
                    <b>Likes</b> ${t.likes}
                </p>
                <p class='info-item'>
                    <b>Views</b> ${t.views}
                </p>
                <p class='info-item'>
                    <b>Comments</b> ${t.comments}
                </p>
                <p class='info-item'>
                    <b>Downloads</b> ${t.downloads}
                </p>
            </div>
        </div>
    `}function S(t){const o=t.map(s=>v(s)).join("");u.insertAdjacentHTML("beforeend",o),new p(".search-images .photo-card a",{captionsData:"alt",captionDelay:250,enableKeyboard:!0,showCounter:!1,scrollZoom:!1,close:!1}).refresh(),w()}
//# sourceMappingURL=commonHelpers.js.map
