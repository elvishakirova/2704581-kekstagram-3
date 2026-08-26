import { openBigPicture } from './big-picture.js';

const prepareOnePost = (onePostData, template) => {
  const pictureTemplate = template.cloneNode(true);

  const pictureItem = pictureTemplate.querySelector('.picture');
  const image = pictureItem.querySelector('.picture__img');
  const likes = pictureTemplate.querySelector('.picture__likes');
  const comments = pictureTemplate.querySelector('.picture__comments');

  pictureItem.href = onePostData.id;
  image.src = onePostData.url;
  image.alt = onePostData.description;
  likes.textContent = onePostData.likes;
  comments.textContent = onePostData.comments.length;

  return pictureTemplate;
};

function renderPosts(postsData) {
  const fragment = document.createDocumentFragment();
  const pictureTemplate = document.querySelector('#picture').content;

  postsData.forEach((post) => {
    const onePostData = prepareOnePost(post, pictureTemplate);
    const oneImage = onePostData.querySelector('.picture');

    oneImage.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(post);
    });

    fragment.appendChild(onePostData);
  });

  document.querySelector('.pictures').appendChild(fragment);
}

export { renderPosts };
