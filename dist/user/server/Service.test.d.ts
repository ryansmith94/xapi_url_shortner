import BaseTest from '../../BaseTest';
declare class Test extends BaseTest {
    protected name: string;
    protected service: any;
    protected group_service: any;
    protected token_service: any;
    beforeEach(): void;
    private createUser(id?);
    testCreateUser(): any;
    testCreateUserWithInvalidEmail(): any;
    testCreateUserWithInvalidGroupId(): any;
    testCreateUserThatExistsInGroup(): any;
    testGetUserByEmailAndPassword(): any;
    testGetUserByEmailAndPasswordWithNoUser(): any;
    testGetUserByIdWithNoUser(): any;
    testDeleteUserById(): any;
    testDeleteUserByIdWithNoUser(): any;
    testCreateUserWithUser(): any;
    testCreateUserWithUserAndInvalidEmail(): any;
    testCreateUserWithUserThatExists(): any;
    testGetUsersWithGroupId(): any;
    testGetUsersWithInvalidGroupId(): any;
    testDeleteUsersByGroupId(): any;
    testDeleteUsersByInvalidGroupId(): any;
    testCreateAdmin(): any;
}
export default Test;
