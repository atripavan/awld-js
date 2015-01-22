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
			var xmlhttp, popupTxt="";
			console.log("url key:"+urlKey);
			if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
			  xmlhttp=new XMLHttpRequest();
			}
			else {// code for IE6, IE5
			  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.onreadystatechange=function() {
				if (xmlhttp.readyState==4) {
					console.log("in xmlhttp:"+urlKey);
					jsondata = JSON.parse(xmlhttp.responseText);
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
			}

			xmlhttp.open("GET","extmodules/urlinfo/urltozot.json",false);
			xmlhttp.send();
			console.log("Popup text");
			console.log(popupTxt);
            htmldata.description = popupTxt;
			return htmldata;
        }
    };
});
