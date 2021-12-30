let capsule;

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
        const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

        // Add your code here matching the playground format
        const createScene = function () {
    
            const scene = new BABYLON.Scene(engine);  

            //BABYLON.MeshBuilder.CreateCapsule("capsule", {})
            capsule = new BABYLON.MeshBuilder.CreateCapsule("capsule", {radius:0.5, capSubdivisions: 6, subdivisions:6, tessellation:36, height:2.5, orientation:BABYLON.Vector3.Forward()});
            
            const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:8, height:8});
            ground.useAutoRotationBehavior = false;
            // Create terrain material
                var terrainMaterial = new BABYLON.TerrainMaterial("terrainMaterial", scene);
            terrainMaterial.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
            terrainMaterial.specularPower = 64;

                // Set the mix texture (represents the RGB values)
            terrainMaterial.mixTexture = new BABYLON.Texture("textures/mixMap.png", scene);

                // Diffuse textures following the RGB values of the mix map
                // diffuseTexture1: Red
                // diffuseTexture2: Green
                // diffuseTexture3: Blue
            terrainMaterial.diffuseTexture1 = new BABYLON.Texture("textures/floor.png", scene);
            terrainMaterial.diffuseTexture2 = new BABYLON.Texture("textures/rock.png", scene);
            terrainMaterial.diffuseTexture3 = new BABYLON.Texture("textures/grass.png", scene);

                // Bump textures according to the previously set diffuse textures
            terrainMaterial.bumpTexture1 = new BABYLON.Texture("textures/floor_bump.png", scene);
            terrainMaterial.bumpTexture2 = new BABYLON.Texture("textures/rockn.png", scene);
            terrainMaterial.bumpTexture3 = new BABYLON.Texture("textures/grassn.png", scene);

            // Rescale textures according to the terrain
            terrainMaterial.diffuseTexture1.uScale = terrainMaterial.diffuseTexture1.vScale = 10;
            terrainMaterial.diffuseTexture2.uScale = terrainMaterial.diffuseTexture2.vScale = 10;
            terrainMaterial.diffuseTexture3.uScale = terrainMaterial.diffuseTexture3.vScale = 10;

            
            capsule.position.y = 1.25;
            capsule.rotation.y = Math.PI/2;   
                
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
                scene.getMeshByName("capsule").rotation.y += 0.01;
                scene.render();
                
        });

        // Watch for browser/canvas resize events
        window.addEventListener("resize", function () {
                engine.resize();
        });
