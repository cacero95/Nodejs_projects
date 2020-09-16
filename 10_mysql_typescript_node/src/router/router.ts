import {Router, Request, Response} from 'express';
import Mysql from '../mysql/mysql';


const router = Router();

router.get('/heroes',(req:Request, res:Response)=>{
    const query = `
        SELECT * FROM heroes
    `;
    Mysql.exec_query(query,(err:any, heroes:object[])=>{
        if (err){
            res.status(400).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            heroes
        })
    });
});
router.get('/heroes/:id', (req:Request,res:Response)=>{
    const id = req.params.id;
    // escapa probables errores en los values de entrada
    const scape = Mysql.instance.connenction.escape(id);
    const query = `
        SELECT * FROM heroes where id=${id}
    `;
    Mysql.exec_query(query,(err:any, heroes:object[])=>{
        if (err){
            res.status(400).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            heroes
        })
    });
})
export default router;