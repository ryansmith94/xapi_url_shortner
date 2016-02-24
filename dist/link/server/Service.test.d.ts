import BaseTest from '../BaseTest';
declare class Test extends BaseTest {
    protected name: string;
    protected service: any;
    protected group_service: any;
    protected user_service: any;
    protected tracking_service: any;
    beforeEach(): void;
    private createUser(id?);
    testTrackLinkNoOptions(): any;
    testCreateLink(): any;
    testCreateLinkInvalidLongUrl(): any;
    testCreateLinkWithShortUrl(): any;
    testCreateLinkWithExistingShortUrl(): any;
    testCreateLinkWithShortUrlOfExistingId(): any;
    testGetLinks(): any;
    testGetLinksFromOtherGroup(): any;
    testGetLinksWithIncorrectId(): any;
    testDeleteLinkById(): any;
    testDeleteLinkByInvalidId(): any;
    testDeleteLinkByIdWithInvalidUser(): any;
    testDeleteLinksByGroupId(): any;
    testDeleteLinksByInvalidGroupId(): any;
    testChangeLongUrl(): any;
    testChangeLongUrlWithInvalidId(): any;
    testChangeLongUrlWithInvalidLongUrl(): any;
    testChangeLongUrlWithInvalidUserId(): any;
}
export default Test;
