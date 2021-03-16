
let renderer, scene, camera, cameraControls, mesh, stats;

function init() {
    // RENDERER ENGINE
    renderer = new THREE.WebGLRenderer({antialias: true});
    //renderer.setClearColor(new THREE.Color(1, 1, 1,));
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // SCENE
    scene = new THREE.Scene();

    // CAMERA
    let fov = 60;
    let aspect = window.innerWidth / window.innerHeight;
    let near = 0.1;
    let far = 10000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 3);
    cameraControls = new OrbitControls(camera, renderer.domElement);

    // MODELS
    let geometry = new THREE.BoxGeometry();
    let material = new THREE.MeshBasicMaterial({color: "white", wireframe: true});
    mesh = new THREE.Mesh(geometry, material);
    mesh.name = "Cube";

    // SCENE GRAPH
    scene.add(mesh);

    // GUI
    let gui = new dat.GUI();

    // model
    let model = {
        rotY: mesh.rotation.y * Math.PI / 180,
        posHome: function() {
            mesh.position.x = 0;
        },
        rotHome: function() {
            model.rotY = 0;
            mesh.rotation.y = 0;
        }
    }

    // view & controller

    // General Info Menu
    let generalMenu = gui.addFolder("General Info Menu");
    let txfMeshName = generalMenu.add(mesh, "name").name("Model's Name")
    .onChange(function(event) {

    }).onFinishChange(function(event) {

    });
    // Position Menu
    let positionMenu = gui.addFolder("Model's Position Menu");
    let sliderPosX = positionMenu.add(mesh.position, "x").min(-5).max(5).step(0.5).setValue(0).name("X").listen().onChange(function(value) {
    
    });
    let btnPosHome = positionMenu.add(model, "posHome").name("HOME").onChange(function(event) {

    });

    // Orientation Menu
    let rotMenu = gui.addFolder("Model's Rotation Menu");
    let sliderRotY = rotMenu.add(model, "rotY").min(-180).max(180).step(10).setValue(0).name("Y (deg)").listen().onChange(function(value) {
        mesh.rotation.y = model.rotY * Math.PI / 180;
    });;

    let btnRotHome = rotMenu.add(model, "rotHome").name("HOME").onChange(function(event) {

    });

    // Appearance Menu
    let appearMenu = gui.addFolder("Model's Appearance Menu");
    let chbWireframe = appearMenu.add(mesh.material, "wireframe").setValue(true).name("Wireframe").onChange(function(value) {

    });

    rotMenu.open();
    gui.close()
    
    // STATS
    stats = new Stats();
    stats.showPanel(0); // FPS
    document.body.appendChild(stats.dom);

    // ANIMATION
    renderLoop();
}

function renderLoop() {
    stats.begin();
    renderer.render(scene, camera); // DRAW SCENE
    updateScene();
    stats.end();
    stats.update();
    requestAnimationFrame(renderLoop);
}

function updateScene() {
    //mesh.rotation.y = mesh.rotation.y + 1 * Math.PI / 180;
}

// EVENT LISTENERS & HANDLERS
document.addEventListener("DOMContentLoaded", init);

window.addEventListener("resize", function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});