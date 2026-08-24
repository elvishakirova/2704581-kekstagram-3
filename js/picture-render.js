const prepareData = (data, template) => {
  const pictureTemplate = template.cloneNode(true);

  const pictureItem = pictureTemplate.querySelector('.picture');
  const image = pictureItem.querySelector('.picture__img');
  const likes = pictureTemplate.querySelector('.picture__likes');
  const comments = pictureTemplate.querySelector('.picture__comments');

  image.src = data.url;
  image.alt = data.description;
  likes.textContent = data.likes;
  comments.textContent = data.comments.length;

  return pictureTemplate;
};

function renderPictures(data) {
  const fragment = document.createDocumentFragment();
  const pictureTemplate = document.querySelector('#picture').content;

  data.forEach((element) => {
    fragment.appendChild(prepareData(element, pictureTemplate));
  });

  document.querySelector('.pictures').appendChild(fragment);
}

export { renderPictures };
