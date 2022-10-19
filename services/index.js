const { ServiceBroker } = require("moleculer");
const HTTPServer = require("moleculer-web");

const brokerNode1 = new ServiceBroker({
	nodeID: "node-1",
	transporter: "NATS",
});

brokerNode1.createService({
	name: "gateway",
	mixins: [HTTPServer],

	settings: {
		routes: [
			{
				aliases: {
					"GET /products": "products.listProducts",
				},
			},
		],
	},
});

const brokerNode2 = new ServiceBroker({
	nodeID: "node-2",
	transporter: "NATS",
});

brokerNode2.createService({
	name: "products",

	actions: {
		listProducts() {
			return [
				{ name: "Apples", price: 5 },
				{ name: "Oranges", price: 3 },
				{ name: "Bananas", price: 2 },
			];
		},
	},
});

// Start both brokers
Promise.all([brokerNode1.start(), brokerNode2.start()]);
