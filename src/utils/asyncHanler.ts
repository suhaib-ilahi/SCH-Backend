import type { Request, Response, NextFunction } from "express";
const asyncHandler = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      return next(err);
    });
  };
};

export { asyncHandler };

// const asyncHandler = (fn) =async (req,res,next) =>{
//         try {
//             await fn(req,res,next)
//         } catch (error) {
//             res.status(error.code || 500 ).json({
//                 success: false,
//                 message : error.message
//             })
//         }
// }
