import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImage } from './js/pixabay-api';
import {
  getGalleryCardHeight,
  initializeLightbox,
  renderImages,
  scrollToNextGroup,
} from './js/render-functions';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loader = document.getElementById('loader');
const gallery = document.querySelector('.gallery');
const form = document.querySelector('.form');
const input = document.querySelector('input');
const loadBtn = document.querySelector('.loadBtn');

let page = 1;
let perPage = 15;
let query = '';
let totalHits = 0;

form.addEventListener('submit', async evt => {
  evt.preventDefault();
  query = input.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
    return;
  }
  loadBtn.classList.add('hidden');
  loader.classList.remove('hidden');
  gallery.innerHTML = '';

  const { totalHits: hitsCount, hits: images } = await fetchImage(
    query,
    perPage,
    page
  );
  totalHits = hitsCount;
  renderImages(images);
  initializeLightbox();

  loader.classList.add('hidden');
  if (totalHits > page * perPage) {
    loadBtn.classList.remove('hidden');
  }
});

loadBtn.addEventListener('click', async () => {
  page += 1;
  loader.classList.remove('hidden');
  if (totalHits <= page * perPage) {
    loadBtn.classList.add('hidden');
    iziToast.error({
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
    });
    return;
  }
  const { hits: images } = await fetchImage(query, perPage, page);
  renderImages(images);
  const cardHeight = getGalleryCardHeight();
  scrollToNextGroup(5 * cardHeight);
  initializeLightbox();

  loader.classList.add('hidden');
});
