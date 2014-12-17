var express = require('express');
var router = express.Router();

  var expenses = [
    // expense:  id, group_id, amount, date, description, category
	 {id:0, date:'2014-12-12', category: 'Gas', amount: 23.78, description: 'Honda Car' } ,
	 {id:1, date:'2014-12-1', category: 'Gas', amount: 43.78, description: 'Tour Car' } ,
	 {id:2, date:'2014-12-1', category: 'Gas', amount: 43.78, description: '2nd Car' } ,
	 {id:3, date:'2014-12-1', category: 'Groceries', amount: 76.00, description: '2nd Car' }
  ];
  
  var expense_group = [ {id: 0, date: '2014-12-01', name: 'Dec 2014'}, 
						{id: 1, date: '2014-11-01', name: 'Nov 2014'},
						{id: 2, date: '2014-10-01', name: 'Oct 2014'},];

						

/* GET users listing. */
router.get('/', function(req, res) {
  res.json(expenses);
});

router.post('/', function(req, res) {
	console.log('request body' + req.body);
	console.log('request body' + req.body.id);
	
    expenses.push(req.body);
	res.status(200).end();
});

router.get('/bycategory', function(req, res){
	    
		var byCategory = {};
		var totalExpense = 0;
		for(i in expenses){
		  if(expenses[i].category){
			if(byCategory[expenses[i].category]){
			  byCategory[expenses[i].category] += expenses[i].amount;
			}else{
			  byCategory[expenses[i].category] = expenses[i].amount;
			}   
			totalExpense += expenses[i].amount;				
			}
		}
		byCategory.Total = totalExpense;
		console.log("groupByCategory" + byCategory);
		
		res.json(byCategory);
	});

	
router.get('/bycategory/:category_id', function(req, res){
	      var icategory = req.params.category_id;
		 var byCategory = [];
		  for(i in expenses){
			if(expenses[i].category == icategory){
				byCategory.push(expenses[i]);
			}
		  }
		console.log("groupByCategory" + byCategory);
		
		res.json(byCategory);
	});
	
	

// push to codeship	
module.exports = router;
