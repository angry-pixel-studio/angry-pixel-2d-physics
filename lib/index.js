!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?i(exports):"function"==typeof define&&define.amd?define(["exports"],i):i((t="undefined"!=typeof globalThis?globalThis:t||self).AngryPixel2dPhysics={})}(this,(function(t){"use strict";class i{constructor(t=0,i=0){this._x=t,this._y=i}get x(){return this._x}set x(t){this._x=t}get y(){return this._y}set y(t){this._y=t}get magnitude(){return Math.sqrt(Math.pow(this._x,2)+Math.pow(this._y,2))}set(t,i){this._x=t,this._y=i}copy(t){this.set(t.x,t.y)}equals(t){return this._x===t.x&&this._y===t.y}clone(){return new i(this._x,this._y)}distance(t){return Math.sqrt(Math.pow(this._x-t.x,2)+Math.pow(this._y-t.y,2))}static add(t,i,e){return t.set(i.x+e.x,i.y+e.y),t}static subtract(t,i,e){return t.set(i.x-e.x,i.y-e.y),t}static unit(t,i){return 0===i.magnitude?t.set(0,0):t.set(i.x/i.magnitude,i.y/i.magnitude),t}static normal(t,i){return t.set(-i.y,i.x),this.unit(t,t)}static scale(t,i,e){return t.set(i.x*e,i.y*e),t}static dot(t,i){return t.x*i.x+t.y*i.y}static cross(t,i){return t.x*i.y-t.y*i.x}static round(t,i){return t.set(Math.round(i.x),Math.round(i.y)),t}}class e{constructor(t,e,s,o){this._position=new i,this._center=new i,this._width=0,this._height=0,this.set(t,e,s,o)}get x(){return this._position.x}set x(t){this._position.set(t,this._position.y)}get y(){return this._position.y}set y(t){this._position.set(this._position.x,t)}get x1(){return this._position.x+this._width}get y1(){return this._position.y+this._height}get position(){return this._position}set position(t){this._position.set(t.x,t.y)}get width(){return this._width}set width(t){this._width=t}get height(){return this._height}set height(t){this._height=t}get center(){return this._center.set(this.x+this.width/2,this.y+this.height/2),this._center}set(t,i,e,s){this._position.set(t,i),this._width=e,this._height=s}equals(t){return this.position.equals(t.position)&&this.width===t.width&&this.height===t.height}copy(t){this.set(t.x,t.y,t.width,t.height)}overlaps(t){return this.x1>=t.x&&this.x<t.x1&&this.y1>=t.y&&this.y<t.y1}contains(t){return t instanceof e?t.x1<=this.x1&&t.x>=this.x&&t.y1<=this.y1&&t.y>=this.y:t instanceof i&&!(t.x<this.x||t.y<this.y||t.x>=this.x1||t.y>=this.y1)}}const s=(t,i,e)=>Math.min(e,Math.max(i,t));class o{constructor(t,i=0){this.childrenArea=[],this.children=[],this.items=[],this.depth=i,this.resize(t)}resize(t){this.clear(),this.area=t;const i=t.width/2,s=t.height/2;this.childrenArea=[new e(this.area.x,this.area.y+s,i,s),new e(this.area.x+i,this.area.y+s,i,s),new e(this.area.x,this.area.y,i,s),new e(this.area.x+i,this.area.y,i,s)]}clear(){this.items=[];for(let t=0;t<4;t++)this.children[t]&&this.children[t].clear(),delete this.children[t]}insert(t,i){for(let e=0;e<4;e++)if(this.childrenArea[e].contains(i)&&this.depth+1<8)return this.children[e]||(this.children[e]=new o(this.childrenArea[e],this.depth+1)),this.children[e].insert(t,i);this.items.push([i,t])}retrieve(t,i=[]){return this.area.overlaps(t)&&(this.items.forEach((t=>i.push(t[1]))),this.children.forEach((e=>e.retrieve(t,i)))),i}}class r{constructor(t,s,o){this.collisions=[],this.minArea=new i,this.maxArea=new i,this.newArea=new e(0,0,0,0),this.method=t,this.colliders=[],this.collisionMatrix=o,this.setupQuadTree(s)}setupQuadTree(t){this.quadTreeArea=null!=t?t:new e(0,0,0,0),this.fixedQuadTree=!!t,this.quadTree=new o(this.quadTreeArea)}addCollider(t){this.colliders.push(t)}removeCollider(t){const i=this.colliders.indexOf(t);-1!==i&&(delete this.colliders[i],this.colliders.splice(i,1))}clearColliders(){this.colliders=[]}getCollisionsForCollider(t){return this.collisions.filter((i=>i.localCollider===t))}refreshCollisionsForCollider(t){-1!==this.colliders.indexOf(t)&&(this.collisions=this.collisions.filter((i=>i.localCollider!==t&&i.remoteCollider!==t)),this.narrowPhase(t,this.broadPhase(t)))}resolve(){this.collisions=[],0!==this.colliders.length&&(this.quadTree.clear(),this.updateShapes(),!1===this.fixedQuadTree&&(this.updateNewArea(),!1===this.newArea.equals(this.quadTreeArea)&&(this.quadTreeArea.copy(this.newArea),this.quadTree.resize(this.quadTreeArea))),this.colliders.forEach(((t,i)=>this.quadTree.insert(i,t.shape.boundingBox))),this.updateCollisions(),console.log(this.collisions))}updateShapes(){this.colliders.forEach((t=>{t.shape.position=t.position,t.shape.rotation=t.rotation,t.shape.update()}))}updateNewArea(){this.colliders.forEach((({shape:{boundingBox:t}})=>{this.minArea.set(Math.min(t.x,this.minArea.x),Math.min(t.y,this.minArea.y)),this.maxArea.set(Math.max(t.x1,this.maxArea.x),Math.max(t.y1,this.maxArea.y))})),this.newArea.set(this.minArea.x,this.minArea.y,this.maxArea.x-this.minArea.x,this.maxArea.y-this.minArea.y)}updateCollisions(){this.colliders.filter((t=>t.updateCollisions)).forEach((t=>this.narrowPhase(t,this.broadPhase(t))))}broadPhase(t){return this.collisionMatrix?this.quadTree.retrieve(t.shape.boundingBox).map((t=>this.colliders[t])).filter((i=>this.collisionMatrix.some((e=>e[0]===t.layer&&e[1]===i.layer||e[1]===t.layer&&e[0]===i.layer)))):this.quadTree.retrieve(t.shape.boundingBox).map((t=>this.colliders[t]))}narrowPhase(t,i){console.log(t,i),i.filter((i=>!(t.group&&i.group&&i.group===t.group||t===i))).forEach((i=>{if(this.isResolved(t,i))return;const e=this.method.getCollisionResolution(t.shape,i.shape);null!==e&&(this.collisions.push({localCollider:t,remoteCollider:i,resolution:e},{localCollider:i,remoteCollider:t,resolution:{direction:e.displacementDirection,displacementDirection:e.direction,penetration:e.penetration}}),t.onCollision&&t.onCollision(e))}))}isResolved(t,i){for(const e of this.collisions)if(e.localCollider===t&&e.remoteCollider===i)return!0;return!1}}var n,h;!function(t){t[t.Polygon=0]="Polygon",t[t.Circumference=1]="Circumference",t[t.Line=2]="Line"}(n||(n={}));class a{constructor(t,i,e){this.AABBResolver=t,this.circumferenceAABBResolver=i,this.circumferenceResolver=e}getCollisionResolution(t,i){return t.type===n.Polygon&&i.type===n.Polygon?this.AABBResolver.resolve(t,i):t.type===n.Circumference&&i.type===n.Polygon?this.circumferenceAABBResolver.resolve(t,i):t.type===n.Polygon&&i.type===n.Circumference?this.circumferenceAABBResolver.resolve(i,t,!0):t.type===n.Circumference&&i.type===n.Circumference?this.circumferenceResolver.resolve(t,i):null}}!function(t){t[t.AABB=0]="AABB",t[t.SAT=1]="SAT"}(h||(h={}));class c{constructor(t,i){this.circumferenceResolver=t,this.satResolver=i}getCollisionResolution(t,i){return t.type===n.Circumference&&i.type===n.Circumference?this.circumferenceResolver.resolve(t,i):this.satResolver.resolve(t,i)}}class l{constructor(){this.direction=new i,this.displacementDirection=new i}resolve({boundingBox:t},{boundingBox:e}){return this.overlapX=Math.min(t.x1,e.x1)-Math.max(t.x,e.x),this.overlapY=Math.min(t.y1,e.y1)-Math.max(t.y,e.y),this.overlapX<0||this.overlapY<0?null:(this.direction.set(Math.sign(e.x1-t.x1),Math.sign(e.y1-t.y1)),this.overlapY<this.overlapX?(this.minOverlap=this.overlapY,this.displacementDirection.set(0,-this.direction.y),this.preventContainment(t.y,t.y1,e.y,e.y1)):(this.minOverlap=this.overlapX,this.displacementDirection.set(-this.direction.x,this.overlapY===this.overlapX?-this.direction.y:0),this.preventContainment(t.x,t.x1,e.x,e.x1)),i.unit(this.displacementDirection,this.displacementDirection),{penetration:this.minOverlap,displacementDirection:this.displacementDirection.clone(),direction:i.scale(new i,this.displacementDirection,-1)})}preventContainment(t,e,s,o){if(t>s&&e<o||s>t&&o<e){const r=Math.abs(t-s),n=Math.abs(e-o);r<n?this.minOverlap+=r:(this.minOverlap+=n,i.scale(this.displacementDirection,this.displacementDirection,-1))}}}class d{constructor(){this.closestPoint=new i,this.distance=new i,this.direction=new i}resolve(t,e,o=!1){return this.closestPoint.set(s(t.position.x,e.boundingBox.x,e.boundingBox.x1),s(t.position.y,e.boundingBox.y,e.boundingBox.y1)),i.subtract(this.distance,this.closestPoint,t.position),this.distance.magnitude>t.radius?null:(i.unit(this.direction,this.distance),{penetration:t.radius-this.distance.magnitude,direction:o?i.scale(new i,this.direction,-1):this.direction.clone(),displacementDirection:o?this.direction.clone():i.scale(new i,this.direction,-1)})}}class u{constructor(){this.distance=new i,this.direction=new i}resolve(t,e){return i.subtract(this.distance,e.position,t.position),this.distance.magnitude>t.radius+e.radius?null:(i.unit(this.direction,this.distance),{penetration:t.radius+e.radius-this.distance.magnitude,direction:this.direction.clone(),displacementDirection:i.scale(new i,this.direction,-1)})}}class p{constructor(){this.projA={min:0,max:0},this.projB={min:0,max:0},this.displacementDirection=new i,this.distance=new i(1/0,1/0),this.cache=new i}resolve(t,e){this.currentOverlap=null,this.minOverlap=null,t.type===n.Circumference?this.setCircumferenceAxis(t,e):e.type===n.Circumference&&this.setCircumferenceAxis(e,t),this.axes=[...t.projectionAxes,...e.projectionAxes];for(let s=0;s<this.axes.length;s++){if(t.type===n.Circumference?this.setCircumferenceVertices(t,this.axes[s]):e.type===n.Circumference&&this.setCircumferenceVertices(e,this.axes[s]),this.projectShapeOntoAxis(this.projA,t,this.axes[s]),this.projectShapeOntoAxis(this.projB,e,this.axes[s]),this.currentOverlap=Math.min(this.projA.max,this.projB.max)-Math.max(this.projA.min,this.projB.min),this.currentOverlap<0)return null;this.preventContainment(s),(null===this.minOverlap||this.currentOverlap<this.minOverlap)&&(this.minOverlap=this.currentOverlap,this.displacementDirection.copy(this.axes[s]),this.projA.max<this.projB.max&&i.scale(this.displacementDirection,this.displacementDirection,-1))}return{penetration:this.minOverlap,displacementDirection:this.displacementDirection.clone(),direction:i.scale(new i,this.displacementDirection,-1)}}projectShapeOntoAxis(t,e,s){return t.min=i.dot(s,e.vertices[0]),t.max=t.min,e.vertices.forEach((e=>{t.min=Math.min(i.dot(s,e),t.min),t.max=Math.max(i.dot(s,e),t.max)})),t}preventContainment(t){if(this.projA.max>this.projB.max&&this.projA.min<this.projB.min||this.projA.max<this.projB.max&&this.projA.min>this.projB.min){const e=Math.abs(this.projA.min-this.projB.min),s=Math.abs(this.projA.max-this.projB.max);e<s?this.currentOverlap+=e:(this.currentOverlap+=s,i.scale(this.axes[t],this.axes[t],-1))}}setCircumferenceAxis(t,e){this.distance.set(1/0,1/0),e.vertices.forEach((e=>{i.subtract(this.cache,e,t.position),this.cache.magnitude<this.distance.magnitude&&this.distance.copy(this.cache)})),i.unit(t.projectionAxes[0],this.distance)}setCircumferenceVertices(t,e){i.add(t.vertices[0],t.position,i.scale(this.cache,i.unit(this.cache,e),-t.radius)),i.add(t.vertices[1],t.position,i.scale(this.cache,i.unit(this.cache,e),t.radius))}}class x{constructor(t){this.collisionManager=t}addCollider(t){this.collisionManager.addCollider(t)}removeCollider(t){this.collisionManager.removeCollider(t)}clearColliders(){this.collisionManager.clearColliders()}resolve(){this.collisionManager.resolve()}getCollisionsForCollider(t){return this.collisionManager.getCollisionsForCollider(t)}}class m{constructor(t){this.vertexModel=t,this.type=n.Polygon,this.vertices=[],this.boundingBox=new e(0,0,0,0),this.rotation=0,this._projectionAxes=[],this._position=new i,this.boxMinX=Number.MAX_SAFE_INTEGER,this.boxMinY=Number.MAX_SAFE_INTEGER,this.boxMaxX=-Number.MAX_SAFE_INTEGER,this.boxMaxY=-Number.MAX_SAFE_INTEGER;for(let t=0;t<this.vertexModel.length;t++)this.vertices.push(new i),this._projectionAxes.push(new i)}set position(t){this._position.copy(t)}get position(){return this._position}get projectionAxes(){return this._projectionAxes}update(){this.updateVertices(),this.updateBoundingBox(),this.updateProjectionAxes()}updateVertices(){for(let t=0;t<this.vertexModel.length;t++)this.vertices[t].set(this.vertexModel[t].x*Math.cos(this.rotation)-this.vertexModel[t].y*Math.sin(this.rotation)+this._position.x,this.vertexModel[t].x*Math.sin(this.rotation)+this.vertexModel[t].y*Math.cos(this.rotation)+this._position.y)}updateBoundingBox(){this.boxMinX=this.vertices[0].x,this.boxMinY=this.vertices[0].y,this.boxMaxX=this.vertices[0].x,this.boxMaxY=this.vertices[0].y,this.vertices.forEach((t=>{this.boxMinX=Math.min(t.x,this.boxMinX),this.boxMinY=Math.min(t.y,this.boxMinY),this.boxMaxX=Math.max(t.x,this.boxMaxX),this.boxMaxY=Math.max(t.y,this.boxMaxY)})),this.boundingBox.set(this.boxMinX,this.boxMinY,this.boxMaxX-this.boxMinX,this.boxMaxY-this.boxMinY)}updateProjectionAxes(){var t;for(let e=0;e<this.vertices.length;e++)i.normal(this._projectionAxes[e],i.subtract(this._projectionAxes[e],null!==(t=this.vertices[e+1])&&void 0!==t?t:this.vertices[0],this.vertices[e]))}}t.Circumference=class{constructor(t){this.radius=t,this.type=n.Circumference,this.boundingBox=new e(0,0,0,0),this.vertices=[new i,new i],this.projectionAxes=[new i],this._position=new i}set position(t){this._position.copy(t)}get position(){return this._position}update(){this.updateBoundingBox()}updateBoundingBox(){this.boundingBox.set(this.position.x-this.radius,this.position.y-this.radius,2*this.radius,2*this.radius)}},t.Line=class{constructor(t){this.vertexModel=t,this.type=n.Polygon,this.vertices=[new i,new i],this.projectionAxes=[new i],this.boundingBox=new e(0,0,0,0),this.rotation=0,this._position=new i}update(){this.updateVertices(),this.updateBoundingBox(),this.updateProjectionAxes()}set position(t){this._position.copy(t)}get position(){return this._position}updateVertices(){for(let t=0;t<this.vertexModel.length;t++)this.vertices[t].set(this.vertexModel[t].x*Math.cos(this.rotation)-this.vertexModel[t].y*Math.sin(this.rotation)+this._position.x,this.vertexModel[t].x*Math.sin(this.rotation)+this.vertexModel[t].y*Math.cos(this.rotation)+this._position.y)}updateBoundingBox(){this.boundingBox.x=Math.min(this.vertices[0].x,this.vertices[1].x),this.boundingBox.y=Math.min(this.vertices[0].y,this.vertices[1].y),this.boundingBox.width=Math.max(this.vertices[0].x,this.vertices[1].x)-this.boundingBox.x,this.boundingBox.height=Math.max(this.vertices[0].y,this.vertices[1].y)-this.boundingBox.y}updateProjectionAxes(){i.normal(this.projectionAxes[0],i.subtract(this.projectionAxes[0],this.vertices[1],this.vertices[0]))}},t.Polygon=m,t.Rectangle=class extends m{constructor(t,e){super([new i(-t/2,-e/2),new i(-t/2,e/2),new i(t/2,e/2),new i(t/2,-e/2)]),this.width=t,this.height=e,this._projectionAxes=[new i,new i]}updateSize(t,i){this.width=t,this.height=i,this.vertexModel[0].set(-t/2,-i/2),this.vertexModel[1].set(-t/2,i/2),this.vertexModel[2].set(t/2,i/2),this.vertexModel[3].set(t/2,-i/2)}updateProjectionAxes(){i.unit(this.projectionAxes[0],i.subtract(this.projectionAxes[0],this.vertices[1],this.vertices[0])),i.normal(this.projectionAxes[1],this.projectionAxes[0])}},t.physicsManagerFactory=({collisionArea:t,collisionMatrix:i,collisionMethod:e}={})=>{const s=new u,o=e===h.AABB?new a(new l,new d,s):new c(s,new p),n=new r(o,t,i);return new x(n)},Object.defineProperty(t,"__esModule",{value:!0})}));