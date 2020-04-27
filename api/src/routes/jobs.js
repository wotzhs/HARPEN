import express from "express";
import HttpStatus from "http-status-codes";
import Job from "../models/job";
import UsersService from "../services/users";
import AuthService from "../services/auth";

const router = express.Router();

router.use((req, res, next) => {
	req.token_decrypted = AuthService.verifyToken(req.cookies.token);
	next();
});

router.get("/", async (req, res, next) => {
	res.json();
});

router.get("/:slug", async (req, res, next) =>{
	res.json();
});

router.post("/", async (req, res, next) => {
	if (!req.token_decrypted.user_id) {
		res.status(HttpStatus.UNAUTHORIZED);
		return res.json({ error: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED) });
	}

	const newJob = new Job({ ...req.body, user_id: req.token_decrypted.user_id });
	const errors = newJob.validate();
	if (errors) {
		res.status(HttpStatus.BAD_REQUEST);
		return res.json({ errors });
	}

	res.status(HttpStatus.CREATED);
	res.json();
});

router.put("/", async (req, res, next) => {
	if (!req.token_decrypted.user_id) {
		res.status(HttpStatus.UNAUTHORIZED);
		return res.json({ error: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED) });
	}

	res.json();
});

router.delete("/", async (req, res, next) => {
	if (!req.token_decrypted.user_id) {
		res.status(HttpStatus.UNAUTHORIZED);
		return res.json({ error: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED) });
	}
	
	res.json();
}) 

export default router;