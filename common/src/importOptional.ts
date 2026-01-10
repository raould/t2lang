export async function importOptional(moduleName: string): Promise<any | null> {
    try {
        return await import(moduleName);
    } catch {
        return null;
    }
}

export default importOptional;
