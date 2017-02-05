
        /*$(function() {
            // auto play all pages
            var idx = 0;
            var pages = $('.page-element');
            setInterval(function() {
                idx++;
                if(idx >= pages.length) idx = 0;
                var pageElement = pages.get(idx);
                window.location.hash= '#!' + pageElement.id;
            }, 5000);
        })*/
        
        /*$(function() {
            setTimeout(function() {
                $('body').addClass('loaded');
            }, 0);
        })*/
    
document.write('<link href="css/animate.min.css" rel="stylesheet">');
    
// hover.js
document.write('<link href="css/hover-min.css" rel="stylesheet">');
////////////////////////////////////
   function gotopage(diff = 1){
    // variables for the whole function
    var newPage;
    var initialPage;

    //probably window.location.hash doesn't work in all environments?? also what about iframes?
    if (window.location.hash && window.location.hash.indexOf('#!') >= 0) {
        initialPage = window.location.hash.substr(2);
    } else {
        //use first page if now hash defined
        initialPage = $('a.page-element:first-of-type').attr('id');
    }

    //go through pages to see which one is active
     $('a.page-element').each(function( index ) {
              if ($( this ).attr('id') == initialPage) { //found active page
                   if ((index + diff) >= $('a.page-element').length) { //new page would be after the last > go to first
                      newPage = $('a.page-element:first-of-type').attr('id');
                  } else if ((index + diff) < 0) { //new page would be before the first > go to last
                      newPage = $('a.page-element').eq($('a.page-element').length - 1).attr('id');

                  } else { //go forward or backwards as requested
                    newPage = $('a.page-element').eq(index + diff).attr('id');
                  }
              } 
          }); 
    window.location.hash = '#!'+ newPage;
}

//keyboard binding
$(window).keydown(function( event ) {
  if ( event.which == 37 ) {
   gotopage(-1);
  } else if (event.which == 39) {
     gotopage(1); 
  }
});
   var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };
    // I had to use js for the menu :(

// Set initial rotation
rot = 0;

// Starting animation
$('.roll_inner').css('transform','rotateX(' + rot + 'deg)');

// Detect scroll
var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel"
$('body').bind(mousewheelevt, function(e){
  var evt = window.event || e    
  evt = evt.originalEvent ? evt.originalEvent : evt;                
  var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta 
  if(delta > 0) {
    $('.roll_inner').css('transform','rotateX(' + (rot + 60)  + 'deg)');
    rot = rot + 60
  }
  else{
    $('.roll_inner').css('transform','rotateX(' + (rot - 60)  + 'deg)');
    rot = rot - 60
  }   
});

// Wirefame switch
w = 0;

$('.wireframe').click(function(){
  if(w ===0){
    $('.roll_outer,.clip_l,.clip_r,.clip_t,.clip_b,.inner_shadow,.elip_l,.elip_r,.shines,.fa').hide();
    $('.roll_inner__button').addClass('w');
    w = 1;
  } else {
    $('.roll_outer,.clip_l,.clip_r,.clip_t,.clip_b,.inner_shadow,.elip_l,.elip_r,.shines,.fa').show();
    $('.roll_inner__button').removeClass('w');
    w = 0
  }
});
    