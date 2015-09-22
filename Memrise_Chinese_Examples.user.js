// ==UserScript==
// @name           Memrise Chinese Examples
// @namespace      https://github.com/cooljingle
// @description    Example sentences for learning Chinese on Memrise
// @match          http://www.memrise.com/course/*/garden/*
// @match          http://www.memrise.com/garden/review/*
// @version        1.0.0
// @updateURL      https://github.com/cooljingle/memrise-chinese-examples/raw/master/Memrise_Chinese_Examples.user.js
// @downloadURL    https://github.com/cooljingle/memrise-chinese-examples/raw/master/Memrise_Chinese_Examples.user.js
// @grant          none
// ==/UserScript==

//tinyColorPicker
!function(a,b){"use strict";function c(a,c,d,f,g){if("string"==typeof c){var c=t.txt2color(c);d=c.type,n[d]=c[d],g=g!==b?g:c.alpha}else if(c)for(var h in c)a[d][h]=k(c[h]/l[d][h][1],0,1);return g!==b&&(a.alpha=+g),e(d,f?a:b)}function d(a,b,c){var d=m.options.grey,e={};return e.RGB={r:a.r,g:a.g,b:a.b},e.rgb={r:b.r,g:b.g,b:b.b},e.alpha=c,e.equivalentGrey=Math.round(d.r*a.r+d.g*a.g+d.b*a.b),e.rgbaMixBlack=i(b,{r:0,g:0,b:0},c,1),e.rgbaMixWhite=i(b,{r:1,g:1,b:1},c,1),e.rgbaMixBlack.luminance=h(e.rgbaMixBlack,!0),e.rgbaMixWhite.luminance=h(e.rgbaMixWhite,!0),m.options.customBG&&(e.rgbaMixCustom=i(b,m.options.customBG,c,1),e.rgbaMixCustom.luminance=h(e.rgbaMixCustom,!0),m.options.customBG.luminance=h(m.options.customBG,!0)),e}function e(a,b){var c,e,k,o=b||n,p=t,q=m.options,r=l,s=o.RND,u="",v="",w={hsl:"hsv",rgb:a},x=s.rgb;if("alpha"!==a){for(var y in r)if(!r[y][y]){a!==y&&(v=w[y]||"rgb",o[y]=p[v+"2"+y](o[v])),s[y]||(s[y]={}),c=o[y];for(u in c)s[y][u]=Math.round(c[u]*r[y][u][1])}x=s.rgb,o.HEX=p.RGB2HEX(x),o.equivalentGrey=q.grey.r*o.rgb.r+q.grey.g*o.rgb.g+q.grey.b*o.rgb.b,o.webSave=e=f(x,51),o.webSmart=k=f(x,17),o.saveColor=x.r===e.r&&x.g===e.g&&x.b===e.b?"web save":x.r===k.r&&x.g===k.g&&x.b===k.b?"web smart":"",o.hueRGB=t.hue2RGB(o.hsv.h),b&&(o.background=d(x,o.rgb,o.alpha))}var z,A,B,C=o.rgb,D=o.alpha,E="luminance",F=o.background;return z=i(C,{r:0,g:0,b:0},D,1),z[E]=h(z,!0),o.rgbaMixBlack=z,A=i(C,{r:1,g:1,b:1},D,1),A[E]=h(A,!0),o.rgbaMixWhite=A,q.customBG&&(B=i(C,F.rgbaMixCustom,D,1),B[E]=h(B,!0),B.WCAG2Ratio=j(B[E],F.rgbaMixCustom[E]),o.rgbaMixBGMixCustom=B,B.luminanceDelta=Math.abs(B[E]-F.rgbaMixCustom[E]),B.hueDelta=g(F.rgbaMixCustom,B,!0)),o.RGBLuminance=h(x),o.HUELuminance=h(o.hueRGB),q.convertCallback&&q.convertCallback(o,a),o}function f(a,b){var c={},d=0,e=b/2;for(var f in a)d=a[f]%b,c[f]=a[f]+(d>e?b-d:-d);return c}function g(a,b,c){return(Math.max(a.r-b.r,b.r-a.r)+Math.max(a.g-b.g,b.g-a.g)+Math.max(a.b-b.b,b.b-a.b))*(c?255:1)/765}function h(a,b){for(var c=b?1:255,d=[a.r/c,a.g/c,a.b/c],e=m.options.luminance,f=d.length;f--;)d[f]=d[f]<=.03928?d[f]/12.92:Math.pow((d[f]+.055)/1.055,2.4);return e.r*d[0]+e.g*d[1]+e.b*d[2]}function i(a,c,d,e){var f={},g=d!==b?d:1,h=e!==b?e:1,i=g+h*(1-g);for(var j in a)f[j]=(a[j]*g+c[j]*h*(1-g))/i;return f.a=i,f}function j(a,b){var c=1;return c=a>=b?(a+.05)/(b+.05):(b+.05)/(a+.05),Math.round(100*c)/100}function k(a,b,c){return a>c?c:b>a?b:a}var l={rgb:{r:[0,255],g:[0,255],b:[0,255]},hsv:{h:[0,360],s:[0,100],v:[0,100]},hsl:{h:[0,360],s:[0,100],l:[0,100]},alpha:{alpha:[0,1]},HEX:{HEX:[0,16777215]}},m={},n={},o={r:.298954,g:.586434,b:.114612},p={r:.2126,g:.7152,b:.0722},q=a.Colors=function(a){this.colors={RND:{}},this.options={color:"rgba(204, 82, 37, 0.8)",grey:o,luminance:p,valueRanges:l},r(this,a||{})},r=function(a,d){var e,f=a.options;s(a);for(var g in d)d[g]!==b&&(f[g]=d[g]);e=f.customBG,f.customBG="string"==typeof e?t.txt2color(e).rgb:e,n=c(a.colors,f.color,b,!0)},s=function(a){m!==a&&(m=a,n=a.colors)};q.prototype.setColor=function(a,d,f){return s(this),a?c(this.colors,a,d,b,f):(f!==b&&(this.colors.alpha=f),e(d))},q.prototype.setCustomBackground=function(a){return s(this),this.options.customBG="string"==typeof a?t.txt2color(a).rgb:a,c(this.colors,b,"rgb")},q.prototype.saveAsBackground=function(){return s(this),c(this.colors,b,"rgb",!0)};var t={txt2color:function(a){var b={},c=a.replace(/(?:#|\)|%)/g,"").split("("),d=(c[1]||"").split(/,\s*/),e=c[1]?c[0].substr(0,3):"rgb",f="";if(b.type=e,b[e]={},c[1])for(var g=3;g--;)f=e[g]||e.charAt(g),b[e][f]=+d[g]/l[e][f][1];else b.rgb=t.HEX2rgb(c[0]);return b.alpha=d[3]?+d[3]:1,b},RGB2HEX:function(a){return((a.r<16?"0":"")+a.r.toString(16)+(a.g<16?"0":"")+a.g.toString(16)+(a.b<16?"0":"")+a.b.toString(16)).toUpperCase()},HEX2rgb:function(a){return a=a.split(""),{r:parseInt(a[0]+a[a[3]?1:0],16)/255,g:parseInt(a[a[3]?2:1]+(a[3]||a[1]),16)/255,b:parseInt((a[4]||a[2])+(a[5]||a[2]),16)/255}},hue2RGB:function(a){var b=6*a,c=~~b%6,d=6===b?0:b-c;return{r:Math.round(255*[1,1-d,0,0,d,1][c]),g:Math.round(255*[d,1,1,1-d,0,0][c]),b:Math.round(255*[0,0,d,1,1,1-d][c])}},rgb2hsv:function(a){var b,c,d,e=a.r,f=a.g,g=a.b,h=0;return g>f&&(f=g+(g=f,0),h=-1),c=g,f>e&&(e=f+(f=e,0),h=-2/6-h,c=Math.min(f,g)),b=e-c,d=e?b/e:0,{h:1e-15>d?n&&n.hsl&&n.hsl.h||0:b?Math.abs(h+(f-g)/(6*b)):0,s:e?b/e:n&&n.hsv&&n.hsv.s||0,v:e}},hsv2rgb:function(a){var b=6*a.h,c=a.s,d=a.v,e=~~b,f=b-e,g=d*(1-c),h=d*(1-f*c),i=d*(1-(1-f)*c),j=e%6;return{r:[d,h,g,g,i,d][j],g:[i,d,d,h,g,g][j],b:[g,g,i,d,d,h][j]}},hsv2hsl:function(a){var b=(2-a.s)*a.v,c=a.s*a.v;return c=a.s?1>b?b?c/b:0:c/(2-b):0,{h:a.h,s:a.v||c?c:n&&n.hsl&&n.hsl.s||0,l:b/2}},rgb2hsl:function(a,b){var c=t.rgb2hsv(a);return t.hsv2hsl(b?c:n.hsv=c)},hsl2rgb:function(a){var b=6*a.h,c=a.s,d=a.l,e=.5>d?d*(1+c):d+c-c*d,f=d+d-e,g=e?(e-f)/e:0,h=~~b,i=b-h,j=e*g*i,k=f+j,l=e-j,m=h%6;return{r:[e,l,f,f,k,e][m],g:[k,e,e,l,f,f][m],b:[f,f,k,e,e,l][m]}}}}(window),function(a,b,c){"use strict";function d(b){return b.value||b.getAttribute("value")||a(b).css("background-color")||"#fff"}function e(a){return a=a.originalEvent&&a.originalEvent.touches?a.originalEvent.touches[0]:a,a.originalEvent?a.originalEvent:a}function f(b){return a(b.find(s.doRender)[0]||b[0])}function g(b){var c=a(this),e=c.offset(),g=a(window),i=s.gap;b?(t=f(c),q.$trigger=c,(u||h()).css({left:(u[0]._left=e.left)-((u[0]._left=u[0]._left+u[0]._width-(g.scrollLeft()+g.width()))+i>0?u[0]._left+i:0),top:(u[0]._top=e.top+c.outerHeight())-((u[0]._top=u[0]._top+u[0]._height-(g.scrollTop()+g.height()))+i>0?u[0]._top+i:0)}).show(s.animationSpeed,function(){b!==!0&&(y._width=y.width(),v._width=v.width(),v._height=v.height(),r.setColor(d(t[0])),n(!0))})):a(u).hide(s.animationSpeed,function(){t.blur(),q.$trigger=null,n(!1)})}function h(){return a("head").append('<style type="text/css">'+(s.css||I)+(s.cssAddon||"")+"</style>"),q.$UI=u=a(H).css({margin:s.margin}).appendTo("body").show(0,function(){var b=a(this);F=s.GPU&&b.css("perspective")!==c,v=a(".cp-xy-slider",this),w=a(".cp-xy-cursor",this),x=a(".cp-z-cursor",this),y=a(".cp-alpha",this).toggle(!!s.opacity),z=a(".cp-alpha-cursor",this),s.buildCallback.call(q,b),b.prepend("<div>").children().eq(0).css("width",b.children().eq(0).width()),this._width=this.offsetWidth,this._height=this.offsetHeight}).hide().on(D,".cp-xy-slider,.cp-z-slider,.cp-alpha",i)}function i(b){var c=this.className.replace(/cp-(.*?)(?:\s*|$)/,"$1").replace("-","_");b.preventDefault&&b.preventDefault(),b.returnValue=!1,t._offset=a(this).offset(),(c="xy_slider"===c?k:"z_slider"===c?l:m)(b),A.on(E,j).on(C,c)}function j(){A.off(".a")}function k(a){var b=e(a),c=b.pageX-t._offset.left,d=b.pageY-t._offset.top;r.setColor({s:c/v._width*100,v:100-d/v._height*100},"hsv"),n()}function l(a){{var b=e(a).pageY-t._offset.top;r.colors.hsv}r.setColor({h:360-b/v._height*360},"hsv"),n()}function m(a){var b=e(a).pageX-t._offset.left,c=b/y._width;r.setColor({},"rgb",c>1?1:0>c?0:c),n()}function n(a){var b=r.colors,d=b.hueRGB,e=b.RND.rgb,f=b.RND.hsl,g="#222",h="#ddd",i=t.data("colorMode"),j=1!==b.alpha,k=Math.round(100*b.alpha)/100,l=e.r+", "+e.g+", "+e.b,m="HEX"!==i||j?"rgb"===i||"HEX"===i&&j?j?"rgba("+l+", "+k+")":"rgb("+l+")":"hsl"+(j?"a(":"(")+f.h+", "+f.s+"%, "+f.l+"%"+(j?", "+k:"")+")":"#"+b.HEX,n=b.HUELuminance>.22?g:h,p=b.rgbaMixBlack.luminance>.22?g:h,q=(1-b.hsv.h)*v._height,s=b.hsv.s*v._width,u=(1-b.hsv.v)*v._height,A=k*y._width,B=F?"translate3d":"",C=t.val(),D=t[0].hasAttribute("value")&&""===C&&a!==c;v._css={backgroundColor:"rgb("+d.r+","+d.g+","+d.b+")"},w._css={transform:B+"("+s+"px, "+u+"px, 0)",left:F?"":s,top:F?"":u,borderColor:b.RGBLuminance>.22?g:h},x._css={transform:B+"(0, "+q+"px, 0)",top:F?"":q,borderColor:"transparent "+n},y._css={backgroundColor:"rgb("+l+")"},z._css={transform:B+"("+A+"px, 0, 0)",left:F?"":A,borderColor:p+" transparent"},t._css={backgroundColor:D?"":m,color:D?"":b.rgbaMixBGMixCustom.luminance>.22?g:h},t.text=D?"":C!==m?m:"",a!==c?o(a):G(o)}function o(a){v.css(v._css),w.css(w._css),x.css(x._css),y.css(y._css),z.css(z._css),s.doRender&&t.css(t._css),t.text&&t.val(t.text),s.renderCallback.call(q,t,"boolean"==typeof a?a:c)}var p,q,r,s,t,u,v,w,x,y,z,A=a(document),B="",C="touchmove.a mousemove.a pointermove.a",D="touchstart.a mousedown.a pointerdown.a",E="touchend.a mouseup.a pointerup.a",F=!1,G=window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(a){a()},H='<div class="cp-color-picker"><div class="cp-z-slider"><div class="cp-z-cursor"></div></div><div class="cp-xy-slider"><div class="cp-white"></div><div class="cp-xy-cursor"></div></div><div class="cp-alpha"><div class="cp-alpha-cursor"></div></div></div>',I=".cp-color-picker{position:absolute;overflow:hidden;padding:6px 6px 0;background-color:#444;color:#bbb;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:400;cursor:default;border-radius:5px}.cp-color-picker>div{position:relative;overflow:hidden}.cp-xy-slider{float:left;height:128px;width:128px;margin-bottom:6px;background:linear-gradient(to right,#FFF,rgba(255,255,255,0))}.cp-white{height:100%;width:100%;background:linear-gradient(rgba(0,0,0,0),#000)}.cp-xy-cursor{position:absolute;top:0;width:10px;height:10px;margin:-5px;border:1px solid #fff;border-radius:100%;box-sizing:border-box}.cp-z-slider{float:right;margin-left:6px;height:128px;width:20px;background:linear-gradient(red 0,#f0f 17%,#00f 33%,#0ff 50%,#0f0 67%,#ff0 83%,red 100%)}.cp-z-cursor{position:absolute;margin-top:-4px;width:100%;border:4px solid #fff;border-color:transparent #fff;box-sizing:border-box}.cp-alpha{clear:both;width:100%;height:16px;margin:6px 0;background:linear-gradient(to right,#444,rgba(0,0,0,0))}.cp-alpha-cursor{position:absolute;margin-left:-4px;height:100%;border:4px solid #fff;border-color:#fff transparent;box-sizing:border-box}",J=function(a){r=this.color=new b(a),s=r.options};J.prototype={render:n,toggle:g},a.fn.colorPicker=function(b){var c=function(){};return b=a.extend({animationSpeed:150,GPU:!0,doRender:!0,customBG:"#FFF",opacity:!0,renderCallback:c,buildCallback:c,body:document.body,scrollResize:!0,gap:4},b),!q&&b.scrollResize&&a(window).on("resize.a scroll.a",function(){q.$trigger&&q.toggle.call(q.$trigger[0],!0)}),p=p?p.add(this):this,p.colorPicker=q||(q=new J(b)),B+=(B?", ":"")+this.selector,a(b.body).off(".a").on(D,function(b){var c=a(b.target);-1!==a.inArray(c.closest(B)[0],p)||c.closest(u).length||g()}).on("focus.a click.a",B,g).on("change.a",B,function(){r.setColor(this.value||"#FFF"),p.colorPicker.render(!0)}),this.each(function(){var c=d(this),e=c.split("("),g=f(a(this));g.data("colorMode",e[1]?e[0].substr(0,3):"HEX").attr("readonly",s.preventFocus),b.doRender&&g.css({"background-color":c,color:function(){return r.setColor(c).rgbaMixBGMixCustom.luminance>.22?"#222":"#ddd"}})})},a.fn.colorPicker.destroy=function(){a(q.color.options.body).off(".a"),q.toggle(!1),p=null,B=""}}(jQuery,Colors);
            
(function() {
    MEMRISE.garden.boxes.load = (function() {
        var cached_function = MEMRISE.garden.boxes.load;
        return function() {
            var result = cached_function.apply(this, arguments);
            if (MEMRISE.garden.session.category.name === "Mandarin Chinese (Simplified)") {
                console.log("enabling showing of example Chinese sentences");
                enableExamples();}
            return result;
        };
    }());

    function enableExamples() {
        var audioPlaying,
            cachedData,
            defaultSettings = {
                "audioSpeed": 1,
                "colours": {
                    "non-hsk": "#000000",
                    "hsk-1": "#E12E2E",
                    "hsk-2": "#EB8B2B",
                    "hsk-3": "#CFBE00",
                    "hsk-4": "#1ca10d",
                    "hsk-5": "#1D8FCC",
                    "hsk-6": "#db44df"
                },
                "difficulty": "all",
                "fontSizeScaleFactor": 1.3,
                "keyBindings": {
                    "next-example-key": 46,
                    "previous-example-key": 44,
                    "example-detail-toggle-key": 47,
                    "increase-font-size-key": 43,
                    "decrease-font-size-key": 45,
                    "example-audio-key": 112
                },
                "underlineWord": true
            },
            difficulties = {
                "basic": "&degreeType=2",
                "intermediate": "&degreeType=3",
                "advanced": "&degreeType=1",
                "all": ""
            },
            exampleIndex,
            firstTimeLoad = true,
            hskHtml,
            hskLevels,
            localStorageIdentifier = "memrise-chinese-examples",
            localStorageObject = JSON.parse(localStorage.getItem(localStorageIdentifier)) || jQuery.extend(true, {}, defaultSettings),
            sessionFontSizeScaleFactor = parseFloat(localStorageObject.fontSizeScaleFactor),
            pageNo,
            pageSize = 20,
            word,
            exampleHtml = $([
				"<div class='row column' id='example-html'>",
				"	<div class='row-label'> <a id='settings-icon' data-toggle='modal' data-target='#example-settings-modal' style='cursor: pointer; color:black'>⛭</a> Example Sentence",
				"		<a id='next-example' style='cursor: pointer; color: green; display:none'>↻</a>",
				"	</div>",
				"	<div class='row-label' style='top:34px'>",
				"		<a id='previous-example' style='cursor: pointer; color: purple; display:none'>↺</a>",
				"	</div>",
				"	<div class='row-value'>",
				"		<span id='example-audio' style='vertical-align: text-top; cursor: pointer; float: right; display:none'>🔊</span>",
				"		<div class='primary-value'>",
				"			<span id='example-sentence'></span>",
				"			<a id='example-detail-toggle' style='cursor: pointer; color: #AAAAAA; display:none'>+</a>",
				"		</div>",
				"		<div id='example-detail' style='display:none'>",
				"			<div id='pinyin'></div>",
				"			<div id='translation'></div>",
				"		</div>",
				"	</div>",
				"</div>"
            ].join("\n")),
            modalHtml = $([
				"<div class='modal fade' id='example-settings-modal' tabindex='-1' role='dialog' aria-labelledby='example-settings-modal-label'>",
				"	<div class='modal-dialog' role='document'>",
				"		<div class='modal-content'>",
				"			<div class='modal-header'>",
				"				<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>×</span></button>",
				"				<h1 class='modal-title' id='example-settings-modal-label'>Example Settings</h1></div>",
				"			<div class='modal-body'>",
				"				<div>",
				"					<h3>Colours</h3>",
				"					<table class='table table-striped'>",
				"						<thead>",
				"							<tr>",
				"								<th>Non-HSK</th>",
				"								<th>HSK 1</th>",
				"								<th>HSK 2</th>",
				"								<th>HSK 3</th>",
				"								<th>HSK 4</th>",
				"								<th>HSK 5</th>",
				"								<th>HSK 6</th>",
				"							</tr>",
				"						</thead>",
				"						<tbody>",
				"							<tr id='picker'>",
				"								<td>",
				"									<button id='non-hsk'></button>", //some sort of button with ▼
				"								</td>",
				"								<td>",
				"									<button id='hsk-1'></button>",
				"								</td>",
				"								<td>",
				"									<button id='hsk-2'></button>",
				"								</td>",
				"								<td>",
				"									<button id='hsk-3'></button>",
				"								</td>",
				"								<td>",
				"									<button id='hsk-4'></button>",
				"								</td>",
				"								<td>",
				"									<button id='hsk-5'>",
				"								</td>",
				"								<td>",
				"									<button id='hsk-6'>",
				"								</td>",
				"							</tr>",
				"						</tbody>",
				"					</table>",
				"					<hr>",
				"					<h3>Default font size</h3>",
				"					<div>",
				"						<input type='range' id='font-range' min='0.8' max='4' step='0.1'>",
				"						<output id='font-range-label' style='margin-left: 20px'></output>",
				"					</div>",
				"					<hr>",
				"					<h3>Audio speed</h3>",
				"					<div>",
				"						<input type='range' id='speed-range' min='0' max='2' step='1'>",
				"						<output id='speed-range-label' style='margin-left: 20px'></output>",
				"					</div>",
				"					<hr>",
				"					<h3>Underline word</h3>",
				"					<div>",
				"					   <label>",
				"						<input id='underline' type='checkbox' style='vertical-align: top'>",
				"						<output id='underline-label' style='margin-left: 20px'></output>",
				"					   </label>",
				"					</div>",
				"					<hr>",
				"					<div style='font-size: 1.5em; line-height: 1.6em' align='center'>",
				"						<div id='settings-example-sentence'>",
				"							<span class='non-hsk'>哈利</span>",
				"							<span class='hsk-1'>的</span>",
				"							<span class='hsk-1'><strong>爸爸</strong></span>",
				"							<span class='hsk-2'>非常</span>",
				"							<span class='hsk-3'>关心</span>",
				"							<span class='hsk-4'>国际</span>",
				"							<span class='hsk-5'>进口</span>",
				"							<span class='hsk-6'>指标</span>",
				"							<span class='non-hsk'>。</span>",        
				"							<span id='settings-example-audio' style='cursor: pointer; float: right'>🔊</span>",
				"						</div>",
				"						<div id='settings-example-detail'>",
				"							<div>Hālì de <strong>bàba</strong> fēicháng guānxīn guójì jìnkǒu zhǐbiāo.</div>",
				"							<div>Harry's father takes great interest in international import targets.</div>",
				"						</div>",
				"					</div>",
				"					<hr>",
				"					<h3>Example difficulties</h3>",
				"					<div class='radio'>",
				"						<label>",
				"							<input type='radio' name='difficulty-options' value='all' checked=''> All </label>",
				"					</div>",
				"					<div class='radio'>",
				"						<label>",
				"							<input type='radio' name='difficulty-options' value='basic'> Basic only </label>",
				"					</div>",
				"					<div class='radio'>",
				"						<label>",
				"							<input type='radio' name='difficulty-options' value='intermediate'> Intermediate only </label>",
				"					</div>",
				"					<div class='radio'>",
				"						<label>",
				"							<input type='radio' name='difficulty-options' value='advanced'> Advanced only </label>",
				"					</div>",
				"					<hr>",
				"					<h3>Key bindings</h3>",
				"					<table id='key-bindings' class='table table-condensed'>",
				"						<tbody>",
				"							<tr id='next-example-key'>",
				"								<th style='width:80%'>",
				"									Next example",
				"								</th>",
				"								<td class='value' style='width:10%'>",
				"									<kbd></kbd>",
				"								</td>",
				"								<td class='set-link' style='width:10%'>",
				"									<a>Set</a>",
				"								</td>",
				"							</tr>",
				"							<tr id='previous-example-key'>",
				"								<th style='width:80%'>",
				"									Previous example",
				"								</th>",
				"								<td class='value' style='width:10%'>",
				"									<kbd></kbd>",
				"								</td>",
				"								<td class='set-link' style='width:10%'>",
				"									<a>Set</a>",
				"								</td>",
				"							</tr>",
				"							<tr id='example-detail-toggle-key'>",
				"								<th style='width:80%'>",
				"									Toggle example details",
				"								</th>",
				"								<td class='value'>",
				"									<kbd></kbd>",
				"								</td>",
				"								<td class='set-link'>",
				"									<a>Set</a>",
				"								</td>",
				"							</tr>",
				"							<tr id='increase-font-size-key'>",
				"								<th style='width:80%'>",
				"									Increase font size",
				"								</th>",
				"								<td class='value' style='width:10%'>",
				"									<kbd></kbd>",
				"								</td>",
				"								<td class='set-link' style='width:10%'>",
				"									<a>Set</a>",
				"								</td>",
				"							</tr>",
				"							<tr id='decrease-font-size-key'>",
				"								<th style='width:80%'>",
				"									Decrease font size",
				"								</th>",
				"								<td class='value' style='width:10%'>",
				"									<kbd></kbd>",
				"								</td>",
				"								<td class='set-link' style='width:10%'>",
				"									<a>Set</a>",
				"								</td>",
				"							</tr>",
				"							<tr id='example-audio-key'>",
				"								<th style='width:80%'>",
				"									Play audio",
				"								</th>",
				"								<td class='value' style='width:10%'>",
				"									<kbd></kbd>",
				"								</td>",
				"								<td class='set-link' style='width:10%'>",
				"									<a>Set</a>",
				"									</td>",
				"								</tr>",
				"						</tbody>",
				"					</table>",
				"				</div>",
				"			</div>",
				"			<div class='modal-footer'>",
				"				<button type='button' class='btn btn-info pull-left' id='reset-settings-button'>Reset to defaults</button>",
				"				<button type='button' class='btn btn-default' data-dismiss='modal'>Cancel</button>",
				"				<button type='button' class='btn btn-primary' data-dismiss='modal' id='save-settings-button'>Save changes</button>",
				"			</div>",
				"		</div>",
				"	</div>",
				"</div>"
            ].join("\n").replace(/[\t\r\n]/g, ""));

        addToBox("PresentationBox", function(context) {
            var columns = context.thing.columns,
                columnIndex = _.findKey(columns, function(column) {
                    return column.val.match(/^[\u2E80-\u2EFF\u3000-\u303F\u31C0-\u31EF\u3300-\u33FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uFE30-\uFE4F]+$/); //unicode ranges for Chinese
                });
            word = columns[columnIndex].val;
            resetLocalVars();
            showExample(true);
        });

        addToBox("CopyTypingBox", function() {
            showExample(true);
        });
        
        setKeyboardEvents();
        loadModal();

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function addHskColours(examples) {
            var payload = _.chain(examples).map(function(e) {
                return $.parseHTML(e.exampleAutolink);
            }).flatten().map(function(e) {
                return $(e).attr('data-query');
            }).value().join("%0D%0A");

            $.get("http://crossorigin.me/" + "http://hskhsk.pythonanywhere.com/hanzi?ignoredefaults=true&analysehskwords=true&format=oneperline&hanzi=" + payload)
                .complete(function(data) {
                    hskHtml = $(data.responseText).filter('*.box');
                    hskLevels = [];

                    _.each(hskHtml, function(item) {
                        var i = $(item),
                            title = i.find('.title').text(),
                            words = i.find('textarea').text().split("\n");
                        hskLevels.push({
                            "name": title,
                            "words": words
                        });
                    });
                    colourExamples(examples);
                    showExample();
                });
        }

        function addToBox(boxName, func) {
            MEMRISE.garden.box_types[boxName].prototype.activate = (function() {
                var cached_function = MEMRISE.garden.box_types[boxName].prototype.activate;
                return function() {
                    var result = cached_function.apply(this, arguments);
                    func(this);
                    return result;
                };
            }());
        }

        function colourExamples(examples) {
            _.each(examples, function(example) {
                example.exampleAutolink = _.map($.parseHTML(example.exampleAutolink) || example.exampleAutolink, function(word) {
                    var level = _.find(hskLevels, function(level) {
                        return level.words.indexOf($(word).text()) > -1;
                    });

                    switch (level && level.name) {
                        case "HSK 1":
                            return $(word).css('color', localStorageObject.colours["hsk-1"])[0];
                        case "HSK 2":
                            return $(word).css('color', localStorageObject.colours["hsk-2"])[0];
                        case "HSK 3":
                            return $(word).css('color', localStorageObject.colours["hsk-3"])[0];
                        case "HSK 4":
                            return $(word).css('color', localStorageObject.colours["hsk-4"])[0];
                        case "HSK 5":
                            return $(word).css('color', localStorageObject.colours["hsk-5"])[0];
                        case "HSK 6":
                            return $(word).css('color', localStorageObject.colours["hsk-6"])[0];
                        default:
                            return $(word).css('color', localStorageObject.colours["non-hsk"])[0];
                    }
                });
            });
        }

        function getUrl(wordURI, pageNo) {
            return "http://linedict.naver.com/cnen/example/search.dict?query=" +
                wordURI + "&page=" + pageNo + "&page_size=" + pageSize + "&format=json" + difficulties[localStorageObject.difficulty];
        }

        function initialiseFontSizes() {
            setExampleFontSize(sessionFontSizeScaleFactor);
            setModalFontSize(localStorageObject.fontSizeScaleFactor);
        }

        function loadModal() {
            $("body").append(modalHtml);
            var settingsObject = jQuery.extend(true, {}, localStorageObject);
            setModalEvents(settingsObject);
            setModalFields(settingsObject);
        }

        function loadDOM() {
            console.log("loading example sentence DOM for word " + word);
            exampleHtml.find('#example-sentence, #pinyin, #translation').html("");
            $('.columns').append(exampleHtml);
            shiftShowMoreLink();
            setClickEvents();
            if (firstTimeLoad) {
                initialiseFontSizes();
                firstTimeLoad = false;
            }
        }

        function onDataLoaded(data) {
            data.exampleList = _.shuffle(data.exampleList);
            addHskColours(data.exampleList);
            if (localStorageObject.underlineWord) {
                toggleUnderlines(data.exampleList);
            }
            if (!cachedData) {
                cachedData = data;
            } else if (data.exampleList) {
                Array.prototype.push.apply(cachedData.exampleList, data.exampleList);
            }
        }
        
        function playAudio(word, speed) {
            var audioElement = document.createElement('audio');
            var audioLink = 'http://tts.cndic.naver.com/tts/mp3ttsV1.cgi?spk_id=250&text_fmt=0&pitch=100&volume=100&speed=' + 80 * speed + '&wrapper=0&enc=0&text=' +
                encodeURIComponent(word);
            audioElement.setAttribute('src', audioLink);
            audioElement.play();
            audioPlaying = true;
            $(audioElement).on('ended', function() {
                audioPlaying = false;
            });
        }

        function renderExample() {
            var example = cachedData.exampleList[exampleIndex] || "";
            $('#example-sentence').html(example.exampleAutolink);
            $('#pinyin').html(example.pinyin);
            $('#translation').html(example.translation);

            $('#previous-example').toggle(exampleIndex > 0);
            $('#next-example').toggle(exampleIndex + 1 < cachedData.total);
            $('#example-detail-toggle').toggle(!!example);
            $('#example-audio').toggle(!!example);
        }

        function resetLocalVars() {
            cachedData = undefined;
            exampleIndex = 0;
            pageNo = 0;
        }

        function scaleElementFontSize(selector, scaleFactor) {
            $(selector).css('font-size', function() {
                var defaultSize = parseFloat($(this).parent().css('font-size'));
                return (defaultSize * scaleFactor) + 'px';
            }).css('line-height', function() {
                var defaultSize = parseFloat($(this).parent().css('line-height'));
                return (defaultSize * scaleFactor) + 'px';
            });
        }

        function setClickEvents() {
            $('#example-detail-toggle').click(function() {
                $('#example-detail-toggle')
                    .text($('#example-detail').is(':hidden') ? '-' : '+');
                $('#example-detail').toggle();
            });
            $('#next-example').click(function() {
                exampleIndex++;
                showExample();
            });
            $('#previous-example').click(function() {
                exampleIndex--;
                showExample();
            });
            $('#example-audio').click(function() {
                if (audioPlaying) {
                    return;
                } else {
                    playAudio(cachedData.exampleList[exampleIndex].example, localStorageObject.audioSpeed);
                }
            });
        }

        function setExampleFontSize(scaleFactor) {
            scaleElementFontSize("#example-sentence", scaleFactor);
            scaleElementFontSize("#example-detail", 0.7 * scaleFactor);
            scaleElementFontSize("#example-detail-toggle", 0.7 * scaleFactor);
        }

        function setKeyboardEvents() {
            $(document).on("keypress.example", function(e) {
                if (!$(e.target).is("input, textarea")) {
	                if ($('#example-sentence').length > 0) {
	                    var key = _.findKey(localStorageObject.keyBindings, function(value) {
	                            return value === e.which;
	                        }),
	                        methods = {
	                            "next-example-key": function() {
	                                if ($('#next-example').is(':visible')) {
	                                    $('#next-example').click();
	                                }
	                            },
	                            "previous-example-key": function() {
	                                if ($('#previous-example').is(':visible')) {
	                                    $('#previous-example').click();
	                                }
	                            },
	                            "example-detail-toggle-key": function() {
	                                $('#example-detail-toggle').click();
	                            },
	                            "increase-font-size-key": function() {
	                                sessionFontSizeScaleFactor += 0.1;
	                                setExampleFontSize(sessionFontSizeScaleFactor);
	                            },
	                            "decrease-font-size-key": function() {
	                                sessionFontSizeScaleFactor -= 0.1;
	                                setExampleFontSize(sessionFontSizeScaleFactor);
	                            },
	                            "example-audio-key": function() {
	                                $('#example-audio').click();
	                            },
	                        };
	
	                    if (key) {
	                        methods[key]();
	                    }
	                    e.preventDefault();
	                }
                }
            });
        }

        function setModalEvents(settingsObject) {
            //modal show/hide
            $('#example-settings-modal').on('shown.bs.modal', function() {
                $(document).off('focusin.modal'); //enable focus events on modal
                $(document).off("keypress.example"); //disable keyboard shortcuts
            });
            
            $('#example-settings-modal').on('hide.bs.modal', function() {
                settingsObject = jQuery.extend(true, {}, localStorageObject);
                setModalFields(settingsObject);
                setKeyboardEvents();
            });

            //colours
            $('#picker button').colorPicker({
                renderCallback: function($elm, toggled) {
                    if($elm.parents('#picker').length) {
                        var id = $elm.attr('id'),
                            newColour = $elm.css('background-color');
                        settingsObject.colours[id] = newColour;
                        $('.' + id).css('color', newColour);
                    }
                },
                buildCallback: function($elm) {
                    $('.cp-color-picker').css('z-index', 2000); //bring to front
                },              
            });            

            //font size
            $('#font-range')[0].oninput = function() {
                var scaleFactor = $(this).val();
                settingsObject.fontSizeScaleFactor = scaleFactor;
                $('#font-range-label').text(scaleFactor + 'x');
                setModalFontSize(scaleFactor);
            };

            //audio Speed
            $('#speed-range')[0].oninput = function() {
                var speed = parseInt($(this).val(), 10);
                switch(speed){
                    case 0:
                        settingsObject.audioSpeed = 0.2;
                        $('#speed-range-label').text("Slow");
                        break;
                    case 1:
                        settingsObject.audioSpeed = 1;
                        $('#speed-range-label').text("Normal");
                        break;
                    case 2:
                        settingsObject.audioSpeed = 2.5;
                        $('#speed-range-label').text("Fast");
                        break;
                }
            };
            
            $('#settings-example-audio').click(function(){
               playAudio($('#settings-example-sentence').text(), settingsObject.audioSpeed); 
            });
            
            //Underline
            $('#underline').change(function() {
                var example = $('#settings-example-sentence'),
                    exampleUnderlined = !!$('#settings-example-sentence u').length;

                settingsObject.underlineWord = $(this).is(':checked');
                if (settingsObject.underlineWord !== exampleUnderlined) {
                    toggleUnderline(example);
                }
                $('#underline-label').text(settingsObject.underlineWord ? "Underlined" : "Not underlined");
            });

            //example difficulties
            $('.radio input[name=difficulty-options]').change(function() {
                if ($(this).is(':checked')) {
                    settingsObject.difficulty = $(this).val();
                }
            });

            //key bindings
            $('.set-link').click(function(setEvent) {
                $(document).off("keypress.example");
                var element = $(this).parent().find('.value');
                var initialValue = element.text();
                element.html('<input type="text" style="width:35px;height:20px;margin:0px" maxlength="1">');
                element.find('input').focus();

                var inputPending = true;
                setEvent.stopPropagation();

                $(document).click(function(event) {
                    onInput(event);
                });
                $(document).keypress(function(event) {
                    onInput(event);
                });

                function onInput(e) {
                    if (inputPending) {
                        var id = element.parent().attr('id');
                        element.html('<kbd></kbd>');
                        var invalidChars = _.where(settingsObject.keyBindings, function(val, key){return key.toString() !== id}).concat(13);
                        var char = (e.type === "keypress" && !_.contains(invalidChars, e.which)) ? String.fromCharCode(e.which) : initialValue;
                        element.find('kbd').text(char);
                        e.stopPropagation();
                        inputPending = false;
                        settingsObject.keyBindings[element.parent().attr('id')] = char.charCodeAt(0);
                    }
                    $(this).off(e);
                }
            });

            //button click events
            $('#save-settings-button').click(function() {
                var shouldReloadExamples = settingsObject.difficulty !== localStorageObject.difficulty;
                var shouldToggleUnderline = settingsObject.underlineWord !== localStorageObject.underlineWord;
                localStorage.setItem(localStorageIdentifier, JSON.stringify(settingsObject));
                localStorageObject = jQuery.extend(true, {}, settingsObject);
                if (shouldReloadExamples) {
                    $('#example-html').remove();
                    resetLocalVars();
                    showExample(true);
                } else {
                    colourExamples(cachedData.exampleList);
                    if(shouldToggleUnderline){
                        toggleUnderlines(cachedData.exampleList);
                    }
                    showExample();
                }
                sessionFontSizeScaleFactor = parseFloat(localStorageObject.fontSizeScaleFactor);
                setExampleFontSize(sessionFontSizeScaleFactor);
            });
            $('#reset-settings-button').click(function() {
                settingsObject = jQuery.extend(true, {}, defaultSettings);
                setModalFields(settingsObject);
            });
        }

        function setModalFields(settingsObject) {            
            //colours
            _.each($('#picker button'), function(elem){
                var id = $(elem).attr('id');
                $(elem).css('background-color', settingsObject.colours[id]);
                $('.' + id).css('color', settingsObject.colours[id]);
            }); 
            
            //font size
            $('#font-range').prop('value', settingsObject.fontSizeScaleFactor)[0].oninput();

            //audio speed
            $('#speed-range').prop('value', settingsObject.audioSpeed)[0].oninput();

            //underline
            $('#underline').prop('checked', settingsObject.underlineWord).change();

            //example difficulties
            $('.radio input[name=difficulty-options][value=' + settingsObject.difficulty + ']').prop('checked', true);

            //key bindings
            _.each($('table#key-bindings tr'), function(tr) {
                var id = $(tr).attr('id');
                var char = String.fromCharCode(settingsObject.keyBindings[id]);
                $(tr).find('td.value kbd').text(char);
            });
        }

        function setModalFontSize(scaleFactor) {
            scaleElementFontSize("#settings-example-sentence", scaleFactor);
            scaleElementFontSize("#settings-example-detail", 0.7 * scaleFactor);
        }

        function shiftShowMoreLink() {
            $('.show-more-link').css("right", "-80px");
        }

        function showExample(shouldLoadDOM) {
            function updateDOM() {
                if (shouldLoadDOM) {
                    loadDOM();
                }
                renderExample();
            }

            var fetchMoreExamples = !cachedData || (cachedData.total > 0) && (exampleIndex === cachedData.exampleList.length);
            if (fetchMoreExamples) {
                pageNo++;
                $("#next-example").hide();
                var url = getUrl(encodeURIComponent(word), pageNo);
                console.log("fetching examples from LINE dictionary, url = " + url);
                $.get(url, function(data) {
                    console.log("examples fetched, total number of examples: " + data.total);
                    onDataLoaded(data);
                    updateDOM();
                }, "jsonp");
            } else {
                updateDOM();
            }
        }
        
        function toggleUnderline(element) {
            $(element).find('u >').unwrap()[0] || $(element).find('strong').wrap('<u></u>');
            return element;
        }   
        
        function toggleUnderlines(examples) {
            _.each(examples, function(example) {
                example.exampleAutolink = _.map($.parseHTML(example.exampleAutolink) || example.exampleAutolink, function(word) {
                    return toggleUnderline(word);
                });
            });
        }     
    }
}());
