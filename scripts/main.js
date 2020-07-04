require("community-mod/shaders");
require("shaderwalls");

const Music = Packages.arc.audio.Music;

function _load(name, func) {
	Core.assets.load("sounds/" + name + ".ogg", Music).loaded = cons(func);
}

function load(name, dark) {
	_load(name, music => {
		Vars.control.music[dark ? "darkMusic" : "ambientMusic"].add(music);
	});
}

function loadTo(name, key) {
	_load(name, music => {
		Musics[key] = music;
	});
}

function loaded() {
	//Vars.control.music.darkMusic.clear();
	Vars.control.music.ambientMusic.clear();

	//loadTo("Endless - Keep Calm", "editor");
	//load("Jasper Byrne - Decade Dance", true);
	//load("Jasper Byrne - Voyager");
	//load("Mega Drive - NARC", true);
	load("h");
	//load("MOON - Hydrogen", true);
	//loadTo("MOON - Paris", "launch");
	loadTo("h", "menu");
}

/*if (Vars.ui.hudGroup) {
	loaded();
} else {
	Events.on(EventType.ClientLoadEvent, run(loaded));
}*/
loaded();

const ritzip = () => {
	require("unitSpawner")
};
ritzip();
