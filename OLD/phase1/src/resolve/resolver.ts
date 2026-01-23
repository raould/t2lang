// Phase1 delegates resolution to Phase0's resolver implementation.
// Re-export the Phase0 resolver as `Resolver` to avoid duplication and
// eliminate trivial wrapper subclasses.
export { ResolverBase as Resolver } from "phase0";
