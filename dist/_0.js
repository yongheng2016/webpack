webpackJsonpMylibrary([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (){

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
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
   



/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (){

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

}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function (loadmore){
  return function (){
    var perpage = 20,
        page = 1,
        columnHeight = [0,0,0],
        viewHeight = $(window).height(),
        scrollTop,
        hiddenDivOffsetTop

    start()

    $(window).scroll(function (){
      scrollTop = $(window).scrollTop()
      hiddenDivOffsetTop = $('.isHidden').offset().top
      if (scrollTop+viewHeight>=hiddenDivOffsetTop){
        page++
        console.log(page)
        loadmore.one(document.querySelector('.loadmore'), function(){
          document.querySelector('.loadmore').onclick = function (){
            start()
          }
        })
      }

    })

    function start(){
      getData(function (newsList){
        console.log(newsList)
        $.each(newsList, function (index, news){
          var $node = getNode(news)
          $node.find('img').load(function (){
            waterFallAppend($node)
          })
        })
        
      })
    }

    function getData(callback){
      $.ajax({
        url: 'http://platform.sina.com.cn/slide/album_tech',
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        data: {
          app_key: '1271687855',
          num: perpage,
          page: page
        }
      }).done(function (response){
          if (response && response.status && response.status.code =='0'){
            callback(response.data)
          }
      })
    }

    function getNode(news){
      var html=''
          html+='<div class="content">'
          html+='<img src="'+news.img_url+'" alt="">'
          html+='<div class="introduct">'
          html+='<h5>'+news.short_name+'</h5>'
          html+='<p>'+news.short_intro+'</p>'
          html+='</div>'
          html+='</div>'
      return $(html)
    }

    function waterFallAppend($node){
      var min = 0,
          minHeight = columnHeight[0]
      for (var i=0; i<columnHeight.length; i++){
        if (columnHeight[i]<minHeight){
          min = i
          minHeigth = columnHeight[i]
        }
      }
      $('.column').eq(min).append($node)
      columnHeight[min]+=$('.column').eq(min).outerHeight()
    } 
  }
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (){

  function _Exposure(target, callback){
    this.target = target
    this.callback = callback
    this.checkout()
    this.bind()
  }

  _Exposure.prototype.bind = function (){
    var _this = this
    window.addEventListener('scroll', function (){
      _this.checkout()
    })
  }

  _Exposure.prototype.checkout = function (){
    if (this.isShow(this.target)){
      this.callback(this.target)
    }
  }

  _Exposure.prototype.isShow = function (){
        var windowHeight = window.innerHeight
        var  scrollHeight = document.body.scrollTop
        var  targetTop = this.target.offsetTop
        var nodeHeight = this.target.offsetHeight
        console.log('我是target'+this.target)
      console.log(windowHeight)
      console.log(scrollHeight)
      console.log(targetTop)
      if (windowHeight+scrollHeight>targetTop && scrollHeight<targetTop+nodeHeight){
        return true
      }
      return false
  }

  return {
    init: function (targets, callback){
        Array.prototype.forEach.call(targets, function(target){
          new _Exposure(target, callback)
        })
      },
    
      one: function (target, callback){
        new _Exposure(target, callback)
      }
    }
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ })
]);