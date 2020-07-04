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

if (Vars.ui.hudGroup) {
	loaded();
} else {
	Events.on(EventType.ClientLoadEvent, run(loaded));
}

const ritzip = () => {
const unitSpawner = extendContent(Block, "unit-spawner", {
    buildConfiguration(tile, table){
        table.addImageButton(Icon.wrench, Styles.clearTransi, run(() => {
            tile.configure(0);
        })).size(50).disabled(boolf(b => tile.entity == null));

        table.addImageButton(Icon.upOpen, Styles.clearTransi, run(() => {
            tile.configure(1);
        })).size(50).disabled(boolf(b => tile.entity == null));

        table.addImageButton(Icon.defense, Styles.clearTransi, run(() => {
            tile.configure(2);
        })).size(50).disabled(boolf(b => tile.entity == null));
    },
    pick(tile){
        const dialog = new FloatingDialog("");
        dialog.setFillParent(true);
        dialog.cont.pane(cons(p => {
            var i = 0;
            var units = Vars.content.units();
            units.each(cons(type=>{
                p.addButton(cons(t => {
                    t.left();
                    t.addImage(type.icon(Cicon.medium)).size(40).padRight(2);
                    t.add(type.localizedName);
                }), run(() => {
                    tile.entity.setUnit(type);
                    dialog.hide();
                })).pad(2).margin(12).fillX();
                if(++i % 3 == 0) p.row();
            }));
        }));
        dialog.show();
    },
    configured(tile, player, value){
        //yes im terrible at this
        var handle = [
           (tile) => this.pick(tile),
           (tile) => {
               var unit = tile.entity.unit().create(tile.entity.team());
               unit.set(tile.entity.getX(), tile.entity.getY());
               unit.add();
           },
           (tile) => tile.entity.setTeam(tile.entity.team() == Team.sharded ? Team.crux : Team.sharded)
        ];
        handle[value](tile);
    },
    damage(amount){}
});
unitSpawner.entityType = prov(() => extend(TileEntity, {
    _unit: UnitTypes.dagger,
    _team: Team.crux,
    unit(){ return this._unit },
    setUnit(unit){ this._unit = unit },
    team(){ return this._team },
    setTeam(team){ this._team = team }
}));

unitSpawner.health = 1;
unitSpawner.solid = false;
unitSpawner.configurable = true;
unitSpawner.buildVisibility = BuildVisibility.sandboxOnly;
unitSpawner.requirements = [new ItemStack(Items.copper, 1)];
unitSpawner.size = 1;
unitSpawner.update = true;
unitSpawner.localizedName = "Unit Spawner";
unitSpawner.description = "";
};
ritzip();
