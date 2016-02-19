/**
 * Created by Keno on 2/19/2016.
 */
module.exports = {
    entry:"./js/App.js",
    output:{
        path:__dirname + "/static",
        filename:"bundle.js"
    },
    module:{
        loaders:[{
                test: /\.jsx?$/,
                loaders:['babel'],
                exclude:[/node_modules/]
            },
            {
                test: /\.jsx?$/,
                loaders:['babel'],
                exclude:[/node_modules/]
            }]
    }
};