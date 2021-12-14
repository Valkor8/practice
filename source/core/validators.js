export class Validators {
  static required(value = '') {
    // return value && value.trim();
    return value && value.trim() ? true : false;
  };

  static minLength(length) {
    return value => {
      return value.length >= length
    };
  };
};
