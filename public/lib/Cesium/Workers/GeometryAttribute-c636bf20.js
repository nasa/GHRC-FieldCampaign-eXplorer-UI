define(["exports","./when-54c2dc71","./Check-6c0211bc","./Cartesian2-36f5627e","./Transforms-441ed215","./WebGLConstants-76bb35d1"],function(e,i,u,v,L,t){"use strict";var r=Object.freeze({NONE:0,TRIANGLES:1,LINES:2,POLYLINES:3});function A(e,t,r,n){this[0]=i.defaultValue(e,0),this[1]=i.defaultValue(r,0),this[2]=i.defaultValue(t,0),this[3]=i.defaultValue(n,0)}A.packedLength=4,A.pack=function(e,t,r){return u.Check.typeOf.object("value",e),u.Check.defined("array",t),r=i.defaultValue(r,0),t[r++]=e[0],t[r++]=e[1],t[r++]=e[2],t[r++]=e[3],t},A.unpack=function(e,t,r){return u.Check.defined("array",e),t=i.defaultValue(t,0),i.defined(r)||(r=new A),r[0]=e[t++],r[1]=e[t++],r[2]=e[t++],r[3]=e[t++],r},A.clone=function(e,t){if(i.defined(e))return i.defined(t)?(t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t):new A(e[0],e[2],e[1],e[3])},A.fromArray=function(e,t,r){return u.Check.defined("array",e),t=i.defaultValue(t,0),i.defined(r)||(r=new A),r[0]=e[t],r[1]=e[t+1],r[2]=e[t+2],r[3]=e[t+3],r},A.fromColumnMajorArray=function(e,t){return u.Check.defined("values",e),A.clone(e,t)},A.fromRowMajorArray=function(e,t){return u.Check.defined("values",e),i.defined(t)?(t[0]=e[0],t[1]=e[2],t[2]=e[1],t[3]=e[3],t):new A(e[0],e[1],e[2],e[3])},A.fromScale=function(e,t){return u.Check.typeOf.object("scale",e),i.defined(t)?(t[0]=e.x,t[1]=0,t[2]=0,t[3]=e.y,t):new A(e.x,0,0,e.y)},A.fromUniformScale=function(e,t){return u.Check.typeOf.number("scale",e),i.defined(t)?(t[0]=e,t[1]=0,t[2]=0,t[3]=e,t):new A(e,0,0,e)},A.fromRotation=function(e,t){u.Check.typeOf.number("angle",e);var r=Math.cos(e),n=Math.sin(e);return i.defined(t)?(t[0]=r,t[1]=n,t[2]=-n,t[3]=r,t):new A(r,-n,n,r)},A.toArray=function(e,t){return u.Check.typeOf.object("matrix",e),i.defined(t)?(t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t):[e[0],e[1],e[2],e[3]]},A.getElementIndex=function(e,t){return u.Check.typeOf.number.greaterThanOrEquals("row",t,0),u.Check.typeOf.number.lessThanOrEquals("row",t,1),u.Check.typeOf.number.greaterThanOrEquals("column",e,0),u.Check.typeOf.number.lessThanOrEquals("column",e,1),2*e+t},A.getColumn=function(e,t,r){u.Check.typeOf.object("matrix",e),u.Check.typeOf.number.greaterThanOrEquals("index",t,0),u.Check.typeOf.number.lessThanOrEquals("index",t,1),u.Check.typeOf.object("result",r);var n=2*t,a=e[n],i=e[1+n];return r.x=a,r.y=i,r},A.setColumn=function(e,t,r,n){u.Check.typeOf.object("matrix",e),u.Check.typeOf.number.greaterThanOrEquals("index",t,0),u.Check.typeOf.number.lessThanOrEquals("index",t,1),u.Check.typeOf.object("cartesian",r),u.Check.typeOf.object("result",n);var a=2*t;return(n=A.clone(e,n))[a]=r.x,n[1+a]=r.y,n},A.getRow=function(e,t,r){u.Check.typeOf.object("matrix",e),u.Check.typeOf.number.greaterThanOrEquals("index",t,0),u.Check.typeOf.number.lessThanOrEquals("index",t,1),u.Check.typeOf.object("result",r);var n=e[t],a=e[t+2];return r.x=n,r.y=a,r},A.setRow=function(e,t,r,n){return u.Check.typeOf.object("matrix",e),u.Check.typeOf.number.greaterThanOrEquals("index",t,0),u.Check.typeOf.number.lessThanOrEquals("index",t,1),u.Check.typeOf.object("cartesian",r),u.Check.typeOf.object("result",n),(n=A.clone(e,n))[t]=r.x,n[t+2]=r.y,n};var n=new v.Cartesian2;A.getScale=function(e,t){return u.Check.typeOf.object("matrix",e),u.Check.typeOf.object("result",t),t.x=v.Cartesian2.magnitude(v.Cartesian2.fromElements(e[0],e[1],n)),t.y=v.Cartesian2.magnitude(v.Cartesian2.fromElements(e[2],e[3],n)),t};var a=new v.Cartesian2;A.getMaximumScale=function(e){return A.getScale(e,a),v.Cartesian2.maximumComponent(a)},A.multiply=function(e,t,r){u.Check.typeOf.object("left",e),u.Check.typeOf.object("right",t),u.Check.typeOf.object("result",r);var n=e[0]*t[0]+e[2]*t[1],a=e[0]*t[2]+e[2]*t[3],i=e[1]*t[0]+e[3]*t[1],o=e[1]*t[2]+e[3]*t[3];return r[0]=n,r[1]=i,r[2]=a,r[3]=o,r},A.add=function(e,t,r){return u.Check.typeOf.object("left",e),u.Check.typeOf.object("right",t),u.Check.typeOf.object("result",r),r[0]=e[0]+t[0],r[1]=e[1]+t[1],r[2]=e[2]+t[2],r[3]=e[3]+t[3],r},A.subtract=function(e,t,r){return u.Check.typeOf.object("left",e),u.Check.typeOf.object("right",t),u.Check.typeOf.object("result",r),r[0]=e[0]-t[0],r[1]=e[1]-t[1],r[2]=e[2]-t[2],r[3]=e[3]-t[3],r},A.multiplyByVector=function(e,t,r){u.Check.typeOf.object("matrix",e),u.Check.typeOf.object("cartesian",t),u.Check.typeOf.object("result",r);var n=e[0]*t.x+e[2]*t.y,a=e[1]*t.x+e[3]*t.y;return r.x=n,r.y=a,r},A.multiplyByScalar=function(e,t,r){return u.Check.typeOf.object("matrix",e),u.Check.typeOf.number("scalar",t),u.Check.typeOf.object("result",r),r[0]=e[0]*t,r[1]=e[1]*t,r[2]=e[2]*t,r[3]=e[3]*t,r},A.multiplyByScale=function(e,t,r){return u.Check.typeOf.object("matrix",e),u.Check.typeOf.object("scale",t),u.Check.typeOf.object("result",r),r[0]=e[0]*t.x,r[1]=e[1]*t.x,r[2]=e[2]*t.y,r[3]=e[3]*t.y,r},A.negate=function(e,t){return u.Check.typeOf.object("matrix",e),u.Check.typeOf.object("result",t),t[0]=-e[0],t[1]=-e[1],t[2]=-e[2],t[3]=-e[3],t},A.transpose=function(e,t){u.Check.typeOf.object("matrix",e),u.Check.typeOf.object("result",t);var r=e[0],n=e[2],a=e[1],i=e[3];return t[0]=r,t[1]=n,t[2]=a,t[3]=i,t},A.abs=function(e,t){return u.Check.typeOf.object("matrix",e),u.Check.typeOf.object("result",t),t[0]=Math.abs(e[0]),t[1]=Math.abs(e[1]),t[2]=Math.abs(e[2]),t[3]=Math.abs(e[3]),t},A.equals=function(e,t){return e===t||i.defined(e)&&i.defined(t)&&e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]},A.equalsArray=function(e,t,r){return e[0]===t[r]&&e[1]===t[r+1]&&e[2]===t[r+2]&&e[3]===t[r+3]},A.equalsEpsilon=function(e,t,r){return r=i.defaultValue(r,0),e===t||i.defined(e)&&i.defined(t)&&Math.abs(e[0]-t[0])<=r&&Math.abs(e[1]-t[1])<=r&&Math.abs(e[2]-t[2])<=r&&Math.abs(e[3]-t[3])<=r},A.IDENTITY=Object.freeze(new A(1,0,0,1)),A.ZERO=Object.freeze(new A(0,0,0,0)),A.COLUMN0ROW0=0,A.COLUMN0ROW1=1,A.COLUMN1ROW0=2,A.COLUMN1ROW1=3,Object.defineProperties(A.prototype,{length:{get:function(){return A.packedLength}}}),A.prototype.clone=function(e){return A.clone(this,e)},A.prototype.equals=function(e){return A.equals(this,e)},A.prototype.equalsEpsilon=function(e,t){return A.equalsEpsilon(this,e,t)},A.prototype.toString=function(){return"("+this[0]+", "+this[2]+")\n("+this[1]+", "+this[3]+")"};var o={POINTS:t.WebGLConstants.POINTS,LINES:t.WebGLConstants.LINES,LINE_LOOP:t.WebGLConstants.LINE_LOOP,LINE_STRIP:t.WebGLConstants.LINE_STRIP,TRIANGLES:t.WebGLConstants.TRIANGLES,TRIANGLE_STRIP:t.WebGLConstants.TRIANGLE_STRIP,TRIANGLE_FAN:t.WebGLConstants.TRIANGLE_FAN,validate:function(e){return e===o.POINTS||e===o.LINES||e===o.LINE_LOOP||e===o.LINE_STRIP||e===o.TRIANGLES||e===o.TRIANGLE_STRIP||e===o.TRIANGLE_FAN}},c=Object.freeze(o);function s(e){e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT),u.Check.typeOf.object("options.attributes",e.attributes),this.attributes=e.attributes,this.indices=e.indices,this.primitiveType=i.defaultValue(e.primitiveType,c.TRIANGLES),this.boundingSphere=e.boundingSphere,this.geometryType=i.defaultValue(e.geometryType,r.NONE),this.boundingSphereCV=e.boundingSphereCV,this.offsetAttribute=e.offsetAttribute}s.computeNumberOfVertices=function(e){u.Check.typeOf.object("geometry",e);var t=-1;for(var r in e.attributes)if(e.attributes.hasOwnProperty(r)&&i.defined(e.attributes[r])&&i.defined(e.attributes[r].values)){var n=e.attributes[r],a=n.values.length/n.componentsPerAttribute;if(t!==a&&-1!==t)throw new u.DeveloperError("All attribute lists must have the same number of attributes.");t=a}return t};var S=new v.Cartographic,M=new v.Cartesian3,P=new L.Matrix4,R=[new v.Cartographic,new v.Cartographic,new v.Cartographic],V=[new v.Cartesian2,new v.Cartesian2,new v.Cartesian2],G=[new v.Cartesian2,new v.Cartesian2,new v.Cartesian2],q=new v.Cartesian3,_=new L.Quaternion,W=new L.Matrix4,D=new A;s._textureCoordinateRotationPoints=function(e,t,r,n){var a=v.Rectangle.center(n,S),i=v.Cartographic.toCartesian(a,r,M),o=L.Transforms.eastNorthUpToFixedFrame(i,r,P),u=L.Matrix4.inverse(o,P),c=V,s=R;s[0].longitude=n.west,s[0].latitude=n.south,s[1].longitude=n.west,s[1].latitude=n.north,s[2].longitude=n.east,s[2].latitude=n.south;for(var f=q,l=0;l<3;l++)v.Cartographic.toCartesian(s[l],r,f),f=L.Matrix4.multiplyByPointAsVector(u,f,f),c[l].x=f.x,c[l].y=f.y;var h=L.Quaternion.fromAxisAngle(v.Cartesian3.UNIT_Z,-t,_),p=L.Matrix3.fromQuaternion(h,W),y=e.length,b=Number.POSITIVE_INFINITY,C=Number.POSITIVE_INFINITY,m=Number.NEGATIVE_INFINITY,d=Number.NEGATIVE_INFINITY;for(l=0;l<y;l++)f=L.Matrix4.multiplyByPointAsVector(u,e[l],f),f=L.Matrix3.multiplyByVector(p,f,f),b=Math.min(b,f.x),C=Math.min(C,f.y),m=Math.max(m,f.x),d=Math.max(d,f.y);var O=A.fromRotation(t,D),k=G;k[0].x=b,k[0].y=C,k[1].x=b,k[1].y=d,k[2].x=m,k[2].y=C;var x=c[0],E=c[2].x-x.x,T=c[1].y-x.y;for(l=0;l<3;l++){var N=k[l];A.multiplyByVector(O,N,N),N.x=(N.x-x.x)/E,N.y=(N.y-x.y)/T}var I=k[0],w=k[1],j=k[2],g=new Array(6);return v.Cartesian2.pack(I,g),v.Cartesian2.pack(w,g,2),v.Cartesian2.pack(j,g,4),g},e.Geometry=s,e.GeometryAttribute=function(e){if(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT),!i.defined(e.componentDatatype))throw new u.DeveloperError("options.componentDatatype is required.");if(!i.defined(e.componentsPerAttribute))throw new u.DeveloperError("options.componentsPerAttribute is required.");if(e.componentsPerAttribute<1||4<e.componentsPerAttribute)throw new u.DeveloperError("options.componentsPerAttribute must be between 1 and 4.");if(!i.defined(e.values))throw new u.DeveloperError("options.values is required.");this.componentDatatype=e.componentDatatype,this.componentsPerAttribute=e.componentsPerAttribute,this.normalize=i.defaultValue(e.normalize,!1),this.values=e.values},e.GeometryType=r,e.Matrix2=A,e.PrimitiveType=c});
//# sourceMappingURL=GeometryAttribute-c636bf20.js.map
