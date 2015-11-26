function printVarEquation(n,firstPowerOfX)
		{
			nStr=""
			nStr2=""
			if(firstPowerOfX){
				if(n==1)
				{
					nStr=""
				}
				else if(n==-1)
				{
					nStr="-"
				}
				else
				{
					nStr=n;
				}
			}
			else
			{
				nStr=n;
			}
			if(n>0&&!firstPowerOfX)
			{
				nStr2="+"+nStr
			}
			else
			{
				nStr2=nStr
			}
			nStr2=nStr2+"";
			return nStr2;
		}
		
		function factors(n)
		{
			factorsAr=[];
			negative=false;
			if(n<0){n*=-1;negative=true;}
			for(i=0;i<=n;i++)
			{
				if(i==1||i<Math.sqrt(n))
				{
					if(n%i==0)
					{
						if(!negative){
							factorsAr.push([i,n/i]);
						}
						else{
							factorsAr.push([-i,n/i]);
							factorsAr.push([i,-(n/i)]);
						}
						
					}
				}
			}
			
			
			return factorsAr;
		}
		
		function fakeFactorising(a,b,c,realFactorised)
		{
			
			fakeNum=[];
			ra=Math.floor(Math.random()*(factors(a).length-1));
			rc=Math.floor(Math.random()*(factors(c).length-1));
			fakeNum[0]=factors(a)[ra][0];
			fakeNum[1]=factors(a)[ra][1];
			fakeNum[2]=factors(c)[rc][0];
			fakeNum[3]=factors(c)[rc][1];
			
			$.each(fakeNum,function(i,el){
    			if(i>1){firstPowerOfX=false;}
    			else{firstPowerOfX=true;}
    			fakeNum[i]=printVarEquation(fakeNum[i],firstPowerOfX);
    		});
			
			fakeFactorised="("+fakeNum[0]+"x"+fakeNum[2]+")("+fakeNum[1]+"x"+fakeNum[3]+")";
			if(fakeFactorised!=realFactorised)
			{
				return fakeFactorised;
			}
			else
			{
				fakeFactorising(a,b,c,realFactorised);
			}
		}
		
		function equationGen(){
    		
    		num=[];
    		//a 1
    		num[0]=Math.floor((Math.random()*6)+1);
    		//a 2
    		num[1]=Math.floor((Math.random()*6)+1);
    		//b 1/ c 1
    		num[2]=Math.floor((Math.random()*10)+1);
    		//b 2/ c 2
    		num[3]=Math.floor((Math.random()*10)+1);
    		
    		
    		
    		$.each(num,function(i,el){
    			r=Math.random();
    			if(r>0.8)
    			{
    				num[i]=el*-1;
    			}
    		});
    		numStr=[
    			num[0]*num[1],
    			(num[2]*num[1])+(num[3]*num[0]),
    			num[2]*num[3]		
    		];
			
			num2=[
    			num[0]*num[1],
    			(num[2]*num[1])+(num[3]*num[0]),
    			num[2]*num[3]		
    		];
			
			
    		$.each(numStr,function(i,el){
    			if(i>0){firstPowerOfX=false;}
    			else{firstPowerOfX=true;}
    			numStr[i]=printVarEquation(numStr[i],firstPowerOfX);
    		});
    		numStr2=num;
    		$.each(numStr2,function(i,el){
    			if(i>1){firstPowerOfX=false;}
    			else{firstPowerOfX=true;}
    			numStr2[i]=printVarEquation(numStr2[i],firstPowerOfX);
    		});
    		
    		equation=numStr[0]+"x²"+numStr[1]+"x"+numStr[2];
    		factorised="("+num[0]+"x"+num[2]+")("+num[1]+"x"+num[3]+")";
    		return [equation,factorised];
		}
		function quadraticGen(){
			equationAr=equationGen();
			problem=[equationAr[0],[equationAr[1],fakeFactorising(num2[0],num2[1],num2[2],equationAr[1]),fakeFactorising(num2[0],num2[1],num2[2],equationAr[1])],0];
			problem[1]=$.shuffle(problem[1]);
			problem[2]=problem[1].indexOf(equationAr[1]);
			return problem;
		}