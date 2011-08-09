YUI().use('image_slip', 'event', function(Y){
	var node = Y.one('#slippy');
	
	var slip = new Y.ImageSlip(node);
});