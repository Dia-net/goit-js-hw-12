import{i as a,a as m,S as h}from"./assets/vendor-951421c8.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const p=document.querySelector(".search-form"),y=document.querySelector(".search-images"),u=document.querySelector(".input-form"),d=document.querySelector(".loader"),i=document.querySelector(".load-more-btn"),g="35210145-a84c43ab2193c18f9a40991ef";let l=1;p.addEventListener("submit",b);i.addEventListener("click",w);async function b(t){t.preventDefault();const o=u.value.trim();if(o===""){a.error({title:"Error",message:"Please enter a search term.",position:"topRight"});return}await f(o,l)}async function w(){l++;const t=u.value.trim();await f(t,l)}async function f(t,o){try{d.classList.remove("hidden");const n=`https://pixabay.com/api/?key=${g}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${o}&q=${t}`,s=await m.get(n);if(s.status!==200)throw new Error("Network response was not ok");const e=s.data;if(e.hits.length===0){a.warning({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!"});return}S(e.hits),i.style.display="block",e.totalHits<=o*15?(i.classList.add("hidden"),a.info({title:"End of Collection",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):i.classList.remove("hidden")}catch(n){console.error("Error fetching data:",n),a.error({title:"Error",position:"topRight",message:"An error occurred while fetching data. Please try again."})}finally{d.classList.add("hidden")}}function L(){const t=document.querySelector(".photo-card").getBoundingClientRect().height;window.scrollBy({top:t*2,left:0,behavior:"smooth"})}function v(t){return`
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
    `}function S(t){const o=t.map(s=>v(s)).join("");y.insertAdjacentHTML("beforeend",o),new h(".search-images .photo-card a",{captionsData:"alt",captionDelay:250,enableKeyboard:!0,showCounter:!1,scrollZoom:!1,close:!1}).refresh(),L()}
//# sourceMappingURL=commonHelpers.js.map
