document.addEventListener("DOMContentLoaded", () => {

    VlSlider.setParameters("slider", {
        speed: 10,
        interval: 3,
        autoplay: true,
        pathToImage: 'images/',
        imageNames: [
            'avto-kovriki',
            'kovriki-evo',
            'kovrik',
            'kovriki-dlya-avto',
        ],
        content: [
            '<div class="slide__title slide-title slide-academician"><div class="slide-academician__price"><span class="slide-academician__old-price">2 790</span>2450 рублей</div><div class="slide-academician__ttl">удерживаем <span>старую цену</span></div><div class="slide-academician__subttl">Акция до 5 октября. Успей купить по старой цену.</div>',
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
    });

});