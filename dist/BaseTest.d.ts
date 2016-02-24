declare abstract class TestCase {
    protected name: string;
    run(): void;
    private runTest(test);
    beforeEach(): void;
    afterEach(): void;
    protected assert(condition: boolean, message?: string): void;
    protected pass(): () => void;
    protected fail(): () => void;
}
export default TestCase;
