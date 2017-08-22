define(function (){

function GoTop(ct){
  this.ct = ct
  this.createNode()
  this.target = document.getElementsByClassName('target')[0]
  this.isShow()
}  
  
GoTop.prototype.createNode = function (){
  var target = document.createElement('div')

  target.textContent = 'GO TOP'
  target.classList.add('target')
  this.ct.appendChild(target)

}   
  
GoTop.prototype.isShow = function (){
  var _this = this,
      showHeight = window.innerHeight,
      ctScrollTop = 0

  this.ct.onscroll = function (){
    ctScrollTop = _this.ct.scrollTop

    if (ctScrollTop>showHeight*.8){
      _this.target.style.display = 'block'
      _this.bindEvent()
      
    }else{
      _this.target.style.display = 'none'
    }

  }
}   
  
GoTop.prototype.bindEvent = function (){
  var _this = this
  
  this.target.onclick = function (){
    _this.ct.scrollTop = 0
  }
}  

return {
  init: function (ct){
    new GoTop(ct)
  }
}

})
