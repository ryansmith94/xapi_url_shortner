import BaseTest from '../BaseTest';
declare class Test extends BaseTest {
    protected name: string;
    protected service: any;
    beforeEach(): void;
    testCreateLink(): any;
    testCreateLinkInvalidLongUrl(): any;
    testCreateLinkWithShortUrl(): any;
    testCreateLinkWithInvalidShortUrl(): any;
    testCreateLinkWithShortUrlOfExistingId(): any;
    testGetLinks(): any;
    testDeleteLinkById(): any;
    testDeleteLinkByInvalidId(): any;
    testChangeLongUrl(): any;
}
export default Test;
