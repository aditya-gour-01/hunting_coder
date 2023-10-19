// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// result http://localhost:3000/api/getblog?slug=how-to-learn-js  correct
// result http://localhost:3000/api/getblog?slug=how-to-learn-js11 incorrect
import * as fs from 'fs';
export default function handler(req, res) {
  fs.readFile(`blogdata/${req.query.slug}.json`,'utf-8',(err,data)=>{
    if(err)
    {
      res.status(500).json({error:"No such blog found"}) 
    }
    console.log(req.query);
    res.status(200).json(JSON.parse(data))
  });
}
