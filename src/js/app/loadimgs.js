define(['./loadmore.js'], function (loadmore){
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
        url: '//platform.sina.com.cn/slide/album_tech',
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
})
