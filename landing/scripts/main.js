document.addEventListener('DOMContentLoaded', () => {
    
    function setPositionContactsBox() {
        let positionLeft = document.querySelector('.container').offsetLeft;
        document.getElementById('contactsBox').style.left = positionLeft + 15 + 'px';
    }
    setPositionContactsBox();

    window.addEventListener('resize', setPositionContactsBox);

    document.querySelector('.services__wrapper').onclick = e => {
        let target = e.target.closest('.services-box');
        return target ? target.classList.toggle('show') : null;
    };

    // menu START
    const windowWidth = document.body.clientWidth,
    menu = document.querySelector("#menu-header"),
    items = document.querySelectorAll("#vlmenu a"),
    eltoggle = document.querySelector("#menu-toggle");
    if (eltoggle) {
        eltoggle.addEventListener("click", function() {
            this.classList.toggle("close");
            menu.classList.toggle("show");
            scrollingLock();
        });
    }

    function scrollingLock() {
        if (windowWidth < 769 && menu.classList.contains("show")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }// menu END
    
});