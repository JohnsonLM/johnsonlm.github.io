import type { PointCloudConfig } from "./config";
import type { PointCloudData } from "./plyLoader";

const vertexShaderSource = `
	attribute vec3 aPosition;
	attribute vec3 aColor;
	uniform mat4 uProjection;
	uniform vec2 uPointer;
	uniform float uScale;
	uniform vec3 uModelPosition;
	uniform float uRotationY;
	uniform float uCameraDistance;
	uniform float uFlipY;
	uniform float uRotationStrength;
	uniform float uVerticalStrength;
	uniform float uPointSize;
	varying vec3 vColor;

	void main() {
		float rotation = uRotationY + uPointer.x * uRotationStrength;
		float c = cos(rotation);
		float s = sin(rotation);
		vec3 point = aPosition * uScale;
		point.y *= uFlipY;
		point += uModelPosition;
		point.y += uPointer.y * uVerticalStrength;
		vec3 rotated = vec3(c * point.x + s * point.z, point.y, -s * point.x + c * point.z + uCameraDistance);
		gl_Position = uProjection * vec4(rotated, 1.0);
		gl_PointSize = uPointSize;
		vColor = aColor;
	}
`;

function fragmentShaderSource(config: PointCloudConfig) {
	return `
		precision mediump float;
		varying vec3 vColor;

		void main() {
			vec2 point = gl_PointCoord - vec2(0.5);
			if (dot(point, point) > 0.25) discard;
			gl_FragColor = vec4(min(vColor * ${config.points.brightness.toFixed(2)} + vec3(${config.points.ambientColor.toFixed(2)}), vec3(1.0)), ${config.points.opacity.toFixed(2)});
		}
	`;
}

export class PointCloudRenderer {
	private readonly gl: WebGLRenderingContext;
	private readonly program: WebGLProgram;
	private readonly positionBuffer: WebGLBuffer;
	private readonly colorBuffer: WebGLBuffer;
	private readonly attributes: { position: number; color: number };
	private readonly uniforms: Record<string, WebGLUniformLocation>;
	private projection = new Float32Array(16);
	private pointCount = 0;
	private lastWidth = 0;
	private lastHeight = 0;

	constructor(private readonly canvas: HTMLCanvasElement, private readonly config: PointCloudConfig) {
		const gl = canvas.getContext("webgl", { alpha: true, antialias: false });
		if (!gl) throw new Error("WebGL is unavailable");
		this.gl = gl;
		this.program = this.createProgram(vertexShaderSource, fragmentShaderSource(config));
		this.positionBuffer = this.requireValue(gl.createBuffer(), "position buffer");
		this.colorBuffer = this.requireValue(gl.createBuffer(), "color buffer");
		this.attributes = {
			position: gl.getAttribLocation(this.program, "aPosition"),
			color: gl.getAttribLocation(this.program, "aColor"),
		};
		if (this.attributes.position < 0 || this.attributes.color < 0) throw new Error("Point-cloud attributes are unavailable");

		this.uniforms = Object.fromEntries(
			["uProjection", "uPointer", "uScale", "uModelPosition", "uRotationY", "uCameraDistance", "uFlipY", "uRotationStrength", "uVerticalStrength", "uPointSize"].map((name) => [
				name,
				this.requireValue(gl.getUniformLocation(this.program, name), `${name} uniform`),
			]),
		);

		gl.useProgram(this.program);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
		this.setStaticUniforms();
	}

	upload(data: PointCloudData) {
		const { gl } = this;
		this.pointCount = data.count;
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, data.positions, gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, data.colors, gl.STATIC_DRAW);
	}

	draw(pointerX: number, pointerY: number) {
		const { gl } = this;
		this.resize();
		gl.clearColor(0, 0, 0, 0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		if (!this.pointCount) return;

		gl.useProgram(this.program);
		gl.uniformMatrix4fv(this.uniforms.uProjection, false, this.projection);
		gl.uniform2f(this.uniforms.uPointer, pointerX, pointerY);
		this.bindAttribute(this.positionBuffer, this.attributes.position);
		this.bindAttribute(this.colorBuffer, this.attributes.color);
		gl.drawArrays(gl.POINTS, 0, this.pointCount);
	}

	destroy() {
		this.gl.deleteBuffer(this.positionBuffer);
		this.gl.deleteBuffer(this.colorBuffer);
		this.gl.deleteProgram(this.program);
	}

	private resize() {
		const ratio = Math.min(window.devicePixelRatio, this.config.maxPixelRatio);
		const width = Math.max(1, Math.floor(this.canvas.clientWidth * ratio));
		const height = Math.max(1, Math.floor(this.canvas.clientHeight * ratio));
		if (width === this.lastWidth && height === this.lastHeight) return;
		this.lastWidth = width;
		this.lastHeight = height;
		this.canvas.width = width;
		this.canvas.height = height;
		this.gl.viewport(0, 0, width, height);
		this.projection = perspective(
			this.config.camera.fieldOfView,
			width / height,
			this.config.camera.near,
			this.config.camera.far,
		);
	}

	private setStaticUniforms() {
		const { gl, config } = this;
		gl.uniform1f(this.uniforms.uScale, config.model.scale);
		gl.uniform3f(this.uniforms.uModelPosition, ...config.model.position);
		gl.uniform1f(this.uniforms.uRotationY, config.model.rotationY);
		gl.uniform1f(this.uniforms.uCameraDistance, config.model.cameraDistance);
		gl.uniform1f(this.uniforms.uFlipY, config.model.flipY ? -1 : 1);
		gl.uniform1f(this.uniforms.uRotationStrength, config.interaction.rotationStrength);
		gl.uniform1f(this.uniforms.uVerticalStrength, config.interaction.verticalStrength);
		gl.uniform1f(this.uniforms.uPointSize, config.points.size);
	}

	private bindAttribute(buffer: WebGLBuffer, location: number) {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
		this.gl.enableVertexAttribArray(location);
		this.gl.vertexAttribPointer(location, 3, this.gl.FLOAT, false, 0, 0);
	}

	private createProgram(vertexSource: string, fragmentSource: string) {
		const { gl } = this;
		const program = this.requireValue(gl.createProgram(), "shader program");
		const vertex = this.compileShader(gl.VERTEX_SHADER, vertexSource);
		const fragment = this.compileShader(gl.FRAGMENT_SHADER, fragmentSource);
		gl.attachShader(program, vertex);
		gl.attachShader(program, fragment);
		gl.linkProgram(program);
		gl.deleteShader(vertex);
		gl.deleteShader(fragment);
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			const message = gl.getProgramInfoLog(program) ?? "Unknown shader linking error";
			gl.deleteProgram(program);
			throw new Error(message);
		}
		return program;
	}

	private compileShader(type: number, source: string) {
		const { gl } = this;
		const shader = this.requireValue(gl.createShader(type), "shader");
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			const message = gl.getShaderInfoLog(shader) ?? "Unknown shader compilation error";
			gl.deleteShader(shader);
			throw new Error(message);
		}
		return shader;
	}

	private requireValue<T>(value: T | null, label: string): T {
		if (!value) throw new Error(`Unable to create ${label}`);
		return value;
	}
}

function perspective(fov: number, aspect: number, near: number, far: number) {
	const f = 1 / Math.tan(fov / 2);
	const range = 1 / (near - far);
	return new Float32Array([
		f / aspect, 0, 0, 0,
		0, f, 0, 0,
		0, 0, (far + near) * range, -1,
		0, 0, 2 * far * near * range, 0,
	]);
}
