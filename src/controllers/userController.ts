import db from '../database/config/config';
import response from '../service/Response';
import express, { Express, Request, Response, NextFunction } from 'express';
import catchAsync from '../service/catchAsync';
import factory from '../service/factory';

const User = db.users;

const getAllUsers = factory.getAll(User);

export default {
    getAllUsers
}

