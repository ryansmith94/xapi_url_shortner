import BaseTest from '../BaseTest';
declare class Test extends BaseTest {
    protected name: string;
    protected service: any;
    beforeEach(): void;
    testCreateToken(): any;
}
export default Test;
