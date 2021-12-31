let capsule;

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
        const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

        // Add your code here matching the playground format
        const createScene = function () {
    
            const scene = new BABYLON.Scene(engine);
            
            const topLight = new BABYLON.HemisphericLight("topLight", new BABYLON.Vector3(0, 0, -20));

            var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -1, -1), scene);
            light.position = new BABYLON.Vector3(20, 20, 20);


            const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 8, new BABYLON.Vector3(0, 0, 0));
            camera.attachControl(canvas, true);

            //BABYLON.MeshBuilder.CreateCapsule("capsule", {})
            capsule = new BABYLON.MeshBuilder.CreateCapsule("capsule", {radius:0.5, capSubdivisions: 6, subdivisions:6, tessellation:36, height:2, orientation:BABYLON.Vector3.Forward()});

            //create floor
            const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:8, height:8});
            ground.useAutoRotationBehavior = false;

            //add texture to floor
            var carpet = new BABYLON.PBRMaterial("carpet", scene);
            
            carpet.directIntensity = 1.5;
            carpet.environmentIntensity = 0.5;
            carpet.specularIntensity = 0.3;
            carpet.cameraExposure = 0.9;
            carpet.cameraContrast = 1.6;

            carpet.reflectivityTexture = new BABYLON.Texture("reflectivity.jpg", scene);
            carpet.useMicroSurfaceFromReflectivityMapAlpha = true;

            carpet.albedoColor = BABYLON.Color3.White();
            carpet.albedoTexture = new BABYLON.Texture("carpet.jpg", scene);
            ground.material = carpet;
            
            capsule.position.y = 1.5;
            capsule.rotation.y = Math.PI/2;
            //capsule.rotation.x = Math.PI/-4;
            
            //setup the mesh click
            capsule.actionManager = new BABYLON.ActionManager(scene);

            capsule.actionManager.registerAction(
                new BABYLON.InterpolateValueAction(
                    BABYLON.ActionManager.OnPickTrigger,
                    light,
                    'diffuse',
                    BABYLON.Color3.Blue(),
                    500
                )
            );
            
                
            // GUI
            var plane = BABYLON.Mesh.CreatePlane("plane", 2);
            plane.parent = ground;
            plane.position.y = 2.5;
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
            
            //create table
            //var disc = BABYLON.Mesh.CreateDisc("disc", 2, 30, scene, false, BABYLON.Mesh.DEFAULTSIDE);
            //disc.rotation.x = Math.PI/2;
            //disc.position.y = .5;
            var top = BABYLON.Mesh.CreateCylinder("top", .0625, 2.5, 2.5, 48, 1, scene, false, BABYLON.Mesh.DEFAULTSIDE);
            top.position.y = .65;
            var leg = BABYLON.Mesh.CreateCylinder("leg", .65, .125, .125, 24, 1, scene, false, BABYLON.Mesh.DEFAULTSIDE);
            leg.position.y = .3125;
            var base = BABYLON.Mesh.CreateCylinder("base", .125, .125, .5, 24, 1, scene, false, BABYLON.Mesh.DEFAULTSIDE);
            base.position.y = .05125;

            //add wood to table
            var wood = new BABYLON.PBRMaterial("wood", scene);
            //wood.reflectionTexture = hdrTexture;
            wood.directIntensity = 1.5;
            wood.environmentIntensity = 0.5;
            wood.specularIntensity = 0.3;
            wood.cameraExposure = 0.9;
            wood.cameraContrast = 1.6;

            wood.reflectivityTexture = new BABYLON.Texture("reflectivity.jpg", scene);
            wood.useMicroSurfaceFromReflectivityMapAlpha = true;

            wood.albedoColor = BABYLON.Color3.White();
            wood.albedoTexture = new BABYLON.Texture("wood.jpg", scene);
            top.material = wood;

            //add chrome to leg and base
            var chrome = new BABYLON.PBRMaterial("chrome", scene);
            //wood.reflectionTexture = hdrTexture;
            chrome.directIntensity = 1.5;
            chrome.environmentIntensity = 0.5;
            chrome.specularIntensity = 0.5;
            chrome.cameraExposure = 0.9;
            chrome.cameraContrast = 1.6;

            chrome.reflectivityTexture = new BABYLON.Texture("reflectivity.jpg", scene);
            chrome.useMicroSurfaceFromReflectivityMapAlpha = true;

            chrome.albedoColor = BABYLON.Color3.White();
            chrome.albedoTexture = new BABYLON.Texture("chrome.jpg", scene);
            leg.material = chrome;
            base.material = chrome;

            //create shadow on table
            var shadowGenerator00 = new BABYLON.ShadowGenerator(512, light);
            shadowGenerator00.getShadowMap().renderList.push(capsule);
            top.receiveShadows = true;

            //Create dynamic texture		
            var textureGround = new BABYLON.DynamicTexture("dynamic texture", {width:512, height:512}, scene);   
            var textureContext = textureGround.getContext();
            

            var materialGround = new BABYLON.StandardMaterial("Mat", scene);    				
            materialGround.diffuseTexture = textureGround;
            capsule.material = materialGround;

            //Add text to dynamic texture
            var font = "bold 60px Arial";
            textureGround.drawText("Vitamin", 300, 150, font, "green", "white", false, true);
       
            return scene;
            // const xrPromise = scene.createDefaultXRExperienceAsync({
            //     floorMeshes: [ground]
            // });
            // return xrPromise.then((xrExperience) => {
            //     console.log("Done, WebXR is enabled.");
            //     return scene;
            // });
        };

        //Call the createScene function
        const scene = createScene(); 

        // Register a render loop to repeatedly render the scene
        engine.runRenderLoop(function () {
            capsule.rotation.y += 0.01;
                scene.render();
                
        });

        // Watch for browser/canvas resize events
        window.addEventListener("resize", function () {
                engine.resize();
        });

        