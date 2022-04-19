'use strict:'
class Video extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'open' })

		this.getVideoStyle()
			.then(r => {
				let style = document.createElement('style');

				const width = this.getAttribute("data-width");
				const videoWidth = `iframe{width: ${width};}`;

				const height = this.getAttribute("data-height");
				const videoHeight = `iframe{height: ${height};}`;

				style.textContent += width ? videoWidth + r : r;
				style.textContent += height ? videoHeight : 'height is undefined';
				shadow.appendChild(style)
			})

		this.getVideoLayout()
			.then(r => {
				let iFrame = document.createElement('div');
				iFrame.innerHTML = r
				const id = this.getAttribute("data-video-id");

				const video = iFrame.querySelector('iframe')
				video.setAttribute('src', `https://www.youtube.com/embed/${id}`);
				shadow.append(iFrame)
				console.log(iFrame);
			})
	}


	async getVideoLayout() {
		let layout = await fetch('components/video/video.html');
		return layout.text();

	}
	async getVideoStyle() {
		let css = await fetch('components/video/style.css');
		return css.text();
	}
}

customElements.define("yt-video", Video);