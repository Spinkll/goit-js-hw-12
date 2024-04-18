import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImage } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loader = document.getElementById('loader');
const gallery = document.querySelector('.gallery');
const form = document.querySelector('.form');
const input = document.querySelector('input');
form.addEventListener('submit', async evt => {
  evt.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
    return;
  }

  loader.classList.remove('hidden');
  gallery.innerHTML = '';

  const images = await fetchImage(query);
  renderImages(images);
  new SimpleLightbox('.gallery a', {
    animationSpeed: 200,
    animationSlide: true,
    disableScroll: false,
    history: false,
    captionsData: 'alt',
    captionDelay: 250,
  });

  loader.classList.add('hidden');
});
