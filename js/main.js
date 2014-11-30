$(function(){
  // Inialize slideshow
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
        console.log("scrollY: " + window.scrollY)
        console.log("tocOffset: " + tocOffset);
        console.log( "tocPadding: " + tocPadding)
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
  $("#mainMenu").mmenu({
    classes: "mm-white", //"mm-light", // "mm-white" "mm-fullscreen"
    //slidingSubmenus: false,
    counters: true,
    offCanvas: {
      //pageNodetype: "article",
      zposition: "front"
    }
  });
  
  // fancybox 
  $("#fancy-modal-rss").fancybox();
  $("#tagcloud a").fancybox();
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


