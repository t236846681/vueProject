let isDone: boolean = false; // 布尔
let decLiteral: number = 6; // 数字
let sName: string = `bob is so ${isDone}`; // 字符串
let list: Number[] = [1, 2, 3]; // 数组
let list2: Array<number> = [1, 2, 3];


enum Color {Red = 1, Green, Black};  // 枚举
let c: Color = Color.Black;

let notSure: any = 4;
notSure = 'not';

interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});

interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

// console.log(myStr);

class Animal {
    name:string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}
class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);

class Chicken {
    power:string;
    constructor(cPower: string ) {
        this.power = cPower;
    }
    usePower() {
        console.log(`u can ${this.power}`)
    }
}

let ck = new Chicken('jump');
ck.usePower();

class FireChicken extends Chicken {
    constructor(cPower: string) {
        super(cPower)
    }
    userNewPower() {
        super.usePower()
    }
}

let fck = new FireChicken('fire');
fck.userNewPower();
fck.usePower();