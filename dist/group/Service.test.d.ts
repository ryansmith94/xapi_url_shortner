import BaseTest from '../BaseTest';
declare class Test extends BaseTest {
    protected name: string;
    protected service: any;
    protected user_service: any;
    protected link_service: any;
    beforeEach(): void;
    testCreateGroup(): any;
    testCreateGroupWithVerbOptions(): any;
    testGetGroupById(): any;
    testGetGroupByInvalidId(): any;
    testGetGroups(): any;
    testDeleteGroupById(): any;
    testDeleteGroupByInvalidId(): any;
    private createGroup();
}
export default Test;
