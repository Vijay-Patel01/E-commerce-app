import response from '../service/Response';
import express, { Express, Request, Response, NextFunction } from 'express';
import catchAsync from '../service/catchAsync';

const getAll = (Model: any) => catchAsync(async(req: Request, res: Response) => {
    const doc = await Model.findAll();

});

export default {
    getAll
}