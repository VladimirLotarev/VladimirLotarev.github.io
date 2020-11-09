document.addEventListener("DOMContentLoaded", () => {

    function getWindowWidth() { return document.documentElement.clientWidth; }
    getWindowWidth();


    // menu START
    function setMenu() {
        const links = [
            '#',
            '#',
            '#',
            '#',
            '#',
            '#',
            '#',
            '#',
            '#',
        ];
        const nameLinks = [
            'Каталог',
            'О продукции',
            'Отзывы',
            'Доставка и оплата',
            'Статус заказа',
            'Возврат',
            'Акции',
            'Распродажа',
            'Контакты',
        ];
        const menu = document.createElement('nav'),
            menuList = document.createElement('ul'),
            header = document.querySelector('header'),
            container = document.createElement('div'),
            headerBefore = document.createElement('div'),
            headerMenuArea = document.createElement('div'),
            menuToggle = document.createElement('div');
        container.classList.add('container');
        headerMenuArea.classList.add('header-menu-area');
        headerBefore.classList.add('header__before');
        menu.classList.add('menu');
        menu.setAttribute('id', 'menu');
        menuList.classList.add('menu__list');
        function createMenuItem(i) {
            const menuItem = document.createElement('li');
            menuItem.classList.add('menu__item');
            menuItem.insertAdjacentHTML('beforeend', `<a href="${links[i]}" class="menu__link">${nameLinks[i]}</a>`)
            menuList.append(menuItem);
        }
        for(let i = 0; i < links.length; i++) {
            createMenuItem(i);
        }
        menu.append(menuList);
        const menuItems = menu.querySelectorAll('.menu__item'),
            subMenuItems = document.querySelectorAll('.sub-menu__item');
        if( getWindowWidth() < 1140 ) {
            if(!document.body.firstElementChild.classList.contains('menu')) {
                for(let menuItem of menuItems) {
                    if(menuItem.textContent === 'Каталог') {
                        menuItem.hidden = true;
                    }
                }
                document.body.prepend(menu);
                if(header.firstElementChild.classList.contains('menu')){
                    header.firstElementChild.remove();
                }
            }
            for(let subMenuItem of subMenuItems) {
                document.querySelector('.menu__list').prepend(subMenuItem);
            }
            if(!menu.classList.contains('menu__mobile')) {
                menu.classList.add('menu__mobile');
            }
            if(document.querySelector('.header__before')) {
                document.querySelector('.header__before').remove();
            }
            if(!document.querySelector('#menu-toggle')) {
                menuToggle.setAttribute('id', 'menu-toggle');
                menuToggle.classList.add('menu__toggle');
                document.querySelector('.header__wrap').append(menuToggle);
                menuToggle.addEventListener('click', () => {
                    document.querySelector('#menu').classList.toggle('show');
                    document.body.classList.toggle('scroll-lock');
                    if(menuToggle.classList.contains('menu__close')) {
                        menuToggle.classList.remove('menu__close');
                        document.querySelector('#header-search').hidden = false;
                        document.querySelector('#header-wrap').prepend(document.querySelector('#header-logo'));
                        document.querySelector('#header-wrap').append(document.querySelector('#header-buttons'));
                        document.querySelector('#header-wrap').append(menuToggle);
                        document.querySelector('main').hidden = false;
                    } else {
                        menuToggle.classList.add('menu__close');
                        document.querySelector('#header-search').hidden = true;
                        document.querySelector('main').hidden = true;
                        document.querySelector('#menu').append(menuToggle);
                        document.querySelector('#menu').append(document.querySelector('#header-buttons'));
                        document.querySelector('#menu').prepend(document.querySelector('#header-logo'));
                    }
                });
            }
            if(document.querySelector('header .phone')) {
                document.querySelector('header .phone').remove();
            }
        } else {
            if(document.querySelector('.menu__toggle')) {
                document.querySelector('.menu__toggle').remove();
            }
            if(!menu.classList.contains('menu__mobile')) {
                menu.classList.remove('menu__mobile');
            }
            if(!header.querySelector('.menu')) {
                headerMenuArea.append(menu);
                if(!header.querySelector('.phone')) {
                    headerMenuArea.insertAdjacentHTML('beforeend', `<a href="tel:88888888888" class="phone">8 888 888 88 88</a>`);
                }
                container.prepend(headerMenuArea);
                headerBefore.append(container);
                header.prepend(headerBefore);
                for(let subMenuItem of subMenuItems) {
                    document.querySelector('.sub-menu__list').prepend(subMenuItem);
                }
            }
        }
    }
    setMenu();// menu END


    // stick START
    function toStick() {
        const header = document.querySelector('header');
        if(header) {
            if(getWindowWidth() < 1140) {
                !header.classList.contains('stick') ? header.classList.add('stick') : null;
            } else {            
                if(Math.round(window.pageYOffset) >= 39 ) {
                    !header.classList.contains('stick') ? header.classList.add('stick') : null;
                } else {
                    header.classList.remove('stick'); 
                }           
            }
        } 
    }
    toStick();// stick END

        
    // slider START
    VlSlider.setParams("slider", {
        speed: 10,
        controls: false,
        indicators: false,
        interval: 3,
        autoplay: false,
        gallery: false,
        pathToImage: 'images/',
        imageNames: [
            'avto-kovriki',
            'kovriki-evo',
            'kovrik',
            'kovriki-dlya-avto',
        ],
        content: [
            '<div class="slide__title slide-title slide-academician"><div class="slide-academician__price"><span class="slide-academician__old-price">2 790</span>2 450 рублей</div><div class="slide-academician__ttl">удерживаем <span>старую цену</span></div><div class="slide-academician__subttl">Акция до 5 октября. Успей купить по старой цену.</div>',
            '<div class="slide__title slide-title">Автомобильные накидки из итальянской алькантары</div>',
            '<div class="slide__title slide-title">Гарантия качества<br> В течение 30 дней вернем<br> деньги без разбирательств</div>',
            '<div class="slide__title slide-title">Максимальное<br> покрытие пола<br> Оригинальный<br> крепеж</div>',
        ],
        links: [
            '',
            '<a href="nakidki-na-sidenia/" class="slide__button button">Выбрать</a>',
            '<a href="otzivi/" class="slide__button button">Посмотреть отзывы</a>',
            '<a href="katalog-kovrikov/" class="slide__button button">Выбрать коврики на свой авто</a>',
        ],
        alt: [
            'evo коврики',
            'evo коврики',
            'evo коврики',
            'evo коврики',
        ],
    }); // slider END


    // slider-company START
    VlSlider.setParams("slider-company", {
        speed: 10,
        controls: true,
        indicators: true,
        interval: 3,
        autoplay: false,
        gallery: false,
        pathToImage: 'images/about-company/',
        imageNames: [
            'evo-kovriki-proizvodstvo',
            'evo-kovriki-proizvodstvo-duffcar',
            'evo-kovriki-vozvrat',
            'evo-kovriki-kachestvo',
            'evo-kovriki-zamer',
            'evo-kovriki',
        ],
        content: [
            '<div class="slide-company"><img class="slide-company__img" src="images/about-company/01.svg" alt="evo коврики"><div class="slide-company__title">Собственное производство</div><div class="slide-company__txt">Высокие производственные мощности позволили нам занять лидирующие позиции на рынке автоаксессуаров в России и СНГ</div></div>',
            '<div class="slide-company"><img class="slide-company__img" src="images/about-company/02.svg" alt="evo коврики"><div class="slide-company__title">Профессиональная команда</div><div class="slide-company__txt">В команде DuffCar только настоящие специалисты с опытом работы от 5 лет</div></div>',
            '<div class="slide-company"><img class="slide-company__img" src="images/about-company/03.svg" alt="evo коврики"><div class="slide-company__title">30 дней на возврат</div><div class="slide-company__txt">В случае, если товар Вам не (совсем) подходит, мы вернём деньги без каких-либо проблем и долгих разбирательств</div></div>',
            '<div class="slide-company"><img class="slide-company__img" src="images/about-company/04.svg" alt="evo коврики"><div class="slide-company__title">Контроль качества</div><div class="slide-company__txt">Мы дорожим временем наших клиентов и понимаем насколько важно отправлять только качественную продукцию. Контроль на каждом из 5 этапов производства позволяет гарантировать нам качество своей продукции</div></div>',
            '<div class="slide-company"><img class="slide-company__img" src="images/about-company/05.svg" alt="evo коврики"><div class="slide-company__title">Индивидуальный замер лекал под каждую модель авто</div><div class="slide-company__txt">Лекальная база насчитывает более 2500 моделей, цифровой замер обеспечивает идеальную укладку ковров в салоне. </div></div>',
            '<div class="slide-company"><img class="slide-company__img" src="images/about-company/06.svg" alt="evo коврики"><div class="slide-company__title">Качественные материалы российского производства, полностью исключён китайский материал</div><div class="slide-company__txt">Большие складские запасы обеспечивают постоянное наличие всей палитры. Плотность полимера 60 шор (в отличии от бюджетных аналогов) увеличивают срок эксплуатации продукции в несколько раз</div></div>',
        ],
        alt: [
            'evo коврики',
            'evo коврики',
            'evo коврики',
            'evo коврики',
        ],
    }); // slider-company END


    // slider-reviews START
    VlSlider.setParams("slider-reviews", {
        speed: 10,
        controls: true,
        indicators: true,
        interval: 3,
        autoplay: false,
        gallery: true,
        pathToImage: 'images/',
        imageNames: [
            [
                'ford1', 
                'ford2', 
                'ford3', 
                'ford4',
            ],
            [
                'evo-kovrik', 
            ],
            [
                'kovrikr-evo', 
                'kovrik-evo', 
            ],
            [
                'avto-kovrik', 
                'kovriki-evo', 
                'avto-kovriki-evo', 
            ],
        ],
        content: [
            '<div class="slider-reviews__txt">Заĸазал ĸовриĸи на ford c-max 1 рестайлинг. 19-го числа, сегодня уже<br/>пришли ĸовры. Бомба, сели везде чётĸо, есть плюс - при отсутствии<br/>заводсĸих ĸреплений, они пришивают липучĸу и, соответственно, ĸовры не<br/>ĸатаются. Всё ĸлассно, всем советую</div><dvi class="slider-reviews__autor"><div class="slider-reviews__logo"><picture><source srcset="" type="image/webp" /><img src="images/slider/avatar1.jpg" alt="image" type="image/jpg" /></picture></div><div><div class="slider-reviews__name">Эдуард Заименĸо</div><div class="slider-reviews__date">12.08.2020</div></div></dvi>',
            '<div class="slider-reviews__txt">Хочу выразить огромную благодарность за шиĸарные ĸовриĸи! Сели ĸаĸ родные, липучĸи держат- не оторвешь!<br/>Быстрая доставĸа, вчера отправили - сегодня уже получила. Отдельная благодарность Давиду за оперативность, терпение и выдержĸу в ответах на многочисленные вопросы!</div><dvi class="slider-reviews__autor"><div class="slider-reviews__logo"><picture><source srcset="" type="image/webp" /><img src="images/slider/avatar2.jpg" alt="image" type="image/jpg" /></picture></div><div><div class="slider-reviews__name">Галина Гридина</div><div class="slider-reviews__date">11.08.2020</div></div></dvi>',
            '<div class="slider-reviews__txt">Пришли ĸовриĸи на toyota avensis 2. Подошли идеально!</div><dvi class="slider-reviews__autor"><div class="slider-reviews__logo"><picture><source srcset="" type="image/webp" /><img src="images/slider/avatar3.jpg" alt="image" type="image/jpg" /></picture></div><div><div class="slider-reviews__name">Андрей Гришин</div><div class="slider-reviews__date">11.08.2020</div></div></dvi>',
            '<div class="slider-reviews__txt">Заĸазал себе ĸовриĸи на ниву. Отправили транспортной ĸомпанией. Я<br/>доволен! Ковриĸи подошли ĸаĸ нужно, на вид ĸачественные, плотные!!!<br/>Супер!!!</div><dvi class="slider-reviews__autor"><div class="slider-reviews__logo"><picture><source srcset="" type="image/webp" /><img src="images/slider/avatar4.jpg" alt="image" type="image/jpg" /></picture></div><div><div class="slider-reviews__name">Сергей Ярошевич</div><div class="slider-reviews__date">11.08.2020</div></div></dvi>',
        ],
        links: [
            '',
            '',
            '',
            '',
        ],
        alt: [
            'evo коврики',
            'evo коврики',
            'evo коврики',
            'evo коврики',
        ],
    }); // slider-reviews END


    // lazy box loading START
    function lazyBoxLoading() {
        let lazyBoxes = document.querySelectorAll(".lazy-box"),
            root = "https://vladimirlotarev.github.io/duffcar",
            winHeight = document.documentElement.clientHeight;
        if (lazyBoxes) {
            for (let lazyBox of lazyBoxes) {
                if (lazyBox.innerHTML == "") {
                    lazyBox.setAttribute("style", "opacity: 0");
                    let lazyBoxOffsetTop = lazyBox.getBoundingClientRect().top;
                    if (lazyBoxOffsetTop <= winHeight) {
                        let template = lazyBox.getAttribute("id");
                        fetch(`${root}/templates/${template}.php`)
                        .then((data) => {
                            return data.text();
                        })
                        .then((data) => {
                            lazyBox.innerHTML = data;
                            lazyBox.setAttribute("style", "opacity: 1; transition: All .2s ease-out;");
                            if(lazyBox.id === 'youtube') {
                                youtubeSetHeight();
                                youtube(); 
                            }
                        });
                    }
                }
            }
        }
    } // lazy box loading END 


    //youtube set height START
    function youtubeSetHeight() {
        let youtubeItems = document.querySelectorAll('.youtube__item');
        let images = document.querySelectorAll('.youtube__wrap-img');
        for(let youtubeItem of youtubeItems) {
            if(youtubeItem && images) {
                let youtubeItemWidth = youtubeItem.clientWidth;
                for(let i = 0; i < images.length; i++) {
                    let image = images[i];
                    image.style.maxHeight = `${youtubeItemWidth / 1.8}px`;
                    if(youtubeItem.closest('.youtube__item.show')) {
                        youtubeItem.querySelector('iframe').style.maxHeight = `${youtubeItemWidth / 1.8}px`;
                        youtubeItem.style.minHeight = youtubeItem.querySelector('.youtube__mask').clientHeight + 'px';
                    } else {
                        if(youtubeItem.querySelector('iframe')) {
                            youtubeItem.querySelector('iframe').style.maxHeight = `100%`;
                        }   
                    } 
                }
            }   
        }
    } //youtube set height END


    // youtube START
    function youtube() {
        let youtubeList = document.querySelector('.youtube__list');
        if(youtubeList) {
            let youtubeItems = document.querySelectorAll('.youtube__item');
            if(youtubeItems) {
                for(let i = 0; i < youtubeItems.length; i++) {
                    let youtubeItem = youtubeItems[i];
                    let youtubeItemId = youtubeItem.id;
                    if(youtubeItemId) {
                        youtubeItem.insertAdjacentHTML('beforeend', '<iframe width="100%" height="400" tabindex=' + i + ' src="https://www.youtube.com/embed/' + youtubeItemId + '" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');     
                        let iframe = youtubeItem.querySelector('iframe');

                        addEventListener('blur', () => {
                            if(document.activeElement === iframe) {    
                                youtubeItem.classList.toggle('show');
                                youtubeSetHeight();
                            }  
                        });      

                        youtubeItem.addEventListener('click', () => {
                            let mask = document.querySelector('.show .youtube__mask');
                            if(mask) {
                                let iframe = youtubeItem.querySelector('iframe');
                                youtubeItem.classList.toggle('show');
                                iframe.setAttribute('src', `https://www.youtube.com/embed/${youtubeItemId}`);
                                
                            }
                            youtubeSetHeight();
                        }); 
                    }
                }                  
            }
        }
    } // youtube END


    // form validation START
    function formValidation() {
        const forms = document.querySelectorAll("form");
        if(forms) {
            for(let form of forms) {
                let inputs = form.querySelectorAll("input[type='text'], input[type='tel']"),
                    button = form.querySelector('button'),
                    valid = false,                    
                    name = false,
                    phone = false,
                    // phoneValid = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
                    phoneValid = /^((?!_).)*$/;
                for (let input of inputs) {

                    function validation() {

                        function nameValidation() {
                            if(input.classList.contains('feedback__name')) {
                                if(input.value != "") {
                                    if(/\d/.test(input.value)) {
                                        name = false;
                                        input.classList.add('invalid');
                                        input.value = '';
                                        input.setAttribute('placeholder', 'Имя не должно содержать цифры');
                                    } else {
                                        if(input.value.length < 3) {
                                            name = false;
                                            input.classList.add('invalid');
                                            input.value = '';
                                            input.setAttribute('placeholder', 'Имя не может содержать меньше 3 букв');
                                        } else {
                                            name = true;
                                            input.classList.remove('invalid');
                                            input.setAttribute('placeholder', 'Имя');                                            
                                        }   
                                    } 
                                } else {
                                    name = false;
                                    input.classList.add('invalid');
                                    input.setAttribute('placeholder', 'Вы не указали имя');
                                }
                            }
                        }
                        nameValidation();

                        function phoneValidation() {
                            if(input.classList.contains('feedback__phone')) {
                                if(input.value != "") {
                                    if(phoneValid.test(input.value) === true) {
                                        phone = true;
                                        input.classList.remove('invalid');
                                        input.setAttribute('placeholder', 'Телефона');
                                    } else {
                                        console.log(input.value);
                                        phone = false;
                                        input.classList.add('invalid');
                                        input.value = '';
                                        input.setAttribute('placeholder', 'Вы ввели не корректный номер');  
                                        setTimeout(() => maskPhone(), 1000);
                                    }
                                } else {
                                    phone = false;
                                    input.classList.add('invalid');
                                    input.setAttribute('placeholder', 'Вы не указали номер телефона');
                                }
                            }
                        }
                        phoneValidation();

                    }

                    function returnValidationStatus() { return name && phone ? valid = true : valid = false }

                    input.addEventListener('input', () => { 
                        if(input.classList.contains('feedback__name')) {
                            if(input.value != "") {
                                if(/\d/.test(input.value)) {
                                    name = false;
                                    input.classList.add('invalid');
                                    input.setAttribute('placeholder', 'Имя не должно содержать цифры');
                                } else {
                                    if(input.value.length < 3) {
                                        name = false;
                                        input.classList.add('invalid');
                                        input.setAttribute('placeholder', 'Имя не может содержать меньше 3 букв');
                                    } else {
                                        name = true;
                                        input.classList.remove('invalid');
                                        input.setAttribute('placeholder', 'Имя');                                            
                                    }   
                                } 
                            } else {
                                name = false;
                                input.classList.add('invalid');
                                input.setAttribute('placeholder', 'Вы не указали имя');
                            }
                        } else if (input.classList.contains('feedback__phone')) {
                            if(input.value != "") {
                                if(phoneValid.test(input.value) === true) {
                                    phone = true;
                                    input.classList.remove('invalid');
                                    input.setAttribute('placeholder', 'Телефона');
                                } else {
                                    phone = false;
                                    input.classList.add('invalid');
                                    input.setAttribute('placeholder', 'Вы ввели не корректный номер');
                                }
                            } else {
                                phone = false;
                                input.classList.add('invalid');
                                input.setAttribute('placeholder', 'Вы не указали номер телефона');
                            }
                            returnValidationStatus();
                            button && valid ? button.removeAttribute('disabled') : button.setAttribute('disabled', ''); 
                        }
                    }); 

                    input.addEventListener('blur', () => {                    
                        validation();
                        returnValidationStatus();
                        button && valid ? button.removeAttribute('disabled') : button.setAttribute('disabled', ''); 
                    });                                                  
                }    
            }
        }
    }
    formValidation(); // form validation END


    // mask for Phone START
    function maskPhone() {
        const inputs = document.querySelectorAll('input[type="tel"]');
        if(inputs) {
            for(let input of inputs) {
                let defaultValue = '+7 ( _ _ _ ) _ _ _ - _ _ - _ _',
                    lastValue = defaultValue;
                input.value = defaultValue;
                input.addEventListener('input', () => {
                    let str = input.value;
                    let sort = /\d(?=\D*$)/g;
                    sort.lastIndex = 5; 
                    let replacement = sort.exec(str);
                    if(replacement) {
                        input.value = lastValue;               
                        let regexp = input.value.match(/_/);
                        input.value = input.value.replace(regexp, replacement);
                        lastValue = input.value;
                    } else {
                        input.value = defaultValue;
                    }
                });
            }
        }
    }
    maskPhone(); // mask for Phone END


    // scroll START
    window.addEventListener('scroll', () => {
        toStick();
        lazyBoxLoading();
        scrollTop();
    }); // scroll END


    // resize START
    window.addEventListener("resize", () => {
        getWindowWidth();
        setMenu();
        youtubeSetHeight();
    }); // resize END


    // scrollTop START
    function scrollTop() {
        const buttonScrollTop = document.querySelector('#scroll-top'),
            header = document.querySelector('header');
        if (Math.round(window.pageYOffset + 100) >=  document.body.clientHeight - document.documentElement.clientHeight) {
            if(!buttonScrollTop) {                
                const buttonScrollTop = document.createElement('div');
                buttonScrollTop.classList.add('scroll-top');
                buttonScrollTop.setAttribute('id', 'scroll-top');
                document.body.append(buttonScrollTop);
            }
            document.querySelector('#scroll-top').onclick = function() {
                header.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else {
            if(buttonScrollTop) {
                buttonScrollTop.remove();
            }
        }
    } // scrollTop END


});