this.global.communityMod={};
this.global.communityMod.shaders={};
if(!Vars.headless){
  try{

    importPackage(Packages.arc.graphics.gl);
    this.global.communityMod.shaders.bittrium = new JavaAdapter(Shader, {
      apply(){
        this.setUniformf("u_time", Time.time() / Scl.scl(1.0));
      }
    },
    //todo make multiline strings work
    "uniform mat4 u_projTrans;attribute vec4 a_position;attribute vec2 a_texCoord0;attribute vec4 a_color;varying vec4 v_color;varying vec2 v_texCoord;void main(){gl_Position = u_projTrans * a_position;v_texCoord = a_texCoord0;v_color = a_color;}", "#ifdef GL_ES\nprecision mediump float;precision mediump int;\n#endif\nuniform sampler2D u_texture;uniform float u_time;varying vec4 v_color;varying vec2 v_texCoord;void main(){vec4 color = texture2D(u_texture, v_texCoord.xy);float t = clamp((sin(u_time * .01 + gl_FragCoord.x * .01 + gl_FragCoord.y * .005) + 1.) / 2., 0., 1.);vec3 c = vec3(mix(0., 1., t), mix(.89, .39, t), mix(1., .85, t));gl_FragColor = vec4(color.rgb * c.rgb, color.a);}");

    this.global.communityMod.shaders.space = new JavaAdapter(Shader, {
      apply(){
        this.setUniformf("u_resolution", Core.graphics.getWidth(), Core.graphics.getHeight());
        this.setUniformf("u_time", Time.time()%3141.5926 / Scl.scl(1.0));
      }
    },
    //todo make multiline strings work
    "uniform mat4 u_projTrans;attribute vec4 a_position;attribute vec2 a_texCoord0;attribute vec4 a_color;varying vec4 v_color;varying vec2 v_texCoord;void main(){gl_Position = u_projTrans * a_position;v_texCoord = a_texCoord0;v_color = a_color;}", "#ifdef GL_ES \nprecision mediump float; \n#endif \nuniform sampler2D u_texture;  \nvarying vec4 v_color;  \nvarying vec2 v_texCoord; \nuniform vec2 u_resolution; \nuniform float u_time;  \n#define PI 2.14159  \nvoid main(void){ \nfloat time = 10.0*sin(u_time*0.002);  \nvec4 color = texture2D(u_texture, v_texCoord.xy);  \nvec2 uv = gl_FragCoord.xy / u_resolution.xy;  \nfloat formafinal  = sin(uv.x*10.*PI+time + sin(uv.y*2.*PI+time + sin(uv.x*10.*PI-time + sin(uv.y*10.*PI-time + sin(uv.x*10.*PI-time + sin(uv.y*10.*PI-time) + sin(uv.x*10.*PI-time))))))*0.5+0.5;  \nfloat formafinal2 = sin(uv.y*10.*PI+time + sin(uv.y*10.*PI+time + sin(uv.x*8.*PI-time + sin(uv.y*5.*PI-time + sin(uv.x*10.*PI-time + sin(uv.y*2.*PI-time) + sin(uv.x*9.*PI-time))))))*0.5+0.5;  \nvec3 color1 = vec3(0.900,0.1,0.7);  \nvec3 color2 = vec3(0.300,0.9,0.05);  \nvec3 fin = color1 * formafinal + color2 * formafinal2;  \ngl_FragColor = vec4(color.rgb * fin, color.a);  \n}");

    this.global.communityMod.shaders.time = new JavaAdapter(Shader, {
      apply(){
        this.setUniformf("u_resolution", Core.graphics.getWidth(), Core.graphics.getHeight());
        this.setUniformf("u_time", Time.time() / Scl.scl(1.0));
      }
    },
    //todo make multiline strings work
    "uniform mat4 u_projTrans;attribute vec4 a_position;attribute vec2 a_texCoord0;attribute vec4 a_color;varying vec4 v_color;varying vec2 v_texCoord;void main(){gl_Position = u_projTrans * a_position;v_texCoord = a_texCoord0;v_color = a_color;}", "#ifdef GL_ES\nprecision highp float;\n#endif\n#define PI 3.14159265\nuniform sampler2D u_texture;\nvarying vec4 v_color;\nvarying vec2 v_texCoord;\nuniform float u_time;\nuniform vec2 u_resolution;\nvoid main( void ) {\nvec4 color = texture2D(u_texture, v_texCoord.xy);\nfloat time = u_time*0.0001;\nfloat color1, color2, color3;\ncolor1 = (sin(dot(gl_FragCoord.xy,vec2(sin(time*1.0),cos(time*3.0)))*0.02+time*4.0)+1.0)/2.0;\nvec2 center = vec2(u_resolution.x, u_resolution.y) + vec2(u_resolution.x/2.0*sin(-time*3.0),u_resolution.y/2.0*cos(-time*10.0));\ncolor2 = (cos(length(gl_FragCoord.xy - center)*0.03)+1.0)/2.0;\ncolor3 = (color1+ color2)/2.0;\nfloat red   = (cos(PI*color3/0.5+time*3.0)+1.0)/2.0;\nfloat green   = (sin(PI*color3/0.5+time*3.0)+1.0)/2.0;\nfloat blue   = (sin(PI*color3/0.25+time*3.0)+1.0)/2.0;\nvec3 fin = vec3(blue+0.6, red+0.5, green+0.5);\ngl_FragColor = vec4(color.rgb * fin, color.a);\n}");

    this.global.communityMod.shaders.universe = new JavaAdapter(Shader, {
      apply(){
        this.setUniformf("u_resolution", Core.graphics.getWidth(), Core.graphics.getHeight());
        this.setUniformf("u_time", Time.time() / Scl.scl(1.0));
      }
    },
    //todo make multiline strings work
    "uniform mat4 u_projTrans;attribute vec4 a_position;attribute vec2 a_texCoord0;attribute vec4 a_color;varying vec4 v_color;varying vec2 v_texCoord;void main(){gl_Position = u_projTrans * a_position;v_texCoord = a_texCoord0;v_color = a_color;}", "#ifdef GL_ES\nprecision highp float;\n#endif\n#define iterations 17\n#define formuparam 0.53\n#define volsteps 20\n#define stepsize 0.1\n#define zoom   0.800\n#define tile   0.850\n#define speed  0.00010 \n#define brightness 0.0015\n#define darkmatter 0.300\n#define distfading 0.730\n#define saturation 0.850\nuniform sampler2D u_texture;\nvarying vec4 v_color;\nvarying vec2 v_texCoord;\nvec2 iResolution = vec2(1200.0,1200.0);\nuniform float u_time;\nvoid main(void)\n{\n   //get coords and direction\n   vec2 uv=gl_FragCoord.xy/iResolution.xy-.5;\n   uv.y*=iResolution.y/iResolution.x;\n   vec3 dir=vec3(uv*zoom,1.);\n  \n   float time=u_time*speed+.25;\n   //mouse rotation\n   float a1=.0;\n   float a2=.0;\n   mat2 rot1=mat2(cos(a1),sin(a1),-sin(a1),cos(a1));\n   mat2 rot2=mat2(cos(a2),sin(a2),-sin(a2),cos(a2));\n   dir.xz*=rot1;\n   dir.xy*=rot2;\n   vec3 from=vec3(1.,.5,0.5);\n   from+=vec3(time*2.,time,-2.);\n   from.xz*=rot1;\n   from.xy*=rot2;\n   \n   //volumetric rendering\n   float s=0.1,fade=1.;\n   vec3 v=vec3(0.);\n   for (int r=0; r<volsteps; r++) {\n      vec3 p=from+s*dir*.5;\n      p = abs(vec3(tile)-mod(p,vec3(tile*2.))); // tiling fold\n      float pa,a=pa=0.;\n      for (int i=0; i<iterations; i++) { \n         p=abs(p)/dot(p,p)-formuparam; // the magic formula\n         a+=abs(length(p)-pa); // absolute sum of average change\n         pa=length(p);\n      }\n      float dm=max(0.,darkmatter-a*a*.001); //dark matter\n      a*=a*a; // add contrast\n      if (r>6) fade*=1.-dm; // dark matter, don't render near\n      //v+=vec3(dm,dm*.5,0.);\n      v+=fade;\n      v+=vec3(s,s*s,s*s*s*s)*a*brightness*fade; // coloring based on distance\n      fade*=distfading; // distance fading\n      s+=stepsize;\n   }\n   v=mix(vec3(length(v)),v,saturation); //color adjust\n   vec3 fin = v*.01;   \nvec4 color = texture2D(u_texture, v_texCoord.xy);\n   gl_FragColor = vec4(color.rgb * fin, color.a);\n}");

    this.global.communityMod.shaders.coolwater = new JavaAdapter(Shader, {
      apply(){
        this.setUniformf("u_resolution", Core.graphics.getWidth(), Core.graphics.getHeight());
        this.setUniformf("u_time", Time.time() / Scl.scl(1.0));
      }
    },
    //todo make multiline strings work
    "uniform mat4 u_projTrans;attribute vec4 a_position;attribute vec2 a_texCoord0;attribute vec4 a_color;varying vec4 v_color;varying vec2 v_texCoord;void main(){gl_Position = u_projTrans * a_position;v_texCoord = a_texCoord0;v_color = a_color;}", "#ifdef GL_ES\nprecision highp float;\n#endif\n#define TAU 6.28318530718\n#define MAX_ITER 5\nuniform float u_time;\nuniform vec2 u_resolution;\nuniform sampler2D u_texture;\nvarying vec4 v_color;\nvarying vec2 v_texCoord;\nvoid main( void ) \n{\nvec2 iResolution = u_resolution;\n   float time = u_time * 0.01 * .5+23.0;\n    // uv should be the 0-1 uv of texture...\n  \n   vec2 uv = gl_FragCoord.xy / iResolution.xy;\n  vec2 p = mod(uv*TAU, TAU)-250.0;\n   vec2 i = vec2(p);\n   float c = 1.0;\n   float inten = .005;\n   for (int n = 0; n < MAX_ITER; n++) \n   {\n      float t = time * (1.0 - (3.5 / float(n+1)));\n      i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));\n      c += 1.0/length(vec2(p.x / (sin(i.x+t)/inten),p.y / (cos(i.y+t)/inten)));\n   }\n   c /= float(MAX_ITER);\n   c = 1.17-pow(c, 1.4);\n   vec3 fin = vec3(pow(abs(c), 8.0));\n    fin = clamp(fin + vec3(0.0, 0.35, 0.5), 0.0, 1.0);\n    vec4 color = texture2D(u_texture, v_texCoord.xy);\n   gl_FragColor = vec4(color.rgb * fin, color.a);\n}");

    this.global.communityMod.shaders.stems = new JavaAdapter(Shader, {
      apply(){
        this.setUniformf("u_resolution", Core.graphics.getWidth(), Core.graphics.getHeight());
        this.setUniformf("u_time", Time.time() / Scl.scl(1.0));
      }
    },
    //todo make multiline strings work
    "uniform mat4 u_projTrans;attribute vec4 a_position;attribute vec2 a_texCoord0;attribute vec4 a_color;varying vec4 v_color;varying vec2 v_texCoord;void main(){gl_Position = u_projTrans * a_position;v_texCoord = a_texCoord0;v_color = a_color;}", "#ifdef GL_ES\nprecision highp float;\n#endif\n// glslsandbox uniforms\nuniform sampler2D u_texture;\nvarying vec4 v_color;\nvarying vec2 v_texCoord;\nuniform float u_time;\n//uniform vec2 resolution;\nuniform vec2 u_resolution;\nfloat f(vec3 x){\n  x.z-=(u_time*0.01);\n  float a=(x.z*0.1);\n  x.xy*=mat2(cos(a),sin(a),(-sin(a)),cos(a));\n  return (0.1-length((cos(x.xy)+sin(x.yz))));\n}\nvec3 lambda_0(vec3 x){\n  return (x+(f(x)*(0.5-(vec3(gl_FragCoord.xy,1.0)/u_resolution.x))));\n}\nvoid main(){\n  vec3 t_0=vec3(0.0,0.0,0.0);for(int t_1=0;t_1<32;t_1++)t_0=lambda_0(t_0);\n  vec3 p=t_0;\n  vec3 fin=vec3((vec3(2.0,5.0,4.0)-vec3(0.0,gl_FragCoord)*0.006+sin(p))/length(p));\nvec4 color = texture2D(u_texture, v_texCoord.xy);\ngl_FragColor = vec4(color.rgb * fin, color.a);\n}");
  }
  catch(err){
    print("Failed to load 1 or more Shaders!");
    print(err);
    print(err.stack);
    if(!this.global.communityMod.shaders.hasOwnProperty("bittrium")) this.global.communityMod.shaders.bittrium=Shaders.water;
    if(!this.global.communityMod.shaders.hasOwnProperty("space")) this.global.communityMod.shaders.space=Shaders.tar;
    if(!this.global.communityMod.shaders.hasOwnProperty("time")){
      //try mediump
      try{
        const lowres = new JavaAdapter(Shader, {
          apply(){
            this.setUniformf("u_resolution", Core.graphics.getWidth(), Core.graphics.getHeight());
            this.setUniformf("u_time", Time.time() / Scl.scl(1.0));
          }
        },
        //todo make multiline strings work
        "uniform mat4 u_projTrans;attribute vec4 a_position;attribute vec2 a_texCoord0;attribute vec4 a_color;varying vec4 v_color;varying vec2 v_texCoord;void main(){gl_Position = u_projTrans * a_position;v_texCoord = a_texCoord0;v_color = a_color;}", "#ifdef GL_ES\nprecision mediump float;\n#endif\n#define PI 3.14159265\nuniform sampler2D u_texture;\nvarying vec4 v_color;\nvarying vec2 v_texCoord;\nuniform float u_time;\nuniform vec2 u_resolution;\nvoid main( void ) {\nvec4 color = texture2D(u_texture, v_texCoord.xy);\nfloat time = u_time*0.0001;\nfloat color1, color2, color3;\ncolor1 = (sin(dot(gl_FragCoord.xy,vec2(sin(time*1.0),cos(time*3.0)))*0.02+time*4.0)+1.0)/2.0;\nvec2 center = vec2(u_resolution.x, u_resolution.y) + vec2(u_resolution.x/2.0*sin(-time*3.0),u_resolution.y/2.0*cos(-time*10.0));\ncolor2 = (cos(length(gl_FragCoord.xy - center)*0.03)+1.0)/2.0;\ncolor3 = (color1+ color2)/2.0;\nfloat red   = (cos(PI*color3/0.5+time*3.0)+1.0)/2.0;\nfloat green   = (sin(PI*color3/0.5+time*3.0)+1.0)/2.0;\nfloat blue = (sin(PI*color3/0.25+time*3.0)+1.0)/2.0;\nvec3 fin = vec3(blue+0.6, red+0.5, green+0.5);\ngl_FragColor = vec4(color.rgb * fin, color.a);\n}");
        this.global.communityMod.shaders.time=lowres;
      }
      catch(err){
        this.global.communityMod.shaders.time=Shaders.tar;
      }
    }
    if(!this.global.communityMod.shaders.hasOwnProperty("universe")) this.global.communityMod.shaders.universe=Shaders.water;
    if(!this.global.communityMod.shaders.hasOwnProperty("coolwater")) this.global.communityMod.shaders.coolwater=Shaders.water;
    if(!this.global.communityMod.shaders.hasOwnProperty("stems")) this.global.communityMod.shaders.stems=Shaders.water;
  }
}
/*
#ifdef GL_ES
precision mediump float;
#endif
uniform sampler2D u_texture;
varying vec4 v_color;
varying vec2 v_texCoord;
uniform vec2 u_resolution;
uniform float u_time;
#define PI 3.14159
void main(void){
float time = u_time*0.01;
vec4 color = texture2D(u_texture, v_texCoord.xy);
vec2 uv = gl_FragCoord.xy /1250.0;
float formafinal  = sin(uv.x*10.*PI+time + sin(uv.y*2.*PI+time + sin(uv.x*10.*PI-time + sin(uv.y*10.*PI-time + sin(uv.x*10.*PI-time + sin(uv.y*10.*PI-time) + sin(uv.x*10.*PI-time))))))*0.5+0.5;
float formafinal2 = sin(uv.y*10.*PI+time + sin(uv.y*10.*PI+time + sin(uv.x*8.*PI-time + sin(uv.y*5.*PI-time + sin(uv.x*10.*PI-time + sin(uv.y*2.*PI-time) + sin(uv.x*9.*PI-time))))))*0.5+0.5;
vec3 color1 = vec3(0.900,0.1,0.4);
vec3 color2 = vec3(0.300,0.9,0.05);
vec3 fin = color1 * formafinal + color2 * formafinal2;
gl_FragColor = vec4(color.rgb * fin, color.a);
}
*/

/*
#ifdef GL_ES
precision highp float;
#endif
#define PI 3.14159265
uniform sampler2D u_texture;
varying vec4 v_color;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;
void main( void ) {
vec4 color = texture2D(u_texture, v_texCoord.xy);
float time = u_time*0.0001;
float color1, color2, color3;
color1 = (sin(dot(gl_FragCoord.xy,vec2(sin(time*1.0),cos(time*3.0)))*0.02+time*4.0)+1.0)/2.0;
vec2 center = vec2(u_resolution.x, u_resolution.y) + vec2(u_resolution.x/2.0*sin(-time*3.0),u_resolution.y/2.0*cos(-time*10.0));
color2 = (cos(length(gl_FragCoord.xy - center)*0.03)+1.0)/2.0;
color3 = (color1 + color2)/2.0;
float red   = (cos(PI*color3/0.5+time*3.0)+1.0)/2.0;
float green   = (sin(PI*color3/0.5+time*3.0)+1.0)/2.0;
float blue   = (sin(PI*color3/0.25+time*3.0)+1.0)/2.0;
vec3 fin = vec3(blue+0.6, red+0.5, green+0.5);
gl_FragColor = vec4(color.rgb * fin, color.a);
}
*/
