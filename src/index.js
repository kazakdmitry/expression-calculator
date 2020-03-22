function eval() {
    // Do not use eval!!!
    return;
}

signObj={
	'(':0,
	')':0
	
};

function Checkqoutes(arr){
	for (var i=0;i<arr.length;i++){
		if(arr[i]=='('){
			signObj['('] +=1;
		}
		if(arr[i]==')'){
			signObj[')'] +=1;
		}
	}
	if(signObj['(']==signObj[')']){
		qoutes = true;
	}
	else{
		qoutes =false;
	}
	return qoutes;
}
function check(arr){
	var count=0;
	for (var k=0;k<arr.length;k++){
		if ((arr[k]=='(')||(arr[k]==')')){
			count +=1;
		}
	}
	if (count==0){
		return false;
	}
	else{
		return true;
	}
}

function calc(expr){
	var arr=[];
	expr=expr.replace(/\s+/g, '');
	var num='';
	for(var i=0; i<expr.length; i++){
		if((expr[i]!='+')&&(expr[i]!='-')&&(expr[i]!='/')&&(expr[i]!='*')){
			num +=expr[i];
		}
			
		if((expr[i]=='+')||(expr[i]=='-')||(expr[i]=='/')||(expr[i]=='*')){
			if(num==''){
				num +=expr[i];
				continue;
			}
			arr.push(Number(num));
			arr.push(expr[i]);
			num='';
		}
		if(i==expr.length-1){
			arr.push(Number(num));
		}
	}
	return arr;
}
function express(arr){
	var k=0;
	var sum=0;
	while(k!=arr.length){
		if ((typeof(arr[k])=="number")||(arr[k]=="+")||(arr[k]=="-")){
			k+=1;
			continue;
		}
		if(arr[k]=='/'){
			if(arr[k+1]=="-"){
				sum=arr[k-1]/arr[k+2]*(-1);
			}
			sum=arr[k-1]/arr[k+1];
			arr[k-1]=sum;
			arr.splice(k,2);
			
		}
		if(arr[k]=='*'){
			if(arr[k+1]=="-"){
				sum=arr[k-1]*arr[k+2]*(-1);
			}
			sum=arr[k-1]*arr[k+1];
			arr[k-1]=sum;
			arr.splice(k,2);
			
		}
	}
	return arr;
}

function plusMinus(arr){
	var k=0;
	var sum=0;
	while(k!=arr.length){
		if ((typeof(arr[k])=="number")){
			k+=1;
			continue;
		}
		if(arr[k]=='+'){
			sum=arr[k-1]+arr[k+1];
			arr[k-1]=sum;
			arr.splice(k,2);
			
		}
		if(arr[k]=='-'){
			sum=arr[k-1]-arr[k+1];
			arr[k-1]=sum;
			arr.splice(k,2);
			
		}
	}
	return arr[0];	
}




function expressionCalculator(expr) {
    expr=expr.replace(/\s+/g, '');
	var number1=0;
	var number2=0;
	var x;
	var qoutes = Checkqoutes(expr);
	/*if (qoutes===false){
		throw "ExpressionError: Brackets must be paired";
	}*/
	var k=0;
	while(k!=expr.length){
		
		if (expr[k]=='('){
			number1=k;
			k+=1;
		}
		if (expr[k]==')'){
			number2=k;
			k+=1;
		}
		if((expr[k]!=')')&&(expr[k]!='(')){
			k+=1;
		}
		
		if(number2!=0){
			var subExpr=expr.substring(number1+1,number2);
			var t = calc(subExpr);
			var r = express(t);
			x=plusMinus(r);
			expr=expr.split('');
			expr[number1]=x;
			expr.splice(number1+1,number2-number1);
			expr=expr.join('');
			k=0;
			number1=0;
			number2=0;
			var ch = check(expr);
			if (ch==true){
				continue;
			}
			else{break;}	
		}
		
		
		
	}
	var t = calc(expr);
	var r = express(t);
	x=plusMinus(r);
	
	return x;
	
	
	
}

module.exports = {
    expressionCalculator
}