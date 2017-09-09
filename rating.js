
(function() {
    'use strict';

    var Rate = (function () {
        
        var _starModel = {
            on: '&#9733',
            off: '&#9734'
        };

        var _events = [
            'click',
            'mouseover',
            'mouseout'
        ];
        
        var _defaultConfig = {
            target: 'rate',
            stars: 5,
            rate: 1,
            style: {
                'star-on': 'yellow',
                'star-off': 'grey',
                'star-size': '50px'
            }
        };
    
        function Rate(config) {
            this.config = _defaultConfig;
            this.init(config);
        }
    
        Rate.prototype.init = function(config) {
            var that = this;
            
            _events.forEach(function (event) {
                that.config[event] = undefined;
            });

            Object.keys(config).forEach(function (key, index) {
                if (that.config.hasOwnProperty(key)) {
                    that.config[key] = config[key];
                }
            });
    
            this._createStars();
        };

        Rate.prototype._active = function() {
            var rate = parseInt(this.config.rate);
            if (rate !== 'undefined') {
                var found = false;
                var stars = document.getElementsByClassName('star-rating');

                for (var i = 0; i < stars.length; ++i) {
                    var rating = parseInt(stars[i].getAttribute('data-rate'));
                    if (!found) {
                        stars[i].style.color = this.config.style['star-on'];
                        if (rating === rate) {
                            found = true;
                            stars[i].setAttribute('mark', 'true');
                        } else {
                            stars[i].removeAttribute('mark');
                        }
                        
                    } else {
                        stars[i].style.color = this.config.style['star-off'];
                        stars[i].removeAttribute('mark');
                    }
                }
            }
        };
        
        Rate.prototype._onClick = function(e) {
            e.preventDefault();
            var target = e.target,
                callback = this.config.click,
                rate = target.getAttribute('data-rate');

            this.config.rate = rate;
            if (callback) callback(target);

            this._active();
        };

        Rate.prototype._onMouseover = function(e) {
            e.preventDefault();
            var target = e.target,
                callback = this.config.mouseover,
                rate = parseInt(target.getAttribute('data-rate')),
                stars = document.getElementsByClassName('star-rating');
            
            var t = target.getAttribute('mark');
            if (t != null) {
                console.log(t);   
                return;
            }
            for (var i = 0; i < stars.length; ++i) {
                var rating = parseInt(stars[i].getAttribute('data-rate'));
                if (rating > rate) {
                    stars[i].style.color = this.config.style['star-off'];
                } else {
                    stars[i].style.color = this.config.style['star-on'];
                }
            }
            if (callback) callback(target);
        };

        Rate.prototype._onMouseout = function(e) {
            e.preventDefault();
            var target = e.target,
                callback = this.config.mouseout,
                stars = document.getElementsByClassName('star-rating');
            
            for (var i = 0; i < stars.length; ++i) {
                stars[i].style.color = this.config.style['star-on'];
            }
            if (callback) callback(target);

            this._active();
        };
    
        Rate.prototype._createStars = function() {
            var target = document.getElementById(this.config.target);

            if (target == null) return;
            
            for (var i = 0; i < this.config.stars; ++i) {
                var star = document.createElement('span');

                star.innerHTML = _starModel.on;

                star.style.color = this.config.style['star-on'];
                star.style.fontSize = this.config.style['star-size'];

                star.classList.add('star-rating');
    
                star.setAttribute('data-rate', i + 1);
    
                star.addEventListener('click', this._onClick.bind(this));
                star.addEventListener('mouseover', this._onMouseover.bind(this));
                star.addEventListener('mouseout', this._onMouseout.bind(this));
    
                target.appendChild(star);
            }

            this._active();
        };


        Rate.prototype.on = function(event, callback) {
            if (_events.indexOf(event) !== -1) {
                this.config[event] = callback;
            }
        };

        return Rate;
    })();

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
        module.exports = Rate;
    else
        window.Rate = Rate;
})();