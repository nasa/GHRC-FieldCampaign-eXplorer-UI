define(["exports","./when-54c2dc71","./Check-6c0211bc","./Cartesian2-36f5627e"],function(e,a,h,n){"use strict";function t(){this.high=n.Cartesian3.clone(n.Cartesian3.ZERO),this.low=n.Cartesian3.clone(n.Cartesian3.ZERO)}t.encode=function(e,n){var i;return h.Check.typeOf.number("value",e),a.defined(n)||(n={high:0,low:0}),0<=e?(i=65536*Math.floor(e/65536),n.high=i,n.low=e-i):(i=65536*Math.floor(-e/65536),n.high=-i,n.low=e+i),n};var o={high:0,low:0};t.fromCartesian=function(e,n){h.Check.typeOf.object("cartesian",e),a.defined(n)||(n=new t);var i=n.high,r=n.low;return t.encode(e.x,o),i.x=o.high,r.x=o.low,t.encode(e.y,o),i.y=o.high,r.y=o.low,t.encode(e.z,o),i.z=o.high,r.z=o.low,n};var c=new t;t.writeElements=function(e,n,i){h.Check.defined("cartesianArray",n),h.Check.typeOf.number("index",i),h.Check.typeOf.number.greaterThanOrEquals("index",i,0),t.fromCartesian(e,c);var r=c.high,a=c.low;n[i]=r.x,n[i+1]=r.y,n[i+2]=r.z,n[i+3]=a.x,n[i+4]=a.y,n[i+5]=a.z},e.EncodedCartesian3=t});
//# sourceMappingURL=EncodedCartesian3-713823b7.js.map