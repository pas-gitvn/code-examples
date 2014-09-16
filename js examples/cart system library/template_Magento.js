// js and prototype.js

document.observe("dom:loaded", function() {
    storeObj.initialize();
});

var storeObj = {
    // global parameters
    chosenProductSelect: [],
    // chosenProductSelect important to manage chosen in product view
    parameters: {
        // add parameters like global variables here
        // for example productTabCounter: 0
    },
    initialize: function(){
        this.globalFunctions();
        this.home();
        this.category();
        this.product();
        this.cart();
        this.checkout();
        this.cms();
        this.contacts();
        this.customer();
        this.reviewList();
        this.solrResult();
    },
    globalFunctions: function(){
        // global functions
        this.startMenu();
    },
    startMenu: function() {
        return new ProtoFish('nav', '500', 'hover', false, true, true)
    },
    home: function(){
        if($$('.cms-index-index')[0]!=null){
            // home functions
        }
    },
    category: function(){
        if($$('.catalog-category-view')[0]!=null){            
            var hidden = $$('.show-more');
            hidden.each(function(s) {
                s.observe("click", function(event) {
                  var less = s.down('a').readAttribute('data-less');
                  var more = s.down('a').readAttribute('data-more');
                  if(s.hasClassName('show')) {
                      s.removeClassName('show');
                      s.up(0).childElements()
                      .each(function(e, index) {
                          if(index == 0 || index == 1 || index == 2)
                             e.show()
                          else
                            e.hide();
                      })
                      s.show();
                      s.down('a').innerHTML = more;
                  }
                  else {
                      s.addClassName('show');
                      s.down('a').innerHTML = less;
                      s.up(0).childElements()
                      .each(function(e) {
                          e.show();
                      })
                  }
                })
            })
            
        }
    },
    product: function(){
        var self = this;
        if($$('.catalog-product-view')[0]!=null){
            // product functions            
            reviewForm();
            watchProductViewTabs();
            productBar();
            replaceFormRatingStars();
            showCalc();
            taxDetails();
            startScroller();
            addGap();
            if($$('.floor-product-configurable')[0] != undefined){
                var config = new ProductCNF($$('.btn-cart2')[0]);
            }

            if($$('.floor-product-grouped')[0] != undefined) {
                if($$('.qty').length > 1) {
                    var prodGRP = new ProductGRP($$('.product-value-up', '.product-value-down'), 'product-value-up', $('final-price-2'), null , $$('.btn-cart2')[0])
                }
                else if($$('.qty').length == 1) {
                    var prodSNGL = new ProductGRP($$('.product-value-up', '.product-value-down'), 'product-value-up', $('final-price-3'), null , $$('.btn-cart2')[0])
                }
            }
            if($$('select').length > 0) {
                $$('select').each(function(simple) {
                        self.chosenProductSelect.push(new Chosen(simple, {disable_search: true, width: "190px"}))
                        simple.setStyle({ display: 'inline-block'})
                })
                Ajax.Responders.register({
                        onComplete: function() {
                            $$('select').each(function(simple) {
                                Event.fire(simple, "chosen:updated");
                            })
                    }
                })
                $$('select').invoke('observe', 'change' ,function() {
                        $$('select').each(function(simple) {
                                Event.fire(simple, "chosen:updated");
                        })
                })
            }
        }
    },
    cart: function(){     
        if($$('.checkout-cart-index')[0]!=null){
            if($$('.event-up, .event-down').length > 0) {
                $$('.event-up, .event-down').each(function(s) {
                  s.observe('click',function() {
                     ipt = this.up(0).down('input');
                     if(this.hasClassName('event-down')) {
                         if(ipt.value > 0) 
                         ipt.value--;
                     }
                     else 
                        ipt.value++;
                  })
                })
            }
        }
    },
    reviewList: function(){
        if($$('.reviewslist-index-index')[0]!=null){
            if($$('select').length > 0) {
                $$('select').each(function(simple) {
                        new Chosen(simple, {disable_search: true, width: "170px"}); 
                })              
            }
        }
    },
    solrResult: function(){
        if($$('.solrsearch-index-index')[0]!=null){
            if($$('select').length > 0) {
                $$('select').each(function(simple) {
                        new Chosen(simple, {disable_search: true, width: "170px"}); 
                })              
            }
        }
    },
    checkout: function(){
        if($$('.onestepcheckout-index-index')[0]!=null){
            if($$('select').length > 0) {
                $$('select').each(function(simple) {
                        new Chosen(simple, {disable_search: true, width: "100%"}); 
                })              
            }
        }
    },
    cms: function(){
        if($$('.cms-page-view')[0]!=null){
           //cmsMenu();
        }
    },
    contacts: function() {
    	if($$('.contacts-index-index')[0] != null) {
    		//cmsMenu();
            new ModalBox;
            if($$('select').length > 0) {
                $$('select').each(function(simple) {
                        new Chosen(simple, {disable_search: true, width: "100%"}); 
                })              
            }
        }
    },
    customer: function() {
    	if($$('.customer-account-create')[0]!=null || $$('.customer-address-form')[0]!=null) {
    	   if($$('select').length > 0) {
                $$('select').each(function(simple) {
                    new Chosen(simple, {disable_search: true, width: "320px"}); 
                })            
            }    		
    	}
        if($$('.customer-account-edit')[0]!=null) {
           function test() {
                console.log(test);
           }
    	   if($$('select').length > 0) {
                $$('select').each(function(simple) {
                    new Chosen(simple, {disable_search: true, width: "336px"});                          
                })      
                $('euvat_select_vatprefix_chosen').setStyle({display: 'block'});                
            }    		
    	}
    }
}




// ****************** FUNCTIONS ********************** //
// ***************** Product View ******************** //

function productBar(){
    // if there is a realated block there available
    if($$('.block-related')[0]!=null){
        $$('.product-right-info')[0].addClassName('insbox');
    }

    Event.observe(document, 'scroll', function(){
        if(document.body.getHeight()-(document.viewport.getHeight()+document.viewport.getScrollOffsets().top) < 290) {
            $$('.product-right-info')[0].addClassName('notfixed');
        }
        else {
            $$('.product-right-info')[0].removeClassName('notfixed');
        }
    });
}

function watchProductViewTabs(){
    if ($$('.box-description')[0] == undefined) {
        return true;
    }
    $$('.box-description').invoke('hide');
    $$('.info-box').invoke('show');

    $$('.desc-menu h3').invoke('observe',
        'click', function () {
            if($(this).readAttribute('id')!='desc-h3-4'){
                $$('.desc-menu h3').invoke("removeClassName", "active");
                $(this).addClassName('active');
            }
            var attribute = $(this).readAttribute('id');
            switch (attribute) {
                case 'desc-h3-1':
                    $$('.box-description').invoke('hide');
                    $$('.info-box').invoke('show');
                    break;
                case 'desc-h3-2':
                    $$('.box-description').invoke('hide');
                    $$('.technical-box').invoke('show');
                    break;
                case 'desc-h3-3':
                    $$('.box-description').invoke('hide');
                    $$('.review-rating-box').invoke('show');
                    break;
                case 'desc-h3-4':
                    //$$('.box-description').invoke('hide');
                    break;
                default:
                    break;
            }
        });
}

function reviewForm(){
    if($('add-review-form')){
        rev_form = $('add-review-form');
        $$('body')[0].insert(rev_form);
        window.reviewModal = new Control.Modal($('add-review-form'),{
            overlayOpacity: 0.75
            ,className: 'modal'
            ,fade: true
            ,closeOnClick: false
            ,height: 610
            ,width: 470
        });
        $$('a[href=#add-review-form], .rating-box-loader').invoke('observe', 'click', function(e) {
            e.preventDefault();
            reviewModal.open();
        });
        $$('#add-review-form p.close a, #control_overlay').invoke('observe', 'click', function(e) {
            e.preventDefault();
            reviewModal.close();
        });

        rev_form2 = $('show-review-form');
        $$('body')[0].insert(rev_form2);
        window.showReviewModal = new Control.Modal($('show-review-form'),{
            overlayOpacity: 0.75
            ,className: 'modal'
            ,fade: true
            ,closeOnClick: false
            ,height: 580
            ,width: 470
        });
        $$('.show-form').invoke('observe', 'click', function(e) {
            e.preventDefault();
            showReviewModal.open();
            var st = setTimeout(startScroller,2000);
        });
        $$('#show-review-form p.close a, #control_overlay').invoke('observe', 'click', function(e) {
            e.preventDefault();
            showReviewModal.close();
        });
        if (location.href.indexOf("#") != -1) {
            reviewModal.open();
        }
    };
}

// ------------------------------------------------------------------------------------------------
// change ugly radio buttons to stars in review form, starts in catalog/product/view.phtml
// the script is prepared for clean js + prototype, original version is jquery ui stars replacement
// written by pas
// ------------------------------------------------------------------------------------------------
function replaceFormRatingStars(){
    var inputsList = document.getElementsByTagName('input');
    for(var i=0; i<inputsList.length;i++){
        if(inputsList[i].getAttribute('class')==='radio'){
            //turn off inputs
            inputsList[i].style.display='none';
            //get value
            var myvalue = inputsList[i].getAttribute('value');
            //create a
            var mya = document.createElement('a');
            //set id for input
            inputsList[i].setAttribute('id','radio-original-'+myvalue);
            //set id for a
            mya.setAttribute('id','radio-replace-'+myvalue);
            //create text
            var myatxt = document.createTextNode(myvalue);
            //combine
            mya.appendChild(myatxt);
            //append a to parent node
            var parent = inputsList[i].parentNode;
            parent.appendChild(mya);
        }
    }

    $$('.radio+a').invoke('observe','click',function(){
        var check = $(this).innerHTML;
        var suffix = Math.ceil(parseInt(check)/5);
        var iList = document.getElementsByTagName('input');
        for(var i=0; i<iList.length; i++){
            if(iList[i].getAttribute('class')==='radio' || iList[i].getAttribute('class')==='radio validation-passed'){
                try{
                    if(iList[i].getAttribute('value')===check){
                        for(var j=1; j<6; j++){
                            var idValue = 'radio-original-'+(j+((suffix-1)*5));
                            $(idValue).removeAttribute('checked');
                            var saidValue = 'radio-replace-'+(j+((suffix-1)*5));
                            $(saidValue).removeClassName('active-form-input');
                            $(saidValue).removeClassName('hover-form-input');
                        }
                        for(var k=parseInt(check);;--k){
                            var aidValue = 'radio-replace-'+k;
                            $(aidValue).addClassName('active-form-input');
                            if(k%5==1) break;
                        }
                        iList[i].setAttribute('checked','checked');
                    }
                }catch(err){
                }

            }
        }
    })

    $$('.radio+a').invoke('observe','mouseover',function(){
        var check = $(this).innerHTML;
        var suffix = Math.ceil(parseInt(check)/5);
        var iList = document.getElementsByTagName('input');
        for(var i=0; i<iList.length; i++){
            if(iList[i].getAttribute('class')==='radio' || iList[i].getAttribute('class')==='radio validation-passed'){
                try{
                    if(iList[i].getAttribute('value')===check){
                        for(var j=1; j<6; j++){
                            var saidValue = 'radio-replace-'+(j+((suffix-1)*5));
                            $(saidValue).removeClassName('hover-form-input');
                        }
                        for(var k=parseInt(check);;--k){
                            var aidValue = 'radio-replace-'+k;
                            $(aidValue).addClassName('hover-form-input');
                            if(k%5==1) break;
                        }
                    }
                }catch(err){
                }

            }
        }
    })

    $$('#product-review-table tr').invoke('observe','mouseout',function(){
        var iList = document.getElementsByTagName('input');
        for(var i=0; i<iList.length; i++){
            try{
                var saidValue = 'radio-replace-'+(i+1);
                $(saidValue).removeClassName('hover-form-input');
            }catch(err){
            }
        }
    })
}

var ProductCNF = Class.create();

ProductCNF.prototype = {
    btnClass: null,
    initialize: function(btnClass) {

        this.btnClass = btnClass;
        var self = this;

        $$('.product-value-up', '.product-value-down').each(function(s) {
            s.observe('click',function(event) {

                if( s.hasClassName('product-value-up') ) {

                    if(self.btnClass != undefined) {
                        if(self.btnClass.disabled)
                            self.btnClass.disabled = false;
                    }
                    s.up().down('input').value++;
                    if($$('.floor-product-simple')[0] != undefined && $('qty_calculator') != undefined) {
                        self.doValidate(event);
                    }
                }
                else {
                    if(s.up().down('input').value > 1) {
                        s.up().down('input').value--;
                        if($$('.floor-product-simple')[0] != undefined && $('qty_calculator') != undefined) {
                            self.doValidate(event);
                        }
                    }
                }

                if (typeof optionsPrice != "undefined") {
                    optionsPrice.reload()
                }

            })
        })

        $('product-value-qty').observe('keydown',function(event) {

            self.doValidate(event);
            self.enableButton();

        })

        $('product-value-qty').observe('keyup',function(event) {

            self.doValidate(event);
            self.enableButton();

        })

        $('product-value-qty').observe('blur',function(event) {

            self.doValidate(event);
            self.enableButton();

        })

        $('product-value-qty').observe("contextmenu",function(event) {

            event.stop()

        })

    },
    enableButton: function() {
        try {
            if($('product-value-qty').value > 0) {
                this.btnClass.disabled = false;
            }
            else {
                this.btnClass.disabled = true;
            }
        }
        catch(e) {
            console.log(e);
        }
    },
    doValidate: function(event) {

        if($('product-value-qty').value.length == 0)
            $('product-value-qty').value = 0;

        if(event.type == 'blur')  {
            $('product-value-qty').value = parseInt($('product-value-qty').value);
        }

        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9) {

        }
        else if(event.keyCode >= 37 && event.keyCode <= 40) {

        }
        else {
            if($$('.floor-product-simple')[0] != undefined && $('qty_calculator') != undefined) {
                qty = $('product-value-qty').value;
                priceFiled = $$('.regular-price span')[0];
                finestPrice = qty * simplePROD.price;
                finestPrice = ( Math.round(finestPrice * 100) )/100;
                finestPrice = finestPrice.toFixed(2);
                //finestPrice = finestPrice.replace('.',',');
                finestPrice = finestPrice.split('.');
                //priceFiled.innerHTML = finestPrice + ' ' + simplePROD.currency;
                priceFiled.innerHTML = finestPrice[0] +'<label>' + finestPrice[1] + '</label>' + ' ' + simplePROD.currency;
            }
            event.stop();
        }

        if (typeof optionsPrice != "undefined") {
            optionsPrice.reload()
        }
    }
}

var ProductGRP = Class.create();

ProductGRP.prototype = {
    btnClass: null,
    cur: '\u20AC',
    box: null,
    price: 0,
    PRICES: [],
    initialize: function(elems, classup, box, cur, btnClass) {

        var elems = elems;

        var classup = classup;

        this.PRICES = arrayGprs;

        this.btnClass = btnClass;

        this.box = box;

        if(cur != null)
            this.cur = cur;
        else
            this.cur = this.cur;

        var self = this;
        self.doCalc();

        if(this.PRICES.length > 1) {
            try {
                this.btnClass.disabled = true
            }
            catch(e) {
                console.log(e)
            }
        }

        $$('.qty').each(function(s) {

            s.observe('keydown',function(event) {

                self.doValidate(event);

            })

            s.observe('keyup',function(event) {

                self.doValidate(event);

            })

            s.observe('blur',function(event) {

                self.doValidate(event);

            })

            s.observe("contextmenu",function(event) {

                event.stop()

            })
        })

        elems.each(function(s) {
            s.observe('click',function(event) {

                if( s.hasClassName(classup) ) {
                    s.up().down('input').value++;
                    self.doCalc();
                }
                else {
                    if(s.up().down('input').value != 0) {
                        s.up().down('input').value--;
                        self.doCalc();
                    }
                }

            })
        })

        for(var i = 2; i<4; i++){
            if($('final-price-'+i) != null){
                if(parseInt($('final-price-'+i).innerHTML) == 0){
                    $('final-price-'+i).addClassName('dis');
                }else{
                    if($('final-price-'+i).hasClassName('dis')){
                        $('final-price-'+i).removeClassName('dis');
                    }
                }
            }
        }

    },
    doCalc: function() {

        var self = this;
        var price = 0;
        var qty = 0;

        $$('.qty').each(function(s,index) {

            if(s.value.length == 0)
                s.value = 0;

            //s.value = parseInt(s.value);

            price = price + ( parseInt(s.value) * self.PRICES[index] );

            qty = qty + parseInt(s.value);

        })

        price = ( Math.round(price * 100) )/100;

        price = price.toFixed(2);

        this.price = price;

        self.changePrice();

        //additionals

        if($$('.qty-s')[0] != null)
            $$('.qty-s')[0].down('span').innerHTML = qty;

        try {
            if(price > 0) {
                this.btnClass.disabled = false;
            }
            else {
                this.btnClass.disabled = true;
            }
        }
        catch(e) {
            console.log(e);
        }

    },
    doValidate: function(event) {

        if(event.type == 'blur')  {
            $$('.qty').each(function(s,index) {
                s.value = parseInt(s.value);
            })
        }

        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9) {
            //if($('product-value-qty') != undefined)
            this.doCalc();
        }
        else if(event.keyCode >= 37 && event.keyCode <= 40) {

        }
        else {
            event.stop();
        }

    },
    changePrice: function() {

        if(this.box != undefined) {
            if(this.box.disabled) {
                this.box.disabled = false;
            }
            //this.price = this.price.replace('.',',');
            this.price = this.price.split('.');

            if($('final-price-box3') != null){
                var obj = $$('#final-price-box3 .price')[0];
                obj.innerHTML = this.price[0] +'<label>' + this.price[1] + '</label>' + ' ' + this.cur;
            }
            if($('final-price-box2') != null){
                var obj = $$('#final-price-box2 .price')[0];
                console.log('test');
                obj.innerHTML = this.price[0] +'<label>' + this.price[1] + '</label>' + ' ' + this.cur;
            }

            for(var i = 2; i<4; i++){
                if($('final-price-'+i) != null){
                    if(parseInt($('final-price-'+i).innerHTML) == 0){
                        $('final-price-'+i).addClassName('dis');
                    }else{
                        if($('final-price-'+i).hasClassName('dis')){
                            $('final-price-'+i).removeClassName('dis');
                        }
                    }
                }
            }

        }

    }
}

// magiczoom behaviour
// fired in magic zoom's bottom template

var timer;
var firing = false;

function gotoR() {
    console.log(firing);
    if(firing)
        return;
    firing = true;

    timer = setTimeout(function() {
        Effect.Pulsate($('leftL'), { pulses: 1, duration: 0.3 });
        Effect.Pulsate($('rightR'), { pulses: 1, duration: 0.3 });
        var elem = new Array()
        $$('.MagicToolboxSelectorsContainer a.MagicThumb-swap').each(function(s) {
            if(s.hasClassName('hidden-selector')) {

            }
            else {
                elem.push(s)
            }
        })
        var a = elem[0]
        elem[0].remove()
        a.setStyle({width: '69px'});
        $$('.MagicToolboxSelectorsContainer')[0].insert({
            bottom: a
        });
        firing = false;
    }, 200);
}

function gotoL() {
    console.log(firing);
    if(firing)
        return;
    firing = true;

    timer = setTimeout(function() {
        Effect.Pulsate($('leftL'), { pulses: 1, duration: 0.3 });
        Effect.Pulsate($('rightR'), { pulses: 1, duration: 0.3 });
        var elem = new Array()
        $$('.MagicToolboxSelectorsContainer a.MagicThumb-swap').each(function(s) {
            if(s.hasClassName('hidden-selector')) {

            }
            else {
                elem.push(s)
            }
        })
        var a = elem[0]
        var last = elem.last()
        elem.last().remove();
        $$('.MagicToolboxSelectorsContainer')[0].insert({
            top: last
        });
        firing = false;
    }, 200);
}

// show calculator for product which can be purchased in packets

function showCalc(){
    if($$('.show-calc')[0] != null){
        $$('.show-calc')[0].observe('click',function(){
            $('qty_calculator').show();
        });
        $('close-calc').observe('click',function(){
            $('qty_calculator').hide();
        })
    }
}

// scrollbar for review box

function startScroller(){
    var scrollbar = new Control.ScrollBar('scrollbar_content','scrollbar_track');
}

// open shipping modal box

function taxDetails(){
    shippingModal = new Control.Modal($('shipping_cost'),{
        overlayOpacity: 0.5
        ,className: 'modal-shipping'
        ,fade: true
        ,closeOnClick: false
        ,height: 400
        ,width: 600
    });
    
    $$('.tax-details').each(function(s) {
        s.observe('click',function() {
            shippingModal.open();
        })
    })

    $$('.closex').each(function(s) {
        s.observe('click',function() {
            shippingModal.close();
        })
    })
}

function addGap(){
    if($$('#product-options-wrapper select').length > 1) {
        firstElem = $$('#product-options-wrapper select')[0];
        secondElem = $$('#product-options-wrapper select')[1];
        if(firstElem.id == "attribute146") {
            if(secondElem.disabled) {
                secondElem.up(0).addClassName('gap')
            }
        }
    }
}

// ***************** End of Product View ******************** //

// ***************** Category Page ************************** //

function slideThumbs(event) {
           var eventDir = event.target.className;
           var ulItem = event.target.next('ul');
           var liItems = ulItem.select('li')
           if(eventDir == 'left'){
             if(liItems[0].hasClassName('current')) {
                
             }
             else {
                liItems.find(function(n) {    
                    if(n.hasClassName('current') && n.previousElementSibling != null) {
                            n.removeClassName('current');
                            n.previousElementSibling.addClassName('current');
                    }   
                })
               new Effect.Move(ulItem, { x: 38, y: 0, duration: 0.1 })
             }
           }
           else {
             if(liItems[liItems.length-1].hasClassName('current')) {
               
             }
             else {
                liItems.find(function(n, index) {   
                    if(index == liItems.length-7) {    
                        return true;
                    }
                    else {
                        if(n.hasClassName('current') && n.nextElementSibling != null) { 
                                n.removeClassName('current');
                                n.nextElementSibling.addClassName('current');
                                new Effect.Move(ulItem, { x: -38, y: 0, duration: 0.1 })
                                return true;
                        } 
                    }  
                })        
             }
           }
}
// ***************** End of Category Page ******************* //


var ModalBox = Class.create();

ModalBox.prototype = {
    initialize: function() {
        var there = this;
        var my_div = document.createElement('div');
        var my_button = document.createElement('div');
        var my_button_in = document.createElement('button');
        my_button_in.id = 'close';
        my_button_in.addClassName('button');
        my_button_in.innerHTML = '<span><span>ok</span></span>';
        my_button.insert({bottom: my_button_in});
        var my_title = document.createElement('h2');
        my_title.innerHTML = 'Betreff';
        var pe = document.createElement('p');
        my_div.insert({bottom: pe, top: my_title });
        my_div.insert({bottom: my_button});
        my_div.id = 'modal-box';
        $$('body')[0].insert({bottom: my_div});

        var modal = new Control.Modal($('modal-box'),{
            overlayOpacity: 0.75,
            className: 'modal',
            fade: true
        });


        $('betreff').observe('change', function(s) {
            $$('#betreff option').each(function(o, index){
                if(o.selected == true && index != 0) {
                    there.fillModal(o.readAttribute('data-content'), my_div, modal)
                }
            });
        })
        $$('#modal-box h2')[0].observe('click', function() {
            modal.close();
        })
        $$('#modal-box button')[0].observe('click', function() {
            modal.close();
        })
    },
    fillModal: function($stuff, $div, $modal) {
        $div.down('p').innerHTML = $stuff;
        $modal.open();

        if( (!!navigator.userAgent.match(/Trident.*rv\:11\./)) == true || navigator.appVersion.indexOf("MSIE 10") === 17) {
            $$('iframe').each(function(s) {
                s.remove();
            })
        }

    }

}