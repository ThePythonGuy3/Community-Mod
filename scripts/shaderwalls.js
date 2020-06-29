const shader=this.global.communityMod.shaders;

const wallshader1=extendContent(Wall,"wallshader1",{
  draw(tile){
    Draw.shader(shader.space);
    Draw.rect(this.animRegion, tile.drawx(), tile.drawy());
    Draw.shader();
  },
  load(){
    this.super$load();
    this.animRegion=Core.atlas.find("community-mod-wallshader-2");
  }
});

const wallshader2=extendContent(Wall,"wallshader2",{
  draw(tile){
    Draw.shader(shader.time);
    Draw.rect(this.animRegion, tile.drawx(), tile.drawy());
    Draw.shader();
  },
  load(){
    this.super$load();
    this.animRegion=Core.atlas.find("community-mod-wallshader");
  }
});

const wallshader3=extendContent(Wall,"wallshader3",{
  draw(tile){
    Draw.shader(shader.bittrium);
    Draw.rect(this.animRegion, tile.drawx(), tile.drawy());
    Draw.shader();
  },
  load(){
    this.super$load();
    this.animRegion=Core.atlas.find("community-mod-wallshader-2");
  }
});

const wallshader4=extendContent(Wall,"wallshader4",{
  draw(tile){
    Draw.shader(shader.universe);
    Draw.rect(this.animRegion, tile.drawx(), tile.drawy());
    Draw.shader();
  },
  load(){
    this.super$load();
    this.animRegion=Core.atlas.find("community-mod-wallshader-2");
  }
});

const wallshader5=extendContent(Wall,"wallshader5",{
  draw(tile){
    Draw.shader(shader.coolwater);
    Draw.rect(this.animRegion, tile.drawx(), tile.drawy());
    Draw.shader();
  },
  load(){
    this.super$load();
    this.animRegion=Core.atlas.find("community-mod-wallshader");
  }
});
