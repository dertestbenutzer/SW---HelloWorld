// Change APPLICATION_KEY to the one specified in your bundle.xml
streamwork.module("der.test.benutzer.googlemail.helloworld").methodClient = function (elementId, initialData) 
{
    var Control_Area = null;
    var Data_Container = null;
    var btnFetch = null;
    var btnUpdate = null;
    var txtUpdate = null;

    Control_Area = document.getElementById(elementId);
	var handlers =
	{
	    data_container_update: function(data) 
		{				
			Data_Container.innerHTML = data.value;
			alert("The data has been updated: " + data.value);					
		},

		current_data_value: function(data) 
		{
			alert("The current value is: " + data.value);
		},		
		started: function()
		{
			RenderControl(Control_Area, initialData.myData);
		}
	};
	
	function RenderControl(div, data)
	{
		
		div.innerHTML = "<H1>Welcome to the \"Hello World\" Example</H1>Enter new text: <input id=\"txtUpdate" + elementId + "\" type=\"text\">" +
						"<button id=\"btnFetch" + elementId + "\" type = \"button\">Fetch</button>" +  
						"<button id=\"btnUpdate" + elementId + "\" type=\"button\">Update</button><br><br>";
				 
		btnFetch = document.getElementById('btnFetch' + elementId);	
		btnUpdate = document.getElementById('btnUpdate' + elementId);
		txtUpdate = document.getElementById('txtUpdate' + elementId);
	
		Data_Container = document.createElement('span');	//Create a new area for our text
		Data_Container.setAttribute('class','TextArea');	//Associate our style settings to it
		Data_Container.innerHTML = data;		//Load it with our initial data
		div.appendChild(Data_Container);

		//onclick event for the update button. 
		btnUpdate.onclick = function(e) 
		{		
			//publish the changes to the PBE agent.
			handlers.clientChannel.publish({type: "set_data",data: {path: "myData",value: txtUpdate.value, return_msg: "data_container_update"}});						
		}
		//FETCH – OnClick handler.
		btnFetch.onclick = function(e) 
		{
			handlers.clientChannel.publish({type: "get_data",data: {path: "myData", return_msg: "current_data_value"}});		
		}
	}
	return handlers;
}
