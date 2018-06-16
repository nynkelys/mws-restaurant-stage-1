if (navigator.serviceWorker) {
	navigator.serviceWorker.register('index.js')
	.then(function(reg) {
		console.log('Service Worker installed successfully!');
		// Here we could potentially add sw state checkers
	}).catch(function(err) {
		console.log('Service Worker failed to install!');
	})
}