// todo vísa í rétta hluti með import
import getRandomImage from './nasa-api';
import { empty, el, randomNumber } from './helpers';
import { load, save, clear } from './storage';
// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu
let image; // object sem inniheldur núverandi mynd á forsíðu.
let section;
function getRandomDate() {
  const today = new Date();
  const year = randomNumber(1995, today.getFullYear());
  let month;
  let day;
  if (year === 1995) {
    month = randomNumber(6, 12);
  } else if (year === today.getFullYear()) {
    month = randomNumber(1, today.getMonth());
  } else {
    month = randomNumber(1, 12);
  }
  if (month === 2) {
    day = randomNumber(1, 28);
  } else if (year === 1995 && month === 6) {
    day = randomNumber(15, 30);
  } else if (year === today.getFullYear() && month === today.getMonth()) {
    day = randomNumber(1, today.getDate);
  } else if (month === 4 || month === 6 || month === 9 || month === 11) {
    day = randomNumber(1, 30);
  } else {
    day = randomNumber(1, 31);
  }
  const y = year.toString();
  const m = month.toString();
  const d = day.toString();
  const randomDate = `${y}-${m}-${d}`;
  return randomDate;
}
/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
async function getNewImage() {
  const randomDate = getRandomDate();
  getRandomImage(randomDate).then((data) => {
    image = data;
    img = section.querySelector('.apod__image');
    if (image.media_type === 'image') {
      img.src = image.url;
    } else {
      section.removeChild(section.firstChild);
      const video = el('iframe');
      video.src = image.url;
      section.insertBefore(video, section.childNodes[0]);
    }
    text = section.querySelector('.apod__text');
    title = section.querySelector('.apod__title');
    empty(text);
    empty(title);
    title.appendChild(document.createTextNode(image.title));
    text.appendChild(document.createTextNode(image.explanation));
  }).catch(() => {
  });
}
/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {
  save(image.media_type, image.url, image.text, image.title);
}
/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default function init(apod) {
  section = apod;
  const newImageButton = document.getElementById('new-image-button');
  const saveImageButton = document.getElementById('save-image-button');
  newImageButton.addEventListener('click', getNewImage);
  saveImageButton.addEventListener('click', saveCurrentImage);
  getNewImage();
}
/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {
  const main = document.querySelector('main');
  const images = load();
  if (images) {
    images.forEach((item) => {
      console.log(item.type);
      if (item.type !== 'image') {
        const titleEl = el('h1');
        titleEl.innerText = item.title;
        const imgEl = el('iframe');
        imgEl.src = item.mediaUrl;
        imgEl.classList.add('apod__img');
        const fav = el('div', titleEl, imgEl);
        console.log(fav);
        main.appendChild(fav);
      } else {
        console.log(item);
        const titleEl = el('h1');
        titleEl.innerText = item.title;
        const imgEl = el('img');
        imgEl.src = item.mediaUrl;
        imgEl.classList.add('apod__img');
        const fav = el('div', titleEl, imgEl);
        main.appendChild(fav);
      }
    });
  }
}
