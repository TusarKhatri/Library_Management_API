const handler404 = (req,res,next) =>{
    const error = new Error ("Page not Found!");
    error.status = 404;
    next(error);

};
export default handler404;
