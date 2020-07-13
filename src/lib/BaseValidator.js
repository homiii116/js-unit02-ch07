export default class {
  constructor(val, typeName, type) {
    this.val = val;
    this.typeName = typeName;
    this.type = type;
    this.result = {};
  }
  _cannotEmpty() {
    return new Promise((resolve, reject) => {
      if (!!this.val) {
        resolve(this);
      } else {
        reject({
          success: false,
          message: `${this.typeName}は必須です。`,
          type: this.type
        })
      }
    });
  }

  _errorResult(message) {
    if (message) {
      return Promise.resolve();
    } else {
      return Promise.reject({
        success: false,
        message,
        type: this.type
      })
    }
  }
}