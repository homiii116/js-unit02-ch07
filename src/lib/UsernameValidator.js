import BaseValidator from './BaseValidator';

export default class extends BaseValidator {
  constructor(val) {
    super(val, 'ユーザー名', 'username');
    this._checkFormat = this._checkFormat.bind(this);
  }
  validate() {
    return super._cannotEmpty()
      .then(this._checkFormat)
      .then((res) => {
        return { success: true };
      })
      .catch(err => {
        return err;
      });
  }
  _checkFormat() {
    /*
      ユーザー名には半角英数字または@_-.の4つの記号のみを利用可能です。
    */
    const re = /^[a-z-A-Z0-9_\.@\-]*$/i;
    const match = re.test(this.val);
    if (match) {
      return Promise.resolve();
    } else {
      const message = `${this.typeName}のフォーマットが異なります。`;
      const errorMessage = super._errorResult(message);
      return Promise.reject(errorMessage)
    }
  }

}