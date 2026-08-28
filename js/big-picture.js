const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const description = bigPicture.querySelector('.social__caption');

const likes = bigPicture.querySelector('.likes-count');

const commentCount = bigPicture.querySelector('.social__comment-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentLoader = bigPicture.querySelector('.comments-loader');

const closeButton = bigPicture.querySelector('.big-picture__cancel');

function openBigPicture(data) {
  bigPictureImg.src = data.url;
  bigPicture.classList.remove('hidden');
  likes.textContent = data.likes;
  description.textContent = data.description;
  commentTotalCount.textContent = data.comments.length;
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

closeButton.addEventListener('click', (closeBigPicture));

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
});

export { openBigPicture, closeBigPicture };

