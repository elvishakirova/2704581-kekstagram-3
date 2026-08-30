function renderComments(commentsData, container) {
  commentsData.forEach((oneComment) => {
    const comment = document.createElement('li');
    comment.classList.add('social__comment');

    const avatar = document.createElement('img');
    avatar.classList.add('social__picture');
    avatar.src = oneComment.avatar;
    avatar.alt = oneComment.name;

    const message = document.createElement('p');
    message.classList.add('social__text');
    message.textContent = oneComment.message;

    comment.append(avatar, message);
    container.appendChild(comment);
  });
}

export { renderComments };
