(function(){
    var app = angular.module('Page', ['ngAnimate']);
    
    // navigation level 1 controller
    app.controller('NavigationController', function(){
        var self = this;
        self.menu = childrens;
        
        //this.showSearch = true;

        // behaviour for showing / hiding whole navigation
        self.clicked = function(){
            self.menu.show == false ? self.menu.show = true : self.menu.show = false;
        };
        


    });

    // navigation level 2 controller
    app.controller('NavigationControllerLevel', function(){
        var self = this;
        self.menu = childrenslvl;
        self.active = false;

        self.activeChange = function(){
            self.active == true ? self.active = false : self.active = true;
        }

        // behaviour for navigation leaf
        self.clicked = function(param){
            self.menu[param].show == false ? self.menu[param].show = true : self.menu[param].show = false;
        };

        // adds level 2 hooks / objects to show particular navigation leaf
        self.addnavielement = function(param){
            if((self.menu[param]==undefined) == true){
                self.menu[param] = {}
                self.menu[param].value = param;
                self.menu[param].show = false;
            }
        }
    });

    // level 1 show/hide status
    var childrens = {
        show: false
    }

    // level 2 elements group object
    var childrenslvl = [

    ]
    
    /*var pReviews = [

    ]*/
    
    app.controller('ReviewsController', function(){
        this.a = '';
        this.mod;
        var section = 0;
        

        this.getCount = function(count) {
            this.a = count;
        };
        
        this.section = function (id) {
            if(effect == undefined) {
                var effect = new Effect.Pulsate($$('.review')[0], { 
                pulses: 1, 
                duration: 0.16, 
                afterFinish: function() {
                    delete effect;               
                }
                })
            }
            section = id;   
        };

        this.is = function (id) {
            return section == id;
        };
    });

    app.controller('TabController', function(){
        this.tab = 1;

        this.setTab = function(newValue){
            this.tab = newValue;
        }

        this.isSet = function(tabName){
            return this.tab === tabName;
        }
    })
    
    var submenu = false;
    
    var filters = {
        show: false,
        active: false
    }
    
    var modalBox = {
        show: false,
        active: false
    }
    
    var modalBox2 = {
        show: false,
        active: false
    }
    
    var activeFilters;
    
    app.controller('MainBlockController', function(){
        this.countOfProducts = 0;
        this.subMenu == submenu;
        self = this;
        
        this.showSearch = true;
        
        self.modalBox = modalBox;
        self.modalBox2 = modalBox2;
        
        
        this.filters = filters;
     
        this.modalBoxOpen = function(value) {
            if(value == true) {
                self.modalBox.show = false;
            }
            self.modalBox.show == true ? self.modalBox.show = false : self.modalBox.show = true;
        }
        
        this.modalBoxOpen2 = function(value) {
            if(value == true) {
                self.modalBox2.show = false;
            }
            self.modalBox2.show == true ? self.modalBox2.show = false : self.modalBox2.show = true;
        }

        
        this.fillCntOfProducts = function(qty) {
            qty != null ? this.countOfProducts = qty : this.countOfProducts = 0;
        };
        
        this.checkMenu = function() {
            self.subMenu == true ? self.subMenu = false : self.subMenu = true;
        }
        
        this.checkFilters = function() {                   
            self.filters.show == true ? self.filters.show  = false : self.filters.show  = true;  
        }
        
        this.showFiltersAtStart = function() {
            if (activeFilters > 0)
                self.filters.show = true 
            else
                self.filters.show = false 
        }
        
        this.hideSearch = function() {
            this.showSearch = true;
        }
        
        this.SearchClick = function() {
            this.showSearch == false ? this.showSearch = true : this.showSearch = false;   
            // document.getElementById("search").focus();
            if(this.showSearch == false) {
                setTimeout(function(){
                    document.getElementById("search").focus();
                    $('search').fire('click');
                }, 1000);
            }
        }
    });
    
    app.controller('StarsController', function(){
        this.val = Array();
        this.isClicked = Array();
        this.checkStars = function(value,pos) {  
            this.val[pos] = value;
        }
        this.checkStarsLeave = function($i) { 
             if(this.isClicked[$i] == undefined)
                this.val[$i] = -1;
             else {
                this.val[$i] = this.isClicked[$i];
             }
        }
        this.clickOnThis = function($j, pos) {
            this.isClicked[$j] = pos;
        }
    })
    
    app.controller('CmsNavigation',function() {
        this.val = true;
        self = this;
        this.click = function() {  
            //console.log(self.val)
            self.val == true ? self.val  = false : self.val  = true;  
        }
    })
    
})();

