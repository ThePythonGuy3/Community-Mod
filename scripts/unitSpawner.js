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
    }
});
unitSpawner.entityType = prov(() => extend(TileEntity, {
    _unit: UnitTypes.dagger,
    _team: Team.crux,

    unit(){ return this._unit },
    setUnit(unit){ this._unit = unit },
    team(){ return this._team },
    setTeam(team){ this._team = team },
    damage(amount){}
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
