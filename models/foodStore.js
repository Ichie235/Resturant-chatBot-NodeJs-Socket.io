const products =[]

class Foodstore {
    constructor(id, title, price,currency) {
        this.id = id;
        this.title = title;
        this.price = new Number(price);
        this.currency = currency
    }

    save() {
        products.push(this);
    }
    static findById(prodId) {
        return products.filter(p => p.id == prodId);
    }
}


const roastedCorn = new Foodstore("01",'Roasted Corn',780,'Naira')
const bole = new Foodstore("02",'Spicy Bole',500,'Naira')
const garri = new Foodstore("03",'Granulated Garri',1500,'Naira')
const ewa = new Foodstore("04",'Ewa',2500,'Naira')
const abacha = new Foodstore("05",'Abacha and kpomo',3500,'Naira')

module.exports= {
  roastedCorn,
  bole,
  garri,
  ewa,
  abacha
}