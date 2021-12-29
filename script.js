const canvas = document.getElementById("renderCanvas"); // Get the canvas element
        const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

        // Add your code here matching the playground format
        const createScene = function () {
    
            const scene = new BABYLON.Scene(engine);  

            //BABYLON.MeshBuilder.CreateCapsule("capsule", {})
            const capsule = new BABYLON.MeshBuilder.CreateCapsule("capsule", {radius:0.5, capSubdivisions: 6, subdivisions:6, tessellation:36, height:2.5, orientation:BABYLON.Vector3.Forward()});
            
            const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});    
            
            capsule.position.y = 1.25;
            capsule.rotate.z = Math.PI / 2.5;   
                
            // GUI
            var plane = BABYLON.Mesh.CreatePlane("plane", 2);
            plane.parent = ground;
            plane.position.y = 2;
            plane.position.z = 2.5;

            var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);

            var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Click to open vitamin");
            button1.width = 1;
            button1.height = 0.4;
            button1.color = "white";
            button1.fontSize = 100;
            button1.background = "green";
            button1.onPointerUpObservable.add(function() {
                alert("you opened the vitamin!");
            });
            advancedTexture.addControl(button1);
 
            const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 8, new BABYLON.Vector3(0, 0, 0));
            camera.attachControl(canvas, true);
            const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

            return scene;
        };

        const scene = createScene(); //Call the createScene function

        // Register a render loop to repeatedly render the scene
        engine.runRenderLoop(function () {
                scene.getMeshByName("capsule").rotate.z += 0.01;
                scene.render();
                
        });

        // Watch for browser/canvas resize events
        window.addEventListener("resize", function () {
                engine.resize();
        });
