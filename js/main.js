import './utils.js';
import {similarPosts} from './posts.js';
import {renderPosts} from './post-render.js';
import './upload-image-form.js';
import {makeUpdateScale} from './image-editor.js';

renderPosts(similarPosts);
makeUpdateScale();
