class t{constructor(t=0,i=0){this._x=t,this._y=i}get x(){return this._x}set x(t){this._x=t}get y(){return this._y}set y(t){this._y=t}get magnitude(){return Math.sqrt(Math.pow(this._x,2)+Math.pow(this._y,2))}set(t,i){this._x=t,this._y=i}copy(t){this.set(t.x,t.y)}equals(t){return this._x===t.x&&this._y===t.y}clone(){return new t(this._x,this._y)}distance(t){return Math.sqrt(Math.pow(this._x-t.x,2)+Math.pow(this._y-t.y,2))}static add(t,i,e){return t.set(i.x+e.x,i.y+e.y),t}static subtract(t,i,e){return t.set(i.x-e.x,i.y-e.y),t}static unit(t,i){return 0===i.magnitude?t.set(0,0):t.set(i.x/i.magnitude,i.y/i.magnitude),t}static normal(t,i){return t.set(-i.y,i.x),this.unit(t,t)}static scale(t,i,e){return t.set(i.x*e,i.y*e),t}static dot(t,i){return t.x*i.x+t.y*i.y}static cross(t,i){return t.x*i.y-t.y*i.x}static round(t,i){return t.set(Math.round(i.x),Math.round(i.y)),t}}class i{constructor(i,e,s,o){this._position=new t,this._center=new t,this._width=0,this._height=0,this.set(i,e,s,o)}get x(){return this._position.x}set x(t){this._position.set(t,this._position.y)}get y(){return this._position.y}set y(t){this._position.set(this._position.x,t)}get x1(){return this._position.x+this._width}get y1(){return this._position.y+this._height}get position(){return this._position}set position(t){this._position.set(t.x,t.y)}get width(){return this._width}set width(t){this._width=t}get height(){return this._height}set height(t){this._height=t}get center(){return this._center.set(this.x+this.width/2,this.y+this.height/2),this._center}set(t,i,e,s){this._position.set(t,i),this._width=e,this._height=s}equals(t){return this.position.equals(t.position)&&this.width===t.width&&this.height===t.height}copy(t){this.set(t.x,t.y,t.width,t.height)}overlaps(t){return this.x1>=t.x&&this.x<t.x1&&this.y1>=t.y&&this.y<t.y1}contains(e){return e instanceof i?e.x1<=this.x1&&e.x>=this.x&&e.y1<=this.y1&&e.y>=this.y:e instanceof t&&!(e.x<this.x||e.y<this.y||e.x>=this.x1||e.y>=this.y1)}}const e=(t,i,e)=>Math.min(e,Math.max(i,t));class s{constructor(t,i=0){this.childrenArea=[],this.children=[],this.items=[],this.depth=i,this.resize(t)}resize(t){this.clear(),this.area=t;const e=t.width/2,s=t.height/2;this.childrenArea=[new i(this.area.x,this.area.y+s,e,s),new i(this.area.x+e,this.area.y+s,e,s),new i(this.area.x,this.area.y,e,s),new i(this.area.x+e,this.area.y,e,s)]}clear(){this.items=[];for(let t=0;t<4;t++)this.children[t]&&this.children[t].clear(),delete this.children[t]}insert(t,i){for(let e=0;e<4;e++)if(this.childrenArea[e].contains(i)&&this.depth+1<8)return this.children[e]||(this.children[e]=new s(this.childrenArea[e],this.depth+1)),this.children[e].insert(t,i);this.items.push([i,t])}retrieve(t,i=[]){return this.area.overlaps(t)&&(this.items.forEach((t=>i.push(t[1]))),this.children.forEach((e=>e.retrieve(t,i)))),i}}class o{constructor(e,s,o){this.collisions=[],this.minArea=new t,this.maxArea=new t,this.newArea=new i(0,0,0,0),this.method=e,this.colliders=[],this.collisionMatrix=o,this.setupQuadTree(s)}setupQuadTree(t){this.quadTreeArea=null!=t?t:new i(0,0,0,0),this.fixedQuadTree=!!t,this.quadTree=new s(this.quadTreeArea)}addCollider(t){this.colliders.push(t)}removeCollider(t){const i=this.colliders.indexOf(t);-1!==i&&(delete this.colliders[i],this.colliders.splice(i,1))}clearColliders(){this.colliders=[]}getCollisionsForCollider(t){return this.collisions.filter((i=>i.localCollider===t))}refreshCollisionsForCollider(t){-1!==this.colliders.indexOf(t)&&(this.collisions=this.collisions.filter((i=>i.localCollider!==t&&i.remoteCollider!==t)),this.narrowPhase(t,this.broadPhase(t)))}resolve(){this.collisions=[],0!==this.colliders.length&&(this.quadTree.clear(),this.updateShapes(),!1===this.fixedQuadTree&&(this.updateNewArea(),!1===this.newArea.equals(this.quadTreeArea)&&(this.quadTreeArea.copy(this.newArea),this.quadTree.resize(this.quadTreeArea))),this.colliders.forEach(((t,i)=>this.quadTree.insert(i,t.shape.boundingBox))),this.updateCollisions(),console.log(this.collisions))}updateShapes(){this.colliders.forEach((t=>{t.shape.position=t.position,t.shape.rotation=t.rotation,t.shape.update()}))}updateNewArea(){this.colliders.forEach((({shape:{boundingBox:t}})=>{this.minArea.set(Math.min(t.x,this.minArea.x),Math.min(t.y,this.minArea.y)),this.maxArea.set(Math.max(t.x1,this.maxArea.x),Math.max(t.y1,this.maxArea.y))})),this.newArea.set(this.minArea.x,this.minArea.y,this.maxArea.x-this.minArea.x,this.maxArea.y-this.minArea.y)}updateCollisions(){this.colliders.filter((t=>t.updateCollisions)).forEach((t=>this.narrowPhase(t,this.broadPhase(t))))}broadPhase(t){return this.collisionMatrix?this.quadTree.retrieve(t.shape.boundingBox).map((t=>this.colliders[t])).filter((i=>this.collisionMatrix.some((e=>e[0]===t.layer&&e[1]===i.layer||e[1]===t.layer&&e[0]===i.layer)))):this.quadTree.retrieve(t.shape.boundingBox).map((t=>this.colliders[t]))}narrowPhase(t,i){console.log(t,i),i.filter((i=>!(t.group&&i.group&&i.group===t.group||t===i))).forEach((i=>{if(this.isResolved(t,i))return;const e=this.method.getCollisionResolution(t.shape,i.shape);null!==e&&(this.collisions.push({localCollider:t,remoteCollider:i,resolution:e},{localCollider:i,remoteCollider:t,resolution:{direction:e.displacementDirection,displacementDirection:e.direction,penetration:e.penetration}}),t.onCollision&&t.onCollision(e))}))}isResolved(t,i){for(const e of this.collisions)if(e.localCollider===t&&e.remoteCollider===i)return!0;return!1}}var r,n;!function(t){t[t.Polygon=0]="Polygon",t[t.Circumference=1]="Circumference",t[t.Line=2]="Line"}(r||(r={}));class h{constructor(t,i,e){this.AABBResolver=t,this.circumferenceAABBResolver=i,this.circumferenceResolver=e}getCollisionResolution(t,i){return t.type===r.Polygon&&i.type===r.Polygon?this.AABBResolver.resolve(t,i):t.type===r.Circumference&&i.type===r.Polygon?this.circumferenceAABBResolver.resolve(t,i):t.type===r.Polygon&&i.type===r.Circumference?this.circumferenceAABBResolver.resolve(i,t,!0):t.type===r.Circumference&&i.type===r.Circumference?this.circumferenceResolver.resolve(t,i):null}}!function(t){t[t.AABB=0]="AABB",t[t.SAT=1]="SAT"}(n||(n={}));class a{constructor(t,i){this.circumferenceResolver=t,this.satResolver=i}getCollisionResolution(t,i){return t.type===r.Circumference&&i.type===r.Circumference?this.circumferenceResolver.resolve(t,i):this.satResolver.resolve(t,i)}}class c{constructor(){this.direction=new t,this.displacementDirection=new t}resolve({boundingBox:i},{boundingBox:e}){return this.overlapX=Math.min(i.x1,e.x1)-Math.max(i.x,e.x),this.overlapY=Math.min(i.y1,e.y1)-Math.max(i.y,e.y),this.overlapX<0||this.overlapY<0?null:(this.direction.set(Math.sign(e.x1-i.x1),Math.sign(e.y1-i.y1)),this.overlapY<this.overlapX?(this.minOverlap=this.overlapY,this.displacementDirection.set(0,-this.direction.y),this.preventContainment(i.y,i.y1,e.y,e.y1)):(this.minOverlap=this.overlapX,this.displacementDirection.set(-this.direction.x,this.overlapY===this.overlapX?-this.direction.y:0),this.preventContainment(i.x,i.x1,e.x,e.x1)),t.unit(this.displacementDirection,this.displacementDirection),{penetration:this.minOverlap,displacementDirection:this.displacementDirection.clone(),direction:t.scale(new t,this.displacementDirection,-1)})}preventContainment(i,e,s,o){if(i>s&&e<o||s>i&&o<e){const r=Math.abs(i-s),n=Math.abs(e-o);r<n?this.minOverlap+=r:(this.minOverlap+=n,t.scale(this.displacementDirection,this.displacementDirection,-1))}}}class l{constructor(){this.closestPoint=new t,this.distance=new t,this.direction=new t}resolve(i,s,o=!1){return this.closestPoint.set(e(i.position.x,s.boundingBox.x,s.boundingBox.x1),e(i.position.y,s.boundingBox.y,s.boundingBox.y1)),t.subtract(this.distance,this.closestPoint,i.position),this.distance.magnitude>i.radius?null:(t.unit(this.direction,this.distance),{penetration:i.radius-this.distance.magnitude,direction:o?t.scale(new t,this.direction,-1):this.direction.clone(),displacementDirection:o?this.direction.clone():t.scale(new t,this.direction,-1)})}}class d{constructor(){this.distance=new t,this.direction=new t}resolve(i,e){return t.subtract(this.distance,e.position,i.position),this.distance.magnitude>i.radius+e.radius?null:(t.unit(this.direction,this.distance),{penetration:i.radius+e.radius-this.distance.magnitude,direction:this.direction.clone(),displacementDirection:t.scale(new t,this.direction,-1)})}}class u{constructor(){this.projA={min:0,max:0},this.projB={min:0,max:0},this.displacementDirection=new t,this.distance=new t(1/0,1/0),this.cache=new t}resolve(i,e){this.currentOverlap=null,this.minOverlap=null,i.type===r.Circumference?this.setCircumferenceAxis(i,e):e.type===r.Circumference&&this.setCircumferenceAxis(e,i),this.axes=[...i.projectionAxes,...e.projectionAxes];for(let s=0;s<this.axes.length;s++){if(i.type===r.Circumference?this.setCircumferenceVertices(i,this.axes[s]):e.type===r.Circumference&&this.setCircumferenceVertices(e,this.axes[s]),this.projectShapeOntoAxis(this.projA,i,this.axes[s]),this.projectShapeOntoAxis(this.projB,e,this.axes[s]),this.currentOverlap=Math.min(this.projA.max,this.projB.max)-Math.max(this.projA.min,this.projB.min),this.currentOverlap<0)return null;this.preventContainment(s),(null===this.minOverlap||this.currentOverlap<this.minOverlap)&&(this.minOverlap=this.currentOverlap,this.displacementDirection.copy(this.axes[s]),this.projA.max<this.projB.max&&t.scale(this.displacementDirection,this.displacementDirection,-1))}return{penetration:this.minOverlap,displacementDirection:this.displacementDirection.clone(),direction:t.scale(new t,this.displacementDirection,-1)}}projectShapeOntoAxis(i,e,s){return i.min=t.dot(s,e.vertices[0]),i.max=i.min,e.vertices.forEach((e=>{i.min=Math.min(t.dot(s,e),i.min),i.max=Math.max(t.dot(s,e),i.max)})),i}preventContainment(i){if(this.projA.max>this.projB.max&&this.projA.min<this.projB.min||this.projA.max<this.projB.max&&this.projA.min>this.projB.min){const e=Math.abs(this.projA.min-this.projB.min),s=Math.abs(this.projA.max-this.projB.max);e<s?this.currentOverlap+=e:(this.currentOverlap+=s,t.scale(this.axes[i],this.axes[i],-1))}}setCircumferenceAxis(i,e){this.distance.set(1/0,1/0),e.vertices.forEach((e=>{t.subtract(this.cache,e,i.position),this.cache.magnitude<this.distance.magnitude&&this.distance.copy(this.cache)})),t.unit(i.projectionAxes[0],this.distance)}setCircumferenceVertices(i,e){t.add(i.vertices[0],i.position,t.scale(this.cache,t.unit(this.cache,e),-i.radius)),t.add(i.vertices[1],i.position,t.scale(this.cache,t.unit(this.cache,e),i.radius))}}class x{constructor(t){this.collisionManager=t}addCollider(t){this.collisionManager.addCollider(t)}removeCollider(t){this.collisionManager.removeCollider(t)}clearColliders(){this.collisionManager.clearColliders()}resolve(){this.collisionManager.resolve()}getCollisionsForCollider(t){return this.collisionManager.getCollisionsForCollider(t)}}class p{constructor(e){this.radius=e,this.type=r.Circumference,this.boundingBox=new i(0,0,0,0),this.vertices=[new t,new t],this.projectionAxes=[new t],this._position=new t}set position(t){this._position.copy(t)}get position(){return this._position}update(){this.updateBoundingBox()}updateBoundingBox(){this.boundingBox.set(this.position.x-this.radius,this.position.y-this.radius,2*this.radius,2*this.radius)}}class m{constructor(e){this.vertexModel=e,this.type=r.Polygon,this.vertices=[new t,new t],this.projectionAxes=[new t],this.boundingBox=new i(0,0,0,0),this.rotation=0,this._position=new t}update(){this.updateVertices(),this.updateBoundingBox(),this.updateProjectionAxes()}set position(t){this._position.copy(t)}get position(){return this._position}updateVertices(){for(let t=0;t<this.vertexModel.length;t++)this.vertices[t].set(this.vertexModel[t].x*Math.cos(this.rotation)-this.vertexModel[t].y*Math.sin(this.rotation)+this._position.x,this.vertexModel[t].x*Math.sin(this.rotation)+this.vertexModel[t].y*Math.cos(this.rotation)+this._position.y)}updateBoundingBox(){this.boundingBox.x=Math.min(this.vertices[0].x,this.vertices[1].x),this.boundingBox.y=Math.min(this.vertices[0].y,this.vertices[1].y),this.boundingBox.width=Math.max(this.vertices[0].x,this.vertices[1].x)-this.boundingBox.x,this.boundingBox.height=Math.max(this.vertices[0].y,this.vertices[1].y)-this.boundingBox.y}updateProjectionAxes(){t.normal(this.projectionAxes[0],t.subtract(this.projectionAxes[0],this.vertices[1],this.vertices[0]))}}class y{constructor(e){this.vertexModel=e,this.type=r.Polygon,this.vertices=[],this.boundingBox=new i(0,0,0,0),this.rotation=0,this._projectionAxes=[],this._position=new t,this.boxMinX=Number.MAX_SAFE_INTEGER,this.boxMinY=Number.MAX_SAFE_INTEGER,this.boxMaxX=-Number.MAX_SAFE_INTEGER,this.boxMaxY=-Number.MAX_SAFE_INTEGER;for(let i=0;i<this.vertexModel.length;i++)this.vertices.push(new t),this._projectionAxes.push(new t)}set position(t){this._position.copy(t)}get position(){return this._position}get projectionAxes(){return this._projectionAxes}update(){this.updateVertices(),this.updateBoundingBox(),this.updateProjectionAxes()}updateVertices(){for(let t=0;t<this.vertexModel.length;t++)this.vertices[t].set(this.vertexModel[t].x*Math.cos(this.rotation)-this.vertexModel[t].y*Math.sin(this.rotation)+this._position.x,this.vertexModel[t].x*Math.sin(this.rotation)+this.vertexModel[t].y*Math.cos(this.rotation)+this._position.y)}updateBoundingBox(){this.boxMinX=this.vertices[0].x,this.boxMinY=this.vertices[0].y,this.boxMaxX=this.vertices[0].x,this.boxMaxY=this.vertices[0].y,this.vertices.forEach((t=>{this.boxMinX=Math.min(t.x,this.boxMinX),this.boxMinY=Math.min(t.y,this.boxMinY),this.boxMaxX=Math.max(t.x,this.boxMaxX),this.boxMaxY=Math.max(t.y,this.boxMaxY)})),this.boundingBox.set(this.boxMinX,this.boxMinY,this.boxMaxX-this.boxMinX,this.boxMaxY-this.boxMinY)}updateProjectionAxes(){var i;for(let e=0;e<this.vertices.length;e++)t.normal(this._projectionAxes[e],t.subtract(this._projectionAxes[e],null!==(i=this.vertices[e+1])&&void 0!==i?i:this.vertices[0],this.vertices[e]))}}class v extends y{constructor(i,e){super([new t(-i/2,-e/2),new t(-i/2,e/2),new t(i/2,e/2),new t(i/2,-e/2)]),this.width=i,this.height=e,this._projectionAxes=[new t,new t]}updateSize(t,i){this.width=t,this.height=i,this.vertexModel[0].set(-t/2,-i/2),this.vertexModel[1].set(-t/2,i/2),this.vertexModel[2].set(t/2,i/2),this.vertexModel[3].set(t/2,-i/2)}updateProjectionAxes(){t.unit(this.projectionAxes[0],t.subtract(this.projectionAxes[0],this.vertices[1],this.vertices[0])),t.normal(this.projectionAxes[1],this.projectionAxes[0])}}const g=({collisionArea:t,collisionMatrix:i,collisionMethod:e}={})=>{const s=new d,r=e===n.AABB?new h(new c,new l,s):new a(s,new u),p=new o(r,t,i);return new x(p)};export{p as Circumference,m as Line,y as Polygon,v as Rectangle,g as physicsManagerFactory};