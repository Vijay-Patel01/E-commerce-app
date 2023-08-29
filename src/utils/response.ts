import express, { Express, Request, Response, NextFunction } from 'express';
export default {
    
    response(res: Response, statusCode: number, data={},message: string | 'success') {
        return res.status(statusCode).json({
            success: true,
            message: message,
            data,
        });
    },
    errorResponse(res: Response, statusCode: number, message: string | "fail") {
        return res.status(statusCode).json({
            success: false,
            message: message,
            data:{},
        });
    },

}