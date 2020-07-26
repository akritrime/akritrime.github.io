// import 'bootstrap';
import './index.scss';
// import '@fortawesome/fontawesome-free/css/brands.css'
import { library, dom } from '@fortawesome/fontawesome-svg-core';

import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

library.add(faGithub, faTwitter);

dom.watch();
