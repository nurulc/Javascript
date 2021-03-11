/**
 * Helper functions for tyrit
 */

//setNext(["NQueen.try","","../index.html"]);

function setNext(next,prev,back) {
	prev = prev.replace('.try', '.html');
	next = next.replace('.try', '.html');
	let footer = document.querySelector('.page-footer');
	let aDiv = document.createElement('div');
	footer.appendChild(aDiv);
	let htmlStr = `<a href="${back}">Back</a>&nbsp;<a href="${prev}">${prev}</a>&nbsp;<a href="${next}">${next}</a>`;
	aDiv.innerHTML = htmlStr;
}