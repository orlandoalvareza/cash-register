const currencyDicc = {
    'ONE HUNDRED': 10000,
    'TWENTY': 2000,
    'TEN': 1000,
    'FIVE': 500,
    'ONE': 100,
    'QUARTER': 25,
    'DIME': 10,
    'NICKEL': 5,
    'PENNY': 1
  };
  
  function checkCashRegister(price, cash, cid) {
    
    let count = 0;
    let output = [];
    let change = cash *100 - price *100;
  
    for(let item of cid) {
      count += item[1] *100;
    }
  
    if(count === change) {
      return {status: "CLOSED", change: cid};
    } else if(count < change) {
      return {status: "INSUFFICIENT_FUNDS", change: []};
    } else {
      let newCid = cid.reverse();
  
      for(let item of newCid) {
        item[1] *= 100;
        let arr = [item[0], 0];
  
        while(currencyDicc[item[0]] <= change && item[1] > 0) {
          change -= currencyDicc[item[0]];
          item[1] -= currencyDicc[item[0]];
          arr[1] += currencyDicc[item[0]]/100;
        }
  
        if(arr[1] > 0) {
          output.push(arr);
        }
      } 
  
      if(change > 0) {
        return {status: "INSUFFICIENT_FUNDS", change: []};
      } 
      return {status: "OPEN", change: output};
    }
  }
  
  checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);