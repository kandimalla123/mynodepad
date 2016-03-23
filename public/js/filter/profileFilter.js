var fltrModule = angular.module('filters', []);

fltrModule.filter('paginationSearch', function ($http,$q,$log) {
	$log.debug('filters:paginationSearch called ');
	return function(searchField,searchText,items) {
		
		var filtered=[];
		$log.debug('filters:paginationSearch searchFiled is : '+searchField);
		$log.debug('filters:paginationSearch searchText is : '+searchText);
		searchText = searchText.toLowerCase();
		angular.forEach(items, function(item) {
			
			$log.debug('filters:paginationSearch field value  is : '+item.candidateName);
			var lowerText=item.candidateName.label.toLowerCase();
		    if( lowerText.indexOf(searchText) >= 0 ) {
		    	filtered.push(item);
		    }
		    	
		});

	    return 	filtered;
	};
	
});

