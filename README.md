# AJAX Request Queue

### Enqueue JS.

Enqueue `wp-ajax-queue.js` with below code.

<pre>
function wp_ajax_queue_enqueue_script() {
	wp_enqueue_script( 'wp-ajax-queue', 'wp-ajax-queue.js', array( 'jquery' ) );
}

add_action( 'wp_enqueue_scripts', 'wp_ajax_queue_enqueue_script' );
</pre>

### How to use?

<pre>
// !Important to start the queue.
WPAjaxQueue.run();

// Request Ajax 1.
WPAjaxQueue.add( {
	url: ajaxurl,
	type: 'POST',
	data: {
		'action'	: '',
		'param1'	: '',
		'param2'	: '',
	},
	success: function( result ){
		console.log( 'result' + result );
	}
});

// Request Ajax 2.
WPAjaxQueue.add( { ... });

// Request Ajax 3.
WPAjaxQueue.add( { ... });

</pre>

### Methods
- add()
- remove()
- run()
- stop()
