/**
 * Created by apple on 14-10-13.
 */
var show_discount = function (goods, rules) {

    var finalGoods = [];
    for (var i = 0; i < goods.length; i++) {
        for (var j = rules.length; j >= 0; --j) {
            var toMatch = new RegExp(goods[i].name);
            if (toMatch.exec(rules[j].rule) != undefined) {
                finalGoods.push(goods[i]);
            }
        }
    }

//    return [
//        {
//            name: '可口可乐',
//            count: 10,
//            price: 3,
//            give: 3
//        },
//        {
//            name: '苹果',
//            count: 5,
//            price: 5.5,
//            give: 1
//        }
//    ];
//        kind:'饮料',
//        name:'可口可乐',
//        price:3,
//        unit:'瓶',
//        count: 10,
//        date: '2014年10月13日10:57:39',
//        other: []

//    rule: "(name == ‘可口可乐’ || name == “百事可乐”) && day < ‘15/10/2014’",
//        start: '03/09/2014',
//        end: '15/10/2014',
//        buy: 3,
//        give: 1

};
