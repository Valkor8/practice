import './components/create.js';
import './components/favorite.js';
import './components/header.js';
import './components/navigation.js';
import './components/posts.js';
import './core/component.js';
import './core/form.js';
import './core/validators.js';
import './services/api.js';
import { HeaderComponent } from './components/header.js';
import { NavigationComponent } from './components/navigation.js';
import { CreateComponent } from './components/create.js';
import { FavoriteComponent } from './components/favorite.js';
import { PostsComponent } from './components/posts.js';
import { LoaderComponent } from './components/loader.js';

new HeaderComponent('header');

const navigation = new NavigationComponent('navigation');
const loader = new LoaderComponent('loader');

const posts = new PostsComponent('posts', {loader: loader});
const create = new CreateComponent('create');
const favorite = new FavoriteComponent('favorite');

navigation.registerTabs([
  {name: 'create', component: create},
  {name: 'posts', component: posts},
  {name: 'favorite', component: favorite}
]);
