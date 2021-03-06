import React, {Component, PropTypes} from 'react'
import THREE from 'three';

import OBJLoader from '../threeUtils/OBJLoader';
OBJLoader(THREE);

import MTLLoader from '../threeUtils/MTLLoader';
MTLLoader(THREE);

import OrbitControls from '../threeUtils/OrbitControls';
OrbitControls(THREE);


export default class Scene extends Component {
    static propTypes = {
        texturePath: PropTypes.string,
        textureUnionPath: PropTypes.string,
    }

    static defaultProps = {
        texturePath: '',
        textureUnionPath: '',
    }

    constructor() {
        super();

        const width = 560;
        const height = 520;

        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            preserveDrawingBuffer: true
        });
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x0ffffff);

        this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
        this.camera.position.set(6.488599279357978, 5.674960903990429, 6.501762258406836);
        this.camera.lookAt(new THREE.Vector3());

        this.car = null;
        this.carMaterial = null;

        this.activeObjects = null;

        this.mouse = {x: 0, y: 0};

        this.targetList = [];

        this.logoPath = '';

        this.currTexturePath= '';

        window.THREE = THREE;
        window.scene = this.scene;

        this.loader = new THREE.OBJLoader();
        this.mtlLoader = new THREE.MTLLoader();
    }

    threeRender() {
        this.renderer.render(this.scene, this.camera);
    }

    onCanvasMouseMove(event) {
        this.mouse.x = (event.offsetX / 560) * 2 - 1;
        this.mouse.y = -(event.offsetY / 520) * 2 + 1;

        var vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 1);
        vector.unproject(this.camera);
        var ray = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());

        var intersects = ray.intersectObjects(this.targetList, true);

        for (var item in this.activeObjects) {
            var obj = this.scene.getObjectByName(item);
            if (obj && !obj.loged && !obj.material.transparent) {
                obj.material = new THREE.MeshPhongMaterial({
                    transparent: true,
                    opacity: 0,
                    color: new THREE.Color(1, 1, 1)
                });
                obj.material.needsUpdate = true;
                this.threeRender();
            }
        }

        if (intersects.length > 0) {
            if (!intersects[0].object.loged) {
                for (var item in this.activeObjects) {
                    if (intersects[0].object.name == item) {
                        intersects[0].object.callback();
                    }
                }
            }
        }

    }

    onCanvasMouseDown(event) {
        this.mouse.x = (event.offsetX / 560) * 2 - 1;
        this.mouse.y = -(event.offsetY / 520) * 2 + 1;

        var vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 1);
        vector.unproject(this.camera);
        var ray = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());

        var intersects = ray.intersectObjects(this.targetList, true);

        if (intersects.length > 0) {
            for (var item in this.activeObjects) {
                if (intersects[0].object.name === item) {
                    var texture, material;
                    if (this.logoPath) {
                        texture = new THREE.TextureLoader().load(this.logoPath, () => {
                            ::this.threeRender()
                        });
                        texture.anisotropy = 3;

                        material = new THREE.MeshPhongMaterial({
                            map: texture,
                            transparent: true,
                        });
                        intersects[0].object.loged = true;
                        this.activeObjects[item] = this.logoPath;
                    } else {
                        material = new THREE.MeshPhongMaterial({
                            map: false,
                            transparent: true,
                            opacity: 0
                        });
                        intersects[0].object.loged = false;
                        this.activeObjects[item] = null;
                    }

                    intersects[0].object.material = material;
                    intersects[0].object.material.needsUpdate = true;
                    this.threeRender();
                    this.props.setSceneLogos(this.activeObjects);
                }
            }
        }
    }

    loadObject(item) {
        this.scene.remove(this.car);
        this.targetList = [];

        this.mtlLoader.load(`model/${item}.mtl`, (material) => {
            material.preload();
            console.log(material);
            this.carMaterial = material;
            this.props.setSceneMaterial(this.carMaterial);
            this.loader.setMaterials(this.carMaterial);
            this.loader.load(`model/${item}.obj`, (geometry) => {
                this.car = geometry;
                this.car.traverse((child) => {
                    if (child instanceof THREE.Mesh && child.name == 'Windows') {
                        let texture = new THREE.TextureLoader().load("model/metal_grid.png", ::this.threeRender);
                        texture.anisotropy = 3;
                        texture.wrapS = THREE.RepeatWrapping;
                        texture.wrapT = THREE.RepeatWrapping;
                        texture.repeat.set(1, 1);

                        child.material = new THREE.MeshPhongMaterial({
                            map: texture,
                            transparent: true
                        });
                        child.material.needsUpdate = true;
                    }

                    if (child instanceof THREE.Mesh) {
                        child.material.side = THREE.DoubleSide;
                        child.material.needsUpdate = true;

                        for (var item in this.activeObjects) {
                            if (child.name === item) {
                                this.targetList.push(child);
                                var tr = ::this.threeRender;
                                child.callback = function () {
                                    this.material = new THREE.MeshPhongMaterial({
                                        transparent: false,
                                        color: new THREE.Color(0, 0.4, 0)
                                    });

                                    this.material.needsUpdate = true;
                                    tr();
                                }
                                child.material = new THREE.MeshPhongMaterial({
                                    transparent: true,
                                    opacity: 0,
                                    color: new THREE.Color(1, 1, 1)
                                });
                                child.material.needsUpdate = true;
                            }
                        }
                    }
                });

                this.carMaterial.materials.Main_color.color = new THREE.Color(0.9, 0, 0);
                this.carMaterial.materials.Main_color.map = null;
                this.carMaterial.materials.Main_color.shininess = 0;
                this.carMaterial.materials.Main_color.specular = new THREE.Color(0, 0, 0);
                this.carMaterial.materials.Main_color.reflectivity = 0.5;
                this.carMaterial.materials.Main_color.needsUpdate = true;

                item === 'car4' ? this.car.position.y = -2 : this.car.position.y = 0;

                this.scene.add(this.car);
                this.props.setSceneObject(this.car);
                this.threeRender();
            });
        });
    }

    componentDidMount() {
        this.activeObjects = this.props.logos;

        let container = this.refs.container;

        let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 4, 0);
        this.scene.add(directionalLight);
        // this.scene.add( new THREE.DirectionalLightHelper(directionalLight, 0.2) );

        let directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight2.position.set(0, -4, 0);
        this.scene.add(directionalLight2);
        // this.scene.add( new THREE.DirectionalLightHelper(directionalLight2, 0.2) );

        let directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight3.position.set(4, 0, 0);
        this.scene.add(directionalLight3);
        // this.scene.add( new THREE.DirectionalLightHelper(directionalLight3, 0.2) );

        let directionalLight4 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight4.position.set(-4, 0, 0);
        this.scene.add(directionalLight4);
        // this.scene.add( new THREE.DirectionalLightHelper(directionalLight4, 0.2) );

        if (!this.props.object) {
            this.loadObject(this.props.item);
        } else {
            this.carMaterial = this.props.material;
            this.car = this.props.object;

            this.scene.add(this.car);
            this.threeRender();
            this.targetList.push(this.car);
        }

        let controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        controls.addEventListener('change', ::this.threeRender);
        controls.enableDamping = false;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;
        controls.maxPolarAngle = Math.PI / 2;
        controls.minDistance = 7;
        controls.maxDistance = 11;

        let canvas = container.appendChild(this.renderer.domElement);

        canvas.addEventListener('mousemove', ::this.onCanvasMouseMove, false);
        canvas.addEventListener('mouseup', ::this.onCanvasMouseDown, false);

        this.props.setSceneCanvas(canvas);
    }

    shouldComponentUpdate(nextProps) {
        const { texturePath, textureUnionPath, logoPath, color, zoomFactor, item } = nextProps;
        const {
            texturePath: prevTexturePath,
            textureUnionPath: prevTextureUnionPath,
            color: prevColor,
            zoomFactor: prevZoomFactor,
            item: prevItem
        } = this.props;

        this.logoPath = logoPath;

        if (item !== prevItem) {
            this.loadObject(item);
        }

        if (textureUnionPath && textureUnionPath != prevTextureUnionPath){
            this.renderTexture(textureUnionPath);
        } else if (texturePath && texturePath != prevTexturePath) {
            this.renderTexture(texturePath);
        } else if(!textureUnionPath && texturePath) {
            this.renderTexture(texturePath);
        } else if(!textureUnionPath && !texturePath && color && prevColor && this.props.object) {
            this.renderColor(color);
        }

        if (color !== prevColor) {
            this.renderColor(color);
        }

        if (zoomFactor !== prevZoomFactor) {
            this.zoom(zoomFactor);
        }

        return false;
    }

    renderTexture(texturePath) {
        if(texturePath != this.currTexturePath) {
            this.currTexturePath = texturePath;
            let texture = new THREE.TextureLoader().load(texturePath, ::this.threeRender);
            //texture.wrapS = THREE.RepeatWrapping;
            //texture.wrapT = THREE.RepeatWrapping;
            //texture.repeat.set(1, 1);

            this.carMaterial.materials.Main_color.color = new THREE.Color(1, 1, 1);
            this.carMaterial.materials.Main_color.specular = new THREE.Color(0.1, 0.1, 0.1);
            this.carMaterial.materials.Main_color.map = texture;
            this.carMaterial.materials.Main_color.envMap = false;
            this.carMaterial.materials.Main_color.shininess = 0;
            this.carMaterial.materials.Main_color.needsUpdate = true;
        }
    }

    renderColor(color) {
        this.carMaterial.materials.Main_color.color = new THREE.Color(color);
        this.carMaterial.materials.Main_color.map = null;
        this.carMaterial.materials.Main_color.shininess = 0;
        this.carMaterial.materials.Main_color.specular = new THREE.Color(0, 0, 0);
        this.carMaterial.materials.Main_color.reflectivity = 0.5;
        this.carMaterial.materials.Main_color.needsUpdate = true;
        this.threeRender();
    }


    zoom(zoomFactor) {
        this.camera.zoom = zoomFactor/10;
        this.camera.updateProjectionMatrix();
        this.threeRender();
    }

    render() {
        return (
            <div className="product__constructor-canvas" ref="container"></div>
        )
    }
}