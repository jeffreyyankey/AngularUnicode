// JavaScript Document
var app = angular.module('sattsApp', []);
app.controller('sattsCtrl', function($scope, $http) 
{
	$scope.data = 
	{ 
		repeatSelect: null,availableOptions: 
		[
      		{id: '1', name: 'Arabic'},
      		{id: '2', name: 'Russian'}
    	]
   };
	
	
	$http.get('php/callSQLForSatts.php')
  	.then(function (response) 
  	{
		$scope.names = response.data.records;
		var jsonArr = $scope.names;
	
		//Convert English SATTS to Unicode to display as HTML
		$scope.change = function() 
		{
			var outputText = ""; //Text pulled from JSON
			
			//Set the input as the JSON object pulled from database
			var inputText = $scope.sattsText;
			//Split each letter into element
			var inputSplit = inputText.split("");
			
			//Find Unicode match for each letter/combo
			inputSplit.forEach(function(item)
			{
				for (i = 0; i < jsonArr.length; i++)
				{
					//Trying to match English letter/combo to row
					if (item === jsonArr[i]["Ascii"])
					{
						//Add Unicode to ouputArabic to display in Unicode and Arabic
						outputText += jsonArr[i]["Decicode"];
						break;
					}
				}
			});
			
			//languageText uses the languageHTML filter to display the Unicode with proper characters
			$scope.languageText = outputText;
			//unicodeText displays the raw unicode
			$scope.unicodeText = outputText;
		};	
	},
	
	//Connection to SQL server broken		
  	function errorCallback(response)
  	{
		alert("Bad: " + response);
  	});
});
	
	//Filter to display Unicode as proper local language script
	app.filter('languageHTML', function($sce) {
    return function(val) {
    return $sce.trustAsHtml(val);
	};
});

