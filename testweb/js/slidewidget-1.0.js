/* Simple JavaScript Inheritance * By John Resig http://ejohn.org/ * MIT Licensed. */
(function(){var a=false,b=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;this.Class=function(){};Class.create=function(g){var f=this.prototype;a=true;var e=new this();a=false;for(var d in g){e[d]=typeof g[d]=="function"&&typeof f[d]=="function"&&b.test(g[d])?(function(h,i){return function(){var k=this._super;this._super=f[h];var j=i.apply(this,arguments);this._super=k;return j}})(d,g[d]):g[d]}function c(){if(!a&&this.initialize){this.initialize.apply(this,arguments)}}c.prototype=e;c.constructor=c;c.create=arguments.callee;return c}})();
/* Swipe 1.0 * Brad Birdsall, Prime * Copyright 2011, Licensed GPL & MIT */
window.Swipe=function(b,a){
  if(!b){return null}
  var c=this;this.options=a||{};
  this.index=this.options.startSlide||0;
  this.speed=this.options.speed||200;
  this.callback=this.options.callback||function(){};
  this.delay=this.options.auto||0;
  this.margin=this.options.margin||0;
  this.container=b;
  this.element=this.container.children[0];
  this.container.style.overflow="hidden";
  this.element.style.listStyle="none";
  this.setup();
  this.begin();
  if(this.element.addEventListener){
    this.element.addEventListener("touchstart",this,false);
    this.element.addEventListener("touchmove",this,false);
    this.element.addEventListener("touchend",this,false);
    this.element.addEventListener("webkitTransitionEnd",this,false);
    this.element.addEventListener("msTransitionEnd",this,false);
    this.element.addEventListener("oTransitionEnd",this,false);
    this.element.addEventListener("transitionend",this,false);
    window.addEventListener("resize",this,false)
  }
};

Swipe.prototype={
  setup:function(){
    this.slides=this.element.children;
    this.length=this.slides.length;
    if(this.length<2){return null}
    this.width=$(this.container).width();
    if(!this.width){return null}
    this.container.style.visibility="hidden";
    if(!Modernizr.csstransitions){
      $(this.element).parent().css("position","relative");
      var a=$(this.element).height();
      $(this.element).css("left","0px");
      $(this.element).children().css("float","left");
      $(this.element).children().css("transition-timing-function","ease-out");
      $(this.element).children().css("-webkit-transition-timing-function","ease-out");
      $(this.element).children().css("-moz-transition-timing-function","ease-out")
    }
    $(this.element).append($(this.slides[0]).clone());
    $(this.element).prepend($(this.slides[this.length-1]).clone());
    this.real_length=this.length;
    this.length+=2;
    this.resizeSwipe();
    this.slide(this.index,0);this.container.style.visibility="visible"
  }
  ,resizeSwipe:function(){
    this.width=$(this.container).width();
    this.element.style.width=(this.slides.length*(this.width+this.margin))+"px";
    var a=this.slides.length;
    while(a--){
      var b=this.slides[a];
      b.style.width=this.width+"px";
      b.style.cssFloat="left";
      b.style.marginRight=this.margin+"px"
      b.style.marginTop=this.margin+"px";
    }
    this.slide(this.index,0)
  }
  ,slide:function(b,e){
    var c=this.element.style;
    this.index=b;
    if(Modernizr.csstransitions){
      c.webkitTransitionDuration=c.MozTransitionDuration=c.msTransitionDuration=c.OTransitionDuration=c.transitionDuration=e+"ms";
      c.webkitTransform="translate3d("+-((b+1)*(this.width+this.margin))+"px,0,0)";
      c.msTransform=c.MozTransform=c.OTransform="translateX("+-((b+1)*(this.width+this.margin))+"px)"
    }else{
      var d=this;var a=0-((b+1)*(this.width+this.margin));
      $(this.element).animate({marginLeft:a},{duration:e,easing:"swing",queue:false,complete:function(f){d.transitionEnd(f)}})
    }
    this.index=b
  }
  ,getPos:function(){return this.index}
  ,goTo:function(a){clearTimeout(this.interval);this.slide(a,this.speed)}
  ,prev:function(a){this.delay=a||0;clearTimeout(this.interval);if((this.index>=0)){this.slide(this.index-1,this.speed)}}
  ,next:function(a){this.delay=a||0;
      clearTimeout(this.interval);
      if(this.index<this.real_length){this.slide(this.index+1,this.speed)}
    }
  ,begin:function(){var a=this;clearTimeout(this.interval);this.interval=(this.delay)?setTimeout(function(){a.next(a.delay)},this.delay):0}
  ,stop:function(){this.delay=0;clearTimeout(this.interval)}
  ,resume:function(){this.delay=this.options.auto||0;this.begin()}
  ,handleEvent:function(a){
    switch(a.type){
      case"touchstart":this.onTouchStart(a);break;
      case"touchmove":this.onTouchMove(a);break;
      case"touchend":this.onTouchEnd(a);break;
      case"webkitTransitionEnd":case"msTransitionEnd":case"oTransitionEnd":case"transitionend":this.transitionEnd(a);break;
      case"resize":this.resizeSwipe();break
    }
  }
  ,transitionEnd:function(a){
    if(this.delay){this.begin()}
    if(this.index>=this.real_length){this.slide(0,0)}
    if(this.index<=-1){this.slide(this.real_length-1,0)}
    $(this.element).children().removeClass("current");
    $(this.slides[this.index+1]).addClass("current");
    this.callback(a,this.index,this.slides[this.index])
  }
  ,onTouchStart:function(a){
    this.start={
      pageX:a.touches[0].pageX
      ,pageY:a.touches[0].pageY
      ,time:Number(new Date())
    };
    this.isScrolling=undefined;
    this.deltaX=0;
    this.element.style.webkitTransitionDuration=0
  }
  ,onTouchMove:function(a){
    if(this.index>=this.real_length){this.index=0}
    if(this.index<=-1){this.index=this.real_length-1}if(a.touches.length>1||a.scale&&a.scale!==1){return}
    this.deltaX=a.touches[0].pageX-this.start.pageX;this.deltaY=a.touches[0].pageY-this.start.pageY;
    if(typeof this.isScrolling=="undefined"){this.isScrolling=!!(this.isScrolling||Math.abs(this.deltaX)<Math.abs(a.touches[0].pageY-this.start.pageY))}
    if(!this.isScrolling){
      a.preventDefault();
      clearTimeout(this.interval);
      this.deltaX=this.deltaX/1;
      this.element.style.webkitTransform="translate3d("+(this.deltaX-(this.index+1)*(this.width+this.margin))+"px,0,0)"
    }
  }
  ,onTouchEnd:function(b){
    var a=Number(new Date())-this.start.time<250&&Math.abs(this.deltaX)>20||Math.abs(this.deltaX)>this.width/3;
    if(!this.isScrolling){this.slide(this.index+(a?(this.deltaX<0?1:-1):0),200)}
  }
};

var SlideWidget=Class.create({
  initialize:function(a){
    var b=this;
    this.config=a;
    this.container=$(a.container);
    this.swipe=new Swipe(this.container.get(0),{startSlide:a.startSlide,speed:a.speed,auto:a.auto,margin:a.margin,callback:function(e,c,d){b.onSlideComplete(e,c,d)}});
    this.swipe.stop();
    
    $(function(){b.updateSlideIndicators()});
    
    this.controls_container=a.container;
    if(a.controls_container){this.controls_container=a.controls_container}
    $(this.controls_container+" .slide-next").on("click",function(c){b.slideNext(c)});
    $(this.controls_container+" .slide-back").on("click",function(c){b.slideBack(c)});
    $(this.controls_container+" .slide-indicators").on("click", "a", function(c){b.indicatorClick(c,this)})
  }
  ,start:function(){this.swipe.resume()}
  ,stop:function(){this.swipe.stop()}
  ,indicatorClick:function(c,b){
    c.preventDefault();
    c.stopPropagation();
    var a=$(b).data("slide");
    this.swipe.goTo(a-1)
  }
  ,slideTo:function(a){this.swipe.goTo(a)}
  ,onSlideComplete:function(c,a,b){if(this.config.callback){this.config.callback(c,a,b)}this.updateSlideIndicators()}
  ,slideNext:function(c){
    c.preventDefault();
    c.stopPropagation();
    var a=$(c.target);
    if(a.hasClass("disabled")){return false}
    var b=this.swipe;
    b.next()
  }
  ,slideBack:function(c){
    c.preventDefault();
    c.stopPropagation();
    var a=$(c.target);
    if(a.hasClass("disabled")){return false}
    var b=this.swipe;
    b.prev()
  }
  ,updateSlideIndicators:function(){
    var b=0;
    var a=this.swipe;
    if(a){b=a.index}
    var c=$(this.controls_container+" .slide-indicators a");
    c.removeClass("selected");
    $(c[b]).addClass("selected");
  }
});