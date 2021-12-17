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
    let favotires = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log(favotires);

    if (favotires.includes(id)) {
      el.textContent = 'Сохранить';
      el.classList.add('button-primary');
      el.classList.remove('button-danger');
      favotires = favotires.filter(fId => fId != id);
    } else {
      el.textContent = 'Удалить';
      el.classList.remove('button-primary');
      el.classList.add('button-danger');
      favotires.push(id);
    }

    localStorage.setItem('favorites', JSON.stringify(favotires));
  }
};
// && fId != title
// filter(fId => fId != id && fId != title);
