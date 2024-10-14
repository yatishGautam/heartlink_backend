// src/types/global.d.ts

interface ErrorWithStatus extends Error {
	status?: number;
	errors?: any;
	keyValue?: any;
	code?: number;
	path?: string;
	value?: string;
}
