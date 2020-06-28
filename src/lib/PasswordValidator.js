import BaseValidator from './BaseValidator';

export default class extends BaseValidator {
  constructor(val) {
    super(val, 'パスワード', 'password');
    this._checkLength = this._checkLength.bind(this);
  }
  validate() {
    return super._cannotEmpty()
      .then(this._checkLength)
      .then((res) => {
        return { success: true }; // Promise.resolve({ success: true })と同一
      })
      .catch(err => {
        return err; // Promise.resolve(err)と同一
      });
  }
  _checkLength() {
    const re = /^(?=.*[a-z0-9])(?=.*[A-Z])(?=.*[_\.@\-]).{8,}$/g;
    const match = re.test(this.val);
    if (match) {
      return Promise.resolve();
    } else {
      return Promise.reject({
        success: false,
        type: 'password',
        message: 'パスワードは8文字以上を設定してください。大文字のアルファベットと_-.@のいずれかの記号を1つ以上含めてください。'
      });
    }
  }
}