(function($, w, d, de, db) {

    /* VARS */
    de = d.documentElement;
    db = d.body;

    var breakpoints = {sm: 576, md: 768, lg: 992, xl: 1200},
        api = 'https://api.reckon.ai/',
        templates = {};

    $('.js-shuffle-search').on('keyup', function (e) {
        var searchText = e.target.value.toLowerCase();

        if(searchText.length < 3){
            return;
        }

        $('.d-none').removeClass('d-none');

        $('section.active .aaa').each(function(e,t){
            var title = $(this).data('title');

            if(title.indexOf(searchText) === -1){
                console.log('nio');
                $(this).addClass('d-none');
            }
        })
    });

    function getBeer() {
        var beers = [];
        $.get(api + 'api/v1/priceUtils/catProducts?catName=cervejas', function(res) {
            for( i in res.data){
                if(res.data[i].Prices[0].updatedAt.indexOf('2017') === -1){
                    var timestamp = new Date(res.data[i].Prices[0].updatedAt);
                    res.data[i].timestamp = timestamp.getTime();
                    res.data[i].searchable = res.data[i].Product.name.toLowerCase();

                    beers.push(res.data[i])
                }

            }

            $('#beer').append(Mustache.render(templates['items'],  beers.sort(function (a, b) {
                return b.timestamp - a.timestamp;
            }), {item: templates['item']}));

        });
    }

    function getOlive() {
        var olives = [];

        $.get(api + 'api/v1/priceUtils/catProducts?catName=Tremoços,%20Azeitonas%20e%20Pickles', function(res) {
            for( i in res.data){
                if(res.data[i].Prices[0].updatedAt.indexOf('2017') === -1){
                    var timestamp = new Date(res.data[i].Prices[0].updatedAt);
                    res.data[i].timestamp = timestamp.getTime();
                    res.data[i].searchable = res.data[i].Product.name.toLowerCase();

                    olives.push(res.data[i])
                }
            }

            $('#olive').append(Mustache.render(templates['items'],  olives.sort(function (a, b) {
                return b.timestamp - a.timestamp;
            }), {item: templates['item']}));

        });
    }

    function getChips() {
        var chips = [];

        $.get(api + 'api/v1/priceUtils/catProducts?catName=Batatas%20Fritas%20e%20Aperitivos', function(res) {
            for( i in res.data){
                if(res.data[i].Prices[0].updatedAt.indexOf('2017') === -1){
                    var timestamp = new Date(res.data[i].Prices[0].updatedAt);
                    res.data[i].timestamp = timestamp.getTime();
                    res.data[i].searchable = res.data[i].Product.name.toLowerCase();

                    chips.push(res.data[i])
                }
            }

            $('#chips').append(Mustache.render(templates['items'],  chips.sort(function (a, b) {
                return b.timestamp - a.timestamp;
            }), {item: templates['item']}));

        });
    }

    function toggleLoading(evt) {
        $(de).toggleClass('loading', evt.type === 'ajaxStart');
    }

    function getStuff() {
        getBeer();
        getOlive();
        getChips();
    }

    /* EVENT LISTENERS */
    $(d).on('ajaxStart ajaxStop', toggleLoading);

    /* INIT */
    $('script[type="x-tmpl-mustache"]').each(function(idx, elm) {
        elm = $(elm);
        var template = elm.attr('data-template');
        templates[template] = elm.html();
        Mustache.parse(templates[template]);
        elm.remove();
    });

    !$(de).is('.not-found') && getStuff();

}(jQuery, window, document));
