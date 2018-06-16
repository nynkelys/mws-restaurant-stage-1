if (navigator.serviceWorker) {
	navigator.serviceWorker.register('index.js')
	.then(function(reg) {
		console.log('Yayyy!');
	}).catch(function(err) {
		console.log('Boo!');
	})
}