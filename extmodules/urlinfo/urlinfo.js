// Module: Zotero records

define(['jquery'], function($) {
	var urlKey;
    return {
        name: 'Zotero Record',
        type: 'record',
        toDataUri: function(uri) {
			urlKey = uri;			
            return uri;
        },
        // corsEnabled: true,
        // add name to data
        parseData: function(htmldata) {	
			var popupTxt="";
			console.log("url key:"+urlKey);
			$.ajax({
				async: false,
				dataType: "json",
				url: "extmodules/urlinfo/urltozot.json",
				success: function(jsondata){
					console.log("in xmlhttp:"+urlKey);
					// jsondata = JSON.parse(responseText);
					 $.each(jsondata['data'], function(i, item){
						Object.keys(item).forEach(function(k){
							// console.log("k:"+k);
							if(k === urlKey){									
								$.each(item[urlKey], function(i, item) {						
									popupTxt = '<b>Title:</b> '+item['title']+'<br/>'+'<b>Zotero Item Key:</b> '+item['key']+
										'<br/>'+'<b>Original Blog URL:</b> '+
											'<a href="'+item['blogurl']+'">'+item['blogurl']+'</a>';
								});
							}
						});
					});
				}
			});

			console.log("Popup text");
			console.log(popupTxt);
            htmldata.description = popupTxt;
			return htmldata;
        }
    };
});
