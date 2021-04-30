import * as ReactThreeFiber from "@react-three/fiber"
import { Object3D } from "three"
import { MotionProps } from "../../motion/types"
import {
    AudioListenerProps,
    PositionalAudioProps,
    MeshProps,
    InstancedMeshProps,
    SceneProps,
    SpriteProps,
    LODProps,
    SkinnedMeshProps,
    SkeletonProps,
    BoneProps,
    LineSegmentsProps,
    LineLoopProps,
    PointsProps,
    GroupProps,
    ImmediateRenderObjectProps,
    CameraProps,
    PerspectiveCameraProps,
    OrthographicCameraProps,
    CubeCameraProps,
    ArrayCameraProps,
    InstancedBufferGeometryProps,
    BufferGeometryProps,
    BoxBufferGeometryProps,
    CircleBufferGeometryProps,
    ConeBufferGeometryProps,
    CylinderBufferGeometryProps,
    DodecahedronBufferGeometryProps,
    ExtrudeBufferGeometryProps,
    IcosahedronBufferGeometryProps,
    LatheBufferGeometryProps,
    OctahedronBufferGeometryProps,
    ParametricBufferGeometryProps,
    PlaneBufferGeometryProps,
    PolyhedronBufferGeometryProps,
    RingBufferGeometryProps,
    ShapeBufferGeometryProps,
    SphereBufferGeometryProps,
    TetrahedronBufferGeometryProps,
    TextBufferGeometryProps,
    TorusBufferGeometryProps,
    TorusKnotBufferGeometryProps,
    TubeBufferGeometryProps,
    WireframeGeometryProps,
    ParametricGeometryProps,
    TetrahedronGeometryProps,
    OctahedronGeometryProps,
    IcosahedronGeometryProps,
    DodecahedronGeometryProps,
    PolyhedronGeometryProps,
    TubeGeometryProps,
    TorusKnotGeometryProps,
    TorusGeometryProps,
    TextGeometryProps,
    SphereGeometryProps,
    RingGeometryProps,
    PlaneGeometryProps,
    LatheGeometryProps,
    ShapeGeometryProps,
    ExtrudeGeometryProps,
    EdgesGeometryProps,
    ConeGeometryProps,
    CylinderGeometryProps,
    CircleGeometryProps,
    BoxGeometryProps,
    MaterialProps,
    ShadowMaterialProps,
    SpriteMaterialProps,
    RawShaderMaterialProps,
    ShaderMaterialProps,
    PointsMaterialProps,
    MeshPhysicalMaterialProps,
    MeshStandardMaterialProps,
    MeshPhongMaterialProps,
    MeshToonMaterialProps,
    MeshNormalMaterialProps,
    MeshLambertMaterialProps,
    MeshDepthMaterialProps,
    MeshDistanceMaterialProps,
    MeshBasicMaterialProps,
    MeshMatcapMaterialProps,
    LineDashedMaterialProps,
    LineBasicMaterialProps,
    PrimitiveProps,
    LightProps,
    SpotLightShadowProps,
    SpotLightProps,
    PointLightProps,
    RectAreaLightProps,
    HemisphereLightProps,
    DirectionalLightShadowProps,
    DirectionalLightProps,
    AmbientLightProps,
    LightShadowProps,
    AmbientLightProbeProps,
    HemisphereLightProbeProps,
    LightProbeProps,
    SpotLightHelperProps,
    SkeletonHelperProps,
    PointLightHelperProps,
    HemisphereLightHelperProps,
    GridHelperProps,
    PolarGridHelperProps,
    DirectionalLightHelperProps,
    CameraHelperProps,
    BoxHelperProps,
    Box3HelperProps,
    PlaneHelperProps,
    ArrowHelperProps,
    AxesHelperProps,
    TextureProps,
    VideoTextureProps,
    DataTextureProps,
    DataTexture3DProps,
    CompressedTextureProps,
    CubeTextureProps,
    CanvasTextureProps,
    DepthTextureProps,
    RaycasterProps,
    Vector2Props,
    Vector3Props,
    Vector4Props,
    EulerProps,
    Matrix3Props,
    Matrix4Props,
    QuaternionProps,
    BufferAttributeProps,
    InstancedBufferAttributeProps,
    ColorProps,
    FogProps,
    FogExp2Props,
} from "@react-three/fiber"

export type Object3DProps = ReactThreeFiber.Object3DNode<
    Object3D,
    typeof Object3D
>

export type Object3DMotionProps = Object3DProps & MotionProps

export type ReactThreeFiberComponents = {
    audioListener: AudioListenerProps
    positionalAudio: PositionalAudioProps

    mesh: MeshProps
    instancedMesh: InstancedMeshProps
    scene: SceneProps
    sprite: SpriteProps
    lOD: LODProps
    skinnedMesh: SkinnedMeshProps
    skeleton: SkeletonProps
    bone: BoneProps
    lineSegments: LineSegmentsProps
    lineLoop: LineLoopProps
    points: PointsProps
    group: GroupProps
    immediateRenderObject: ImmediateRenderObjectProps

    // cameras
    camera: CameraProps
    perspectiveCamera: PerspectiveCameraProps
    orthographicCamera: OrthographicCameraProps
    cubeCamera: CubeCameraProps
    arrayCamera: ArrayCameraProps

    // geometry
    instancedBufferGeometry: InstancedBufferGeometryProps
    bufferGeometry: BufferGeometryProps
    boxBufferGeometry: BoxBufferGeometryProps
    circleBufferGeometry: CircleBufferGeometryProps
    coneBufferGeometry: ConeBufferGeometryProps
    cylinderBufferGeometry: CylinderBufferGeometryProps
    dodecahedronBufferGeometry: DodecahedronBufferGeometryProps
    extrudeBufferGeometry: ExtrudeBufferGeometryProps
    icosahedronBufferGeometry: IcosahedronBufferGeometryProps
    latheBufferGeometry: LatheBufferGeometryProps
    octahedronBufferGeometry: OctahedronBufferGeometryProps
    parametricBufferGeometry: ParametricBufferGeometryProps
    planeBufferGeometry: PlaneBufferGeometryProps
    polyhedronBufferGeometry: PolyhedronBufferGeometryProps
    ringBufferGeometry: RingBufferGeometryProps
    shapeBufferGeometry: ShapeBufferGeometryProps
    sphereBufferGeometry: SphereBufferGeometryProps
    tetrahedronBufferGeometry: TetrahedronBufferGeometryProps
    textBufferGeometry: TextBufferGeometryProps
    torusBufferGeometry: TorusBufferGeometryProps
    torusKnotBufferGeometry: TorusKnotBufferGeometryProps
    tubeBufferGeometry: TubeBufferGeometryProps
    wireframeGeometry: WireframeGeometryProps
    parametricGeometry: ParametricGeometryProps
    tetrahedronGeometry: TetrahedronGeometryProps
    octahedronGeometry: OctahedronGeometryProps
    icosahedronGeometry: IcosahedronGeometryProps
    dodecahedronGeometry: DodecahedronGeometryProps
    polyhedronGeometry: PolyhedronGeometryProps
    tubeGeometry: TubeGeometryProps
    torusKnotGeometry: TorusKnotGeometryProps
    torusGeometry: TorusGeometryProps
    textGeometry: TextGeometryProps
    sphereGeometry: SphereGeometryProps
    ringGeometry: RingGeometryProps
    planeGeometry: PlaneGeometryProps
    latheGeometry: LatheGeometryProps
    shapeGeometry: ShapeGeometryProps
    extrudeGeometry: ExtrudeGeometryProps
    edgesGeometry: EdgesGeometryProps
    coneGeometry: ConeGeometryProps
    cylinderGeometry: CylinderGeometryProps
    circleGeometry: CircleGeometryProps
    boxGeometry: BoxGeometryProps

    // materials
    material: MaterialProps
    shadowMaterial: ShadowMaterialProps
    spriteMaterial: SpriteMaterialProps
    rawShaderMaterial: RawShaderMaterialProps
    shaderMaterial: ShaderMaterialProps
    pointsMaterial: PointsMaterialProps
    meshPhysicalMaterial: MeshPhysicalMaterialProps
    meshStandardMaterial: MeshStandardMaterialProps
    meshPhongMaterial: MeshPhongMaterialProps
    meshToonMaterial: MeshToonMaterialProps
    meshNormalMaterial: MeshNormalMaterialProps
    meshLambertMaterial: MeshLambertMaterialProps
    meshDepthMaterial: MeshDepthMaterialProps
    meshDistanceMaterial: MeshDistanceMaterialProps
    meshBasicMaterial: MeshBasicMaterialProps
    meshMatcapMaterial: MeshMatcapMaterialProps
    lineDashedMaterial: LineDashedMaterialProps
    lineBasicMaterial: LineBasicMaterialProps

    // primitive
    primitive: PrimitiveProps

    // lights and other
    light: LightProps
    spotLightShadow: SpotLightShadowProps
    spotLight: SpotLightProps
    pointLight: PointLightProps
    rectAreaLight: RectAreaLightProps
    hemisphereLight: HemisphereLightProps
    directionalLightShadow: DirectionalLightShadowProps
    directionalLight: DirectionalLightProps
    ambientLight: AmbientLightProps
    lightShadow: LightShadowProps
    ambientLightProbe: AmbientLightProbeProps
    hemisphereLightProbe: HemisphereLightProbeProps
    lightProbe: LightProbeProps

    // helpers
    spotLightHelper: SpotLightHelperProps
    skeletonHelper: SkeletonHelperProps
    pointLightHelper: PointLightHelperProps
    hemisphereLightHelper: HemisphereLightHelperProps
    gridHelper: GridHelperProps
    polarGridHelper: PolarGridHelperProps
    directionalLightHelper: DirectionalLightHelperProps
    cameraHelper: CameraHelperProps
    boxHelper: BoxHelperProps
    box3Helper: Box3HelperProps
    planeHelper: PlaneHelperProps
    arrowHelper: ArrowHelperProps
    axesHelper: AxesHelperProps

    // textures
    texture: TextureProps
    videoTexture: VideoTextureProps
    dataTexture: DataTextureProps
    dataTexture3D: DataTexture3DProps
    compressedTexture: CompressedTextureProps
    cubeTexture: CubeTextureProps
    canvasTexture: CanvasTextureProps
    depthTexture: DepthTextureProps

    // misc
    raycaster: RaycasterProps
    vector2: Vector2Props
    vector3: Vector3Props
    vector4: Vector4Props
    euler: EulerProps
    matrix3: Matrix3Props
    matrix4: Matrix4Props
    quaternion: QuaternionProps
    bufferAttribute: BufferAttributeProps
    instancedBufferAttribute: InstancedBufferAttributeProps
    color: ColorProps
    fog: FogProps
    fogExp2: FogExp2Props
}
