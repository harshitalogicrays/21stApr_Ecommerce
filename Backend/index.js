const express=require('express')
const cors=require('cors')
const stripe=require('stripe')('sk_test_51MWzILSJqCDJ3ZovRlrEDkPtuzrVA20Bs5Cfh05bM1RDAjLLkQeIDV5JnOFdSWpp6yHGpVa8YdQ1Kw786nZoLZ7u00YnWF5hhJ')
const app=express()
app.use(express.json())
app.use(cors())
// http://localhost:2000
app.get('/',(req,res)=>{
    res.send("hello from server")})

app.post('/payment',async(req,res)=>{
    let {amount,email,shipping,description}=req.body
    let paymentIntent=await stripe.paymentIntents.create({
        amount:amount,
        currency:"usd",
        automatic_payment_methods:{enabled:true},
        description:description,
        shipping:{
            address:{
                line1:shipping.line1,
                line2:shipping.line2,
                city:shipping.city,
                state:shipping.state,
                postal_code:shipping.postal_code,
                country:shipping.country
            },
            name:shipping.name,
            phone:shipping.mobile
        }
        })
        res.send({clientSecret:paymentIntent.client_secret})
})


let PORT=2000
app.listen(PORT,()=>console.log(`server started at http://localhost:${PORT}`))