(function($, w, d, de, db) {

    /* VARS */
    de = d.documentElement;
    db = d.body;

    var breakpoints = {sm: 576, md: 768, lg: 992, xl: 1200},
        api = 'https://api.reckon.ai/',
        templates = {};

    function getBeer() {
        $.get(api + 'api/v1/priceUtils/catProducts?catName=cervejas', function(res) {
            console.log(res.data);

            for( i in res.data){
                var timestamp = new Date(res.data[i].Prices[0].updatedAt);
                res.data[i].timestamp = timestamp.getTime();
            }

            $('#beer').html(Mustache.render(templates['items'],  res.data.sort(function (a, b) {
                return b.timestamp - a.timestamp;
            }), {item: templates['item']}));
        });
    }

    function getOlive() {
        $.get(api + 'api/v1/priceUtils/catProducts?catName=Tremoços,%20Azeitonas%20e%20Pickles', function(res) {
            for( i in res.data){
                var timestamp = new Date(res.data[i].Prices[0].updatedAt);
                res.data[i].timestamp = timestamp.getTime();
            }

            $('#olive').html(Mustache.render(templates['items'],  res.data.sort(function (a, b) {
                return b.timestamp - a.timestamp;
            }), {item: templates['item']}));
        });
    }

    function getChips() {
        $.get(api + 'api/v1/priceUtils/catProducts?catName=Batatas%20Fritas%20e%20Aperitivos', function(res) {
            for( i in res.data){
                var timestamp = new Date(res.data[i].Prices[0].updatedAt);
                res.data[i].timestamp = timestamp.getTime();
            }

            $('#chips').html(Mustache.render(templates['items'],  res.data.sort(function (a, b) {
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
