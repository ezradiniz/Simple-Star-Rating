<img src="assets/star.png" align="right" height="40" />

Simple Star Rating
==========

A simple star rating library

### Usage
Load the library in your header
```html
<script src="rating.js"></script>
```

### Running
Initialize the library on your page
```html
<div id="myStarRate"></div>

<script>
    var rate = new Rate({
        target: 'myStarRate' // Required
    });
</script>

```

### Options
* **stars** - Number of Stars
* **rate** - Initial star rating
* **style** - (*star-on*, *star-off*, *star-size*) - Style of Star

```html
<script>
    var rate = new Rate({
        target: 'myStarRate',
        stars: 5,
        rate: 1,
        style: {
            'star-on': 'yellow',
            'star-off': 'grey',
            'star-size': '30px'
        }
    });
</script>
```

### Events
* click
* mouseover
* mouseout

```html
<script>

    // First Option:

    var rate = new Rate({
        click: function (target) {},
        mouseover: function (target) {},
        mouseout: function (target) {},
    });

    // Second Option:

    rate.on('click', function (target) {
        console.log('Click !');
    });

    rate.on('mouseover', function (target) {
        console.log('Mouseover !');
    });

    rate.on('mouseout', function (target) {
        console.log('Mouseout !');
    });

</script>
```

### License
This project is licensed under the MIT - see the [LICENSE](LICENSE) file for details