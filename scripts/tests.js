(function(window) {
    'use strict';


    QUnit.test('DataStore Test', function(assert) {

        var App = window.App || {};
        var ds = new App.DataStore();
        ds.add('m@bond.com', 'tea');
        ds.add('james@bond.com', 'eshpressho');

        assert.equal(ds.get('m@bond.com'), 'tea', 'm@bond.com check');
        assert.equal(ds.get('james@bond.com'), 'eshpressho', 'james@bond.com check');

        ds.remove('james@bond.com');
        assert.ok(ds.get('james@bond.com') == null, 'james@bond.com check');

        ds.get('m@bond.com');
        assert.equal(ds.get('m@bond.com'), 'tea', 'm@bond.com check');
    });


    // printOrders() did not return a value.
    // The Truck module was modified so that the printOrders() method returns
    // every order within the DataStore. This allows the output to be compared.

    QUnit.test('Truck Test', function(assert) {

        var App = window.App || {};
        var Truck = App.Truck;
        var DataStore = App.DataStore;

        var myTruck = new Truck('ncc-1701', new DataStore());

        myTruck.createOrder({
            emailAddress: 'me@goldfinger.com',
            coffee: 'double mocha'
        });
        myTruck.createOrder({
            emailAddress: 'dr@no.com',
            coffee: 'decaf'
        });
        myTruck.createOrder({
            emailAddress: 'm@bond.com',
            coffee: 'earl grey'
        });


        assert.deepEqual(myTruck.printOrders(), {
            'dr@no.com': {
                'coffee': 'decaf',
                'emailAddress': 'dr@no.com'
            },
            'm@bond.com': {
                'coffee': 'earl grey',
                'emailAddress': 'm@bond.com'
            },
            'me@goldfinger.com': {
                'coffee': 'double mocha',
                'emailAddress': 'me@goldfinger.com'
            }
        }, 'myTruck - after createOrder()');

        myTruck.deliverOrder('dr@no.com');
        myTruck.deliverOrder('m@bond.com');

        assert.deepEqual(myTruck.printOrders(), {
            'me@goldfinger.com': {
                'coffee': 'double mocha',
                'emailAddress': 'me@goldfinger.com'
            }
        }, 'myTruck - after deliverOrder()');

    });
})(window);
