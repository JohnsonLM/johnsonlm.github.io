export const pointCloudConfig = {
	assetUrl: "/sharks.0.ply",
	bleedBelow: 448,
	model: {
		scale: 15,
		position: [-5, 2, 0] as const,
		rotationY: Math.PI,
		cameraDistance: -13,
		flipY: true,
	},
	points: {
		size: 5,
		opacity: 0.5,
		brightness: 1,
		ambientColor: 0,
	},
	interaction: {
		rotationStrength: 0.14,
		verticalStrength: 0.35,
		smoothing: 0.04,
	},
	camera: {
		fieldOfView: .7,
		near: 0.05,
		far: 50,
	},
	maxPixelRatio: 2,
} as const;

export type PointCloudConfig = typeof pointCloudConfig;
