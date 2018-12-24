/**
 * created by LynnZhang on 2018/12/23
 */
var factories = {};
function define(moduleName, dependencies, factory) {
    factory.dependencies = dependencies;
    factories[moduleName] = factory;
}
function require(mods, callback) {
    var results = mods.map(function(mod) {
        var factory = factories[mod];
        var dependencies = factory.dependencies;
        var exports;
        require(dependencies, function() {
            exports = factory.apply(null, arguments)
        })
        return exports
    });
    callback.apply(null, results);
}
define('a', [], function() {
    return 'a';
});

define('b', ['a'], function(a) {
    return a + '-->' + 'b';
})
require(['b'], function(str) {
    console.log(str);
})
