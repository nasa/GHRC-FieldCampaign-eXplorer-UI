define(["./when-54c2dc71","./Check-6c0211bc","./Math-fc8cecf5","./Cartesian2-a8ce88a9","./Transforms-7e5c2db7","./RuntimeError-2109023a","./WebGLConstants-76bb35d1","./ComponentDatatype-6d99a1ee","./GeometryAttribute-bc86b131","./GeometryAttributes-4fcfcf40","./AttributeCompression-88d6db09","./GeometryPipeline-68412652","./EncodedCartesian3-e3c09f89","./IndexDatatype-53503fee","./IntersectionTests-482ba9a0","./Plane-128f4e7f","./GeometryOffsetAttribute-7350d9af","./VertexFormat-7572c785","./EllipseGeometryLibrary-8cd07d5b","./GeometryInstance-e33af374","./EllipseGeometry-81324dbf"],function(r,e,t,n,c,i,a,o,s,d,f,l,b,m,p,y,u,G,C,E,A){"use strict";return function(e,t){return r.defined(t)&&(e=A.EllipseGeometry.unpack(e,t)),e._center=n.Cartesian3.clone(e._center),e._ellipsoid=n.Ellipsoid.clone(e._ellipsoid),A.EllipseGeometry.createGeometry(e)}});
