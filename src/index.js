function checkBrackets(bracket, arrayBrackets){
  let objBracket = {"bracket" : 'not found', "position" : 0};
  for (let i = 0; i < arrayBrackets.length; i++){
      if ((bracket === arrayBrackets[i][0]) & (bracket === arrayBrackets[i][1])){
        objBracket["bracket"] = 'identic';
        objBracket["position"] = i;
        return objBracket;
      }
      if (bracket === arrayBrackets[i][0]){
        objBracket["bracket"] = 'open';
        objBracket["position"] = i;
      } 
      else if (bracket === arrayBrackets[i][1]){
        objBracket["bracket"] = 'close';
        objBracket["position"] = i;
      } 
  }
  return objBracket;
}

module.exports = function check(str, bracketsConfig) {
  let objBracket = {"bracket" : 'not found', "position" : 0};
  let stackBrackets = [];   
  for (let i = 0; i < str.length; i++){

    objBracket = checkBrackets(str[i], bracketsConfig);
    
    if (objBracket["bracket"] === 'identic'){
      let Bracket = stackBrackets.pop();
      if (Bracket === undefined) stackBrackets.push(str[i]);
      else if (Bracket != str[i]) {
        stackBrackets.push(Bracket);
        stackBrackets.push(str[i]);
      }
      continue;
    }

    if (objBracket["bracket"] === 'open') {
      stackBrackets.push(str[i]);
      continue;
    }
    else if (objBracket["bracket"] === 'close') {
      let openBracket = stackBrackets.pop();
      if (openBracket === undefined) return false;
      if (openBracket === bracketsConfig[objBracket["position"]][0]) continue;
      else return false;
    }
    else return false;
  }
  
  let a = stackBrackets.pop();

  if (a === undefined) return true;
  else return false;
}
