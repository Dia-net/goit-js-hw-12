import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const form = document.querySelector('.search-form');
const imagesContainer = document.querySelector('.search-images');
const inputForm = document.querySelector('.input-form');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

const API_KEY = '35210145-a84c43ab2193c18f9a40991ef';
let currentPage = 1;

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', loadMoreImages);

async function handleSubmit(e) {
    e.preventDefault();
    const query = inputForm.value.trim();
    if (query === '') {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search term.',
            position: 'topRight'
        });
        return;
    }
    await fetchImages(query, currentPage);
}

async function loadMoreImages() {
    currentPage++;
    const query = inputForm.value.trim();
    await fetchImages(query, currentPage);
}

async function fetchImages(query, page) {
    try {
        loader.classList.remove('hidden');
        const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${page}&q=${query}`;
        const response = await axios.get(BASE_URL);
        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }
        const data = response.data;
        if (data.hits.length === 0) {
            iziToast.warning({
                title: 'No Results',
                message: 'Sorry, there are no images matching your search query. Please try again!'
            });
            return;
        }
        renderImages(data.hits);
        loadMoreBtn.style.display = 'block'; // Показуємо кнопку після відображення зображень
        if (data.totalHits <= page * 15) {
            loadMoreBtn.classList.add('hidden');
            iziToast.info({
                title: 'End of Collection',
                message: 'We\'re sorry, but you\'ve reached the end of search results.',
                position: 'topRight'
            });
        } else {
            loadMoreBtn.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        iziToast.error({
            title: 'Error',
            position: 'topRight',
            message: 'An error occurred while fetching data. Please try again.'
        });
    } finally {
        loader.classList.add('hidden');
    }
}
function smoothScroll() {
    const cardHeight = document.querySelector('.photo-card').getBoundingClientRect().height;
    window.scrollBy({
        top: cardHeight * 2, // Прокручуємо на дві висоти карточки галереї
        left: 0,
        behavior: 'smooth' // Плавна прокрутка
    });
}

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
    imagesContainer.insertAdjacentHTML('beforeend', markup);
    const galleryList = new SimpleLightbox('.search-images .photo-card a', {
        captionsData: 'alt',
        captionDelay: 250,
        enableKeyboard: true,
        showCounter: false,
        scrollZoom: false,
        close: false,
    });
    galleryList.refresh();

smoothScroll();
}
