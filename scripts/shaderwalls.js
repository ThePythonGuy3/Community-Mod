const shader=this.global.communityMod.shaders;
var c={};

c.wallshader1=extendContent(Wall,"wallshader1",{
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

c.wallshader2=extendContent(Wall,"wallshader2",{
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

c.wallshader3=extendContent(Wall,"wallshader3",{
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

c.wallshader4=extendContent(Wall,"wallshader4",{
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

c.wallshader5=extendContent(Wall,"wallshader5",{
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

c.wallshader6=extendContent(Wall,"wallshader6",{
  draw(tile){
    Draw.shader(shader.stems);
    Draw.rect(this.animRegion, tile.drawx(), tile.drawy());
    Draw.shader();
  },
  load(){
    this.super$load();
    this.animRegion=Core.atlas.find("community-mod-wallshader");
  }
});

var arr = Object.keys(c);
for(var i=0;i<arr.length;i++){
  var obj = c[arr[i]];
  obj.health = 3000;
  obj.solid = true;
  obj.configurable = false;
  obj.buildVisibility = BuildVisibility.sandboxOnly;
  obj.requirements = [new ItemStack(Items.copper, 1)];
  obj.size = 2;
  obj.update = false;
  obj.localizedName = "SHADER WALL";
  obj.description = "h";
}
