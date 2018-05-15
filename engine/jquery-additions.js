// Bind a function to an UI element that avoids "double triggering"
// Due to both touch and mouse handling.
RF.TouchClick = function (sel, fnc) {
  $(sel).on('touchstart mousedown', function(event){
        event.stopPropagation();
        event.preventDefault();
        if(event.handled !== true) {
            fnc(event);
            event.handled = true;
        } else {
            return false;
        }
  });
};

RF.TouchEndClick = function (sel, fnc) {
  $(sel).on('touchend mouseup', function(event){
        event.stopPropagation();
        event.preventDefault();
        if(event.handled !== true) {
            fnc(event);
            event.handled = true;
        } else {
            return false;
        }
  });
}

