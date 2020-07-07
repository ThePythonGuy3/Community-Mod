const shader=this.global.communityMod.shaders;

const wallEffect = newEffect(20, h => {
	Draw.color(Color.valueOf("8fdbb2"), Color.valueOf("7ec49f"), h.fin());
	Lines.spikes(h.x, h.y, Mathf.sin(h.fout()*3)*10, Mathf.sin(h.fout())*2, 8, h.fin()*50);
});

const hbomb = extendContent(Wall, "hbomb", {
	load(){
		var modnamed = "community-mod-";
		this.region = Core.atlas.find(modnamed + "hbomb-region");
		this.sphereRegion = Core.atlas.find(modnamed + "hbomb-spheres");
		this.toppRegion = Core.atlas.find(modnamed + "hbomb-topp");
	},
	draw(tile){
		entity = tile.ent();
		Draw.shader(shader.specciali);
		Draw.rect(this.region, tile.drawx(), tile.drawy());
		Draw.reset();
		Draw.rect(this.sphereRegion, tile.drawx(), tile.drawy(), Time.time() * (entity.getForce()/200));
		Draw.rect(this.toppRegion, tile.drawx(), tile.drawy(), 360 - ((Time.time() * (entity.getForce()/200))%360));
	},
	handleBulletHit(entity, bullet){
    	if(entity != null && bullet != null){
    		entity.damage(bullet.damage()*0.3);
    		Effects.effect(wallEffect, entity.x, entity.y, entity.rotation - 90);
    		entity.setForce(entity.getForce()+bullet.damage()*2);
    	}
  	},
  	buildConfiguration(tile, table){
  		entity = tile.ent();
    	table.addImageButton(Icon.waves, Styles.clearTransi, run(() => {
      		tile.configure(0)
 		})).size(50).disabled(boolf(b => entity.getForce()<1));
  	},
  	configured(tile, value){
  		entity = tile.ent();
    	if(entity.getForce()>0){
      		Damage.damage(tile.team, tile.drawx(), tile.drawy(), entity.getForce()*10, entity.getForce()*2);
    		entity.setForce(0);
    	}
  	}
});
hbomb.entityType = prov(() => {
	const entity = extend(TileEntity, {
		getForce: function(){
			return this._force;
		},
		setForce: function(val){
			this._force = val;
		}
	});
	entity.setForce(0);
	return entity;
});
