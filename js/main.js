import './utils.js';
import {renderPosts} from './post-render.js';
import './upload-image-form.js';
import {getData} from './api.js';
import {showDataError} from './form-messages.js';

getData()
  .then((posts) => {
    renderPosts(posts);
  })
  .catch(() => {
    showDataError();
  });
