import { Component } from "../core/component.js";
import { apiService } from "../services/api.js";
import { TransformService } from "../services/transform.js";

export class PostsComponent extends Component {
  constructor(id, {loader}) {
    super(id),
    this.loader = loader;
  };

  init() {
    this.el.addEventListener('click', buttonHandler.bind(this));
  }

  async onshow () {
    this.loader.show();
    const fbData = await apiService.fetchPosts();
    const posts = TransformService.fbObjectToArray(fbData);
    const html = posts.map(post => renderPost(post));
    this.loader.hide();
    this.el.insertAdjacentHTML('afterbegin', html.join(' '));
  };

  onHide () {
    this.el.textContent = '';
  }
};


function renderPost (post) {
  const tag = post.type === 'news'
    ? '<li class="tag tag-blue tag-rounded">Новость</li>'
    : '<li class="tag tag-rounded">Заметка</li>';

  const button = (JSON.parse(localStorage.getItem('favorites')) || []).includes(post.id)
  ? `<button class ="button-round button-small button-danger" data-id="${post.id}" data-title="${post.title}">Удалить</button>`
  : `<button class ="button-round button-small button-primary" data-id="${post.id}" data-title="${post.title}">Сохранить</button>`

  return `
  <div class="panel">
    <div class="panel-head">
      <p class="panel-title">${post.title}</p>
      <ul class="tags">
        ${tag}
      </ul>
    </div>
    <div class="panel-body">
      <p class="multi-line">${post.fulltext}</p>
    </div>
    <div class="panel-footer w-panel-footer">
      <small>${post.date}</small>
      ${button}
    </div>
  </div>
`
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
      favotires = favotires.filter(fId => fId != id && fId != title);
    } else {
      el.textContent = 'Удалить';
      el.classList.remove('button-primary');
      el.classList.add('button-danger');
      favotires.push(id, title);
    }

    localStorage.setItem('favorites', JSON.stringify(favotires));
  }
};

// filter(fId => fId != id && fId != title);
