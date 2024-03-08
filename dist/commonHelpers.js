import{i as n,S as u}from"./assets/vendor-46aac873.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const f=document.querySelector(".search-form"),c=document.querySelector(".search-images"),d=document.querySelector(".input-form"),l=document.querySelector(".loader");f.addEventListener("submit",r=>{r.preventDefault();const o=d.value.trim();if(o===""){n.error({title:"Error",message:"Please enter a search term.",position:"topRight"});return}l.classList.remove("hidden"),c.innerHTML="";const s=`https://pixabay.com/api/?key=35210145-a84c43ab2193c18f9a40991ef&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1&q=${o}`;fetch(s).then(e=>{if(!e.ok)throw n.error({title:"Error",message:"Please enter a valid search term.",position:"topRight"}),new Error("Network response was not ok");return e.json()}).then(e=>{if(e.hits.length===0){n.warning({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!"});return}p(e.hits)}).catch(e=>{console.error("Error fetching data:",e),n.error({title:"Error",position:"topRight",message:"An error occurred while fetching data. Please try again."})}).finally(()=>{l.classList.add("hidden")})});function m(r){return`
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
    `}function p(r){const o=r.map(s=>m(s)).join("");c.innerHTML=o,new u(".search-images .photo-card a",{captionsData:"alt",captionDelay:250,enableKeyboard:!0,showCounter:!1,scrollZoom:!1,close:!1}).refresh()}
//# sourceMappingURL=commonHelpers.js.map
