import db from '../../../database/config.database';
import response from '../../utils/response';
import  { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import factory from '../../utils/factory';

const User = db.users;


const updateUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateDoc = await User.update(res.locals.updateUser, {
        where: { id }
    });
    const doc = await User.findOne({ where: { id } })
    if (!doc) {
        return response.errorResponse(res, 400, 'No User found with this id');
    }
    return response.response(res, 200, { doc }, 'Data update successful');

});

const updateMe = catchAsync(async (req: Request, res: Response) => {
    const updateDoc = await User.update(res.locals.updateUser, {
        where: { id: res.locals.user.id }
    });
    const doc = await User.findOne({ where: { id: res.locals.user.id } })
    return response.response(res, 200, { doc }, 'Data update successful');
});



const me = catchAsync(async (req: Request, res: Response) => {
    const user = await User.findOne({ where: { id: res.locals.user.id } });
    return response.response(res, 200, { user }, 'User retrieved successfully');
});


const getAllUsers = factory.getAll(User);
const getOneUser = factory.getOne(User);
const deleteUser = factory.deleteOne(User);

export default {
    getAllUsers,
    getOneUser,
    updateUser,
    updateMe,
    deleteUser,
    me
}

