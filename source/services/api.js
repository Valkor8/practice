class ApiService {
  constructor (baseUrl) {
    this.url = baseUrl;
  };

  async createPost(post) {
    try {
      const request = new Request(this.url + 'posts.json', {
        method: 'POST',
        body: JSON.stringify(post)
      });
      const response = await fetch(request);
      return await response.json();
    } catch (err) {
      console.log(err);
    };
  };

  async fetchPosts () {
    try {
      const request = new Request(`${this.url}posts.json`, {
        method: 'get'
      });
      const response = await fetch(request);
      return await response.json();
    } catch (err) {
      console.error(err);
    };
  };

  async fetchPostById(id) {
    try {
      const request = new Request(`${this.url}posts/${id}.json`, {
        method: 'get'
      });
      const response = await fetch(request);
      return await response.json();
    } catch (err) {
      console.error(err);
    };
  }
};

export const apiService = new ApiService('https://test-project-a4bfd-default-rtdb.firebaseio.com/');
