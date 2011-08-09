/*jslint white: false, undef: false, browser: true, eqeqeq: true, regexp: false, newcap: true, immed: true, onevar: false, plusplus: false maxerr: 50 */
/*global YUI:false, window:false*/

/*

currently only handles identical sizes matricies 

*/
/* $Id: matrix-math.source.js 105089 2011-06-28 17:15:02Z saw $ */
YUI.add('matrix-math', function (Y) {
	
	Y.matrixMath = {
		
		iterate:function(m1,m2,func, scope){
			var aRes = [], 
				len1 = m1.length, 
				len2 = m1[0].length, //we are assume equal size matricies, save us some time
				i,
				o = scope || this,
				j;
			

			for(i=0; i< len1; i++) {
				aRes[i] = [];
				if(len2){
					for (j=0; j < len2; j++) {
						if(Y.Lang.isArray(m2)){
							aRes[i][j] = func.call(scope,m1[i][j],m2[i][j]);
						}else{
							aRes[i][j] = func.call(scope,m1[i][j],m2);
						}
					
					}
				}else{
					if(Y.Lang.isArray(m2)){
						aRes[i] = func.call(scope,m1[i],m2[i]);
					}else{
						aRes[i] = func.call(scope,m1[i],m2);
					}
				}
			}

			return aRes;
		},
		
		add:function(m1,m2){
			return this.iterate(m1,m2, function(v1, v2){
				return v1 + v2;
			}, this);
		},
		
		subtract:function(m1,m2){
			return this.iterate(m1,m2, function(v1, v2){
				return v1 - v2;
			}, this);
		},
		
		//naive divide, not real divide
		divide:function(dividend, divisor){
			return this.iterate(dividend,divisor, function(v1,v2){
				return v1/v2;
			});

		},
		
		//not a true matrix multipky, just multiplies the corresponding values with out sums
		multiply:function(m1, m2){
			return this.iterate(m1,m2, function(v1,v2){
				return v1 * v2;
			});
		},
		
		//real matrix multiplication, if you were doing this with really big arrays
		//you might want to use web workers to parallelize 
		//http://software.intel.com/en-us/articles/a-tale-of-two-algorithms-multithreading-matrix-multiplication/
		realMultiply:function(m1, m2){
			var aRes = [], 
				len1 = m1.length, 
				len2 = m1[0].length,
				i,
				j,
				k;
				
			for(i=0; i< len1; i++) {
				aRes[i] = [];
				for (j=0; j < len2; j++) {
					for (k=0; k < len2; k++) {
						aRes[i][j] += m1[i][k] * m2[i][j];
					}
				}
			}
			
			return aRes;
		},
		
		equality:function (m1, m2){
			var ok = true;
			if(m1.length !== m2.length){
				return false;
			}
			try{
				this.iterate(m1, m2, function(v1,v2){
					if(v1 !== v2){
						ok = false;
						return 0;
					}
				});
			}catch(e){
				ok = false;
			}
			
			return ok;
		}
		
	};

	
}, '0.0.1');