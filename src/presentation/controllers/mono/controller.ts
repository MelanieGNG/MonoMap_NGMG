import {Request, Response} from 'express';
import { MonoModel } from '../../../data/models/mono.model';
import { EmailService } from '../../../../domain/services/email.service';

export class MonoCasesController{

    public getMonoCase = async (req: Request,res: Response)=>{
        try{
            const monoCases = await MonoModel.find();
            return res.json(monoCases);
        }
        catch(error){
            return res.json([]);
        }
    };

    public createMonoCase = async (req: Request, res: Response)=>{
        try{
            const {lat, lng, genre, age} = req.body;
            const newMonoCase = await MonoModel.create({
                lat,
                lng,
                isSent: false,
                genre,
                age,
                creationDate: new Date()
            });
            res.json(newMonoCase);
        }
        catch(error){   
            res.json({message:"Error registrando el caso."});
        }
    };

    public getMonoCaseById = async (req:Request, res:Response)=>{
        try {
            const { id } = req.params;
            const monoCase = await MonoModel.findById(id);
            return res.json(monoCase);
        } catch (error) {
            return res.json({message:"Ocurrio un error al traer el caso"});
        }
    }

    public updateMonoCase = async (req:Request, res: Response)=>{
        try {
            const { id } = req.params;
            const {lat, lng, genre, age, creationDate } = req.body;
            await MonoModel.findByIdAndUpdate(id,{
                lat,
                lng,
                genre,
                age,
                creationDate
            });
            const updateMonoCase = await MonoModel.findById(id);
            return res.json(updateMonoCase);
        } catch (error) {
            console.error(error)
            return res.json({message:"Ocurrio un error al actualizar el caso"});
        }
    }

    public deleteMonoCase = async (req:Request,res : Response)=>{
        try {
            const { id } = req.params;
            await MonoModel.findByIdAndDelete(id);
            return res.json({message:"Caso eleminado"});
        } catch (error) {
            return res.json({message:"Ocurrio un error al eliminar el caso"});
        }
    }

    // public getMonoCasesFromLastWeek = async (req: Request, res: Response) => {
    //     try {
    //         const oneWeekAgo = new Date();
    //         oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    //         const recentMonoCases = await MonoModel.find({
    //             creationDate: { $gte: oneWeekAgo }
    //         });
    
    //         return res.json(recentMonoCases);
    //     } catch (error) {
    //         console.error(error);
    //         return res.json({ message: "Error al recuperar los casos de la última semana" });
    //     }
    // }
    
}