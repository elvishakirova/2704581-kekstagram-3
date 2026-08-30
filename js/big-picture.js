import { renderComments } from './comments-render.js';

const COMMENTS_PER_PORTION = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const description = bigPicture.querySelector('.social__caption');

const likes = bigPicture.querySelector('.likes-count');

const commentCount = bigPicture.querySelector('.social__comment-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentTotalShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentLoader = bigPicture.querySelector('.comments-loader');
const commentsContainer = document.querySelector('.social__comments');

const closeButton = bigPicture.querySelector('.big-picture__cancel');

let shownCommentsCount;
let allPictureComments;

function showNextComments() {
  const commentsPortion = allPictureComments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_PER_PORTION);

  renderComments(commentsPortion, commentsContainer);

  shownCommentsCount += commentsPortion.length;

  commentTotalShownCount.textContent = shownCommentsCount;

  if (shownCommentsCount >= allPictureComments.length) {
    commentLoader.classList.add('hidden');
  }
}

function openBigPicture(data) {
  bigPictureImg.src = data.url;
  likes.textContent = data.likes;
  description.textContent = data.description;
  commentTotalCount.textContent = data.comments.length;
  shownCommentsCount = 0;
  allPictureComments = data.comments;

  bigPicture.classList.remove('hidden');
  commentCount.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
  document.body.classList.add('modal-open');

  commentsContainer.innerHTML = '';
  showNextComments(allPictureComments);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

closeButton.addEventListener('click', closeBigPicture);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
});

commentLoader.addEventListener('click', () => {
  showNextComments(allPictureComments);
});

export { openBigPicture, closeBigPicture};
