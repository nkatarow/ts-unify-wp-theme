/*

Logo Rotator Component
VERSION 1.0.0
AUTHORS: Nick Katarow

DEPENDENCIES:
- jQuery 2.2.0
- app.main.js

*/

UNIFY.logos = {
  init: function(instance) {
    var self = this;
    var list = $(instance).find('.logo-list');
        
    self.createrows(list, 4);
  },
  createrows: function(instance, rowlength){
    var self = this;
    var images = $(instance).children('.img');

    for (var i=0; i < images.length; i+=rowlength) {
      images.slice(i, i+rowlength).wrapAll('<div class="logo-row"></div>');
    }

    // Wait for all the images to load before running this next part so we can get accurate heights
    $(window).on("load", function() {
      self.setTransitionIntervals(instance, rowlength);
    });
  },
  setTransitionIntervals: function(instance, rowlength) {
    var self = this;
    var rowHeightArray = [];
    var moduleHeight = 0;

    $(instance).children('.logo-row').each(function(){
      var delay = 0;
      var delayInterval = 100;
      var imgHeightArray = [];
            
      $(this).children('.img').each(function(){
        $(this).css('transition-delay', delay + 'ms');
        delay = delay + delayInterval;
        imgHeightArray.push($(this).outerHeight());
      });

      rowHeightArray.push(self.getRowHeight(this, imgHeightArray));
    });

    for (i=0;i<rowHeightArray.length;i++) {
      if (rowHeightArray[i] > moduleHeight) {
        moduleHeight = rowHeightArray[i];
      }
    }
      
    $('.logo-list .logo-row .img').css('height', moduleHeight);
    
    if (UNIFY.getMediaWidth() < 800) {
      $('.logo-list').css('height', moduleHeight * 2);
    } else {
      $('.logo-list').css('height', moduleHeight);
    }
    
    self.startRotation(instance, rowlength);
  },
  getRowHeight: function(row, imgHeightArray) {
    var rowHeight = 0;
    
    for (var i=0; i < imgHeightArray.length; i++) {
      if (imgHeightArray[i] > rowHeight) {
        rowHeight = imgHeightArray[i];
      }
    }
    
    return rowHeight;
  },
  startRotation: function(instance, rowlength){
    var self = this;
    var totalRows = 0;
    var current = 1;
    var next = current + 1;
    
    $(instance).children('.logo-row').each(function(){
      totalRows++;
    });

    var previous = totalRows;
    
    $(instance).addClass('playing');
    self.rotate(instance, current, previous, next);

    window.setInterval(function(){
      if (next == totalRows) {
        current++;
        previous = current - 1;
        next = 1;
      } else if (next == 1) {
        current = 1;
        previous = totalRows;
        next = current + 1;
      } else {
        current++;
        previous = current - 1;
        next = current + 1;
      }

      self.rotate(instance, current, previous);
    }, 4000);

  },
  rotate: function(instance, current, previous) {
    $(instance).children('.logo-row:nth-of-type(' + previous + ')').children('.img').removeClass('transition-in');
    $(instance).children('.logo-row:nth-of-type(' + current + ')').children('.img').addClass('transition-in');
  }
}