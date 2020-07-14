import BaseValidator from './BaseValidator';

export default class extends BaseValidator {
  constructor(val) {
    super(val, 'メールアドレス', 'email');
    this._checkFormat = this._checkFormat.bind(this);
  }
  validate() {
    return super._cannotEmpty()
      .then(this._checkFormat)
      .then((res) => {
        return { success: true }
      })
      .catch(err => {
        return err
      });
  }
  _checkFormat() {
    const re = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
    const match = re.test(this.val); // マッチするならtrue、しないならfalseを返す。
    if (match) {
      return Promise.resolve();
    } else {
      const message = `${this.typeName}のフォーマットが異なります。`;
      const errorMessage = super._errorResult(message);
      return Promise.reject(errorMessage)
    }
  }
}