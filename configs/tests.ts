class testclass {
  constant = "constant";
  variable?: string;
  constructor() {}
  private method = (input: number) => {};
  fun() {
    return this.constant;
  }
}
const constant = "---";
const instanc = new testclass();
console.log(instanc);
