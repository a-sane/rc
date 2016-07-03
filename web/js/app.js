$(function() {
    var scene, camera, renderer, controls;
    var geometry, material;
    var ambient, directionalLight, directionalLight2, directionalLight3, directionalLight4;
    var car, carMaterial;
    var projector, mouse = { x: 0, y: 0 };
    var targetList = [];
    var activeObjects = ['DoorLeft_logo', 'DoorRight_logo', 'Front_logo', 'Roof_logo'];
    var logoPath;
    var textureCube;

    init();

    function init() {
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 50, 800 / 500, 1, 10000 );
        camera.position.set(6.488599279357978, 5.674960903990429, 6.501762258406836);
        camera.lookAt(new THREE.Vector3());

        directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(0, 4, 0);
        scene.add(directionalLight);

        directionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight2.position.set(0, -4, 0);
        scene.add(directionalLight2);

        directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight3.position.set(4, 0, 0);
        scene.add(directionalLight3);

        directionalLight4 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight4.position.set(-4, 0, 0);
        scene.add(directionalLight4);

        var mtlLoader;
        THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
        mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath('model/');
        mtlLoader.load('car4.mtl', function(material){
            material.preload();
            carMaterial = material;
            objLoader();
        });

        renderer = new THREE.WebGLRenderer({
            alpha: true
        });
        renderer.setSize( 800, 500 );
        renderer.setClearColor(0x0ffffff);

        controls = new THREE.OrbitControls( camera, renderer.domElement );
        controls.addEventListener( 'change', render );
        controls.enableDamping = false;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;
        controls.maxPolarAngle = Math.PI/2;
        controls.minDistance = 7;
        controls.maxDistance = 11;

        var r = "model/Bridge2/";
        var urls = [
            r + "posx.jpg", r + "negx.jpg",
            r + "posy.jpg", r + "negy.jpg",
            r + "posz.jpg", r + "negz.jpg"
        ];
        textureCube = new THREE.CubeTextureLoader().load( urls );
        textureCube.format = THREE.RGBFormat;

        var container = document.getElementById( 'js-three' );
        var canvas = container.appendChild( renderer.domElement );

        projector = new THREE.Projector();
        canvas.addEventListener( 'mousemove', onDocumentMouseMove, false );
        canvas.addEventListener( 'mousedown', onDocumentMouseDown, false );
    }

    var objLoader = function() {
        var objLoader;
        objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(carMaterial);
        objLoader.setPath('model/');
        objLoader.load('car4.obj', function(object){
            car = object;

            car.traverse( function (child) {
                if ( child instanceof THREE.Mesh) {
                    child.material.side = THREE.DoubleSide;
                    child.material.needsUpdate = true;

                    activeObjects.forEach(function(item, i, arr) {
                        if(child.name == item){
                            child.callback = function () {
                                var hoverMaterial = new THREE.MeshPhongMaterial( {
                                    transparent: false,
                                    color:  new THREE.Color(0, 0.4, 0)
                                } );

                                this.material = hoverMaterial;
                                this.material.needsUpdate = true;
                                render();
                            }
                        }
                    });
                }

                if ( child instanceof THREE.Mesh && child.name == 'Windows' ) {
                    var texture = new THREE.TextureLoader().load("model/metal_grid.png", function(){render()});
                    texture.anisotropy = 3;
                    texture.wrapS = THREE.RepeatWrapping;
                    texture.wrapT = THREE.RepeatWrapping;
                    texture.repeat.set( 1, 1 );

                    var imageMaterial = new THREE.MeshPhongMaterial( {
                        map: texture,
                        transparent: true
                    } );

                    child.material = imageMaterial;
                    child.material.needsUpdate = true;
                }
            });


            carMaterial.materials.Main_color.color = new THREE.Color(0.9, 0, 0);
            carMaterial.materials.Main_color.envMap =  textureCube;
            carMaterial.materials.Main_color.combine = THREE.MultiplyOperation;
            carMaterial.materials.Main_color.reflectivity = 0.5;
            carMaterial.materials.Metal_A.envMap =  textureCube;
            carMaterial.materials.Metal_A.combine = THREE.MultiplyOperation;
            carMaterial.materials.disc.envMap =  textureCube;
            carMaterial.materials.disc.combine = THREE.MultiplyOperation;
            carMaterial.materials.nut.envMap =  textureCube;
            carMaterial.materials.nut.combine = THREE.MultiplyOperation;

            car.position.y = -2;

            scene.add(car);

            render();
            targetList.push(car);
        });
    };

    var modelControls = (function() {
        var textureControls = function() {
            var $textureControls = $('.js-controls-texture a');
            $textureControls.click(function(){
                applyTexture($(this).find('img').attr('src'));
                return false;
            });
        };
        textureControls();

        var logoControls = function() {
            var $textureControls = $('.js-controls-logo a');
            var $partControls = $('.js-controls-part');
            $textureControls.click(function(){
                //applyLogo($(this).find('img').attr('src'), $partControls.val());
                $(this).addClass('controls-selected').siblings().removeClass('controls-selected');
                logoPath = $(this).find('img').length > 0 ? $(this).find('img').attr('src') : "";
                return false;
            });
        };
        logoControls();

        var colorControls = function() {
            var $colorControls = $('.js-controls-color');
            $colorControls.change(function(e){
                applyColor($(this).val());
            });
        };
        colorControls();
    })();

    var applyLogo = function(path, name) {
        var objectLogo = scene.getObjectByName( name );

        /*
        if(!objectLogo) {
            objectLogo = object.clone();
            objectLogo.name = objectLogo.name + "_logo";
            car.add(objectLogo);
        }
        */

        var texture = new THREE.TextureLoader().load(path, function(){render()});
        texture.anisotropy = 3;

        var imageMaterial = new THREE.MeshPhongMaterial( {
            map: texture,
            transparent: true,
        } );

        objectLogo.material = imageMaterial;
        objectLogo.material.needsUpdate = true;
    };

    var applyTexture = function(path) {
        var texture = new THREE.TextureLoader().load(path, function(){render()});
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 1, 1 );

        carMaterial.materials.Main_color.color = new THREE.Color(0.5, 0.5, 0.5);
        carMaterial.materials.Main_color.specular = new THREE.Color(0.1, 0.1, 0.1);
        carMaterial.materials.Main_color.map = texture;
        carMaterial.materials.Main_color.envMap = false;
        carMaterial.materials.Main_color.shininess = 0;
        carMaterial.materials.Main_color.needsUpdate = true;
    };

    var applyColor = function(color) {
        carMaterial.materials.Main_color.color = new THREE.Color('#' + color);
        carMaterial.materials.Main_color.envMap =  textureCube;
        carMaterial.materials.Main_color.combine = THREE.MultiplyOperation;
        carMaterial.materials.Main_color.map = null;
        carMaterial.materials.Main_color.shininess = 0;
        carMaterial.materials.Main_color.specular = new THREE.Color(0, 0, 0);
        carMaterial.materials.Main_color.reflectivity = 0.5;
        carMaterial.materials.Main_color.needsUpdate = true;

        render();
    };


    function render() {
        renderer.render( scene, camera );
    }


    function onDocumentMouseMove( event )
    {
        mouse.x = ( event.offsetX / 800 ) * 2 - 1;
        mouse.y = - ( event.offsetY / 500 ) * 2 + 1;

        var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
        vector.unproject( camera );
        var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

        var start = new Date().getTime();
        var intersects = ray.intersectObjects( targetList, true );
        console.log('Took ' + (new Date().getTime() - start) + ' ms' );

        if ( intersects.length > 0 )
        {
            if(!intersects[0].object.loged) {
                activeObjects.forEach(function(item, i, arr) {
                    var obj = scene.getObjectByName(item);
                    if(!obj.loged){
                        var hoverMaterial = new THREE.MeshPhongMaterial( {
                            transparent: true,
                            opacity: 0,
                            color:  new THREE.Color(1, 1, 1)
                        } );
                        obj.material = hoverMaterial;
                        obj.material.needsUpdate = true;
                        render();
                    }
                    if (intersects[0].object.name == item) {
                        intersects[0].object.callback();
                    }
                });
            }
        }
    }

    function onDocumentMouseDown( event )
    {
        mouse.x = ( event.offsetX / 800 ) * 2 - 1;
        mouse.y = - ( event.offsetY / 500 ) * 2 + 1;

        var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
        vector.unproject( camera );
        var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

        var intersects = ray.intersectObjects( targetList, true );

        if ( intersects.length > 0 )
        {
            activeObjects.forEach(function(item, i, arr) {
                if (intersects[0].object.name == item) {
                    var texture, material;
                    if(logoPath){
                        texture = new THREE.TextureLoader().load(logoPath, function(){render()});
                        texture.anisotropy = 3;

                        material = new THREE.MeshPhongMaterial( {
                            map: texture,
                            transparent: true,
                        } );
                        intersects[0].object.loged = true;
                    } else {
                        material = new THREE.MeshPhongMaterial( {
                            map: false,
                            transparent: true,
                            opacity: 0
                        } );
                        intersects[0].object.loged = false;
                    }

                    intersects[0].object.material = material;
                    intersects[0].object.material.needsUpdate = true;
                    render();
                }
            });
        }
    }

});

var audio = function() {
    var audioListener = new THREE.AudioListener();

    camera.add( audioListener );
    
    var erondon = new THREE.Audio( audioListener );
    erondon.setLoop(true);
    
    scene.add( erondon );
    
    var loader = new THREE.AudioLoader();

    loader.load(
        '/audio/eron.ogg',
        // Function when resource is loaded
        function ( audioBuffer ) {
            // set the audio object buffer to the loaded object
            erondon.setBuffer( audioBuffer );

            // play the audio
            erondon.play();
        },
        // Function called when download progresses
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
        // Function called when download errors
        function ( xhr ) {
            console.log( 'An error happened' );
        }
    );
};

function animate() {
    requestAnimationFrame( animate );
    controls.update();
    car.rotation.x += 0.001;
    car.rotation.y += 0.01;
    render();
}