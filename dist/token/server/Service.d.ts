import BaseService from '../BaseService';
declare class Service extends BaseService {
    private user_service;
    setUserService(user_service: any): void;
    createToken(email: string, password: string): any;
    getUserByValue(token_value: string): any;
}
export default Service;
