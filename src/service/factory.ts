import response from '../service/Response';
import express, { Express, Request, Response, NextFunction, query } from 'express';
import catchAsync from '../service/catchAsync';

const getAll = (Model: any) => catchAsync(async (req: Request, res: Response) => {

    const docs = await Model.findAll();
    return response.response(res, 201, { docs }, 'Data get successful');

});

const getOne = (Model: any) => catchAsync(async (req: Request, res: Response) => {
    console.log(res.locals.Model);

    const id = req.params.id;
    const doc = await Model.findByPk(id);
    if (!doc) {
        return response.errorResponse(res, 400, 'No data found with this id');
    }
    return response.response(res, 201, { doc }, 'Data get successful');
});
const deleteOne = (Model: any) => catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const deleteDoc = await Model.destroy({
        where: { id }
    });
    if (!deleteDoc) {
        return response.errorResponse(res, 400, 'No data found with this id');
    }
    return response.response(res, 200, {}, 'deleted successfully');
});


export default {
    getAll,
    getOne,
    deleteOne
}