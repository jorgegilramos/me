/*!
* scrollup v2.4.0
* Url: http://markgoodyear.com/labs/scrollup/
* Copyright (c) Mark Goodyear — @markgdyr — http://markgoodyear.com
* License: MIT
*/
!function(l,o,e){"use strict";l.fn.scrollUp=function(o){l.data(e.body,"scrollUp")||(l.data(e.body,"scrollUp",!0),l.fn.scrollUp.init(o))},l.fn.scrollUp.init=function(r){var s,t,c,i,n,a,d,p=l.fn.scrollUp.settings=l.extend({},l.fn.scrollUp.defaults,r),f=!1;switch(d=p.scrollTrigger?l(p.scrollTrigger):l("<a/>",{id:p.scrollName,href:"#top"}),p.scrollTitle&&d.attr("title",p.scrollTitle),d.appendTo("body"),p.scrollImg||p.scrollTrigger||d.html(p.scrollText),d.css({display:"none",position:"fixed",zIndex:p.zIndex}),p.activeOverlay&&l("<div/>",{id:p.scrollName+"-active"}).css({position:"absolute",top:p.scrollDistance+"px",width:"100%",borderTop:"1px dotted"+p.activeOverlay,zIndex:p.zIndex}).appendTo("body"),p.animation){case"fade":s="fadeIn",t="fadeOut",c=p.animationSpeed;break;case"slide":s="slideDown",t="slideUp",c=p.animationSpeed;break;default:s="show",t="hide",c=0}i="top"===p.scrollFrom?p.scrollDistance:l(e).height()-l(o).height()-p.scrollDistance,n=l(o).scroll(function(){l(o).scrollTop()>i?f||(d[s](c),f=!0):f&&(d[t](c),f=!1)}),p.scrollTarget?"number"==typeof p.scrollTarget?a=p.scrollTarget:"string"==typeof p.scrollTarget&&(a=Math.floor(l(p.scrollTarget).offset().top)):a=0,d.click(function(o){o.preventDefault(),l("html, body").animate({scrollTop:a},p.scrollSpeed,p.easingType)})},l.fn.scrollUp.defaults={scrollName:"scrollUp",scrollDistance:300,scrollFrom:"top",scrollSpeed:300,easingType:"linear",animation:"fade",animationSpeed:200,scrollTrigger:!1,scrollTarget:!1,scrollText:"Scroll to top",scrollTitle:!1,scrollImg:!1,activeOverlay:!1,zIndex:2147483647},l.fn.scrollUp.destroy=function(r){l.removeData(e.body,"scrollUp"),l("#"+l.fn.scrollUp.settings.scrollName).remove(),l("#"+l.fn.scrollUp.settings.scrollName+"-active").remove(),l.fn.jquery.split(".")[1]>=7?l(o).off("scroll",r):l(o).unbind("scroll",r)},l.scrollUp=l.fn.scrollUp}(jQuery,window,document);
$(function(){
  // Load html menu
  $.ajax({
    url: 'html/left-navigation.html',
    success: function (data) { 
      $('#mainMenu').append(data);
      $("#mainMenu").mmenu({
        classes: "mm-white", //"mm-light", // "mm-white" "mm-fullscreen"
        //slidingSubmenus: false,
        counters: true,
        offCanvas: {
          //pageNodetype: "article",
          zposition: "front"
        },
        "iconPanels": true,
        "navbar": {
           "title": "Ricardo Jorge Gil Ramos"
        },
        "navbars": [
           {
              "position": "bottom",
              "content": ['']
           }
        ]
      });
    $("#menu-footer").removeClass("mm-panel mm-hidden");
    },
    dataType: 'html'
  });
  
  // Inialize slideshow
  if ($('#slider-1').length) {
	  var slideshow = new SlideWidget({
	  	container: '#slider-1',
	  	startSlide: 0,
	  	speed: 500,
	  	auto: 6000,
	  	margin: 20
	  });
	  slideshow.swipe.transitionEnd();
    // Start the show!
    slideshow.swipe.resume();
  }
  // Initalize the ToC if we're on an article page
  if ($('.js-toc').length) {
    tableOfContents($('.js-toc'));

    var toc = $('.js-toc');
    var tocOffset = toc.offset().top;
    var tocPadding = 20;

    var tocSections = $('.toc-item');
    var tocSectionOffsets = [];

    // Calculates the toc section offsets, which can change as images get loaded
    var calculateTocSections = function(){
      tocSectionOffsets = [];
      tocSections.each(function(index, section){
        tocSectionOffsets.push(section.offsetTop);
      })
    }
    calculateTocSections();
    $(window).bind('load', calculateTocSections);

    var highlightTocSection = function(){
      var highlightIndex = 0;
      $.each(tocSectionOffsets, function(index, offset){
        if (window.scrollY > offset - 20){
          highlightIndex = index;
        }
      })
      highlightIndex += 1;
      $('ol.toc .active').removeClass('active');
      $('ol.toc li:nth-child(' + highlightIndex + ')').addClass('active');
    }
    highlightTocSection();

    var didScroll = false;
    $(window).scroll(function() {
      didScroll = true;
    });

    setInterval(function() {
      if (didScroll) {
        didScroll = false;
        if (window.scrollY > tocOffset - tocPadding)
          toc.addClass('sticky');
        else
          toc.removeClass('sticky');
      }
      highlightTocSection();
    }, 100);

    //var exampleNav = $('.js-examples-nav')
    //if (exampleNav.length){
    //  exampleNav.on('click', 'a', function(event){
    //    event.preventDefault()
    //    exampleNav.find('a').removeClass('selected')
    //    $('.markdown-example').hide()
    //    $('#' + $(this).attr('data-container-id')).show()
    //    $(this).addClass('selected')
    //  })
    //}
  }
  
  // fancybox 
  $(".fancy-modal-rss").fancybox();

  $.scrollUp({
    scrollTrigger: $("<a id='scrollUp' href='#top' class='fa fa-chevron-circle-up'></a>"),
    scrollText: ""
  });
  
  // Features navigation
  $("#bigdata-feature, #bi-feature").on("click", function(){location.href="bigdata.html";});
  $("#datascience-feature, #dashboards-feature").on("click", function(){location.href="datascience.html";});
  $("#html5-feature, #css3-feature").on("click", function(){location.href="html5.html";});
  $("#javascript-feature").on("click", function(){location.href="javascript.html";});
  $("#responsive-feature").on("click", function(){location.href="design.html";});
  $("#geolocalization-feature, #maps-feature").on("click", function(){location.href="maps.html";});
});

// Generates a table of contents based on a.toc-item elements throughout the
// page. Follows along via scroll
var tableOfContents = function($listContainer) {
  if ($listContainer.length === 0) return;

  $('.toc-item').each(function(index, chapterAnchor) {
    $chapterAnchor = $(chapterAnchor);
    var listLink = $('<a>')
      .attr('href', '#' + $chapterAnchor.attr('id'))
      .text($chapterAnchor.attr('title'))
      .bind('click', scrollTo);

    var listItem = $('<li>').append(listLink);

    $listContainer.append(listItem);
  });
}

var scrollTo = function(e) {
  // Avoid fancybox scrolling events
  if (e && e.target){
    e.preventDefault();
    var elScrollTo = $(e.target).attr('href');
    var $el = $(elScrollTo);
    $('body,html').animate({ scrollTop: $el.offset().top }, 400, 'swing', function() {
      location.hash = elScrollTo;
    });
  }
}


