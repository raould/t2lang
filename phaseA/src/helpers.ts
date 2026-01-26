export type ClassFields<C extends abstract new (...args: any) => any> = {
    [K in keyof InstanceType<C> as InstanceType<C>[K] extends (...args: any) => any ? never : K ]: InstanceType<C>[K]
};
