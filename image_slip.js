/*jslint white: false, undef: true, browser: true, sloppy: true, eqeqeq: true, regexp: false, newcap: true, immed: true, onevar: false, plusplus: true maxerr: 50 */

YUI.add('image_slip', function (Y) {
	
	function ImageSlip(node){
		
		var myNode = node;
		
		var dragging = false,
		startPoint,
		slipperStart,
		slipper,
		fileWidth = 2048,
		fileHeight = 1010,
		cellSize = 256,
		numRows  = Math.ceil(fileHeight/cellSize),
		numCols = Math.ceil(fileWidth/cellSize),
		rowSide = 0, rowTop = 0,
		
		tileMap = {}, winHeight, winWidth;
		
		for (var i=0; i < numRows; i++) {
			
			rowSide = 0;
			for (var j=0; j < numCols; j++) {
				var tileKey = 'c' + i + '_' + j;
				

				tileMap[tileKey] = {
					top: rowTop,
					side: rowSide,
					url: 'img_'+rowSide+'x'+rowTop+'.jpg'
					// url: 'http://tweetsong.stephenwoods.net/crop?farm=7&path=/6016/5958389646_b75c6409a2_o.jpg&width=2048&crop=256x256%2B'+rowSide+'%2B'+rowTop
				}; //simple hashtable whynot?
				rowSide = rowSide + 256;
			
			};
			
			rowTop = rowTop + 256;
		};
		
		
		
		//silly run time code generation for event handling!
		var handlers = {
			mouseup:function(e){
				dragging = false;
				findVisibleTiles();
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
				findVisibleTiles();
			},
			
			click:function(e){
			
			}
		}
		
		function init(){
			slipper = myNode.create('<div>');
			slipper.setStyle('height', '1010px').setStyle('width', '2048px').setStyle('background', '#ccc');

			// slipper.setStyle('background', 'url(http://farm7.static.flickr.com/6016/5958389646_35409015e0.jpg)');

			slipper.setStyle('background-size', '100%');
			
			winHeight = myNode.get('offsetHeight');
			winWidth  = myNode.get('offsetWidth');


			node.appendChild(slipper);
			findVisibleTiles();
		}
		
		function checkVis(tile){
			
		}
		
		function findVisibleTiles(){
			var offset = slipper.getXY();
			var thisTile;
			
			var localHeight = winHeight - offset[1];
			var localWidth  = winWidth - offset[0];
			for(var key in tileMap){
				
				if(tileMap.hasOwnProperty(key)){
					thisTile = tileMap[key];
					if((thisTile.side >= offset[0] && thisTile.side < localWidth) && (thisTile.top <= localHeight && thisTile.top >= offset[1])){
						if(thisTile.el){
							thisTile.el.setStyle('display', 'block');
						}else{
							var thisEl = slipper.create('<div>');
							thisEl.setStyle('background', 'url('+ thisTile.url +')');
							thisEl.setXY([thisTile.side, thisTile.top]);
							thisEl.addClass('tile');
							slipper.appendChild(thisEl);
							thisTile.el = thisEl;
						}

					}else{
						if(thisTile.el){
							thisTile.el.setStyle('display', 'none');
						}
					}
				}
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
			
			init:init
			
		}
		
		
	};
	
	Y.ImageSlip = ImageSlip;


}, '0.0.1', {
	requires: ['node', 'event', 'matrix-math']
});
