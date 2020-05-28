db.createUser(
	{
		user: "intelbras",
		pwd: "lockinet",
		roles: [{
			role: "readWrite",
			db: "armario"
		}]
	}

)
