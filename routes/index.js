var express = require('express');
var router = express.Router();
var monk = require('monk');  //get the monk javascript
var moment = require('moment'); //get the moment data
var dbs=monk('mongodb://admin:admin123@ds155916.mlab.com:55916/my_cricket_adda');
var scoreCollection = dbs.get("score");
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});
router.get('/admin', function(req, res, next) {
    res.render('admin');
});

//score post method
router.post('/score_update', function(req, res){
    var score = Number(req.body.score);
    var total_run = 0;
    scoreCollection.findOne({},{ sort: { _id: -1 } }, function(err, doc){
        if(err){
            res.send("Error is " + err);
        }
        else
        {
            if (doc) {
                total_run = doc.total_run + total_run;
                
            }
            else{
                total_run = 0;
            }
            try{
                data = { 
                    team : "IND",
                    newrun : score,
                    total_run : total_run+score 
                };
                // console.log(data);
                 // insert the data into the database
                 scoreCollection.insert(data, function(err, msg){
                    if(err){
                        res.send(err);
                    }
                    else{
                        res.send('Run is updated');
                    }
                 })
                }
                catch(e){
                    throw new Error('Some thing went wrong')
                }
            }
        });

})

// over method
router.post('/over_update', function(req, res){
    var ball = Number(req.body.ball);
    console.log(ball);

    try{
        switch(ball)
        {
            case 0: //correct ball
            extra_run = 0;  
            break;
            case -1: //wide ball
            extra_run = 1;   
            break;
            case -2:  //No ball
            extra_run = 1;
        }
        scoreCollection.findOne({},{ sort: { _id: -1 } }, function(err, doc){
            if(err){
               console.log("Error is " + err);
            }
            else{
                total_run = doc.total_run; //take the run add
                new_run = doc.newrun;
                data = {
                    team : "IND",
                    newrun : new_run,
                    total_run : total_run+extra_run,
                    extra : ball
                };
                scoreCollection.insert(data, function(err, result){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.send('over is updated');
                    }
                });
            }
        });
    }
    catch(e){
        throw new Error('Some thing went wrong')
    }
    
});




// ========================================Data retrival =========================
router.get("/retriveover", function(req, res){
    scoreCollection.count({extra : 0}, function(err, result){
        if(err){
            console.log(err);
        }
        else{
            over = parseInt(result / 6);
            ball = result % 6;
            total_over = over+"."+ball;
            res.send(total_over);
                     
        }
    });
});
router.get("/retrivlast", function(req, res){
   scoreCollection.findOne({},{ sort: { _id: -1 } }, function(err, data){
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log(data);
        res.send(data);
    }
});  
});
module.exports = router;
