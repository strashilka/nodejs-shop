const fs = require("fs");
const path = require("path");
const Cart = require("./cart");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // console.log(this.id);
    getProductsFromFile((products) => {
      if (this.id) {
        const exitstingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        // console.log(exitstingProductIndex);
        const updatedProducts = [...products];
        updatedProducts[exitstingProductIndex] = this;
        // console.log(updatedProducts);
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const prod = products.find((product) => product.id === id);
      cb(prod);
    });
  }

  static deleteById(id) {
    console.log(" delete id = " + id);
    getProductsFromFile((products) => {
      const prduct = products.find((p) => p.id === id);
      const updatedProduct = products.filter((product) => product.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
        if (!err) {
          Cart.deleteProduct(id, prduct.price);
        }
        console.error(err);
      });
    });
  }
};
