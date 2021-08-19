onmessage=function(e){
	e.data.sort((a,b) => b-a)
	self.postMessage(e.data.slice(0,100))
}

