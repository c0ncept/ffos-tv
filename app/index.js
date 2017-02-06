import {create} from 'cakejs2-spatial';
import h from './tools/hyper';

window.h = h;

import './components/Home';

create({
  element: document.body,
  createRoot: false
})
.route('/', 'pages.home')
.route('*', 'pages.home');
