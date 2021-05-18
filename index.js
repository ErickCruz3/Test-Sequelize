const sequelize = require("./util/database");

const Customer = require("./models/customer");
const Order = require("./models/order");

Customer.hasMany(Order);

let customerId = null;
sequelize
  .sync({force: true})
  // .sync()
  .then((result) => {
    return Customer.create({name: "Erick Cruz", email: "ec@gmail.com"})
    console.log(result);
  })
  .then(customer => {
    customerId = customer.id;
    console.log("First Customer Created: ",customer);
    return customer.createOrder({total: 25});
  })
  .then(order => {
    console.log("Order is : ",order);
    return Order.findAll({ where: customerId});
  })
  .then(orders => {
    console.log("All the Orders are : ",orders);
  })
  .catch((err) => {
    console.log(err);
  });

   