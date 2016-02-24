import BaseTest from '../BaseTest';
declare class Test extends BaseTest {
    protected name: string;
    protected service: any;
    protected group_service: any;
    beforeEach(): void;
    private assertStatement(statement);
    private createGroup();
    testTrackLinkNoOptions(): any;
    testTrackLinkWithActor(): any;
    testTrackLinkWithContext(): any;
    testTrackLinkWithActorAndContext(): any;
}
export default Test;
