export interface PointCloudData {
	positions: Float32Array;
	colors: Float32Array;
	count: number;
}

const HEADER_SCAN_LIMIT = 20_000;
const FLOAT_BYTES = 4;

export async function loadPointCloud(url: string): Promise<PointCloudData> {
	const response = await fetch(url);
	if (!response.ok) throw new Error(`PLY request failed: ${response.status}`);

	return parseBinaryPly(await response.arrayBuffer());
}

function parseBinaryPly(buffer: ArrayBuffer): PointCloudData {
	const bytes = new Uint8Array(buffer);
	const decoder = new TextDecoder();
	const headerPreview = decoder.decode(bytes.subarray(0, Math.min(bytes.length, HEADER_SCAN_LIMIT)));
	const headerEnd = headerPreview.indexOf("end_header");
	if (headerEnd < 0) throw new Error("PLY header is missing");
	if (!/^format binary_little_endian 1\.0/m.test(headerPreview.slice(0, headerEnd))) {
		throw new Error("Only binary little-endian PLY files are supported");
	}

	const markerEnd = headerEnd + "end_header".length;
	const dataStart = markerEnd + (bytes[markerEnd] === 13 ? 2 : 1);
	const header = decoder.decode(bytes.subarray(0, dataStart));
	const count = Number(header.match(/element vertex (\d+)/)?.[1] ?? 0);
	const properties = [...header.matchAll(/property (float|float32|uchar|uint8) (\w+)/g)].map((match) => ({
		type: match[1],
		name: match[2],
	}));

	const offsets = new Map<string, { offset: number; type: string }>();
	let stride = 0;
	for (const property of properties) {
		offsets.set(property.name, { offset: stride, type: property.type });
		stride += property.type.startsWith("float") ? FLOAT_BYTES : 1;
	}

	const positionOffsets = [offsets.get("x"), offsets.get("y"), offsets.get("z")];
	if (!count || !stride || positionOffsets.some((value) => !value)) {
		throw new Error("PLY vertex properties are invalid");
	}
	if (dataStart + count * stride > buffer.byteLength) throw new Error("PLY vertex data is truncated");

	const view = new DataView(buffer, dataStart);
	const positions = new Float32Array(count * 3);
	const colors = new Float32Array(count * 3);
	const mins = [Infinity, Infinity, Infinity];
	const maxs = [-Infinity, -Infinity, -Infinity];

	for (let index = 0; index < count; index += 1) {
		for (let axis = 0; axis < 3; axis += 1) {
			const value = view.getFloat32(index * stride + positionOffsets[axis]!.offset, true);
			positions[index * 3 + axis] = value;
			mins[axis] = Math.min(mins[axis], value);
			maxs[axis] = Math.max(maxs[axis], value);
		}

		for (const [channelIndex, channel] of ["red", "green", "blue"].entries()) {
			const property = offsets.get(channel);
			colors[index * 3 + channelIndex] = property
				? view.getUint8(index * stride + property.offset) / 255
				: 0.5;
		}
	}

	centerAndNormalize(positions, mins, maxs, count);
	return { positions, colors, count };
}

function centerAndNormalize(positions: Float32Array, mins: number[], maxs: number[], count: number) {
	const center = mins.map((min, index) => (min + maxs[index]) / 2);
	const scale = Math.max(...maxs.map((max, index) => max - mins[index])) || 1;
	for (let index = 0; index < count; index += 1) {
		for (let axis = 0; axis < 3; axis += 1) {
			positions[index * 3 + axis] = (positions[index * 3 + axis] - center[axis]) / scale;
		}
	}
}
