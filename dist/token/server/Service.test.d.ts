import BaseTest from '../BaseTest';
declare class Test extends BaseTest {
    protected name: string;
    protected service: any;
    protected group_service: any;
    protected user_service: any;
    beforeEach(): void;
    testCreateToken(): any;
    testCreateTokenWithInvalidUser(): any;
    testGetUserByValue(): any;
}
export default Test;
