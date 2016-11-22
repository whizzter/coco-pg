module.exports=(config)=>{

	let pool=new (require('pg').Pool)( config );

	return {
		query:(qs,...param)=>{
			let rejectfn;
			let resolvefn;
			pool.connect( (err,cli,done)=>{
				if (err) {
					rejectfn(err);
					return;
				}

				cli.query(qs,param,function(err,res){
					done();
					if (err) {
						rejectfn(err);
						return;
					}
					return resolvefn(res);
				});

			} );
			
			return new Promise(function(resolve,reject){
				rejectfn=reject;
				resolvefn=resolve;
			});
		}
	};
};
