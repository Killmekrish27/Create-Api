const sql = require('mysql2')
const con = sql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'Krish@123',
        database:'krishdb'
    }
)
function getMobiles(id){
    return new Promise ((resolve,reject)=>{
        if(id){
            con.query("SELECT * FROM mobiles WHERE id=?", [id], (err,rows)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        }
        else{
            con.query("SELECT * FROM mobiles", (err,rows)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        }
    })
}
function putMobiles(mbl,prc,id){
    return new Promise ((resolve,reject)=>{
        con.query(`UPDATE mobiles SET mobile=?,price=? WHERE id=?`,[mbl,prc,id], (err,rows)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(rows)
            }
        })
    })
}
function postMobiles(mbl,prc){
    return new Promise ((resolve,reject)=>{
        con.query(`INSERT INTO mobiles (mobile,price) VALUES (?,?)`,[mbl,prc], (err,rows)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(rows)
            }
        })
    })
}
function delMobiles(id){
    return new Promise ((resolve,reject)=>{
        getMobiles(id)
        .then((rows)=>{
            if(rows.length>0){
                con.query(`DELETE FROM mobiles WHERE id=?`,[id], (err,rows)=>{
                    if(err){
                        reject(err)
                        console.log(err)
                    }
                    else{
                        resolve(rows)
                    }
                })
            }
            else{
                reject(404)
            }
        })
        .catch(()=>{
            reject(500)
        })
    })
}
module.exports={
    getMobiles,putMobiles,postMobiles,delMobiles
}
