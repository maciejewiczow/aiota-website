export const interleaveArrays = <T1, T2>(
    ...arrays: [T1[], T2[]]
): (T1 | T2 | null)[] => Array.from({ length: Math.max(...arrays.map(o => o.length)) }, (_, i) => arrays.map(arr => arr[i] ?? null),
    ).flat();
