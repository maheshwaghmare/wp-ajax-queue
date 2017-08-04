/**
 * AJAX Request Queue
 *
 * => How to use?
 *
 * 	// !Important to start the queue.
 * 	WPAjaxQueue.run();
 *
 *	// Request Ajax 1.
 * 	WPAjaxQueue.add( {
 *		url: ajaxurl,
 *		type: 'POST',
 *		data: {
 *			'action'	: '',
 *			'param1'	: '',
 *			'param2'	: '',
 *		},
 *		success: function( result ){
 *			console.log( 'result' + result );
 *		}
 * 	});
 *
 * 	// Request Ajax 2.
 * 	WPAjaxQueue.add( { ... });
 * 	
 * 	// Request Ajax 3.
 * 	WPAjaxQueue.add( { ... });
 *
 * => Methods
 * 
 * - add()
 * - remove()
 * - run()
 * - stop()
 *
 * @since 1.0.0
 */
var WPAjaxQueue = (function() {

	var requests = [];

	return {

		/**
		 * Add AJAX request
		 */
		add:  function(opt) {
		    requests.push(opt);
		},

		/**
		 * Remove AJAX request
		 */
		remove:  function(opt) {
		    if( jQuery.inArray(opt, requests) > -1 )
		        requests.splice($.inArray(opt, requests), 1);
		},

		/**
		 * Run / Process AJAX request
		 */
		run: function() {
		    var self = this,
		        oriSuc;

		    if( requests.length ) {
		        oriSuc = requests[0].complete;

		        requests[0].complete = function() {
		             if( typeof(oriSuc) === 'function' ) oriSuc();
		             requests.shift();
		             self.run.apply(self, []);
		        };

		        jQuery.ajax(requests[0]);

		    } else {

		      self.tid = setTimeout(function() {
		         self.run.apply(self, []);
		      }, 1000);
		    }
		},

		/**
		 * Stop AJAX request
		 */
		stop:  function() {

		    requests = [];
		    clearTimeout(this.tid);
		}
	};

}());
