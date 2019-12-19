const text = require('../libs/text');

module.exports = {

    existById: async (model, value, ...select) => {

        var response

        if (select.length > 0) {
            response = await model.findByPk(value, { attributes: select })
        } else {
            response = await model.findByPk(value)
        }

        if (!response) throw (text.notFoundElement)

        return response
    },

    toDecimal: (number, length) => {
        function pad(input, length, padding) {
            var str = input + "";
            return (length <= str.length) ? str : pad(str + padding, length, padding);
        }
        var str = number + "";
        var dot = str.lastIndexOf('.');
        var isDecimal = dot != -1;
        var integer = isDecimal ? str.substr(0, dot) : str;
        var decimals = isDecimal ? str.substr(dot + 1) : "";
        decimals = pad(decimals, length, 0);
        return integer + '.' + decimals;
    },

    arr_diff: (a1, a2) => {

        var a = [], diff = [];

        for (var i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
        }

        for (var i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
        }

        for (var k in a) {
            diff.push(k);
        }

        return diff;
    },

    updateOrCreate: (model, where, newItem, beforeCreate) => {
        // Try to find record using findOne
        return model
            .findOne({ where })
            .then(item => {
                if (!item) {
                    // Item doesn't exist, so we create it

                    // Custom promise to add more data to the record
                    // Being saved (optional)
                    model.create(newItem)
                        .then(item => ({
                            item, created: true
                        }, beforeCreate()))
                }

                // Item already exists, so we update it
                return model
                    .update(newItem, { where: where })
                    .then(item => ({ item, created: false }))
            })
    }
}