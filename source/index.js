import { HeaderComponent } from './components/header.js';
import { NavigationComponent } from './components/navigation.js';
import { CreateComponent } from './components/create';
import { FavoriteComponent } from './components/favorite';
import { PostsComponent } from './components/posts';

new HeaderComponent('header');

const navigation = new NavigationComponent('navigation');

const posts = new PostsComponent('posts');
const create = new CreateComponent('create');
const favorite = new FavoriteComponent('favorite');

navigation.registerTabs([
  {name: 'create', component: create},
  {name: 'posts', component: posts},
  {name: 'favorite', component: favorite}
]);
