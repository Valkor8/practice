import { Component } from "../core/component.js";
import { apiService } from "../services/api.js";
import { renderPost } from "../templates/post-template.js";

export class FavoriteComponent extends Component {
  constructor(id, options) {
    super(id);
    this.loader = options.loader
  }

  init() {
    this.el.addEventListener('click', linkClickHandler.bind(this));
  }

  onShow() {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    const favoritesId = favorites.map(obj => obj.id);
    const favoritesTitle = favorites.map(obj => obj.title);
    console.log(favorites)
    const html = renderList(favorites);
    console.log(html)
    this.el.insertAdjacentHTML('afterbegin', html);
  }

  onHide () {
    this.el.innerHTML = ''
  }
};

async function linkClickHandler (evt) {
  evt.preventDefault();
   if (evt.target.classList.contains('js-link')) {
      const postId = evt.target.dataset.id;
      // const favorites = JSON.parse(localStorage.getItem('favorites'));
      // const postId = favorites.map( (obj) => {
      //   if(postTitle === obj.title) {
      //     return obj.id
      //   }
      // })
      this.el.innerHTML = '';
      this.loader.show();
      const post = await apiService.fetchPostById(postId);
      console.log(post);
      this.loader.hide();
      this.el.insertAdjacentHTML('afterbegin', renderPost(post, {withButton: false}));
   }
};

function renderList(list = []) {
  if (list && list.length) {
    return `
      <ul>
        ${list.map(i => `<li><a href="#" class="js-link" data-id="${i.id}">${i.title}</a></li>`).join(' ')}
      </ul>
    `
  }

  return `<p class="center">Вы пока ничего не добавили</p>`
};
