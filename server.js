var express = require("express");
var app = express();
const path = require('path');
const fs = require('fs');
const multer = require('multer');


const DIR = 'src/uploads';

//app.use(express.static(__dirname));

var picname;

let storage = multer.diskStorage({
 destination: (req, file, cb) => {
 cb(null, DIR);
 },
 filename: (req, file, cb) => 
	{
		picname=Date.now() + file.originalname;
		cb(null, picname);
 }
});
let upload = multer({storage: storage});


//for cors
app.use(function (req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 res.setHeader('Access-Control-Allow-Credentials', true);
 next();
});

var mongoose = require("mongoose");

var SignupSchema = new mongoose.Schema( {name:String,phone:String,gender:String,username: {type:String,unique:true}, pass: String,usertype:String}, { versionKey: false } );
var Signup = mongoose.model("signup", SignupSchema,"signup");

var AddCommentSchema = new mongoose.Schema( {placeid:String,username:String,comment:String,name:String,date:String}, { versionKey: false } );
var addcomment = mongoose.model("addcomment", AddCommentSchema,"addcomment");

var AddCommentSchema1 = new mongoose.Schema( {destid:String,username:String,comment:String,name:String,date:String}, { versionKey: false } );
var addcomment1 = mongoose.model("addcomment1", AddCommentSchema1,"addcomment1");

var ContactSchema = new mongoose.Schema( {name:String,phone:String,email:String,message:String,date:String}, { versionKey: false } );
var contact = mongoose.model("contact", ContactSchema,"contact");

var CategorySchema = new mongoose.Schema( {catname:String,catpic:String}, { versionKey: false } );
var managecat = mongoose.model("managecat", CategorySchema,"managecat");

var CategorySchema1 = new mongoose.Schema( {catname1:String,catpic1:String,entrydate:String}, { versionKey: false } );
var managecat1 = mongoose.model("managecat1", CategorySchema1,"managecat1");

var SubCategorySchema1 = new mongoose.Schema( {catid:String,subcatname:String,spic:String}, { versionKey: false } );
var managescat = mongoose.model("managescat", SubCategorySchema1,"managescat");

var SubCategorySchema = new mongoose.Schema( {catid:String,subcatname:String,introduction:String,reach:String,time:String,food:String,spic:String}, { versionKey: false } );
var managesubcat = mongoose.model("managesubcat", SubCategorySchema,"managesubcat");

var PlaceCategorySchema = new mongoose.Schema( {subcatid:String,typeid:String,pname:String,introduction:String,placepic:String}, { versionKey: false } );
var manageplaces = mongoose.model("manageplaces", PlaceCategorySchema,"manageplaces");


var ProductSchema = new mongoose.Schema( {catid:String,subcatid:String,pname:String,prate:Number,pdesc:String,pdiscount:Number,pstock:Number,spic:String}, { versionKey: false } );
var manageproduct = mongoose.model("manageproduct", ProductSchema,"manageproduct");

var AddpicSchema = new mongoose.Schema( {rid:String,destid:String,placeid:String,pic:String}, { versionKey: false } );
var manageaddpic = mongoose.model("manageaddpic", AddpicSchema,"manageaddpic");

var PackageSchema = new mongoose.Schema( {subcatid:String,packagename:String,cost:Number,inclusions:String,exclusions:String,itinerary:String,days:String,pkpic:String}, { versionKey: false } );
var managepackage = mongoose.model("managepackage", PackageSchema,"managepackage");

var CartSchema = new mongoose.Schema( {prodid:String,pname:String,prate:Number,qt:Number,tc:Number,ppic:String, username:String}, { versionKey: false } );
var cart = mongoose.model("cart", CartSchema,"cart");

var packSchema = new mongoose.Schema( {rid:String,packagename:String,cost:Number,days:String,pno:Number,totalcost:Number,username:String}, { versionKey: false } );
var pack = mongoose.model("pack", packSchema,"pack");

var ReportSchema = new mongoose.Schema( {commentid:String,username:String,rusername:String,comment:String,date:String}, { versionKey: false } );
var report = mongoose.model("report", ReportSchema,"report");


var PaymentSchema=new mongoose.Schema( {address:String,phone:String,username:String,cardno:String,holdername:String,expdate:String,cvvno:String}, {versionKey:false} );
var payment=mongoose.model("payment",PaymentSchema,"payment");

var CheckoutSchema=new mongoose.Schema( {orderamount:String,address:String,username:String,orderdate:String,paymentmode:String,status:String,cardno:String,companyname:String,holdername:String,expdate:String,cvvno:String}, {versionKey:false} );
var checkout=mongoose.model("checkout",CheckoutSchema,"checkout");

var BookingSchema=new mongoose.Schema( {pername:String,pphone:String,paddress:String,pno:Number,date:Date,status:String,bdate:String,username:String}, {versionKey:false} );
var booking=mongoose.model("booking",BookingSchema,"booking");

var orderSchema = new mongoose.Schema( {orderid:String,pid:String,pname:String,prate:Number,qty:Number,tc:Number,ppic:String,username:String }, { versionKey: false } );
var order = mongoose.model("order", orderSchema,"order");

var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded( { extended: true } ));
app.use(bodyparser.json());


app.get("/api/getreports", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	report.find(function(err, data) {
	  if (err)
	  {
		console.log(err);
		res.send("Failed");
	  }
	  else
	  {
		console.log(data);
		res.send(data);
	  }
	  mongoose.connection.close();
	});
  });


  app.get("/api/srchdest", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
	subcatname=req.query.un;
   
	managesubcat.find({subcatname: { $regex: '.*' + subcatname,$options:'i' } }, function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send(data);
	mongoose.connection.close();
	}
	}).limit(5);
   });

app.post("/api/onsub", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	 var d = new Date(); 
   
	
	var newaddcomment = new addcomment( {placeid:req.body.placeid,username:req.body.username,comment:req.body.comment,name:req.body.name,date:d} );
	
	newaddcomment.save(function(err) {
	if (err)
	{
	console.log(err);
	res.send("Error while signing up, try again");
	}
	else
	{
	res.send("Submitted Successfully");
	}
	mongoose.connection.close();
	});
   });

   app.post("/api/onsub1", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	 var d = new Date(); 
   
	
	var newaddcomment1 = new addcomment1( {destid:req.body.destid,username:req.body.username,comment:req.body.comment,name:req.body.name,date:d} );
	
	newaddcomment1.save(function(err) {
	if (err)
	{
	console.log(err);
	res.send("Error while signing up, try again");
	}
	else
	{
	res.send("Submitted Successfully");
	}
	mongoose.connection.close();
	});
   });   

   app.get("/api/fetchcomments", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	addcomment.find({placeid:req.query.placeid},function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send(data);
	
	}
	mongoose.connection.close();
	});
   }); 

   app.get("/api/fetchcomments1", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	addcomment1.find({destid:req.query.destid},function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send(data);
	
	}
	mongoose.connection.close();
	});
   }); 

app.get("/api/fetchpics", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	
	console.log(req.query);
   
	manageaddpic.find({placeid:req.query.placeid},function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send(data);
	
	}
	mongoose.connection.close();
	});
   });

   app.get("/api/fetchplacedetails", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	manageplaces.find({_id:req.query.placeid},function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send(data);
	
	}
	mongoose.connection.close();
	});
   }); 
   
   app.get("/api/fetchplacedetails1", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	manageplaces.find({typeid:req.query.catid},function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send(data);
	
	}
	mongoose.connection.close();
	});
   }); 


app.post("/api/addpic",upload.single('photo'), function(req, res) 
{
  mongoose.connect("mongodb://localhost/project");
  //var d = new Date();  
  if (!req.file) 
  {
       picname="noimage.jpg";
  };
  
  var newmanageaddpic = new manageaddpic( {rid:req.body.rid,destid:req.body.destid,placeid:req.body.placeid,pic:picname
  
  } );
  newmanageaddpic.save(function(err) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      res.send("Successfully Added");
    }
    mongoose.connection.close();
  });
});



app.post("/api/onpayment", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	 // var d = new Date();
	  
	var newpayment = new payment( {address:req.body.add,phone:req.body.ph,username:req.body.un,cardno:req.body.cardno,holdername:req.body.hname,expdate:req.body.expdt,cvvno:req.body.cvv} );
	
	newpayment.save(function(err) {
	  if (err)
	  {
		console.log(err);
		res.send("Error while signing up, try again");
	  }
	  else
	  {
		res.send("ok");
	  }
	  mongoose.connection.close();
	});
  });

app.post("/api/contactus", function(req, res) {
	mongoose.connect("mongodb://localhost/tproject");
	  var d = new Date();
	  //var t= new Time();
	  
	var newcontact = new contact( {name:req.body.name,phone:req.body.phone,email:req.body.email,message:req.body.message,date:d} );
	
	newcontact.save(function(err) {
	  if (err)
	  {
		console.log(err);
		res.send("Error while submitting, try again");
	  }
	  else
	  {
		res.send("submitted");
	  }
	  mongoose.connection.close();
	});
  });

app.put("/api/updatedestination", upload.single('photo'),function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	//var d = new Date();
	
	
	if (!req.file) 
	{
		 picname=req.body.oldpic;
	}
	else
	{
		if(req.body.oldpic!="noimage.jpg")
		{
			fs.unlink('src/uploads/' + req.body.oldpic, (err) => {
			if (err) throw err;
			console.log('file was deleted');
			});
		}
	}
	managesubcat.update({ _id: req.body.destid }, { $set: {catid:req.body.scid,subcatname:req.body.scname,introduction:req.body.introduction,reach:req.body.reach,time:req.body.time,food:req.body.food,spic:picname}},function(err) {
	  if (err)
	  {
		console.log(err);
		res.send("Failed");
	  }
	  else
	  {
		res.send("Successfully Updated");
	  }
	  mongoose.connection.close();
	});
  });


  app.put("/api/updatepackage", upload.single('photo'),function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	//var d = new Date();
	
	
	if (!req.file) 
	{
		 picname=req.body.oldpic;
	}
	else
	{
		if(req.body.oldpic!="noimage.jpg")
		{
			fs.unlink('src/uploads/' + req.body.oldpic, (err) => {
			if (err) throw err;
			console.log('file was deleted');
			});
		}
	}
	managepackage.update({ _id: req.body.packid }, { $set: {subcatid:req.body.scid,packagename:req.body.packagename,cost:req.body.cost,inclusions:req.body.inclusions,exclusions:req.body.exclusions,itinerary:req.body.itinerary,days:req.body.days,pkpic:picname}},function(err) {
	  if (err)
	  {
		console.log(err);
		res.send("Failed");
	  }
	  else
	  {
		res.send("Successfully Updated");
	  }
	  mongoose.connection.close();
	});
  });

  app.put("/api/updateplace", upload.single('photo'),function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	//var d = new Date();
	
	
	if (!req.file) 
	{
		 picname=req.body.oldpic;
	}
	else
	{
		if(req.body.oldpic!="noimage.jpg")
		{
			fs.unlink('src/uploads/' + req.body.oldpic, (err) => {
			if (err) throw err;
			console.log('file was deleted');
			});
		}
	}
	manageplaces.update({ _id: req.body.placeid }, { $set: {subcatid:req.body.destid,typeid:req.body.typeid,pname:req.body.pname,introduction:req.body.introduction,placepic:picname}},function(err) {
	  if (err)
	  {
		console.log(err);
		res.send("Failed");
	  }
	  else
	  {
		res.send("Successfully Updated");
	  }
	  mongoose.connection.close();
	});
  });


  app.put("/api/updatepic", upload.single('photo'),function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	//var d = new Date();
	
	
	if (!req.file) 
	{
		 picname=req.body.oldpic;
	}
	else
	{
		if(req.body.oldpic!="noimage.jpg")
		{
			fs.unlink('src/uploads/' + req.body.oldpic, (err) => {
			if (err) throw err;
			console.log('file was deleted');
			});
		}
	}
	manageaddpic.update({ _id: req.body.picid }, { $set: {rid:req.body.rid,destid:req.body.destid,placeid:req.body.placeid,pic:picname}},function(err) {
	  if (err)
	  {
		console.log(err);
		res.send("Failed");
	  }
	  else
	  {
		res.send("Successfully Updated");
	  }
	  mongoose.connection.close();
	});
  });


  

app.get("/api/getcart", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
  
	managepackage.find( function(err, data)
	{
	  if (err)
	  {
		console.log(err);
		res.send("Failed");
	  }
	  else
	  {
		console.log(data);
		res.send(data);
		
	  }
	  mongoose.connection.close();
	});
  });


  app.get("/api/getrequestsByUser", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	booking.find({ username:req.query.uname }, function(err, data) {
	  if (err)
	  {
		console.log(err);
		res.send("Failed");
	  }
	  else
	  {
		console.log(data);
		res.send(data);
	  }
	  mongoose.connection.close();
	});
  });
  
// app.post("/api/insertdetails",function(req,res)
// {
// mongoose.connect("mongodb://localhost/project");
// var neworder=req.body;

// pack.insertMany(neworder, function (err, docs) {
//       if (err){ 
//           return console.error(err);
//       } else {
//         console.log("Multiple documents inserted to Collection");
// res.send("Successfully inserted");
// 	  }
// 	  mongoose.connection.close();
//     });
// });

   app.post("/api/insertdetails1", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
   
	
	var newpack = new pack( {rid:req.body.rid,packagename:req.body.packagename,cost:req.body.cost,days:req.body.days,pno:req.body.pno,totalcost:req.body.totalcost,username:req.body.username} );
	
	newpack.save(function(err) {
	if (err)
	{
	console.log(err);
	res.send("Error while signing up, try again");
	}
	else
	{
	res.send("Inserted Successfully");
	}
	mongoose.connection.close();
	});
   });

   app.post("/api/insertreports", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	var d = new Date();
   
	
	var newreport = new report( {commentid:req.body.commentid,username:req.body.username,rusername:req.body.rusername,comment:req.body.comment,date:d} );
	
	newreport.save(function(err) {
	if (err)
	{
	console.log(err);
	res.send("Error while signing up, try again");
	}
	else
	{
	res.send("Inserted Successfully");
	}
	mongoose.connection.close();
	});
   });


app.get("/api/getdetail", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
  
	pack.find({ username:req.query.un}, function(err, data)
	{
	  if (err)
	  {
		console.log(err);
		res.send("Failed");
	  }
	  else
	  {
		console.log(data);
		res.send(data);
		
	  }
	  mongoose.connection.close();
	});
  });

  app.get("/api/getdetail1", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
  
	pack.find({ rid:req.query.rid}, function(err, data)
	{
	  if (err)
	  {
		console.log(err);
		res.send("Failed");
	  }
	  else
	  {
		console.log(data);
		res.send(data);
		
	  }
	  mongoose.connection.close();
	});
  });

app.get("/api/getOrderDetailsByUser", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	pack.find({ rid: req.query.rid}, function(err, data) {
	  if (err)
	  {
		console.log(err);
		res.send("Failed");
	  }
	  else
	  {
		console.log(data);
		res.send(data);
	  }
	  mongoose.connection.close();
	});
  });

app.post("/api/signup", function(req, res) {
 mongoose.connect("mongodb://localhost/tproject");

 
 var newsignup = new Signup( {name:req.body.nm,phone:req.body.ph,gender:req.body.gen,username: req.body.uname, pass: req.body.pass,usertype:req.body.utype} );
 
 newsignup.save(function(err) {
 if (err)
 {
 console.log(err);
 res.send("Error while signing up, try again");
 }
 else
 {
 res.send("Signup Successfull");
 }
 mongoose.connection.close();
 });
});



app.post("/api/booking", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
   
	var d = new Date(); 
	var newbooking = new booking( {pername:req.body.pername,pphone:req.body.pphone,paddress:req.body.paddress,pno:req.body.pno,date:req.body.date,status:"Pending",bdate:d,username:req.body.un}, {versionKey:false} );
	
	newbooking.save(function(err) {
	if (err)
	{
	console.log(err);
	res.send("Error while signing up, try again");
	}
	else
	{
	res.send("OK");
	}
	mongoose.connection.close();
	});
   });
 
   app.get("/api/getrequests", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	booking.find(function(err, data) {
	  if (err)
	  {
		console.log(err);
		res.send("Failed");
	  }
	  else
	  {
		console.log(data);
		res.send(data);
	  }
	  mongoose.connection.close();
	});
  });

  app.get("/api/getmessages", function(req, res) {
	mongoose.connect("mongodb://localhost/tproject");
	contact.find(function(err, data) {
	  if (err)
	  {
		console.log(err);
		res.send("Failed");
	  }
	  else
	  {
		console.log(data);
		res.send(data);
	  }
	  mongoose.connection.close();
	});
  });



  app.put("/api/updateStatus", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	booking.updateOne({ _id: req.body.rid}, { $set: { status: req.body.newstatus}}, function(err, data) {
	  if (err)
	  {
		console.log(err);
		res.send("Failed");
	  }
	  else
	  {
		console.log(data);
		res.send(data);
	  }
	  mongoose.connection.close();
	});
  });

  
  app.put("/api/updateStatus1", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	booking.updateOne({ username: req.body.un}, { $set: { status: req.body.newstatus}}, function(err, data) {
	  if (err)
	  {
		console.log(err);
		res.send("Failed");
	  }
	  else
	  {
		console.log(data);
		res.send(data);
	  }
	  mongoose.connection.close();
	});
  });




  app.get("/api/getbdetails", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	order.find({ rid: req.query.rid }, function(err, data) {
	  if (err)
	  {
		console.log(err);
		res.send("Failed");
	  }
	  else
	  {
		console.log(data);
		res.send(data);
	  }
	  mongoose.connection.close();
	});
  });

  app.get("/api/getrnum", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	booking.find({ username: req.query.un }, function(err, data) {
	  if (err)
	  {
		console.log(err);
		res.send("Failed");
	  }
	  else
	  {
		console.log(data);
		res.send(data);
	  }
	  mongoose.connection.close();
	}).sort({"bdate":-1});
  });

   app.post("/api/checked", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
   
	var d = new Date(); 
	var newcheckout = new checkout( {orderamount:req.body.billtot,address:req.body.add,username:req.body.un,orderdate:d,paymentmode:req.body.pmode,status:"Payment is done successfully",cardno:req.body.cardno,companyname:req.body.coname,holdername:req.body.hname,expdate:req.body.expdt,cvvno:req.body.cvv}, {versionKey:false} );
	
	newcheckout.save(function(err) {
	if (err)
	{
	console.log(err);
	res.send("Error while signing up, try again");
	}
	else
	{
	res.send("Request Sent");
	}
	mongoose.connection.close();
	});
   });   

app.post("/api/login", function(req, res) {
 mongoose.connect("mongodb://localhost/tproject");
 console.log(req.body);

 Signup.find({ username:req.body.un,pass:req.body.pass}, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send(err);
 }
 else
 {
 console.log(data);
 res.send(data);

 }
 mongoose.connection.close();
 });
});

app.get("/api/srchuser", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	Signup.find({ username:req.query.un}, function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send(data);
	mongoose.connection.close();
	}
	});
   });

   app.get("/api/memlist", function(req, res) {
	mongoose.connect("mongodb://localhost/tproject");
	console.log(req.query);
   
	Signup.find(function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send(data);
	mongoose.connection.close();
	}
	});
   });

   app.delete("/api/delmemb", function(req, res) {
	mongoose.connect("mongodb://localhost/tproject");
	console.log(req.query);
   
	Signup.remove({ _id: req.query.id }, function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send("Successfully Deleted");
	mongoose.connection.close();
	}
	});
   });

   app.put("/api/changepass", function(req, res) {
	mongoose.connect("mongodb://localhost/tproject");
	
	
	//var d = new Date();
	Signup.update({username:req.body.un,pass:req.body.cpass }, { $set: { pass: req.body.newp}},function(err,data) {
		
	if (err)
	{
	console.log(err);
	res.send("Failed");
	}
	else
	{
			
		//res.send("Successfully Updated");
	res.send(data);
	mongoose.connection.close();
	}
 });
});

app.get("/api/fetchdestdetails", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	managesubcat.find({_id:req.query.scid},function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send(data);
	
	}
	mongoose.connection.close();
	});
   });

   app.get("/api/fetchcomments12", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	addcomment.find({_id:req.query.commentid},function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send(data);
	
	}
	mongoose.connection.close();
	});
   });

   app.get("/api/fetchcomments123", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	addcomment1.find({_id:req.query.commentid},function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send(data);
	
	}
	mongoose.connection.close();
	});
   });

   app.get("/api/fetchpackagedetails", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	managepackage.find({subcatid:req.query.pid},function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send(data);
	
	}
	mongoose.connection.close();
	});
   });
   

app.post("/api/addcat",upload.single('photo'), function(req, res) 
{
 mongoose.connect("mongodb://localhost/project");
 //var d = new Date(); 
 if (!req.file) 
 {
 picname="noimage.jpg";
 };
 
 var newmanagecat = new managecat( {catname:req.body.catname,catpic:picname} );
 newmanagecat.save(function(err) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 res.send("Successfully Inserted");
 }
 mongoose.connection.close();
 });
});

app.post("/api/addpackages",upload.single('photo'), function(req, res) 
{
 mongoose.connect("mongodb://localhost/project");
 //var d = new Date(); 
 if (!req.file) 
 {
 picname="noimage.jpg";
 };
 
 var newmanagepackage = new managepackage( {subcatid:req.body.pcid,packagename:req.body.pkname,cost:req.body.cost,inclusions:req.body.inclusions,exclusions:req.body.exclusions,itinerary:req.body.itinerary,days:req.body.days,pkpic:picname} );
 newmanagepackage.save(function(err) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 res.send("Successfully Inserted");
 }
 mongoose.connection.close();
 });
});





app.get("/api/fetchallcategories", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	managecat.find(function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	
	}
	else
	{
	console.log(data);
	res.send(data);
	
	}
	mongoose.connection.close();
	});
   });

   app.post("/api/addcat1",upload.single('photo'), function(req, res) 
   {
	mongoose.connect("mongodb://localhost/project");
	var d = new Date(); 
	if (!req.file) 
	{
	picname="noimage.jpg";
	};
	
	var newmanagecat1 = new managecat1( {catname1:req.body.catname1,catpic1:picname,entrydate:d} );
	newmanagecat1.save(function(err) {
	if (err)
	{
	console.log(err);
	res.send("Failed");
	}
	else
	{
	res.send("Successfully Inserted");
	}
	mongoose.connection.close();
	});
   });
   

app.post("/api/addsubcat",upload.single('photo'), function(req, res) 
{
 mongoose.connect("mongodb://localhost/project");
 //var d = new Date(); 
 if (!req.file) 
 {
 picname="noimage.jpg";
 };
 
 var newmanagesubcat = new managesubcat( {catid:req.body.cid,subcatname:req.body.scatname,introduction:req.body.introduction,reach:req.body.reach,time:req.body.time,food:req.body.food,spic:picname} );
 newmanagesubcat.save(function(err) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 res.send("Successfully Inserted");
 }
 mongoose.connection.close();
 });
});

app.post("/api/addscat",upload.single('photo'), function(req, res) 
{
 mongoose.connect("mongodb://localhost/project");
 //var d = new Date(); 
 if (!req.file) 
 {
 picname="noimage.jpg";
 };
 
 var newmanagescat = new managescat( {catid:req.body.cid,subcatname:req.body.scatname,spic:picname} );
 newmanagescat.save(function(err) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 res.send("Successfully Inserted");
 }
 mongoose.connection.close();
 });
});

app.get("/api/fetchallcategories1", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	managecat1.find(function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send(data);
	
	}
	mongoose.connection.close();
	});
   });

app.get("/api/fetchallcategories2", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	managecat1.find(function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send(data);
	
	}
	mongoose.connection.close();
	}).limit(3).sort({"entrydate":-1});
   });   


app.get("/api/fetchsubcategories", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	managesubcat.find({catid:req.query.cat},function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send(data);
	
	}
	mongoose.connection.close();
	});
   });


   app.get("/api/fetchsubcategoryy", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	managesubcat.find({catid:req.query.region},function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send(data);
	
	}
	mongoose.connection.close();
	});
   });   

 app.get("/api/fetchpackages1", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	managepackage.find({subcatid:req.query.destid},function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send(data);
	}
	mongoose.connection.close();
	});
   });  
   
   app.get("/api/fetchplaces1", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	manageplaces.find({subcatid:req.query.subcat},function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send(data);
	}
	mongoose.connection.close();
	});
   });  
   
   app.get("/api/fetchpics1", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	manageaddpic.find({placeid:req.query.type},function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send(data);
	}
	mongoose.connection.close();
	});
   }); 

   app.get("/api/fetchplaces2", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	manageplaces.find({subcatid:req.query.destid},function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send(data);
	}
	mongoose.connection.close();
	});
   }); 

   app.get("/api/fetchpackages", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	managepackage.find({packid:req.query.pack},function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send(data);
	
	}
	mongoose.connection.close();
	});
   });   

   app.get("/api/fetchsubcategory", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	managesubcat.find(function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send(data);
	
	}
	mongoose.connection.close();
	});
   });

   app.post("/api/manageplaces",upload.single('photo'), function(req, res) 
   {
	mongoose.connect("mongodb://localhost/project");
	//var d = new Date(); 
	if (!req.file) 
	{
	picname="noimage.jpg";
	};
	
	var newmanageplaces = new manageplaces( {subcatid:req.body.subcatid,typeid:req.body.typeid,pname:req.body.pname,introduction:req.body.introduction,placepic:picname});
	newmanageplaces.save(function(err) {
	if (err)
	{
	console.log(err);
	res.send("Failed");
	}
	else
	{
	res.send("Successfully Inserted");
	}
	mongoose.connection.close();
	});
   });

   app.get("/api/fetchplaces", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	manageplaces.find({subcatid:req.query.subcat},function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send(data);
	mongoose.connection.close();
	}
	});
   });
   
   app.post("/api/addproduct",upload.single('photo'), function(req, res) 
{
 mongoose.connect("mongodb://localhost/myprojdb");
 //var d = new Date(); 
 if (!req.file) 
 {
 picname="noimage.jpg";
 };
 
 var newmanageproduct = new manageproduct( {catid:req.body.cid,subcatid:req.body.subcatid,pname:req.body.pname,prate:req.body.prate,pdesc:req.body.pdesc,
	pdiscount:req.body.pdiscount,pstock:req.body.pdiscount,spic:picname} );
 newmanageproduct.save(function(err) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 res.send("Successfully Inserted");
 }
 mongoose.connection.close();
 });
});

app.put("/api/updatecat", upload.single('photo'),function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	//var d = new Date();
	
	
	if (!req.file) 
	{
	picname=req.body.oldpic;
	}
	else
	{
		if(req.body.oldpic!="noimage.jpg")
		{
			fs.unlink('src/uploads/' + req.body.oldpic, (err) => {
			if (err) throw err;
			console.log('file was deleted');
			});
		}
	}
	managecat.update({ _id: req.body.cid }, { $set: {catname: req.body.catname, catpic:picname}},function(err) {
	if (err)
	{
	console.log(err);
	res.send("Failed");
	}
	else
	{
	res.send("Successfully Updated");
	}
	mongoose.connection.close();
	});
   });

   app.put("/api/updatecat1", upload.single('photo'),function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	//var d = new Date();
	
	
	if (!req.file) 
	{
	picname=req.body.oldpic;
	}
	else
	{
		if(req.body.oldpic!="noimage.jpg")
		{
			fs.unlink('src/uploads/' + req.body.oldpic, (err) => {
			if (err) throw err;
			console.log('file was deleted');
			});
		}
	}
	managecat1.update({ _id: req.body.cid }, { $set: {catname1: req.body.catname1, catpic1:picname}},function(err) {
	if (err)
	{
	console.log(err);
	res.send("Failed");
	}
	else
	{
	res.send("Successfully Updated");
	}
	mongoose.connection.close();
	});
   });

   app.delete("/api/delcat", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	managecat.remove({ _id: req.query.id }, function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send("Successfully Deleted");
	
	}
	mongoose.connection.close();
	});
   });

   
   app.delete("/api/delcat1", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	managecat1.remove({ _id: req.query.id }, function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send("Successfully Deleted");
	
	}
	mongoose.connection.close();
	});
   });


   app.delete("/api/delreport", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	report.remove({ _id: req.query.id }, function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send("Successfully Deleted");
	
	}
	mongoose.connection.close();
	});
   });


   app.delete("/api/delsubcat", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	managesubcat.remove({ _id: req.query.id }, function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send("Successfully Deleted");
	
	}
	mongoose.connection.close();
	});
   });

   app.delete("/api/delpack", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	managepackage.remove({ _id: req.query.id }, function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send("Successfully Deleted");
	
	}
	mongoose.connection.close();
	});
   });

   app.delete("/api/delplace", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	manageplaces.remove({ _id: req.query.id }, function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send("Successfully Deleted");
	
	}
	mongoose.connection.close();
	});
   });

   app.delete("/api/delpic", function(req, res) {
	mongoose.connect("mongodb://localhost/project");
	console.log(req.query);
   
	manageaddpic.remove({ _id: req.query.id }, function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send(err);
	}
	else
	{
	console.log(data);
	res.send("Successfully Deleted");
	
	}
	mongoose.connection.close();
	});
   });


   app.put("/updatecatt", function(req, res) {
	mongoose.connect("mongodb://localhost/projdb");
	//var d = new Date();
	managecat.update({ _id: req.body.catid }, { $set: { catname: req.body.catname}},function(err) {
	if (err)
	{
	console.log(err);
	res.send("Failed");
	}
	else
	{
	res.send("Successfully Updated");
	}
	mongoose.connection.close();
	});
   });

app.delete("/deletecat", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 console.log(req.query);

 managecat.remove({ _id: req.query.catid }, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send("Successfully Deleted");
 mongoose.connection.close();
 }
 });
});


app.post("/insertsubcat",upload.single('photo'), function(req, res) 
{
 mongoose.connect("mongodb://localhost/projdb");
 //var d = new Date(); 
 if (!req.file) 
 {
 picname="noPhotoFound.png";
 };
 
 var newmanagesubcat = new managesubcat( {catid:req.body.catid, subcatname:req.body.subcatname,spic:picname} );
 newmanagesubcat.save(function(err) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 res.send("Successfully Inserted");
 }
 mongoose.connection.close();
 });
});
//for delete sub- category using managecat component
app.delete("/deletesubcat", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 console.log(req.query);

 managesubcat.remove({ _id: req.query.subcatid }, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send("Successfully Deleted");
 mongoose.connection.close();
 }
 });
});
//update sub-categories
app.put("/updatesubcat", upload.single('photo'),function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 //var d = new Date();
 
 
 if (!req.file) 
 {
 picname=req.body.oldpic;
 }
 else
 {
	 if(req.body.oldpic!="noPhotoFound.png")
	 {
		 fs.unlink('src/uploads/' + req.body.oldpic, (err) => {
		 if (err) throw err;
		 console.log('file was deleted');
		 });
	 }
 }
 managesubcat.update({ _id: req.body.subcatid }, { $set: {catid:req.body.catid, subcatname: req.body.subcatname, spic:picname}},function(err) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 res.send("Successfully Updated");
 }
 mongoose.connection.close();
 });
});

app.post("/insertproduct" ,upload.single('photo'), function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 //var d = new Date();
 
 if (!req.file) 
 {
 picname="noPhotoFound.png";
 };
 
 var newmanageproduct = new manageproduct( { catid:req.body.catid,subcatid:req.body.subcatid,pname:req.body.productname,prate:req.body.prate,pdesc:req.body.pdesc,pdiscount:req.body.pdiscount,pstock:req.body.pstock,spic:picname} );
 newmanageproduct.save(function(err) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 res.send("Product added successfully");
 }
 mongoose.connection.close();
 });
});

app.post("/insertcart" ,function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 //var d = new Date();
 
 var newcart = new cart( {prodid:req.body.pid,pname:req.body.pname,prate:req.body.prate,qt:req.body.qt,tc:req.body.tc,ppic:req.body.ppic, username:req.body.username } );
 newcart.save(function(err) {
 if (err)
 {
 console.log(err);
 res.send("Error while adding to cart, try again");
 }
 else
 {
 res.send("Product added to cart successfully");
 }
 mongoose.connection.close();
 });
});

//get cart products from showcart component
app.get("/getcartprods", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 console.log(req.query);

 cart.find({ username:req.query.un}, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send(data);
 mongoose.connection.close();
 }
 });
});


//delete cart products from show cart products
app.delete("/deletecardprod", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 console.log(req.query);

 cart.remove({ _id: req.query.pid }, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send("Successfully Deleted");
 mongoose.connection.close();
 }
 });
});

//get order number for ordersuccess component
app.get("/getordernum", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 checkout.find({ username: req.query.un }, function(err, data) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send(data);
 }
 mongoose.connection.close();
 }).sort({"odate":-1});
});

//get cart details is as same as get cart prod api
app.get("/getcartprods", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 cart.find({ username: req.query.un }, function(err, data) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send(data);
 }
 mongoose.connection.close();
 });
});


//insert order details for ordersuccess component
app.post("/insertorderdetail",function(req,res)
{
mongoose.connect("mongodb://localhost/projdb");
var neworder=req.body;

order.insertMany(neworder, function (err, docs) {
 if (err){ 
 return console.error(err);
 } else {
 console.log("Multiple documents inserted to Collection");
res.send("Successfully inserted");
 }
 });
});

//update stock after the successful of order
app.put("/updatestock",function(req,res){
mongoose.connect("mongodb://localhost/projdb");
var updatelist=req.body;
for(let x=0;x<updatelist.length;x++)
{
manageproduct.updateOne({_id:updatelist[x].pid},{$inc: {"pstock":-updatelist[x].qt}},function(err){
if (err)
{
 console.log(err);
 res.send("Failed");
}
else
{
 console.log(data);
 //res.send("Successfully Deleted");
 mongoose.connection.close();
}

});
}
});

//empty the cart after order complition
app.delete("/emptycart", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 cart.remove({ username:req.query.un }, function(err, data) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send("removed to cart successfully");
 }
 mongoose.connection.close();
 });
});
app.get("/getproductdetailbypid", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 manageproduct.find({ _id: req.query.pid }, function(err, data) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send(data);
 }
 mongoose.connection.close();
 });
});

//get subcat by related catid manage product component
app.get("/getsubcat", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 console.log(req.query);

 managesubcat.find({ catid: req.query.catid}, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send(data);
 mongoose.connection.close();
 }
 });
});


app.get("/getprodsbysubcat", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 console.log(req.query);

 manageproduct.find({ subcatid: req.query.sid}, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send(data);
 mongoose.connection.close();
 }
 });
});

app.get("/getprodsbyquery", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 console.log(req.query);

 manageproduct.find({ "pname": {$regex:'.*' + req.query.q + '.*'}}, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send(data);
 mongoose.connection.close();
 }
 });
});


app.delete("/deleteuser", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 console.log(req.query);

 Signup.remove({ _id: req.query.un }, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send("Successfully Deleted");
 mongoose.connection.close();
 }
 });
});

app.get("/fetchuserbyun", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 console.log(req.query.uname);
 Signup.find({ username: req.query.uname}, function(err, data) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 res.send(data);
 }
 mongoose.connection.close();
 });
});

app.get("/fetchusers", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 Signup.find(function(err, data) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send(data);
 }
 mongoose.connection.close();
 });
});

app.get("/getallcategories", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb");
 managecat.find(function(err, data) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 console.log(data);
 res.send(data);
 }
 mongoose.connection.close();
 });
});


app.listen(3000, function () {
 console.log('Node.js server is running on port 3000');
});