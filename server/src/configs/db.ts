import mongoose from 'mongoose';


function connectDb(): void{
    try {
        const mongoConfig:string = process.env.MONGOURI || "";
        mongoose.connect(mongoConfig);
    } catch(err ) {
        console.error(err);
    }
}

export default connectDb;
