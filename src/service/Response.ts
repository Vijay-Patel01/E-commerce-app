import express, { Express, Request, Response, NextFunction } from 'express';
export default {
    
    response(res: Response, statusCode: number, data={},message: string|null=null) {
        return res.status(statusCode).json({
            success: true,
            message: message||"success",
            data,
        });
    },
    errorResponse(res: Response, statusCode: number, message: string) {
        return res.status(statusCode).json({
            success: false,
            message: message || "fail",
            data:{},
        });
    },

}