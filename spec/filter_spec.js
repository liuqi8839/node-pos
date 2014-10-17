describe("pos", function () {

    beforeEach(function () {
        init_goods();
        init_rules();
    });

    afterEach(function () {
        localStorage.clear();
    });

    it("should show discounted goods which conform to the rules", function () {

        var rules = JSON.parse(localStorage.rules);
        var goods = JSON.parse(localStorage.goods);
        var show = show_discount(goods, rules);
//        expect(show[0]).toBe("&&");
//        expect(show[1]).toBe("name");

        expect(show.length).toBe(2);
        expect(show[0].name).toBe('可口可乐');
        expect(show[0].count).toBe(10);
        expect(show[0].price).toBe(3);
        expect(show[0].give).toBe(3);
    });
});