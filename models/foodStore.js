const products = [];

class Foodstore {
  constructor(id, title, price, quantity) {
    this.id = id;
    this.title = title;
    this.price = new Number(price);
    this.quantity= new Number(quantity)
  }

  save() {
    products.push(this);
  }
  static findById(prodId) {
    return products.filter((p) => p.id == prodId);
  }
}

const roastedCorn = new Foodstore("01", "Roasted Corn", 780,150);
const bole = new Foodstore("02", "Spicy Bole", 500,100);
const garri = new Foodstore("03", "Granulated Garri", 1500,120);
const ewa = new Foodstore("04", "Ewa", 2500,100);
const abacha = new Foodstore("05", "Abacha and kpomo", 3500,250);

module.exports = {
  roastedCorn,
  bole,
  garri,
  ewa,
  abacha,
};
