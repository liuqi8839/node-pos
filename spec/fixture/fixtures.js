function init_goods() {
    var goods = [
        {
            kind:'饮料',
            name:'可口可乐',
            price:3,
            unit:'瓶',
            count: 10,
            date: '2014年10月13日10:57:39',
            other: []
        }, {
            kind:'饮料',
            name:'雪碧',
            price:3,
            unit:'瓶',
            count: 3,
            date: '2014年10月13日10:57:50',
            other: { "attrName" : "生产日期", "attrValue" : "1982/12/05" }
        }, {
            kind:'水果',
            name:'苹果',
            price:5.5,
            unit:'斤',
            count: 5,
            date: '2014年10月13日10:57:50',
            other: { "attrName" : "生产日期", "attrValue" : "1982/12/06" }
        }, {
            kind:'水果',
            name:'荔枝',
            price:15,
            unit:'斤',
            count: 3,
            date: '2014年10月13日10:57:50',
            other: { "attrName" : "生产日期", "attrValue" : "1982/12/06" }
        }, {
            kind:'生活用品',
            name:'电池',
            price:2,
            unit:'个',
            count: 3,
            date: '2014年10月13日10:57:50',
            other: { "attrName" : "生产日期", "attrValue" : "1982/12/06" }
        }, {
            kind:'食品',
            name:'方便面',
            price:4.5,
            unit:'袋',
            count: 3,
            date: '2014年10月13日10:57:50',
            other: { "attrName" : "生产日期", "attrValue" : "1982/12/05" }
        }
    ];

    localStorage.goods = JSON.stringify(goods);
}

function init_rules() {
    var rules = [
        {
            rule: "name == ‘方便面’ && day < ‘4/9/2014’",
            start: '03/09/2014',
            end: '15/10/2014',
            buy: 3,
            give: 1
        }, {
            rule: "(name == ‘可口可乐’ || name == “百事可乐”) && day < ‘15/10/2014’",
            start: '03/09/2014',
            end: '15/10/2014',
            buy: 2,
            give: 1
        }, {
            rule: "name == ‘苹果’",
            start: '03/09/2014',
            end: '15/10/2014',
            buy: 3,
            give: 1
        }
    ];
    localStorage.rules = JSON.stringify(rules);
}