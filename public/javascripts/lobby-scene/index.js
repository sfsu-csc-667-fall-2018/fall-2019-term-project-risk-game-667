import * as THREE from 'three'
import { OrbitControls } from './controls'
import { GLTFLoader } from './loader'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 100, window.innerWidth*0.3 / window.innerHeight, 0.1, 1000 );
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth*0.3, window.innerHeight-300 );
  renderer.setClearColor(0xE8E9EB);

  var controls = new OrbitControls( camera, renderer.domElement );
  var light = new THREE.AmbientLight( 0x404040, 4.2 ); // soft white light
  scene.add( light );

	document.querySelector('#scene-container').appendChild( renderer.domElement );
  
  var loader = new GLTFLoader();
  var model;

  function loadModel (src) {
    loader.load(src, function ( gltf ) {
      model = gltf;
      model.name = 'current'
      scene.add( model.scene );

    }, undefined, function ( error ) {
      console.error( error );
    } );
  }
  
  function clearScene () {
    scene.remove(model.scene)
  }

  loadModel(`/models/soldier_${Date.now()%4+1}/scene.gltf`);
  camera.position.z = 2.5;
  camera.position.z = 1.9;
  camera.position.y = 2;

  controls.update();

  function animate() {
    requestAnimationFrame( animate );

    if(model && model.scene) model.scene.rotation.y += 0.009;

    controls.update();
    renderer.render( scene, camera );
  }
  animate();

} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
