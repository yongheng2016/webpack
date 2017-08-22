define(function (){

  function _Caroucel(ct){
    this.ct = ct
    this.init()
    this.autoPlay()
    this.bind()
  }

  _Caroucel.prototype.init = function (){
    this.imgs = this.ct.querySelectorAll('.caroucel>li')
    this.slides = this.ct.querySelectorAll('.data-target>li')
    this.next = this.ct.querySelector('.next')
    this.previous = this.ct.querySelector('.previous')
    this.caroucelControl = this.ct.querySelector('.caroucel-control')
    this.imgsLength = this.imgs.length
    this.index = 0
  }

  _Caroucel.prototype.bind = function (){
    var _this = this

    this.next.onclick = function (e){
      e.preventDefault()
      _this.playNext()
    }
    this.previous.onclick = function (e){
      e.preventDefault()
      _this.playPre()
    }
  }

  _Caroucel.prototype.play = function (){
    for (var i=0; i<this.imgsLength; i++){
      this.imgs[i].classList.remove('show')
      this.slides[i].classList.remove('slide')
    }
    this.imgs[this.index].classList.add('show')
    this.slides[this.index].classList.add('slide')
  }

  _Caroucel.prototype.autoPlay = function (){
    var _this = this
    var clock 
    clock = setInterval(this.playNext.bind(this), 2000)

    this.next.onmouseover = function (){
      clearInterval(clock)
    }
    this.next.onmouseout = function (){
      clock = setInterval(_this.playNext.bind(_this), 2000)
    }
    this.previous.onmouseover = function (){
      clearInterval(clock)
    }
    this.previous.onmouseout = function (){
      clock = setInterval(_this.playNext.bind(_this), 2000)
    }

  }

  _Caroucel.prototype.playNext = function (){
    var _this = this
    this.index++
    if (this.index>this.imgsLength-1){
      this.index = 0
    }
    this.play(this.imgs, this.index)
  }

  _Caroucel.prototype.playPre = function (){
    var _this = this
    this.index--
    if (this.index<0){
      this.index = this.imgsLength-1
    }
    this.play(this.imgs, this.index)
  }   

  return {
    init: function (cts){
      Array.prototype.forEach.call(cts, function (ct){
        new _Caroucel(ct)
      })
    }
  }
})
   

