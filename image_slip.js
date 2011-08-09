/*jslint white: false, undef: true, browser: true, sloppy: true, eqeqeq: true, regexp: false, newcap: true, immed: true, onevar: false, plusplus: true maxerr: 50 */

YUI.add('image_slip', function (Y) {
	
	function ImageSlip(node){
		
		var myNode = node;
		
		var dragging = false;
		var startPoint;
		var slipperStart;
		
		
		var slipper = myNode.create('<div>');
		slipper.setStyle('height', '1010px').setStyle('width', '2048px').setStyle('background', '#ccc');
		
		slipper.setStyle('background', 'url(smithsonian.jpg)');

		node.appendChild(slipper);
		
		
		//silly run time code generation for event handling!
		var handlers = {
			mouseup:function(e){
				dragging = false;
			},
			
			mousedown:function(e){
				dragging = true;
				startPoint = [e.clientX, e.clientY];
				slipperStart = slipper.getXY();
			},
			
			mousemove:function(e){
				var diff;
				
				if(dragging){
					diff = Y.matrixMath.subtract([e.clientX, e.clientY], startPoint);
					
					slipper.setXY(Y.matrixMath.add(slipperStart, diff))
					
				}
			},
			
			click:function(e){
			
			}
		}
		
		function handleEvent(e){
			if(handlers[e.type]){
				handlers[e.type](e);
			}
		}
		
		for(var handler in handlers){
			if(handlers.hasOwnProperty(handler)){
				myNode.on(handler, handleEvent);
			}
		}
		
		return {
			
				
			
		}
		
		
	};
	
	Y.ImageSlip = ImageSlip;


}, '0.0.1', {
	requires: ['node', 'event', 'matrix-math']
});
