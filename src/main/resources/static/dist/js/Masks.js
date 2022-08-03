var Municipio = Municipio || {}


Municipio.MaskPhone = (function () {

  class MaskPhone {
    constructor() {
      this.inputPhone = $('.js-phone')
      this.inputCellPhone = $('.js-cell-phone')
    }
    enable() {
      var maskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009'
      }

      var options = {
        onKeyPress: function (val, e, field, options) {
          field.mask(maskBehavior.apply({}, arguments), options)
        }
      }

      this.inputPhone.mask(maskBehavior, options)
      this.inputCellPhone.mask(maskBehavior, options)

      this.inputPhone.on('blur', validaPhone.bind(this))
      this.inputCellPhone.on('blur', validaCellPhone.bind(this))
    }
  }

  function validaPhone() {
    if (this.inputPhone.val().length < 14) {
      this.inputPhone.val('')
    }
  }

  function validaCellPhone() {
    if (this.inputCellPhone.val().length < 15) {
      this.inputCellPhone.val('')
    }
  }

  return MaskPhone

}())


$(() => {
  var maskPhone = new Municipio.MaskPhone()
  maskPhone.enable()
})
