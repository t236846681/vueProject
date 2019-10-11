var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var isDone = false; // 布尔
var decLiteral = 6; // 数字
var sName = "bob is so " + isDone; // 字符串
var list = [1, 2, 3]; // 数组
var list2 = [1, 2, 3];
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Black"] = 3] = "Black";
})(Color || (Color = {}));
; // 枚举
var c = Color.Black;
var notSure = 4;
notSure = 'not';
function createSquare(config) {
    var newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "black" });
var myArray;
myArray = ["Bob", "Fred"];
var myStr = myArray[0];
// console.log(myStr);
var Animal = /** @class */ (function () {
    function Animal(theName) {
        this.name = theName;
    }
    Animal.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log(this.name + " moved " + distanceInMeters + "m.");
    };
    return Animal;
}());
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 5; }
        console.log("Slithering...");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Snake;
}(Animal));
var Horse = /** @class */ (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        return _super.call(this, name) || this;
    }
    Horse.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 45; }
        console.log("Galloping...");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Horse;
}(Animal));
var sam = new Snake("Sammy the Python");
var tom = new Horse("Tommy the Palomino");
sam.move();
tom.move(34);
var Chicken = /** @class */ (function () {
    function Chicken(cPower) {
        this.power = cPower;
    }
    Chicken.prototype.usePower = function () {
        console.log("u can " + this.power);
    };
    return Chicken;
}());
var ck = new Chicken('jump');
ck.usePower();
var FireChicken = /** @class */ (function (_super) {
    __extends(FireChicken, _super);
    function FireChicken(cPower) {
        return _super.call(this, cPower) || this;
    }
    FireChicken.prototype.userNewPower = function () {
        _super.prototype.usePower.call(this);
    };
    return FireChicken;
}(Chicken));
var fck = new FireChicken('fire');
fck.userNewPower();
fck.usePower();
