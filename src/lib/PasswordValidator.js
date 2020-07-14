import BaseValidator from './BaseValidator';

export default class extends BaseValidator {
  constructor(val) {
    super(val, 'パスワード', 'password');
    this._checkLength = this._checkLength.bind(this);
    this._checkFormat = this._checkFormat.bind(this);
    this._includeCapLetter = this._includeCapLetter.bind(this);
    this._includeSymbol = this._includeSymbol.bind(this);
  }
  validate() {
    return super._cannotEmpty()
      .then(this._checkLength)
      .then(this._checkFormat) 
      .then(this._includeCapLetter)
      .then(this._includeSymbol)
      .then((res) => {
        return { success: true }; // Promise.resolve({ success: true })と同一
      })
      .catch(err => {
        return err; // Promise.resolve(err)と同一
      });
  }
  _checkLength() {
    if (this.val.length >= 8) {
      return Promise.resolve();
    } else {
      const message = `${this.typeName}が短すぎます。`;
      const errorMessage = super._errorResult(message);
      return Promise.reject(errorMessage)
    }
  }

  _checkFormat() {
    const re = /^[a-zA-Z0-9_\.\-@]*$/i;
    const match = re.test(this.val);
    if (match) {
      return Promise.resolve();
    } else {
      const message = '半角英数字と_.-@のみ使用可能です。';
      const errorMessage = super._errorResult(message);
      return Promise.reject(errorMessage)
    }
  } 

  _includeCapLetter() {
    const re = /[A-Z]+/;
    const match = re.test(this.val);
    if (match) {
      return Promise.resolve();
    } else {
      const message = '大文字のアルファベットを1文字以上使用してください';
      const errorMessage = super._errorResult(message);
      return Promise.reject(errorMessage)
    }
  }

  _includeSymbol() {
    const re = /[_\.\-@]+/i;
    const match = re.test(this.val);
    if (match) {
      return Promise.resolve();
    } else {
      const message = '_.-@のいずれかの記号を1文字以上使用してください';
      const errorMessage = super._errorResult(message);
      return Promise.reject(errorMessage)
    }
  }
}