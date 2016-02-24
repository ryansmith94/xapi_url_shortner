import BaseTest from '../BaseTest';
import BaseService from './BaseService';
declare class Test extends BaseTest {
    protected service: BaseService;
    beforeEach(): void;
}
export default Test;
