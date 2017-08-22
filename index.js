require('./src/css/index.css')
require(['app/caroucel.js','app/gotop.js','app/loadimgs.js','lib/jquery.js'], function (caroucel, gotop,loadimgs,$){
  caroucel.init(document.querySelectorAll('.container'))
  gotop.init(document.body)
  loadimgs()
})