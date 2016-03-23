var srvcModule = angular.module('service', []);

srvcModule.service('PaginationService', function ($http,$q,$log){
	//alert('service:PaginationService');
	var items=[];
	this.setItems=function(newItems){
		
		this.items=newItems;
		//alert(this.items.length);
	}
	this.getPagedItems=function(offset, limit){
		//alert('getPagedItems'+this.items)
		return this.items.slice(offset, offset+limit);
	}
	this.getTotal=function(){
		return this.items.length;
	}

	
});