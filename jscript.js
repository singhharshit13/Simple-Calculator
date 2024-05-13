var inputstring="";
var inp,i,postindex=-1,stackindex=-1;
var stackOperators=new Array(30),post=new Array(30),answerstack=new Array(30),index=-1;
var disp;
onload=main;
function main()
{
 disp=document.getElementById("disp");
 display(0)
}
function display(inp)
{
 if(inputstring.length>=15)
 {
  alert("Input limit reached")
 }
 else
 {
  inputstring+=inp;
  disp.innerHTML=inputstring;
 }
}
function calculate()
{
 infixtopostfix();
 evaluate();
}
function allclear()
{
 inputstring="0";  
 limit=0;
 disp.innerHTML=inputstring; 
}
function infixtopostfix()
{
 for(i=0;i<inputstring.length;i++)
 {
  if((inputstring[i] in ['0','1','2','3','4','5','6','7','8','9'])||(inputstring[j]=='.'))
  {
   var j=i,
   temp="";
   while((inputstring[j] in ['0','1','2','3','4','5','6','7','8','9',])||(inputstring[j]=='.')) 
   {
    temp=temp+inputstring[j];
    j++;
   }
   i=j-1;
   post[++postindex]=parseFloat(temp);
  }
  else if(inputstring[i]==")") 
  {
   while(stackOperators[stackindex]!="(") 
   {
    post[++postindex]=stackOperators[stackindex--];
   }
   stackindex--;
  }
  else if(inputstring[i]!='.') 
  {
 while((stackindex>=0)&&(stackOperators[stackindex]!='(')&&(pref(stackOperators[stackindex])>pref(inputstring[i])))
   {
    post[++postindex]=stackOperators[stackindex--];
   }
   stackOperators[++stackindex]=inputstring[i];
  }
 }
 while(stackindex>=0)
 {
  post[++postindex]=stackOperators[stackindex--];
 }
 post[postindex+1]="D";
}
function pref(x)
{
 switch(x)
 {
  case '-':
  case '+':
  return 0;
  break;
  case '/':
  case '%':
  case '*':
  return 1;
  break;
  case '(':
  case ')':
  return 2;
  break; 
 }
}
function evaluate()
{
 for(i=0;post[i]!="D";i++)
 {
  var c=post[i];
  if((c=='+')||(c=='-')||(c=='*')||(c=='/')||(c=='%'))
  {
   switch(post[i])
   {
    case '+': answerstack[index-1]=answerstack[index-1]+answerstack[index];
    break;
    case '-': answerstack[index-1]=answerstack[index-1]-answerstack[index];
    break;
    case '*': answerstack[index-1]=answerstack[index-1]*answerstack[index];
    break;
    case '/':  
     if(parseFloat(answerstack[index])==0) 
     {
      alert("Cannot Divide By Zero")
      break;
     } answerstack[index-1]=parseFloat(answerstack[index-1])/parseFloat(answerstack[index]);
      break;
    case '%':
     if(parseFloat(answerstack[index])==0) 
     {
      alert("Cannot Divide By Zero")
      break;
     } answerstack[index-1]=Math.floor(answerstack[index-1])%Math.floor(answerstack[index]);
    } index--; } else { answerstack[++index]=post[i];
   }
  }
 answerstack[0]=Math.round(answerstack[0]*100)/100;
 disp.innerHTML=answerstack[0];
 inputstring=answerstack[0];
 postindex=-1;
 stackindex=-1;
 index=-1;
}