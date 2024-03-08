import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const imagesContainer = document.querySelector('.search-images');
const inputForm = document.querySelector('.input-form');
const loader = document.querySelector(".loader");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = inputForm.value.trim();
    if (query === '') {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search term.',
            position:'topRight'
        });
        return;
    }
    loader.classList.remove('hidden');
    imagesContainer.innerHTML = "";

    const API_KEY = '35210145-a84c43ab2193c18f9a40991ef';
    const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1&q=${query}`;
    
    fetch(BASE_URL)
    .then((response) => {
        if (!response.ok) {
            iziToast.error({
                title: 'Error',
                message: 'Please enter a valid search term.',
                position:'topRight'
            });
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.hits.length === 0) {
          iziToast.warning({
            title: 'No Results',
            message: 'Sorry, there are no images matching your search query. Please try again!'
          });
          return;
        }
        renderImages(data.hits);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        iziToast.error({
            title: "Error",
            position: 'topRight',
            message: 'An error occurred while fetching data. Please try again.'
        });
    })
    .finally(() =>{

        loader.classList.add('hidden');
    });
});






function imageTemplate(image) {
    return `
        <div class='photo-card'>
            <a href='${image.largeImageURL}'>
                <img src='${image.webformatURL}' alt='${image.tags}' loading='lazy' class='image-gallery' />
            </a>
            <div class='info-card'>
                <p class='info-item'>
                    <b>Likes</b> ${image.likes}
                </p>
                <p class='info-item'>
                    <b>Views</b> ${image.views}
                </p>
                <p class='info-item'>
                    <b>Comments</b> ${image.comments}
                </p>
                <p class='info-item'>
                    <b>Downloads</b> ${image.downloads}
                </p>
            </div>
        </div>
    `;
}


function renderImages(images) {
    const markup = images.map(image => imageTemplate(image)).join('');
    imagesContainer.innerHTML = markup;
    const galleryList = new SimpleLightbox('.search-images .photo-card a', {
        captionsData: 'alt',
        captionDelay: 250,
        enableKeyboard: true,
        showCounter: false,
        scrollZoom: false,
        close: false,
    });
    galleryList.refresh();
}