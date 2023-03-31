// Variables globales
let currentSubreddit = "";
let currentPost = {};
let nsfwEnabled = false;

// Obtener imagen aleatoria de Reddit
function getRandomImage() {
	const subreddit = document.getElementById("subreddit-input").value.trim() || "pics";

	// Si se ingresa un subreddit diferente al actual, limpiar post actual
	if (subreddit !== currentSubreddit) {
		currentPost = {};
	}

	// Obtener imagen aleatoria desde Reddit
	const url = `https://www.reddit.com/r/${subreddit}/random.json`;
fetch(url)
.then(response => response.json())
.then(data => {
const post = data[0].data.children[0].data;
// Verificar si el post es una imagen y no está marcado como NSFW
if (post.post_hint === "image" && (!post.over_18 || nsfwEnabled)) {
// Si el post es el mismo que el anterior, obtener otro
if (post.id === currentPost.id) {
getRandomImage();
return;
}
// Guardar post actual y actualizar imagen y texto en la página
currentPost = post;
const img = document.getElementById("random-image");
img.src = post.url;
const postText = document.getElementById("post-text");
postText.innerHTML = ${post.title} by ${post.author};
postText.href = https://reddit.com${post.permalink};
} else {
// Si el post no es una imagen o está marcado como NSFW, obtener otro
getRandomImage();
}
})
.catch(error => console.error(error));
}

// Obtener video aleatorio de Reddit
function getRandomVideo() {
const subreddit = document.getElementById("subreddit-input").value.trim() || "videos";

// Si se ingresa un subreddit diferente al actual, limpiar post actual
if (subreddit !== currentSubreddit) {
	currentPost = {};
}

// Obtener video aleatorio desde Reddit
const url = `https://www.reddit.com/r/${subreddit}/random.json`;
fetch(url)
	.then(response => response.json())
	.then(data => {
		const post = data[0].data.children[0].data;
		// Verificar si el post es un video y no está marcado como NSFW
		if (post.post_hint === "hosted:video" && (!post.over_18 || nsfwEnabled)) {
			// Si el post es el mismo que el anterior, obtener otro
			if (post.id === currentPost.id) {
				getRandomVideo();
				return;
			}
			// Guardar post actual y actualizar video y texto en la página
			currentPost = post;
			const video = document.getElementById("random-image");
			video.src = post.media.reddit_video.fallback_url;
			video.setAttribute("controls", true);
			const postText = document.getElementById("post-text");
			postText.innerHTML = `${post.title} by ${post.author}`;
			postText.href = `https://reddit.com${post.permalink}`;
		} else {
			// Si el post no es un video o está marcado como NSFW, obtener otro
			getRandomVideo();
		}
	})
	.catch(error => console.error(error));
}

// Habilitar/deshabilitar NSFW
function toggleNsfw() {
nsfwEnabled = !nsfwEnabled;
const nsfwButton = document.getElementById("toggle-nsfw");
if (nsfwEnabled) {
nsfwButton.textContent = "NSFW ON";
} else {
nsfwButton.textContent = "NSFW OFF";
}
}

// Volver a intentar obtener una imagen aleatoria
function retry() {
if (currentPost.post_hint === "image") {
getRandomImage();
} else if (currentPost.post_hint === "hosted:video") {
getRandomVideo();
}
}

// Eventos de teclado
document.addEventListener("keyup", function(event) {
if (event.key === "Enter") {
getRandomImage();
}
});

// Eventos declick en los botones
document.getElementById("get-image-btn").addEventListener("click", getRandomImage);
document.getElementById("get-video-btn").addEventListener("click", getRandomVideo);
document.getElementById("toggle-nsfw").addEventListener("click", toggleNsfw);
document.getElementById("retry-btn").addEventListener("click", retry);
