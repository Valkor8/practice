import { Component } from "../core/component.js";
import { apiService } from "../services/api.js";
import { TransformService } from "../services/transform.js";
import { renderPost } from "../templates/post-template.js";

export class PostsComponent extends Component {
  constructor(id, {loader}) {
    super(id),
    this.loader = loader;
  };

  init() {
    this.el.addEventListener('click', buttonHandler.bind(this));
  }

  async onShow () {
    this.loader.show();
    const fbData = await apiService.fetchPosts();
    const posts = TransformService.fbObjectToArray(fbData);
    const html = posts.map(post => renderPost(post, {withButton: true}));
    this.loader.hide();
    this.el.insertAdjacentHTML('afterbegin', html.join(' '));
  };

  onHide () {
    this.el.textContent = '';
  }
};

function buttonHandler (evt) {
  const el = evt.target;
  const id = el.dataset.id;
  const title = el.dataset.title;

  if (id && title) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesId = favorites.map( obj => {
      return obj.id
    })
    if (favoritesId.includes(id)) {
      el.textContent = 'Сохранить';
      el.classList.add('button-primary');
      el.classList.remove('button-danger');
      favorites = favorites.filter(obj => obj.id !== id);
    } else {
      el.textContent = 'Удалить';
      el.classList.remove('button-primary');
      el.classList.add('button-danger');
      favorites.push({id: id, title: title});
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  };
};
// && fId != title
// filter(fId => fId != id && fId != title);
