function prevent() {
    $(document).bind('keydown', function (e) {
        if (e.ctrlKey && (e.which == 83 || e.which == 85)) {
            e.preventDefault();
            return false;
        }

        if (e.which == 123) {
            e.preventDefault();
            return false;
        }
    });
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
    document.getElementById("content").style.display = "block"
    document.getElementById("javascriptrequired").style.display = "none"
}