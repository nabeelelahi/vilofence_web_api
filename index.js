// express and routing set up

const {
  App
} = require('./app/config/express')

// data base set up

const { client } = require('./app/config/db')

const {
  lead,
  category,
  product,
  user,
  messasge
} = require('./app/source')

const main = App()

// checking for connection

if (client.isConnected()) {
  execute();
}
else {
  client.connect().then(function () {
    execute();
  });
}

function execute() {

  main.use(lead).use(category).use(product).use(user).use(messasge)

}