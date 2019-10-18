

module.exports = {

    existById: async (model, value) => {

        const response = await model.findOne({ where: { id: value } })

        if (!response) {
            throw("No existe el elemento.");
        }
        return response
    },

    toDecimal: (number, length) => {
        function pad(input, length, padding) { 
            var str = input + "";
            return (length <= str.length) ? str : pad(str + padding, length, padding);
        }
        var str = number+"";
        var dot =  str.lastIndexOf('.');
        var isDecimal = dot != -1;
        var integer = isDecimal ? str.substr(0, dot) : str;
        var decimals = isDecimal ? str.substr(dot+1)  : "";
        decimals = pad(decimals, length, 0);
        return integer + '.' + decimals;
    }

}