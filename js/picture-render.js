import {similarPosts} from './posts.js';

const fragment = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture').content;

// const url = picture.src;
// const description = picture.alt;

function renderPictures() {
  for (let i = 0; i < similarPosts.length; i++) {
    const newPictureTemplate = pictureTemplate.cloneNode(true);
    const pictureItem = newPictureTemplate.querySelector('.picture');
    const image = pictureItem.querySelector('.picture__img');
    const likes = newPictureTemplate.querySelector('.picture__likes');
    const comments = newPictureTemplate.querySelector('.picture__comments');

    image.src = similarPosts[i].url;
    image.alt = similarPosts[i].description;
    likes.textContent = similarPosts[i].likes;
    comments.textContent = similarPosts[i].comments.length;
    fragment.appendChild(newPictureTemplate);
  }
  document.querySelector('.pictures').appendChild(fragment);
}

export {renderPictures};
