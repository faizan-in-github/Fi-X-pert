const mysql=require("mysql");
const bcrypt=require("bcryptjs");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,    
    user: process.env.DATABASE_USER,         
    password:process.env.DATABASE_PASS,  
    database:process.env.DATABASE,     
  });
exports.login=async(req,res)=>{
    try{
      const username=req.body.username;
      const password=req.body.Password;
      if(!username || !password){
        return res.status(400).render('login',
        {msg:" \"Enter the Details properly \""});
      }
     db.query('select * from customer where customerid=?',[username],async(error,result)=>{
           console.log(result);
           if(result.length<=0 ){
            return res.status(401).render('login',
            {msg:" \"Enter the Details properly \""});
           }else{
            if(!(await bcrypt.compare(password,result[0].customerpassword))){
              return res.status(401).render('login',
              {msg:" \"Enter the Details properly \""});
            }else{
              res.redirect('/choice'); 
            }
           }
     });
    }catch(error){
      console.log(req.body);
    }
  };
exports.electrician = (req, res) => {
    const Location = req.body.location;
    console.log(Location);
    if(Location=='*'){
      db.query(
        'select Electricianname, Electricianphonenumber, Electricianaddress from electricians',
        async (error, results) => {
          if (error) {
            console.log(error);
          }
          if (results.length < 1) {
            return res.render('electrician', { msg: 'Sorry, we dont have electricians' });
          } else {
            const electricians = results.map(electrician => ({
              name: electrician.Electricianname,
              phoneNumber: electrician.Electricianphonenumber,
              address: electrician.Electricianaddress
            }));
            console.log(electricians);
            res.render('electrician', { electricians });
          }
        }
      );
    }
    db.query(
      'select Electricianname, Electricianphonenumber, Electricianaddress from electricians where electricianlocation=?',
      [Location],
      async (error, results) => {
        if (error) {
          console.log(error);
        }
        if (results.length < 1) {
          return res.render('electrician', { msg: 'Sorry, we dont have electricians in your Area' });
        } else {
          const electricians = results.map(electrician => ({
            name: electrician.Electricianname,
            phoneNumber: electrician.Electricianphonenumber,
            address: electrician.Electricianaddress
          }));
          console.log(electricians);
          res.render('electrician', { electricians });
        }
      }
    );
  };
exports.plumber = (req, res) => {
    const Location = req.body.location;
    console.log(Location);
    if(Location=='*'){
      db.query(
        'select Plumbername, Plumberphonenumber, Plumberaddress from plumbers ',
        async (error, results) => {
          if (error) {
            console.log(error);
          }
          if (results.length < 1) {
            return res.render('plumber', { msg: 'Sorry, we dont have plumbers ' });
          } else {
            const plumbers = results.map(plumber => ({
              name: plumber.Plumbername,
              phoneNumber: plumber.Plumberphonenumber,
              address: plumber.Plumberaddress
            }));
            console.log(plumbers);
            res.render('plumber', { plumbers });
          }
        }
      );
    }
    db.query(
      'select Plumbername, Plumberphonenumber, Plumberaddress from plumbers where plumberlocation=?',
      [Location],
      async (error, results) => {
        if (error) {
          console.log(error);
        }
        if (results.length < 1) {
          return res.render('plumber', { msg: 'Sorry, we dont have plumbers in your Area' });
        } else {
          const plumbers = results.map(plumber => ({
            name: plumber.Plumbername,
            phoneNumber: plumber.Plumberphonenumber,
            address: plumber.Plumberaddress
          }));
          console.log(plumbers);
          res.render('plumber', { plumbers });
        }
      }
    );
  };

exports.carpenter= (req, res) => {
    const Location = req.body.location;
    console.log(Location);
    if(Location=='*'){
      db.query(
        'select Carpentername, Carpenterphonenumber, Carpenteraddress from carpenters' ,
        async(error, results) => {
          if (error) {
            console.log(error);
          }
          if (results.length < 1) {
            return res.render('carpenter', { msg: 'Sorry, we dont have carpenters in your Area' });
          } else {
            const carpenters = results.map(carpenter => ({
              name: carpenter.Carpentername,
              phoneNumber: carpenter.Carpenterphonenumber,
              address: carpenter.Carpenteraddress
            }));
            console.log(carpenters);
            res.render('carpenter', {carpenters});
          }
        }
      );
    }
    db.query(
      'select Carpentername, Carpenterphonenumber, Carpenteraddress from carpenters where carpenterlocation=?',
      [Location],
      async (error, results) => {
        if (error) {
          console.log(error);
        }
        if (results.length < 1) {
          return res.render('carpenter', { msg: 'Sorry, we dont have carpenters in your Area' });
        } else {
          const carpenters = results.map(carpenter => ({
            name: carpenter.Carpentername,
            phoneNumber: carpenter.Carpenterphonenumber,
            address: carpenter.Carpenteraddress
          }));
          console.log(carpenters);
          res.render('carpenter', {carpenters});
        }
      }
    );
    } 
   
exports.plumberentry=(req,res)=>{
    console.log(req.body);
    const plumbername=req.body.plumberName;
    const plumberaddress=req.body.plumberAddress;
    const plumberid=req.body.plumberId;
    const plumberphonenumber=req.body.plumberphonenumber;
    const plumberlocation=req.body.plumberLocation;
    
   db.query('select plumberid from plumbers where plumberid=?',[plumberid],async(error,result)=>{
    if(error){
      console.log(error);
    }
    if(result.length>0){
      return res.render('plumberentry',{msg:" \"User id already taken \""});
    }
    
    db.query('INSERT INTO plumbers SET ?', {
      plumberid: plumberid,
      Plumbername: plumbername,
      plumberlocation: plumberlocation,
      Plumberphonenumber: plumberphonenumber,
      Plumberaddress: plumberaddress
     
    },(error,result)=>{
     if(error){
      console.log(error);
     }else{
       console.log(result);
      return res.render("plumberentry",{ msg:"Registration Successful "});
     }
    })
   });
    
 };
 exports.carpenterentry=(req,res)=>{
  console.log(req.body);
  const carpentername=req.body.carpentername;
  const carpenteraddress=req.body.carpenteraddress;
  const carpenterid=req.body.carpenterid;
  const carpenterphonenumber=req.body.carpenterphonenumber;
  const carpenterlocation=req.body.carpenterLocation;
  
 db.query('select carpenterid from carpenters where carpenterid=?',[carpenterid],async(error,result)=>{
  if(error){
    console.log(error);
  }
  if(result.length>0){
    return res.render('carpenterentry',{msg:" \"User id already taken \""});
  }
  
  db.query('INSERT INTO carpenters SET ?', {
    carpenterid: carpenterid,
    Carpentername: carpentername,
    carpenterlocation:carpenterlocation,
    Carpenterphonenumber: carpenterphonenumber,
    Carpenteraddress: carpenteraddress
   
  },(error,result)=>{
   if(error){
    console.log(error);
   }else{
     console.log(result);
    return res.render("carpenterentry",{ msg:"Registration Successful "});
   }
  })
 });
  
};    
exports.electricianentry=(req,res)=>{
  console.log(req.body);
  const electricianname=req.body.electricianname;
  const electricianaddress=req.body.electricianaddress;
  const electricianid=req.body.electricianid;
  const electricianphonenumber=req.body.electricianphonenumber;
  const electricianlocation=req.body.electricianLocation;
  
 db.query('select electricianid from electricians where electricianid=?',[electricianid],async(error,result)=>{
  if(error){
    console.log(error);
  }
  if(result.length>0){
    return res.render('electricianentry',{msg:" \"User id already taken \""});
  }
  
  db.query('INSERT INTO electricians SET ?', {
    electricianid: electricianid,
    Electricianname: electricianname,
    electricianlocation:electricianlocation,
    Electricianphonenumber: electricianphonenumber,
    Electricianaddress: electricianaddress
   
  },(error,result)=>{
   if(error){
    console.log(error);
   }else{
     console.log(result);
    return res.render("electricianentry",{ msg:"Registration Successful "});
   }
  })
 });
  
};        
exports.register=(req,res)=>{
    console.log(req.body);
    const name=req.body.name;
    const address=req.body.address;
    const username=req.body.username;
    const password=req.body.Password;
    const phonenumber=req.body.phonenumber;
    const location=req.body.location;
    
   db.query('select customerid from customer where customerid=?',[username],async(error,result)=>{
    if(error){
      console.log(error);
    }
    if(result.length>0){
      return res.render('register',{msg:" \"User id already taken \""});
    }
    let hashedPassword=await bcrypt.hash(password,8);
    console.log(hashedPassword);
    db.query('INSERT INTO customer SET ?', {
      customerid: username,
      customername: name,
      customerphonenumber: phonenumber,
      customeraddress: address,
      customerpassword: hashedPassword,
      customerlocation: location
    },(error,result)=>{
     if(error){
      console.log(error);
     }else{
       console.log(result);
      return res.render("register",{ msg:"Registration Successful "});
     }
    })
   });
    
 };