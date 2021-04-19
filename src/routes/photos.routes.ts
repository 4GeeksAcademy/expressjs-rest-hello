import { Router } from "express";
const router = Router();
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/user.controller';

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);



router.post('/token',  async (req, res) => {
    
	try {
		const { body } = req;
		    res.status(201).json({body: body});
			
	} catch (error) {
			res.status(500).json({ message: error })
	}  
})


export default router;