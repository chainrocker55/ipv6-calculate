function prevent() {
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('copy', function (e) {
        e.clipboardData.setData('text/plain', "ไม่ให้ copy ง่าย ๆ หรอกครับ อิอิ \r\n");
        e.preventDefault();

    });

    document.onkeypress = function (event) {
        event = (event || window.event);
        if (event.keyCode == 123) {
            //alert('No F-12');
            return false;
        }
    }
    document.onmousedown = function (event) {
        event = (event || window.event);
        if (event.keyCode == 123) {
            //alert('No F-keys');
            return false;
        }
    }
    document.onkeydown = function (event) {
        event = (event || window.event);
        if (event.keyCode == 123) {
            //alert('No F-keys');
            return false;
        }
    }
}
function disableCtrlKeyCombination(e) {
    //List of keys
    var forbiddenKeys = new Array('u', 's');
    var key;
    var isCtrl;
    if (window.event) {
        key = window.event.keyCode; //IE
        if (window.event.ctrlKey)
            isCtrl = true;
        else
            isCtrl = false;
    }
    else {
        key = e.which; //firefox
        if (e.ctrlKey)
            isCtrl = true;
        else
            isCtrl = false;
    }
    //if ctrl is pressed check if other key is in forbidenKeys array
    if (isCtrl) {
        for (i = 0; i < forbiddenKeys.length; i++) {
            //case-insensitive comparation
            if (forbiddenKeys[i].toLowerCase() == String.fromCharCode(key).toLowerCase()) {
                //alert(‘Key combination CTRL + ‘+String.fromCharCode(key) +’ has been disabled.’);
                return false;
            }
        }
    }
    return true;
}