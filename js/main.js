import './upload-image-modal.js';

import { getData } from './api.js';
import { renderPosts, initPostClick } from './post-render.js';
import { showDataError } from './form-notification.js';
import { initFilters } from './image-filters.js';

getData()
  .then((posts) => {
    renderPosts(posts);
    initPostClick(posts);
    initFilters(posts);
  })
  .catch(() => {
    showDataError();
  });
