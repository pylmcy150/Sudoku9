
export class MyPoint {
    x?: number;
    y?: number;
    constructor(_x?: number, _y?: number) {
        this.x = _x;
        this.y = _y;
    }

    get v(): number {
        return this.x + (this.y - 1) * 3;
    }

    static getNullPoint(): MyPoint {
        return new MyPoint(null, null);
    }

    static getPoint(_x: number, _y: number): MyPoint {
        return new MyPoint(_x, _y);
    }

    static getRandomPoint(): MyPoint {
        let random: Function = function (): number {
            return Math.round(Math.random() * 10 % 2 + 1);
        };
        return this.getPoint(random(), random());
    }

    log(): void {
        console.log(`this point is x:${this.x},y:${this.y}`);
    }

    equal(a: MyPoint): boolean {
        return this.x === a.x && this.y === a.y;
    }
}

export class Object9 {
    private _base: MyPoint;
    private _current: MyPoint;

    get base(): MyPoint {
        return this._base || MyPoint.getNullPoint();
    }
    set base(b: MyPoint) {
        this._base = b;
    }

    get current(): MyPoint {
        return this._current || MyPoint.getNullPoint();
    }
    set current(b: MyPoint) {
        this._current = b;
    }

    log(): void {
        console.log(`base point is x:${this.base.x},y:${this.base.y},v:${this.base.v}`);
        console.log(`current point is x:${this.current.x},y:${this.current.y},v:${this.current.v}`);
    }
}

export class Done9 {
    private arr: Array<Object9>;
    constructor(_arr: Array<Object9>) {
        this.arr = _arr;
    }

    getLastArr(_arr: Array<Object9>): Array<Object9> {
        let temp: Array<Object9> = new Array<Object9>();
        _arr.forEach((v, i) => {
            if (!v.base.equal(v.current)) {
                temp.push(v);
            }
        });
        return temp;
    }

    doneArry(): void {
        for (let i: number = 0; i < this.arr.length; i++) {
            let t: Object9 = this.arr[i];
            if (t.current.equal(t.base)) {
                break;
            } else {
                for (let j: number = i; j < this.arr.length; j++) {
                    let u: Object9 = this.arr[j];
                    if (t.base.equal(u.current)) {
                        let tc: MyPoint = t.current;
                        t.current = u.current;
                        u.current = tc;
                        this.arr[i] = u;
                        this.arr[j] = t;
                        this.log();
                        this.doneArry();
                        break;
                    }
                }
            }
        }
    }


    log(): void {
        // console.log(`${this.arr[6].current.v} ${this.arr[7].current.v} ${this.arr[8].current.v} `);
        // console.log(`${this.arr[3].current.v} ${this.arr[4].current.v} ${this.arr[5].current.v} `);
        // console.log(`${this.arr[0].current.v} ${this.arr[1].current.v} ${this.arr[2].current.v} `);
        // console.log("—————————————————");
        console.log(`${this.arr[6].base.v}(${this.arr[6].current.v}) ${this.arr[7].base.v}(${this.arr[7].current.v}) ${this.arr[8].base.v}(${this.arr[8].current.v}) `);
        console.log(`${this.arr[3].base.v}(${this.arr[3].current.v}) ${this.arr[4].base.v}(${this.arr[4].current.v}) ${this.arr[5].base.v}(${this.arr[5].current.v}) `);
        console.log(`${this.arr[0].base.v}(${this.arr[0].current.v}) ${this.arr[1].base.v}(${this.arr[1].current.v}) ${this.arr[2].base.v}(${this.arr[2].current.v}) `);
        console.log("================");
    }
}

export class UnitTest {
    DoTest(arr: Array<Array<number>>): void {
        if (arr && arr.length === 3 && arr[0].length === 3) {
            var typeArr: Array<Object9> = new Array();
            arr.forEach((ar, i) => {
                ar.forEach((v, k) => {
                    let t: Object9 = new Object9();
                    // tslint:disable-next-line:radix
                    t.base = new MyPoint((v - 1) % 3 + 1, parseInt((v - 1) / 3) + 1);
                    t.current = new MyPoint(k + 1, 3 - i);
                    typeArr.push(t);
                });
            });

            typeArr.sort((a: Object9, b: Object9) => {
                return a.current.v - b.current.v;
            });
            let d: Done9 = new Done9(typeArr);
            d.log();
            d.doneArry();
        }
    }


    RandomTest(): void {
        let arr: Array<number> = [1, 2, 3];
        var typeArr: Array<Object9> = new Array();
        arr.forEach((v, i) => {
            arr.forEach((m, j) => {
                let t: Object9 = new Object9();
                t.base = MyPoint.getPoint(v, m);
                typeArr.push(t);
            });
        });
        // console.log(typeArr);
        let temp: Array<MyPoint> = new Array();
        let getRandomPoint: Function = () => {
            let p: MyPoint = MyPoint.getRandomPoint();
            let b: boolean = false;
            temp.forEach((v, i) => {
                if (v.equal(p)) {
                    b = true;
                    return false;
                }
            });
            if (b) {
                return getRandomPoint();
            } else {
                temp.push(p);
                return p;
            }
        };

        typeArr.forEach((v, i) => {
            typeArr[i].current = getRandomPoint();
            // v.log();
            // typeArr[i].log();
        });
        typeArr.sort((a: Object9, b: Object9) => {
            return a.current.v - b.current.v;
        });

        // console.log(typeArr);
        let d: Done9 = new Done9(typeArr);
        d.log();
        d.doneArry();
    }
}

// let a:Type9 = new Type9();
// a.current = MyPoint.getRoundPoint();
// a.current.log();
let u: UnitTest = new UnitTest();
u.DoTest([[1,4,7],[9,2,5],[3,8,6]]);

