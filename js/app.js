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
   	
	var firstTime = true;
   	$scope.show = false;
	
	$scope.languageChange = function ()
	{
		$scope.names = null;
		
		$scope.currentLanguage = repeatSelect.options[repeatSelect.selectedIndex].text;
		$http.get('php/callFor' + repeatSelect.options[repeatSelect.selectedIndex].text + 'Satts.php')
  		.then(function (response) 
  		{
			//Data from server is pulled and parsed into JSON object
			$scope.names = response.data.records;
			
			if (firstTime)
			{
				firstTime = false;
				$scope.show = true;
			}
			else
			{
				createOutputText()
			}
		},
	
		//Connection to SQL server broken		
		function errorCallback(response)
		{
			alert("Bad: " + response);
		});
	};
	
	//Convert English SATTS to Unicode to display as HTML
	$scope.change = function() 
	{
		 createOutputText();	
	};
	
	function createOutputText()
	{		
		//Text pulled from JSON
		var outputText = ""; 
		
		//Set the input as the JSON object pulled from database
		var inputText = $scope.sattsText;
		//Split each letter into element
		var inputSplit = inputText.split("");
		
		//Find Unicode match for each letter/combo
		inputSplit.forEach(function(item)
		{
			for (i = 0; i < $scope.names.length; i++)
			{
				//Trying to match English letter/combo to row
				if (item === $scope.names[i]["Ascii"])
				{
					//Add Unicode to ouputArabic to display in Unicode and Arabic
					outputText += $scope.names[i]["Decicode"];
					//break;
				}
			}
		});
	
		//languageText uses the languageHTML filter to display the Unicode with proper characters
		$scope.languageText = outputText;
		//unicodeText displays the raw unicode
		$scope.unicodeText = outputText;
	};
});
	
//Filter to display Unicode as proper local language script
app.filter('languageHTML', function($sce)
{
	return function(val) 
	{
		return $sce.trustAsHtml(val);
	};
});

