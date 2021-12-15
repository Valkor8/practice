export class TransformService {
  static fbObjectToArray(fbdata) {
    return Object.keys(fbdata).map(key => {
      const item = fbdata[key];
      item.id = key;
      return item
    });
  };
};
