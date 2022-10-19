"use strict";

module.exports = {
	name: "ninjas",
	actions: {
		listNinjas: {
			rest: {
				path: "/ninjas",
				method: "GET",
			},
			async handler() {
				return ["Itachi", "Orochimaru", "Jiraya"];
			},
		},
	},
};
