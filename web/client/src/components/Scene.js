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

        const width = 800;
        const height = 500;

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

        window.THREE = THREE;
        window.scene = this.scene;
    }

    threeRender() {
        this.renderer.render(this.scene, this.camera);
    }

    onCanvasMouseMove(event) {
        this.mouse.x = (event.offsetX / 800) * 2 - 1;
        this.mouse.y = -(event.offsetY / 500) * 2 + 1;

        var vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 1);
        vector.unproject(this.camera);
        var ray = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());

        var intersects = ray.intersectObjects(this.targetList, true);

        if (intersects.length > 0) {
            if (!intersects[0].object.loged) {
                for (var item in this.activeObjects) {
                    var obj = this.scene.getObjectByName(item);
                    if (!obj.loged) {
                        obj.material = new THREE.MeshPhongMaterial({
                            transparent: true,
                            opacity: 0,
                            color: new THREE.Color(1, 1, 1)
                        });
                        obj.material.needsUpdate = true;
                    }
                    if (intersects[0].object.name == item) {
                        intersects[0].object.callback();
                    }
                    this.threeRender();
                }
            }
        }

    }

    onCanvasMouseDown(event) {
        this.mouse.x = (event.offsetX / 800) * 2 - 1;
        this.mouse.y = -(event.offsetY / 500) * 2 + 1;

        var vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 1);
        vector.unproject(this.camera);
        var ray = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());

        var intersects = ray.intersectObjects(this.targetList, true);

        if (intersects.length > 0) {
            for (var item in this.activeObjects) {
                if (intersects[0].object.name == item) {
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

    componentDidMount() {
        this.activeObjects = this.props.logos;

        let container = this.refs.container;

        let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(0, 4, 0);
        this.scene.add(directionalLight);

        let directionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight2.position.set(0, -4, 0);
        this.scene.add(directionalLight2);

        let directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight3.position.set(4, 0, 0);
        this.scene.add(directionalLight3);

        let directionalLight4 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight4.position.set(-4, 0, 0);
        this.scene.add(directionalLight4);


        let loader = new THREE.OBJLoader();
        let mtlLoader = new THREE.MTLLoader();
        if (!this.props.object) {
            mtlLoader.load('model/car4.mtl', (material) => {
                material.preload();
                this.carMaterial = material;
                this.props.setSceneMaterial(this.carMaterial);
                loader.setMaterials(this.carMaterial);
                loader.load('model/car4.obj', (geometry) => {
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
                                if (child.name == item) {
                                    var tr = ::this.threeRender;
                                    child.callback = function () {
                                        this.material = new THREE.MeshPhongMaterial({
                                            transparent: false,
                                            color: new THREE.Color(0, 0.4, 0)
                                        });

                                        this.material.needsUpdate = true;
                                        tr();
                                    }
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

                    this.car.position.y = -2;

                    this.scene.add(this.car);
                    this.threeRender();
                    this.targetList.push(this.car);
                    this.props.setSceneObject(this.car);
                });
            });
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
        canvas.addEventListener('mousedown', ::this.onCanvasMouseDown, false);

        this.props.setSceneCanvas(canvas);
    }

    shouldComponentUpdate(nextProps) {
        const {texturePath, textureUnionPath, logoPath, color} = nextProps;
        const {
            texturePath: prevTexturePath,
            textureUnionPath: prevTextureUnionPath,
            color: prevColor
        } = this.props;

        this.logoPath = logoPath;

        if(textureUnionPath && textureUnionPath != prevTextureUnionPath){
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

        return false;
    }

    renderTexture(texturePath) {
        let texture = new THREE.TextureLoader().load(texturePath, ::this.threeRender);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);

        this.carMaterial.materials.Main_color.color = new THREE.Color(0.5, 0.5, 0.5);
        this.carMaterial.materials.Main_color.specular = new THREE.Color(0.1, 0.1, 0.1);
        this.carMaterial.materials.Main_color.map = texture;
        this.carMaterial.materials.Main_color.envMap = false;
        this.carMaterial.materials.Main_color.shininess = 0;
        this.carMaterial.materials.Main_color.needsUpdate = true;
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

    render() {
        return (
            <div ref="container"></div>
        )
    }
}